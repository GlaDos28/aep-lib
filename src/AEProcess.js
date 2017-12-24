/**
 * ==========================
 * @description Assimilation & Equalization process implementation
 * ==========================
 *
 * @author  Evgeny Savelyev
 * @since   24.12.17
 * @version 1.0.0
 * @licence See the LICENCE file in the project root.
 */

"use strict";

const SignData = require("./SignData");

function isValueExist(value) {
    return typeof value !== "undefined"
        && value !== null
        && value !== undefined;
}

function getAverage(signName, objects, threshold) {
    if (!isValueExist(objects[0][signName])) {
        throw new Error(`the first object must have valid sign value of the sign "${signName}"`);
    }

    const objectsWithValue = [];

    for (const object of objects) {
        if (isValueExist(object[signName])) {
            objectsWithValue.push(object);
        }
    }

    switch (typeof objects[0][signName]) {
    case "number":
        return getNumberAverage(signName, objectsWithValue, threshold);
    case "string":
        return getEnumAverage(signName, objectsWithValue, threshold);
    default:
        return getCompositionAverage(signName, objectsWithValue, threshold);
    }
}

function getNumberAverage(signName, objects, threshold) {

    /* Calculating average */

    let bufSum = 0;

    for (const object of objects) {
        bufSum += object[signName];
    }

    const average = bufSum / objects.length;

    /* Calculating mean linear deviation */

    bufSum = 0;

    for (const object of objects) {
        bufSum += Math.abs(average - object[signName]);
    }

    const meanLinearDeviation = bufSum / objects.length;

    /* Returns average or null if threshold is not satisfied */

    return meanLinearDeviation <= threshold
        ? average
        : null;
}

function getEnumAverage(signName, objects, threshold) {

    /* Calculating objects' values presence number */

    const valuesCount = {};

    for (const object of objects) {
        if (valuesCount[object[signName]]) {
            valuesCount[object[signName]] += 1;
        } else {
            valuesCount[object[signName]] = 1;
        }
    }

    /* Calculating mode and maximal enum value presence frequency */

    let [mode] = Object.keys(valuesCount);
    let maxFreq  = valuesCount[mode] / objects.length;

    for (const value in valuesCount) {
        const freq = valuesCount[value] / objects.length;

        if (freq > maxFreq) {
            maxFreq = freq;
            mode    = value;
        }
    }

    /* Returns mode or null if threshold is not satisfied */

    return maxFreq >= threshold
        ? mode
        : null;
}

function getCompositionAverage(signName, objects, threshold) {
    const compositionAvg = {};

    for (const value in objects[0][signName]) {
        if (Object.prototype.hasOwnProperty.call(objects[0][signName], value)) {
            const avg = getAverage(signName + "." + value, objects, threshold);

            if (avg === null) {
                return null;
            }

            compositionAvg[value] = avg;
        }
    }

    return compositionAvg;
}

/**
 * @class
 * @classdesc Assimilation & Equalization process implementation
 *
 * @property {AEProcessDescriptor} descriptor A&E process descriptor which defines its data and behavior
 * @property {array<SignData>} signData sign data instances for each sign from descriptor
 */
class AEProcess {
    constructor(descriptor) {
        this.descriptor = descriptor;
        this.signData   = [];

        for (const signDescriptor of this.descriptor.getSignDescriptors()) {
            this.signData.push(new SignData(signDescriptor));
        }
    }

    getDescriptor() {
        return this.descriptor;
    }

    toString() {
        let res = "A&E process:";

        for (const signDataInstance of this.signData) {
            res += "\n\t" + signDataInstance.toString();
        }

        return res + "\nEnd";
    }

    /* Main logic */

    process(delta, objects) {
        if (objects.length !== 0) {
            this.assimilate(delta, objects);
            this.equalize(delta, objects);
        }
    }

    assimilate(delta, objects) {
        const signNum = this.signData.length;

        /* Filters objects by predicate */

        const filteredObjects = [];

        for (const object of objects) {
            if (this.descriptor.getPredicate()(object)) {
                filteredObjects.push(object);
            }
        }

        /* Calculating signs' averages (or nulls if threshold is not satisfied) */

        const averages = [];

        for (const signDescriptor of this.descriptor.getSignDescriptors()) {
            averages.push(getAverage(signDescriptor.getName(), filteredObjects, signDescriptor.getThreshold()));
        }

        /* Processing signs and their averages */

        for (let i = 0; i < signNum; i += 1) {
            if (averages[i] !== null) {
                if (this.signData[i].isEstablished()) {
                    this.signData[i].updateEstablishedValue(averages[i]); /* Updating established value for established sign */
                } else {
                    this.signData[i].incAcceptInterval(delta); /* Increasing current accept interval for not established value */

                    if (this.signData[i].getAcceptInterval() >= this.descriptor.getSignDescriptors()[i].getAcceptTime()) { /* Mark sign as established */
                        this.signData[i].zeroAcceptTime();
                        this.signData[i].updateEstablishedValue(averages[i]);
                    }
                }
            } else if (this.signData[i].isEstablished()) {
                this.signData[i].unestablish(); /* Exclude sign from established ones */
            }
        }
    }

    equalize(delta, objects) {
        const signNum = this.signData.length;

        /* Executing impact functions */

        for (const object of objects) {
            for (let i = 0; i < signNum; i += 1) {
                const signDescriptor = this.descriptor.getSignDescriptors()[i];

                if (this.signData[i].isEstablished()) {
                    signDescriptor.getImpactFunc()(delta, object, this.signData[i].getEstablishedValue());
                }
            }
        }
    }
}

exports = module.exports = AEProcess;
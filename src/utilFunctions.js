/**
 * ==========================
 * @description Utility functions
 * ==========================
 *
 * @author  Evgeny Savelyev
 * @since   24.12.17
 * @version 1.0.0
 * @licence See the LICENCE file in the project root.
 */

"use strict";

function getLinearConvergentImpact(attrName, convergeRate, transformFunc = (value) => value) {
    return (delta, object, establishedValue) => {
        const limit    = transformFunc(establishedValue);
        const curValue = object[attrName];

        if (curValue < limit) {
            if (limit - curValue < convergeRate * delta) {
                object[attrName] = limit;
            } else {
                object[attrName] += convergeRate * delta;
            }
        } else if (curValue > limit) {
            if (curValue - limit < convergeRate * delta) {
                object[attrName] = limit;
            } else {
                object[attrName] -= convergeRate * delta;
            }
        }
    };
}

function getEnumImpact(attrName, timeAttr = null, delayTime = 0, mapFunc = (value) => value) {
    if (timeAttr !== null) {
        return (delta, object, establishedValue) => {
            object[timeAttr] += delta;

            if (object[timeAttr] > delayTime) {
                object[timeAttr] = 0;
                object[attrName] = mapFunc(establishedValue);
            }
        };
    }

    return (delta, object, establishedValue) => {
        object[attrName] = mapFunc(establishedValue);
    };
}

exports = module.exports = {
    getLinearConvergentImpact : getLinearConvergentImpact,
    getEnumImpact             : getEnumImpact
};
/**
 * ==========================
 * @description data of a sign for an A&E process implementation
 * ==========================
 *
 * @author  Evgeny Savelyev
 * @since   24.12.17
 * @version 1.0.0
 * @licence See the LICENCE file in the project root.
 */

"use strict";

/**
 * @class
 * @classdesc data of a sign (without descriptor) for an A&E process implementation
 *
 * @property {SignDescriptor} descriptor descriptor of a sign related to this sign data
 * @property {double} acceptInterval current accepted time interval
 * @property {number|string|object} establishedValue current established value of a related established sign
 */
class SignData {
    constructor(descriptor) {
        this.descriptor       = descriptor;
        this.acceptInterval   = 0;
        this.establishedValue = null; /* Null indicated that the sign is not established */
    }

    getDescriptor() {
        return this.descriptor;
    }

    getAcceptInterval() {
        return this.acceptInterval;
    }

    incAcceptInterval(delta) {
        this.acceptInterval += delta;
    }

    zeroAcceptTime() {
        this.acceptInterval = 0;
    }

    getEstablishedValue() {
        return this.establishedValue;
    }

    updateEstablishedValue(newValue) {
        this.establishedValue = newValue;
    }

    unestablish() {
        this.establishedValue = null;
    }

    isEstablished() {
        return this.establishedValue !== null;
    }

    toString() {
        return `sign "${this.descriptor.getName()}": threshold ${this.descriptor.getThreshold()}, accept time ${this.descriptor.getAcceptTime()}, `
            + `accept interval ${this.acceptInterval}, established value ${this.establishedValue}`;
    }
}

exports = module.exports = SignData;
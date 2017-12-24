/**
 * ==========================
 * @description object sign (attribute which can be established) descriptor
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
 * @classdesc object sign (attribute which can be established) descriptor
 *
 * @property {string} name sign 's name as an attribute
 * @property {number|object} threshold accepted bound to establish a sign
 * @property {double} acceptTime time to wait before establish a sign (only if threshold is satisfied)
 * @property {function<double, object, number|string|object>} impactFunc function which influences on object's attributes when the sign is established
 */
class SignDescriptor {
    constructor(name, threshold, acceptTime, impactFunc) {
        this.name       = name;
        this.threshold  = threshold;
        this.acceptTime = acceptTime;
        this.impactFunc = impactFunc;
    }

    getName() {
        return this.name;
    }

    getThreshold() {
        return this.threshold;
    }

    getAcceptTime() {
        return this.acceptTime;
    }

    getImpactFunc() {
        return this.impactFunc;
    }

    toString() {
        return `sign descriptor "${this.name}": threshold ${this.threshold}, accept time ${this.acceptTime}`;
    }
}

exports = module.exports = SignDescriptor;
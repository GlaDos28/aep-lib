/**
 * ==========================
 * @description Assimilation & Equalization process descriptor
 * ==========================
 *
 * @author  Evgeny Savelyev
 * @since   ?.?.17
 * @version 1.0.0
 * @licence See the LICENCE file in the project root.
 */

"use strict";

/**
 * @class
 * @classdesc Assimilation & Equalization process descriptor
 *
 * @property {function<object>} predicate function which filters objects by hardcoded criteria
 * @property {array<SignDescriptor>} signDescriptors array of sign descriptors
 */
class AEProcessDescriptor {
    constructor(predicate, ...signDescriptors) {
        this.predicate       = predicate;
        this.signDescriptors = signDescriptors;
    }

    getPredicate() {
        return this.predicate;
    }

    getSignDescriptors() {
        return this.signDescriptors;
    }

    toString() {
        let res = "A&E process descriptor:";

        for (const signDescriptor of this.signDescriptors) {
            res += "\n\t" + signDescriptor.toString();
        }

        return res + "\nEnd";
    }
}

exports = module.exports = AEProcessDescriptor;
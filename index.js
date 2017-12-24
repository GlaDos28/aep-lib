/**
 * ==========================
 * @description access point of the library
 * ==========================
 *
 * @author  Evgeny Savelyev
 * @since   24.12.17
 * @version 1.0.0
 * @licence See the LICENCE file in the project root.
 */

"use strict";

const AEProcess           = require("./src/AEProcess");
const AEProcessDescriptor = require("./src/descriptors/AEProcessDescriptor");
const SignDescriptor      = require("./src/descriptors/SignDescriptor");
const utilFunctions       = require("./src/utilFunctions");

exports = module.exports = {
    AEProcess           : AEProcess,
    AEProcessDescriptor : AEProcessDescriptor,
    SignDescriptor      : SignDescriptor,
    utilFunctions       : utilFunctions
};
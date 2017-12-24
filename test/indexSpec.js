/**
 * ==========================
 * @description <root>/index.js tests. Provided for Mocha and Istanbul libraries.
 * ==========================
 *
 * @author  Evgeny Savelyev
 * @since   25.12.17
 * @version 1.0.0
 * @licence See the LICENCE file in the project root.
 */

"use strict";

const { expect } = require("chai");
const index      = require("../index");

let aeProcessDescriptors = null;

/* eslint-disable no-magic-numbers */

describe("Example with", () => {
    before((done) => {
        aeProcessDescriptors = [];

        aeProcessDescriptors.push(new index.AEProcessDescriptor(
            (object) => true,
            new index.SignDescriptor("num", 10, 5, index.utilFunctions.getLinearConvergentImpact("num", 1))
        ));

        aeProcessDescriptors.push(new index.AEProcessDescriptor(
            (object) => true,
            new index.SignDescriptor("str", 0.5, 5, index.utilFunctions.getEnumImpact("str"))
        ));

        done();
    });

    after((done) => {
        aeProcessDescriptors = null;
        done();
    });

    it("not established number value works", () => {
        const objects = [
            { num : 100 },
            { num : 200 },
            { num : 300 }
        ];

        const aeProcess = new index.AEProcess(aeProcessDescriptors[0]);

        for (let i = 0; i < 10; i++) {
            aeProcess.process(1, objects);
        }

        expect(objects[0].num).to.equal(100);
        expect(objects[1].num).to.equal(200);
        expect(objects[2].num).to.equal(300);
    });

    it("established number value and fully convergent values with delta=1 works", () => {
        const objects = [
            { num : 100 },
            { num : 102 },
            { num : 104 }
        ];

        const aeProcess = new index.AEProcess(aeProcessDescriptors[0]);

        for (let i = 0; i < 100; i++) {
            aeProcess.process(1, objects);
        }

        expect(objects[0].num).to.equal(102);
        expect(objects[1].num).to.equal(102);
        expect(objects[2].num).to.equal(102);
    });

    it("established number value and not fully convergent values with delta=1 works", () => {
        const objects = [
            { num : 100 },
            { num : 102 },
            { num : 104 }
        ];

        const aeProcess = new index.AEProcess(aeProcessDescriptors[0]);

        for (let i = 0; i < 5; i++) {
            aeProcess.process(1, objects);
        }

        expect(objects[0].num).to.equal(101);
        expect(objects[1].num).to.equal(102);
        expect(objects[2].num).to.equal(103);
    });

    it("established number value and fully convergent values with delta=10 works", () => {
        const objects = [
            { num : 100 },
            { num : 102 },
            { num : 104 }
        ];

        const aeProcess = new index.AEProcess(aeProcessDescriptors[0]);

        for (let i = 0; i < 10; i++) {
            aeProcess.process(10, objects);
        }

        expect(objects[0].num).to.equal(102);
        expect(objects[1].num).to.equal(102);
        expect(objects[2].num).to.equal(102);
    });

    it("not established string value works", () => {
        const objects = [
            { str : "foo" },
            { str : "bar" },
            { str : "baz" }
        ];

        const aeProcess = new index.AEProcess(aeProcessDescriptors[1]);

        for (let i = 0; i < 10; i++) {
            aeProcess.process(1, objects);
        }

        expect(objects[0].str).to.equal("foo");
        expect(objects[1].str).to.equal("bar");
        expect(objects[2].str).to.equal("baz");
    });

    it("established string value and changed values works", () => {
        const objects = [
            { str : "foo" },
            { str : "bar" },
            { str : "foo" }
        ];

        const aeProcess = new index.AEProcess(aeProcessDescriptors[1]);

        for (let i = 0; i < 10; i++) {
            aeProcess.process(1, objects);
        }

        expect(objects[0].str).to.equal("foo");
        expect(objects[1].str).to.equal("foo");
        expect(objects[2].str).to.equal("foo");
    });
});


exports = module.exports = {};
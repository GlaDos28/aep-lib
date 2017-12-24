# README

aep-lib (A&E Process library, or Assimilation & Equalization process library) is a library for game development, which solves a problem, described in "Thesis.md" file (RUS lang).

See [github page](https://github.com/GlaDos28/aep-lib) for Thesis.md and other files

### Usage

```bash
npm i aep-lib --save
```

```javascript
const aep = require("aep-lib");

const aepDescriptor = new index.AEProcessDescriptor(
    (object) => true,
    new aep.SignDescriptor("num", 10 /* threshold */, 5 /* accept time */, aep.utilFunctions.getLinearConvergentImpact("num", 1 /* converge rate */))
);

const objects = [
    { num : 100 },
    { num : 102 },
    { num : 104 }
];

const aeProcess = new aep.AEProcess(aepDescriptor);

for (let i = 0; i < 5; i++) {
    aeProcess.process(1 /* time units passed */, objects);
}

/**
 * objects[0].num = 101
 * objects[1].num = 102
 * objects[2].num = 103
 */
```

See library tests in aep-lib/test/indexSpec.js for more examples.
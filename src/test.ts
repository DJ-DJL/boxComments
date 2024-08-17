import FS from 'fs';
import Path from 'path';
import boxComment from './boxComment.js';

const testsPath = Path.join(import.meta.dirname, '../tests');
for (const test of FS.readdirSync(testsPath)) {
    process.stdout.write(`Testing ${test}: `);
    try {
        const args = JSON.parse(FS.readFileSync(Path.join(testsPath, test, 'args.json'), 'utf8'));
        // @ts-expect-error - spread arguments are not allowed in TS?
        const actual = boxComment(...args).trim();
        const expected = getExpected(test).trim();
        if (actual === expected) {
            process.stdout.write(`\x1B[32m OK\x1B[0m\n`);
        } else {
            process.stdout.write(`\x1B[31m MISMATCH\x1B[0m\n`);
            process.stdout.write(`\x1B[33m Expected: \x1B[35m${typeof expected}\x1B[0m\n`);
            if (typeof expected === "string") {
                console.log(expected);
            } else {
                console.log(JSON.stringify(expected, null, 2));
            }
            console.log(`\x1B[33m Actual: \x1B[35m${typeof expected}\x1B[0m\n`);
            if (typeof actual === "string") {
                console.log(actual);
            } else {
                console.log(JSON.stringify(actual, null, 2));
            }
        }
    }
    catch (ex) {
        console.log('\x1B[31m ERROR\x1B[0m');
        console.log(ex);
    }

}
console.log("All tests completed");
function getExpected(test: string): any {
    if (FS.existsSync(Path.join(testsPath, test, 'expected.txt'))) {
        return FS.readFileSync(Path.join(testsPath, test, 'expected.txt'), 'utf8');
    } else {
        return JSON.parse(FS.readFileSync(Path.join(testsPath, test, 'expected.json'), 'utf8'));
    }
}


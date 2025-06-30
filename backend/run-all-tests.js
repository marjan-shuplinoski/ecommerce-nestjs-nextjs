#!/usr/bin/env node
const { execSync } = require('child_process');
const { readdirSync, statSync } = require('fs');
const { join } = require('path');

function findSpecFiles(dir) {
    let results = [];
    for (const file of readdirSync(dir)) {
        const full = join(dir, file);
        if (statSync(full).isDirectory()) {
            results = results.concat(findSpecFiles(full));
        } else if (file.endsWith('.spec.ts')) {
            results.push(full);
        }
    }
    return results;
}

const testFiles = findSpecFiles(join(__dirname, 'src'));
if (testFiles.length === 0) {
    console.error('No test files found.');
    process.exit(1);
}

let failed = false;
for (const file of testFiles) {
    try {
        console.log(`\n=== Running: ${file} ===`);
        execSync(`pnpm exec jest "${file}" --runInBand --coverage`, { stdio: 'inherit' });
    } catch (e) {
        failed = true;
    }
}
process.exit(failed ? 1 : 0);

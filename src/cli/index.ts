#! /usr/bin/env node

import { argv, stdin, stdout, exit } from 'process';
import { readFileSync, writeFileSync, existsSync } from 'fs';

import { JsonSchema } from '../dependencies/json-schema';
import { GuiModelMapper } from '../lib/gui-model.mapper';
import { GuiModel } from '../lib/gui-model';

/**
 * Name of bin executable specified in package.json:
 */
const npmCmd = 'mapToGuiModel';

/**
 * Description of to use the npm executable cli command:
 */
const usageString = 'Usage: ' + npmCmd + ' sourcePath destPath';

/**
 * Help that abouts with error output
 */
function failure(msg: string) {
    console.error(msg);
    exit(-1);
}

// Validate cmd arguments:
let userArgs = argv.slice(2);
if (userArgs.length !== 2) {
    failure(usageString);
}

let sourcePath = userArgs[0];
let destPath = userArgs[1];

// Read input:
let source: string = '';

if (!existsSync(sourcePath)) {
    failure('Error. Could not locate source file \"' + sourcePath + '\".');
}

try {
    source = readFileSync(sourcePath, {
        encoding: 'utf8',
        flag: 'r'
    });
} catch (e) {
    failure('Error reading file \"' + sourcePath + '\"');
}

// Convert input:
let sourceJson: any;
try {
    sourceJson = JSON.parse(source);
} catch (e) {
    failure('Error. File \"' + sourcePath + '\" is not a valid json file');
}

// Generate output: 
let mapper: GuiModelMapper = new GuiModelMapper();

let result;
try {
    let resultObj = mapper.mapToGuiModel(sourceJson as JsonSchema);
    result = JSON.stringify(resultObj, null, 2);
} catch (e) {
    failure('Error. Unexpected internal error while mapping \"' + sourcePath + '\".');
}

// Check if file exists already?:
if (existsSync(destPath)) {
    failure('Error. Output file \"' + destPath + '\" already exists.');
}

// Write output:
try {
    writeFileSync(destPath, result, {
        encoding: 'utf8',
        mode: 0o666,
        flag: 'wx' // Don't allow overwriting files for safety.
    });
} catch (e) {
    failure('Error. Could not write new file \"' + destPath + '\".');
}

// Success msg:
console.log('Successfully mapped json schema in \"' + sourcePath + '\" to gui model and stored result in \"' + destPath + '\"');
exit(0);


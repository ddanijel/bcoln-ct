const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');

const source = fs.readFileSync(lotteryPath, 'utf8');
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);

console.log('Output: ', output);

for(let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, `${contract.replace(':', '')}.json`),
        output[contract]
    );
}

// to compile: node ./src/ethereum/compile.js
const fs = require('fs');
const solc = require('solc');

// Read the Solidity source file
const source = fs.readFileSync('HBARPoolEscrow.sol', 'utf8');

// Compile the contract using solcjs
const output = JSON.parse(solc.compile(JSON.stringify({
  language: 'Solidity',
  sources: {
    'HBARPoolEscrow.sol': {
      content: source
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['abi', 'evm.bytecode', 'metadata']
      }
    }
  }
})));

// Extract the metadata
const metadata = output.contracts['HBARPoolEscrow.sol'].HBARPoolEscrow.metadata;

// Write the metadata to a file
fs.writeFileSync('build/HBARPoolEscrow-metadata.json', metadata);

console.log('Metadata file created!');

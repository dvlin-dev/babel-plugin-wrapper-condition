const {
  transformFromAstSync
} = require('@babel/core');
const parser = require('@babel/parser');
const plugin = require('../');
const fs = require('fs');
const path = require('path');

const sourceCode = fs.readFileSync(path.join(__dirname, './example.js'), {
  encoding: 'utf-8'
});

const ast = parser.parse(sourceCode, {
  sourceType: 'unambiguous'
});

const {
  code
} = transformFromAstSync(ast, sourceCode, {
  plugins: [
    [plugin, {
      nodeEnv: "NODE_ENV",
      deployState: "production"
    }]
  ]
});

console.log(code);
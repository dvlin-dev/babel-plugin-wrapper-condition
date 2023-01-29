#!/usr/bin/env node

const plugin = require('../');
require("@babel/register")({
  extensions: [".js"],
  plugins: [
    [
      plugin,
      {
        nodeEnv: "NODE_ENV",
        deployState: "production"
      }
    ]
  ],
  cache: false,
});
require('./example.js')();
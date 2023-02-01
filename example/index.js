#!/usr/bin/env node

const plugin = require('../');
require("@babel/register")({
  extensions: [".js"],
  plugins: [
    [
      plugin,
      {
        wrapperlog:true,
        nodeEnv: "NODE_ENV",
        deployState: "production",
        comment: true,
        commentField: 'wrapper'
      }
    ]
  ],
  cache: false,
});
require('./example.js')();
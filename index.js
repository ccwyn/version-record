"use strict";
const babel = require("@babel/core");
const path = require("path");
const fs = require("fs");
const babelPlugin = path.resolve(__dirname, "plugin.js");

const getJsonVersion = (filePath) => {
  const jsonContent = require(filePath);
  return jsonContent ? jsonContent.version : "";
};

const writeVersion = (filePath, version, env) => {
  const newContent = babel.transformFileSync(filePath, {
    plugins: [[babelPlugin, { version, env }]],
  }).code;
  return newContent;
};

class VersionRecord {
  constructor(options = {}) {
    this.config = options;
  }
  apply(compiler) {
    if (compiler) {
      const { jsonFile, jsFilePath, buildPath, env } = this.config;
      const version = getJsonVersion(jsonFile);
      const newContent = writeVersion(jsFilePath, version, env);

      compiler.hooks.environment.tap("VersionRecord", (state) => {
        fs.writeFileSync(jsFilePath, newContent, "utf8");
      });
      if (buildPath) {
        compiler.hooks.done.tap("outputDist", (state) => {
          fs.writeFileSync(buildPath, newContent, "utf8");
        });
      }
    }
  }
}

module.exports = VersionRecord;
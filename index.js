"use strict";
const babel = require("@babel/core");
const path = require("path");
const fs = require("fs");
const babelPlugin = path.resolve(__dirname, "plugin.js")

const getJsonVersion = (filePath) => {
  const jsonContent = require(filePath);
  return jsonContent ? jsonContent.version : "";
};

const writeVersion = (filePath, version) => {
  const newContent = babel.transformFileSync(filePath, {
    plugins: [[babelPlugin, { version }]],
  }).code;
  return newContent;
};

class VersionRecord {
  constructor(options = {}) {
    this.config = options;
  }
  apply(compiler) {
    if (compiler) {
      compiler.hooks.entryOption.tap("VersionRecord", (state) => {
        const { jsonFile, jsFilePath } = this.config;
        const version = getJsonVersion(jsonFile);
        const newContent = writeVersion(jsFilePath, version);
        fs.writeFileSync(jsFilePath, newContent, "utf8");
      });
    }
  }
}

module.exports = VersionRecord;


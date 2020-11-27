version-record
====================

> 生成版本号记录

## 前提

需要 Node 版本在 v8.0 以上
需要 webpack 版本在 v5.0 以上

## 安装

```sh
npm i -D version-record
```

## 使用方法

支持的配置项:
      
- `jsonFile` package.json文件路径
  - jsonFile: path.resolve(__dirname, "package.json"),

- `jsFilePath` 输出版本号文件
  - jsFilePath: path.resolve(process.cwd(), './src/versionRecord.js')
   

## Example
#### 作为webpack插件使用
```
const VersionRecord = require('version-record')
  const versionRecord = new VersionRecord({
    jsonFile: path.resolve(process.cwd(), 'package.json'),
    jsFilePath: path.resolve(process.cwd(), './src/versionRecord.js')
  })


// Webpack 的配置
module.exports = {
 plugins: [
   versionRecord
 ]
}
```

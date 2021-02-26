module.exports = function (babel, options) {
  const { types: t } = babel;
  const { version, env } = options;
  return {
    name: "push elements in array",
    visitor: {
      VariableDeclarator(path) {
        const node = path.node;
        if (node.id.name == "service_config") {
          // 获取环境索引
          let envIndex = node.init.properties.findIndex(item=>item.key.name===env)
          // 获取版本号变量索引
          let versionRecordIndex = node.init.properties[envIndex].value.properties.findIndex(item=>item.key.name==='versionRecord')
          if(env==='development'){
            node.init.properties[envIndex].value.properties[versionRecordIndex].value.elements=[t.identifier(`"${version}"`)];
          }else{
            node.init.properties[envIndex].value.properties[versionRecordIndex].value.elements.unshift(t.identifier(`"${version}"`));
          }
          // node.init.elements = [ t.identifier(`"${version}"`),...node.init.elements];
        }
      },
    },
  };
};
module.exports = function (babel, options) {
  const { types: t } = babel;
  const { version } = options;
  return {
    name: "push elements in array",
    visitor: {
      VariableDeclarator(path) {
        const node = path.node;
        if (node.id.name == "versions") {
          node.init.elements = [ t.identifier(`"${version}"`),...node.init.elements];
        }
      },
    },
  };
};

module.exports = ({
  template
}, {
  nodeEnv,
  deployState
}) => {

  const wrapperIfTemplate = template(
    `
    if (process.env.${nodeEnv} !== "${deployState}") {
      NODE;
    }
  `, {
      placeholderPattern: /^NODE$/
    }
  );

  return {
    visitor: {
      CallExpression(path) {
        if (path.node.callee.property && path.node.callee.property.name === "log") {
          path.replaceWith(
            wrapperIfTemplate({
              NODE: path.node
            })
          );
          path.skip();
        }
      }
    }
  };
}
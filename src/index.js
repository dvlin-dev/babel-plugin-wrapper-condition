module.exports = ({
  template
}, {
  wrapperlog = true,
  nodeEnv = 'NODE_ENV',
  deployState = 'production',
  comment = false,
  commentField = 'wrapper'
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
        if (wrapperlog && path.node.callee.property && path.node.callee.property.name === "log") {
          path.replaceWith(
            wrapperIfTemplate({
              NODE: path.node
            })
          );
          path.skip();
        }
      },
      ExpressionStatement(path){
        if(!comment) return;
        const isComment = path.node.leadingComments ? path.node.leadingComments.some(item=>item.value.includes(commentField)) :false
        if(isComment) {
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
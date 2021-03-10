"use strict";

var _types = require("@babel/types");

module.exports = function () {
  let iterator = 0;

  const getUniqueId = () => (iterator++).toString();

  const defaultFilter = ({
    filename
  }) => filename.indexOf('constants') !== -1;

  const dictionary = {};
  return {
    name: 'babel-plugin-minify-redux-constants',
    visitor: {
      VariableDeclarator(path, state) {
        if ((0, _types.isIdentifier)(path.node.id) && (0, _types.isStringLiteral)(path.node.init)) {
          const filter = state.opts.filter || defaultFilter;

          if (filter({
            filename: state.filename,
            name: path.node.id.name,
            value: path.node.init.value
          })) {
            const id = getUniqueId();
            dictionary[id] = path.node.init.value;
            path.node.init = (0, _types.stringLiteral)(id);
          }
        }
      }

    },
    post: state => {
      const plugin = state.opts.plugins.find(plugin => plugin.key === 'babel-plugin-minify-redux-constants');

      if (plugin && plugin.options && plugin.options.saveDictionary) {
        plugin.options.saveDictionary(dictionary);
      }
    }
  };
};

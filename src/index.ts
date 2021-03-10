import { PluginObj, PluginPass } from '@babel/core'
import { NodePath } from '@babel/traverse'
import { isIdentifier, isStringLiteral, stringLiteral, VariableDeclarator } from '@babel/types'


export type Filter = (data: { filename?: string, name: string, value: string }) => boolean

export type SaveDictionary = (dictionary) => void

export type Opts = { filter?: Filter, saveDictionary?: SaveDictionary }

type PluginOptions = PluginPass & { opts?: Opts }

type Plugin = { key?: string, options: Opts }

module.exports = function (): PluginObj<PluginOptions> {
  let iterator = 0
  const getUniqueId = () => (iterator++).toString()

  const defaultFilter: Filter = ({ filename }) => filename.indexOf('constants') !== -1

  const dictionary: { [id: string]: string } = {}

  return {
    name: 'babel-plugin-minify-redux-constants',
    visitor: {
      VariableDeclarator(path: NodePath<VariableDeclarator>, state) {
        if (isIdentifier(path.node.id) && isStringLiteral(path.node.init)) {
          const filter = state.opts.filter || defaultFilter
          if (filter({ filename: state.filename, name: path.node.id.name, value: path.node.init.value })) {
            const id = getUniqueId()
            dictionary[id] = path.node.init.value
            path.node.init = stringLiteral(id)
          }
        }
      },
    },
    post: (state) => {
      const plugin = state.opts.plugins.find((plugin: Plugin) => plugin.key === 'babel-plugin-minify-redux-constants') as Plugin
      if (plugin && plugin.options && plugin.options.saveDictionary) {
        plugin.options.saveDictionary(dictionary)
      }
    },
  }
}

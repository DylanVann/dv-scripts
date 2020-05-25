import babelJest from 'babel-jest'
import config from './babel'

module.exports = babelJest.createTransformer(config)

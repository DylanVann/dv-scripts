import babelJest from 'babel-jest'
import config = require('./babel')

module.exports = babelJest.createTransformer(config)
export {}

import babelJest from 'babel-jest'
import config = require('./babel')

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
module.exports = babelJest.createTransformer!(config)
export {}

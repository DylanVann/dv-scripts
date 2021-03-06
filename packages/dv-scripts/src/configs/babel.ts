const useESModules = process.env.NODE_ENV !== 'test'

const config = {
  presets: [
    [
      require.resolve('@babel/preset-env'),
      {
        targets: { node: 'v12.16.3' },
        modules: useESModules ? false : 'commonjs',
      },
    ],
    require.resolve('@babel/preset-react'),
    require.resolve('@babel/preset-typescript'),
  ],
  plugins: [
    require.resolve('babel-plugin-emotion'),
    [
      require.resolve('@babel/plugin-transform-runtime'),
      { useESModules: false },
    ],
    [
      require.resolve('@babel/plugin-proposal-class-properties'),
      { loose: true },
    ],
  ],
}

module.exports = config
export {}

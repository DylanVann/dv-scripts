const useESModules = process.env.NODE_ENV !== 'test'

export default {
  presets: [
    [
      require.resolve('@babel/preset-env'),
      {
        targets: { node: 'current' },
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

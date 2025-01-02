module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@src': './src',
          '@assets': './src/assets',
          '@contexts': './src/contexts',
          '@types': './src/types',
          '@utils': './src/utils',
          '@database': './src/DatabaseServices',
          '@hooks': './src/hooks',
          '@hocs': './src/hocs',
          '@styles': './src/styles',
          '@navigation': './src/navigation',
          '@constant': './src/constant',
          '@modules': './src/modules',
          '@common': './src/common',
        },
      },
    ],
  ],
};

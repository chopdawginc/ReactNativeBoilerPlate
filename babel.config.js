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
          '@contexts': './src/contexts/',
          '@types': './src/types/',
          '@services': './src/services/',
          '@styles': './src/styles/',
          '@navigation': './src/navigation/',
          '@constant': './src/constant/',
          '@features': './src/features/',
          '@shared': './src/shared/',
          '@languages': './src/languages/',
        },
      },
    ],
  ],
};

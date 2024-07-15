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
          '@helpers': './src/helpers',
          '@hooks': './src/hooks',
          '@navigation': './src/navigation',
          '@enums': './src/enums',
          '@enums/StyleGuide': './src/enums/StyleGuide.ts',
          '@modules': './src/modules',
          '@common': './src/common',
        }
      }
    ]
  ]
};
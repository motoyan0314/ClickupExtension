const CleanPlugin = require('clean-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

const DEVELOPMENT = 'development';

module.exports = (env, argv) => {
  const mode = argv.mode || DEVELOPMENT;
  const isDev = mode === DEVELOPMENT;
  return {
    mode,
    devtool: isDev ? 'source-map' : false,
    entry: {
      'background.js': './src/background.ts',
      'contentScripts.js': './src/contentScripts.ts',
    },
    target: 'node',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name]',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      plugins: [
        new TsconfigPathsPlugin(),
      ],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },

    plugins: [
      new CleanPlugin(),
      new CopyPlugin([
        { from: './src/manifest.json', to: './manifest.json' },
        { from: './src/icons', to: './icons' },
      ]),
    ].filter(Boolean),
  };
};

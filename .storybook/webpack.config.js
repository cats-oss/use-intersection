const path = require('path');
const ForkTsCherkWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { compilerOptions } = require('../tsconfig.json');

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        include: [path.join(__dirname, '../src')],
        options: {
          transpileOnly: true,
          compilerOptions,
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    enforceExtension: false,
  },
  plugins: [new ForkTsCherkWebpackPlugin()],
};

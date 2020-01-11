import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as path from 'path';
import * as webpack from 'webpack';
import * as merge from 'webpack-merge';
import base from './config/webpack.dev.base';
import { getCommandParams } from './util/helpers';
// 命令行参数
const CLI_Params = getCommandParams();

const dev: webpack.Configuration = {
  entry: [
    'webpack-hot-middleware/client',
    path.resolve(__dirname, '../src/index.tsx')
  ],
  output: {
    path: path.resolve(__dirname, './dist/static/'),
    publicPath: '/',
    filename: '[name].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.SITE_ID': JSON.stringify(CLI_Params.SITE_ID)
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/tpl/index.server.html'),
      inject: true
    })
  ],
  externals: {
    // react: 'React',
    // 'react-dom': 'ReactDOM',
    // redux: 'Redux',
    // 'react-redux': 'ReactRedux',
    // 'react-router-dom': 'ReactRouterDOM',
    history: 'History',
    immutable: 'Immutable',
    lodash: '_',
    '@/utils/provinceData': 'provinceData'
  }
};

module.exports = merge(base, dev);

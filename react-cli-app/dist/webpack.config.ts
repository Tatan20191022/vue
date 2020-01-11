import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import * as path from 'path';
import * as webpack from 'webpack';

const publicPath = '/static/';

const webpackConfig = {
  mode: 'development',

  entry: {
    index: '../src/index.tsx'
    // vendor: ['angular'],
    // others: ['react', 'react-dom', 'redux', 'react-redux', 'react-router', 'immutable']
  },

  output: {
    path: path.resolve(__dirname, './resource/static/'),
    publicPath,
    filename: '[name].[hash].js'
  },
  optimization: {
    // runtimeChunk: {
    //   name: 'manifest'
    // },
    splitChunks: {}
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g$|gif$|png$)/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
              // mimetype: 'application/font-woff'
            }
          }
        ]
      },
      // {
      //   test: /\.(ttf|eot|svg|mp4|jpe?g$|.gif$|.png$)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      //   use: [
      //     {
      //       loader: 'file-loader'
      //     }
      //   ]
      // },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            // loader:'awesome-typescript-loader',
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      },
      {
        // test: /\.\.\/src\\routes(\\.*).(tsx|ts)/,
        // 针对含有.bundle命名的文件夹进行懒加载
        test: /\.bundle\.tsx?$/,
        use: [
          {
            loader: 'bundle-loader',
            options: {
              lazy: true,
              name: 'app-[name]'
            }
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      },
      // {
      //     test: /\.ts$/,
      //     use: ['awesome-typescript-loader'],
      // },
      {
        test: /\.(ttf|eot|svg|mp4|woff|mp3)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]-[hash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                'babel-preset-react',
                'babel-preset-es2015',
                'babel-preset-stage-0'
              ],
              cacheDirectory: true,
              plugins: ['transform-async-to-generator', 'transform-runtime']
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(false),
    new webpack.optimize.ModuleConcatenationPlugin()
  ],

  resolve: {
    alias: {
      '@': path.join(__dirname, '../src')
    },

    extensions: [
      '.scss',
      '.less',
      '.ts',
      '.tsx',
      '.json',
      '.webpack.js',
      '.web.js',
      '.ts',
      '.tsx',
      '.jsx',
      '.js',
      '.css'
    ]
  },

  devtool: '',

  externals: {}
};

export default webpackConfig;

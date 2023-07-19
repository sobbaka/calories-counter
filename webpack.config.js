const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
// const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');



const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const devtool = devMode ? 'source-map' : undefined;
const watch = devMode ? true : false;

const ProgressPlugin = require('progress-webpack-plugin')


module.exports = {
  mode,
  devtool,
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'prod'),
    },
    compress: true,
    port: 9000,
  },
  watch,
  watchOptions: {
    aggregateTimeout: 200,
    poll: 1000,
    ignored: '**/node_modules',
  },
  cache: {
    type: 'filesystem', // По умолчанию 'memory'
    // Устанавливаем диреторию для кэша
    cacheDirectory: path.resolve(__dirname, 'src', '.temporary_cache')
  },
  entry: {
    main: path.resolve(__dirname, 'src', 'index.js'),
    // analytics: path.resolve(__dirname, 'src', 'analytics.js'),
  },
  output: {
    filename: '[name].[contenthash].boundle.js',
    path: path.resolve(__dirname, 'prod'),
    clean: true,
    assetModuleFilename: 'assets/[name][ext]',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      inject: 'body',
      scriptLoading: 'module',
      title: 'Webpack Title test',
      templateParameters: {
        title: 'Webpack Title test'
      }
    }),
    // new HtmlWebpackPartialsPlugin([
    //   {
    //     path: path.join(__dirname, './comment.html'),
    //     priority: 'replace',
    //     location: 'block',
    //     template_filename: ['index.html']
    //   }
    // ]),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new ProgressPlugin(true),
    // new CopyPlugin({
    //     patterns: [
    //         {
    //             from: path.resolve(__dirname, 'src', 'images'),
    //             to: path.resolve(__dirname, 'prod', 'images')
    //         },
    //     ]
    // }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('postcss-preset-env')],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|webp|gif|svg)$/i,
        type: 'asset',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
    ],
  },

  // optimization: {
  //     minimizer: [
  //         new ImageMinimizerPlugin({
  //             minimizer: {
  //                 implementation: ImageMinimizerPlugin.squooshMinify,
  //                 options: {
  //                     encodeOptions: {
  //                         mozjpeg: {
  //                             // That setting might be close to lossless, but it’s not guaranteed
  //                             // https://github.com/GoogleChromeLabs/squoosh/issues/85
  //                             quality: 100,
  //                         },
  //                         webp: {
  //                             lossless: 1,
  //                         },
  //                         avif: {
  //                             https://github.com/GoogleChromeLabs/squoosh/blob/dev/codecs/avif/enc/README.md
  //                             cqLevel: 0,
  //                         },
  //                         jpeg: {
  //                             quality: 50,
  //                         }
  //                     },
  //                 },
  //             },
  //         }),
  //     ],
  // },

}

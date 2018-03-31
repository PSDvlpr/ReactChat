const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');
const env = process.env.NODE_ENV || 'development';
const plugins = [
  new HtmlWebpackPlugin({
        template: 'src/index.html',
        filename: 'index.html',
        inject: 'body',
    })
];

console.log('NODE_ENV:', env);

if (env === 'production') {
plugins.push(
    new webpack.optimize.UglifyJsPlugin(),
    new OptimizeJsPlugin({
      sourceMap: false
    })
  );
}

module.exports = {
    entry: (env !== 'production' ? [
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server',
        ] : []).concat(['./client/index.js']),
    output: {
      filename: './bundle.js',
      path: path.resolve(__dirname, 'public'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader"
        },
        {
          test: /\.css$/,
          use: [
            { loader: 'style-loader'},
            {
                loader: 'css-loader',
                options: {
                  modules: true
                }
            }
          ]
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: "file-loader",
              options: {}
            }
          ]
        }
      ]
    },
  plugins: plugins
};

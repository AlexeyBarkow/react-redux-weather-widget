const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: {
        main: path.join(__dirname, 'app/index.js'),
        vendor: ['react', 'redux', 'lodash'],
        polyfills: ['babel-polyfill'],
    },
    output: {
        path: path.join(__dirname, 'dist/'),
        filename: '[name].min.js',
        publicPath: './',
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'app/index.html'),
            inject: 'body',
            filename: 'index.html',
        }),
        new ExtractTextPlugin('[name]-[hash].min.css'),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
                screw_ie8: true,
            },
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'polyfills'],
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
            },
        }),
    ],
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
        }, {
            test: /\.json$/,
            loader: 'json',
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style', ['css-loader', 'sass-loader', 'sass-resources', 'postcss-loader']),
        }, {
            test: /\.css$/,
            loader: 'css-loader',
        }],
        postcss: [
            autoprefixer,
        ],
    },
    sassResources: './app/styles/mixins.scss',
};

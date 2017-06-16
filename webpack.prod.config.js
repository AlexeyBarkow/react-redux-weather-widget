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
        publicPath: '/',
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'app/index.html'),
            inject: 'body',
            filename: 'index.html',
        }),
        new ExtractTextPlugin('[name]-[hash].min.css'),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
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
            loader: 'babel-loader',
        }, {
            test: /\.json$/,
            loader: 'json-loader',
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract(
                {
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'sass-loader',
                        {
                            loader: 'sass-resources-loader?sourceMap',
                            options: {
                                resources: [
                                    './app/styles/mixins.scss',
                                    './node_modules/bootstrap-sass/assets/stylesheets/bootstrap/mixins/*.scss',
                                ],
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [autoprefixer],
                            },
                        },
                    ],
                }
            ),
        }, {
            test: /\.css$/,
            loader: 'css-loader',
        }],
    },
};

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:3001',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        path.join(__dirname, 'app/index.js'),
    ],
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: '[name].js',
        publicPath: '/',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'app/index.html',
            inject: 'body',
            filename: 'index.html',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development'),
            },
        }),
    ],
    module: {
        loaders: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            }, {
                test: /\.json?$/,
                loader: 'json-loader',
            }, {
                test: /\.s?css$/,
                loaders: [
                    'style-loader',
                    'css-loader?sourceMap',
                    'sass-loader?sourceMap',
                    {
                        loader: 'sass-resources-loader?sourceMap',
                        options: {
                            resources: [
                                './app/styles/mixins.scss',
                                './node_modules/bootstrap-sass/assets/stylesheets/bootstrap/mixins/*.scss',
                            ],
                        },
                    },
                    'postcss-loader',
                ],
            },
        ],
    },
};

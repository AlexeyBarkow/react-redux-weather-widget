const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/dev-server',
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
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'eslint-loader',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            }, {
                test: /\.s?css$/,
                use: [
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

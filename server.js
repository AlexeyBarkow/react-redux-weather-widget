require('babel-register');
require('babel-polyfill');
const Koa = require('koa');
const convert = require('koa-convert');
const send = require('koa-send');
const path = require('path');
const webpack = require('webpack');
const bodyparser = require('koa-bodyparser');
const webpackConfig = require('./webpack.config.js');
// const webpackDevMiddleware = require('koa-webpack-dev-middleware');
// const webpackHotMiddleware = require('koa-webpack-hot-middleware');

const PORT = 3001;
const app = new Koa();

const dist = path.join(__dirname, '.', 'dist');

const compiler = webpack(webpackConfig);

app.use(convert(bodyparser()));

// app.use(convert(webpackDevMiddleware(compiler, {
//     hot: true,
//     publicPath: '/',
//     filename: '[name].js',
// })));
//
// app.use(convert(webpackHotMiddleware(compiler, {
//     path: 'http://localhost:3000',
//     publicPath: '/',
// })));

app.use(async (ctx) => {
    console.log(ctx.path);
    await send(ctx, 'index.html', { root: dist });
});

app.listen(PORT);

console.log(`started at port ${PORT}`);

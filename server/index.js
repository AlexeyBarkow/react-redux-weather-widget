const Koa = require('koa');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
const devServerConfig = require('../config/webpack-dev-server.config.js');
const { devMiddleware, hotMiddleware } = require('koa-webpack-middleware');

const compile = webpack(webpackConfig);

const app = new Koa();

app.use(devMiddleware(compile, devServerConfig));
app.use(hotMiddleware(compile, {
    heartbeat: 1000,
}));

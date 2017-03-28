const Koa = require('koa');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
const devServerConfig = require('../config/webpack-dev-server.config.js');
const webpackMiddleware = require('koa-webpack-dev-middleware');

const app = new Koa();

app.use(webpackMiddleware(webpack(webpackConfig), { contentBase: 'http://localhost:3001/' }));

app.use((ctx, next) => {
    console.log(this.url, ctx);
    next();
});


app.listen(3001);

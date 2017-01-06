var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');
var wdsConfig = require('./webpack-dev-server.config.js');

var server = new WebpackDevServer(webpack(config), wdsConfig).listen(3000, 'localhost', function (error) {
    if (error) {
        console.log(err);
    }
    console.log('listening at localhost:3000')
})

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.config.js');
const wdsConfig = require('./webpack-dev-server.config.js');

const PORT = 3000;

config.entry.unshift('webpack-dev-server/client?http://localhost:3000');

const server = new WebpackDevServer(webpack(config), wdsConfig).listen(PORT, 'localhost', (error) => {
    if (error) {
        console.log(err);
    }

    console.log(`Server is listening at localhost: ${PORT}`);
});

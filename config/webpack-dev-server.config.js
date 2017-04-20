const config = require('../webpack.config.js');

module.exports = {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    index: 'index.html',
    quiet: false,
    noInfo: false,
    stats: {
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false
    },
    watchOptions: {
        aggregateTimeout: 300
    }
};

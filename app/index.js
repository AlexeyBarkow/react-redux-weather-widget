if (process.env.NODE_ENV === 'production') {
    require('./index.prod.js');
} else {
    require('./index.dev.js');
}

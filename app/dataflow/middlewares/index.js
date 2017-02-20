const enhancer = (process.env.NODE_ENV === 'production')
    ? require('./middleware.prod.js').default
    : require('./middleware.dev.js').default;

export default enhancer;

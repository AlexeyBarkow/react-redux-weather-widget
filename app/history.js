const browserHistory = (process.env.NODE_ENV === 'production')
    ? require('./history.prod.js').default
    : require('./history.dev.js').default;

export default browserHistory;

const DEFAULT_HEADERS = {
    'Content-Type': 'application/json'
};

const fetchSimplified = {
    get: function (url, body, headers = HEADERS) {
        const params = {
            headers
        };
        if (body) {
            params.body = JSON.stringify(body);
        }
        return fetch(url, params);
    }
}

export default fetchSimplified;

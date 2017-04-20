const http = require('http');
const urlBuilder = require('url');
const { GET, POST } = require('../constants');

function request(url, { method = GET, headers: requestHeaders = {} }, data = null) {
    return new Promise((resolve, reject) => {
        const { hostname, port, path } = urlBuilder.parse(url);
        const raw = JSON.stringify(data);
        const options = {
            method,
            hostname,
            port,
            path,
        };

        if (method === POST) {
            options.headers = Object.assign({
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(raw),
            }, requestHeaders);
        }

        const httpRequest = http.request(options, (response) => {
            const { statusCode: status, headers } = response;
            let body = '';

            response.setEncoding('utf8');
            response.on('data', (chunk) => {
                body += chunk;
            });

            response.on('end', () => {
                resolve({ status, body, headers });
            });
        });

        httpRequest.on('error', (err) => {
            reject(err);
        });

        if (method === POST) {
            httpRequest.write(raw);
        }
        httpRequest.end();
    });
}

module.exports = {
    get(url) {
        return request(url, { method: GET });
    },
    post(url, data) {
        return request(url, { method: POST }, data);
    },
};

import http from 'http';
import urlBuilder from 'url';
import query from 'querystring';

export function get(url, qs) {
    return new Promise((resolve, reject) => {
        const { hostname, port, path } = urlBuilder.parse(url);

        const options = {
            method: 'GET',
            hostname,
            port,
            path: `${path}?${query.stringify(qs)}`,
        };

        const request = http.request(options, (response) => {
            const { statusCode: status, headers } = response;
            let body = '';
            response.on('data', (chunk) => {
                body += chunk;
            });
            response.on('end', () => {
                resolve({ body, status, headers });
            });
        });

        request.on('error', (error) => {
            reject(error);
        });

        request.end();
    });
}

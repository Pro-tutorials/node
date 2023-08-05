import http from 'http';
import fs from 'fs';

// create a server
const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write(
            `<html>
                <head></head>
                <body>
                    <form action="/message" method="POST">
                        <input name='message' type="text">
                        <button type="submit">Send</button>
                    </form>
                </body>
            </html>`
        );
        res.end();
        return;
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, (err) => {
                if (err) {
                    console.log(err.message);
                }
            });
            res.statusCode = 302;
            res.setHeader('Location', '/');
            res.end();
        });

        return;
    }
});

server.listen(3000);

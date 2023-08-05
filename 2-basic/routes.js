import fs from 'fs';

const requestHandler = (req, res) => {
    // get the url and method from the req
    const url = req.url;
    const method = req.method;
    // if the url is the root route
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
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        // add event data to req
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        // add event end to req
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            // the parsedBody will be like that message=hello
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, (err) => {
                if (err) {
                    console.error(err.message);
                }
            });
            // redirect to
            res.statusCode = 302;
            res.setHeader('Location', '/');
            res.end();
        });
    }
};

export default requestHandler;

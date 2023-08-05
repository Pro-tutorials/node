import http from 'http';
import requestHandler from './routes.js';

// create a server
const server = http.createServer(requestHandler);

server.listen(3000);

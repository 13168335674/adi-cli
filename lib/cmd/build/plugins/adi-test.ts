import http from 'http';
import express from 'express';
import path from 'path';

const __dirname = path.resolve();
console.log(`ADI-LOG => __dirname`, __dirname);
const resolveStatic = path.resolve(__dirname, '/');
console.log(`ADI-LOG => resolveStatic`, resolveStatic);

const app = express();

app.use(express.static(__dirname));
console.log(`ADI-LOG => app`, __dirname);

const server = http.createServer(app);
server.listen('5000');

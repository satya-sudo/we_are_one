import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {networkInterfaces} from 'node:os';
import {performance} from 'node:perf_hooks';

const page = await readFile(new URL('./index.html', import.meta.url));
const port = Number(process.env.PORT || 8080);
const now = () => performance.now();
let session = null;

createServer((req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  const path = req.url;
  if (req.method === 'GET' && path === '/') {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.end(page);
  }
  if (req.method === 'POST' && path === '/start') {
    if (!session || now() >= session.start + session.count * 500) {
      session = {start: now() + 2500, count: 32};
    }
  } else if (req.method !== 'GET' || path !== '/state') {
    res.writeHead(404);
    return res.end();
  }
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({now: now(), session}));
}).listen(port, '0.0.0.0', () => {
  console.log('Open the same Wi-Fi address on both phones:');
  for (const address of Object.values(networkInterfaces()).flat()) {
    if (address.family === 'IPv4' && !address.internal) {
      console.log('http://' + address.address + ':' + port);
    }
  }
});

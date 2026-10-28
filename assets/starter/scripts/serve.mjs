import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createReadStream } from 'node:fs';
import { realpath, stat } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const args = process.argv.slice(2);
let port = 4173;

for (let index = 0; index < args.length; index += 1) {
  const argument = args[index];
  const value = argument === '--port' ? args[++index] : argument.startsWith('--port=') ? argument.slice(7) : null;
  if (value === null || !/^\d+$/.test(value ?? '') || Number(value) < 1 || Number(value) > 65535) {
    console.error('Usage: node scripts/serve.mjs [--port 4173]');
    process.exit(1);
  }
  port = Number(value);
}

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8'
};

function contained(base, target) {
  const relative = path.relative(base, target);
  return relative === '' || (relative !== '..' && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative));
}

function reply(request, response, code, message) {
  response.writeHead(code, { 'Content-Type': 'text/plain; charset=utf-8' });
  response.end(request.method === 'HEAD' ? undefined : message);
}

const resolvedRoot = await realpath(root);
const server = http.createServer(async (request, response) => {
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('Cache-Control', 'no-cache');

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.setHeader('Allow', 'GET, HEAD');
    reply(request, response, 405, 'Method not allowed');
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent((request.url ?? '/').split(/[?#]/, 1)[0]);
  } catch {
    reply(request, response, 400, 'Invalid URL');
    return;
  }

  if (!pathname.startsWith('/') || pathname.includes('\\') || pathname.includes('\0') || pathname.split('/').includes('..') || pathname.includes(':')) {
    reply(request, response, 403, 'Forbidden path');
    return;
  }

  let target = path.resolve(root, `.${pathname}`);
  if (!contained(root, target)) {
    reply(request, response, 403, 'Forbidden path');
    return;
  }

  try {
    let info = await stat(target);
    if (info.isDirectory()) {
      target = path.join(target, 'index.html');
      info = await stat(target);
    }
    if (!info.isFile() || !contained(resolvedRoot, await realpath(target))) {
      reply(request, response, 403, 'Forbidden path');
      return;
    }
    response.writeHead(200, {
      'Content-Type': mimeTypes[path.extname(target).toLowerCase()] ?? 'application/octet-stream',
      'Content-Length': info.size
    });
    if (request.method === 'HEAD') {
      response.end();
      return;
    }
    await pipeline(createReadStream(target), response);
  } catch (error) {
    if (response.headersSent) {
      response.destroy();
      return;
    }
    const missing = error.code === 'ENOENT' || error.code === 'ENOTDIR';
    reply(request, response, missing ? 404 : 500, missing ? 'Not found' : 'Server error');
    if (!missing) console.error(error.message);
  }
});

server.on('error', error => {
  console.error(error.code === 'EADDRINUSE'
    ? `Port ${port} is busy. Try: npm run dev -- --port ${port + 1}`
    : error.message);
  process.exitCode = 1;
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Goodthings preview: http://127.0.0.1:${port}`);
  console.log('Press Ctrl+C to stop.');
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    server.close(() => process.exit(0));
    server.closeAllConnections();
  });
}

import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {fileURLToPath} from 'node:url';

async function check(mode, count) {
  const child = spawn(process.execPath, [fileURLToPath(new URL('../server.mjs', import.meta.url))], {
    env: {...process.env, PORT: '0'},
    stdio: ['ignore', 'pipe', 'inherit'],
  });
  const exited = once(child, 'exit');
  try {
    let output = '';
    let port;
    for await (const chunk of child.stdout) {
      output += chunk;
      const match = output.match(/http:\/\/[^:]+:(\d+)/);
      if (match) {
        port = match[1];
        break;
      }
    }
    assert(port, 'Server did not announce its port');
    const base = 'http://127.0.0.1:' + port;
    const request = (route, method) => fetch(base + route, {method, signal: AbortSignal.timeout(2000)});
    const read = async (route, method) => (await request(route, method)).json();
    assert.match(await (await request('/')).text(), /2-minute drift check/);
    const initial = await read('/state');
    assert.equal(initial.session, null);
    const [a, b] = await Promise.all([read('/start' + mode, 'POST'), read('/start' + mode, 'POST')]);
    assert.equal(a.session.count, count);
    assert.deepEqual(a.session, b.session);
    assert(a.session.start > a.now);
    const peer = await read('/state');
    assert.equal(peer.clockId, initial.clockId);
    assert.deepEqual(peer.session, a.session);
    assert.equal((await request('/missing')).status, 404);
    return peer.clockId;
  } finally {
    child.kill();
    await exited;
  }
}

assert.notEqual(await check('', 32), await check('?mode=drift', 240));
console.log('HTTP smoke test passed for quick and drift sessions, concurrent starts, clock identity, and missing routes.');

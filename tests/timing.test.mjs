import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {runInNewContext} from 'node:vm';

const page = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const script = page.match(/<script>([\s\S]*?)<\/script>/)[1];

function client({clockOffset, outputDelay, timestamp = true}) {
  let serverTime = 1000;
  let state = {clockId: 'a', session: {start: 1200, count: 4}};
  const starts = [];
  const elements = new Map(['enable', 'start', 'status', 'mode', 'diagnostics', 'trim', 'value']
    .map(name => ['#' + name, {value: '0'}]));
  let poll;
  class AudioContext {
    state = 'running';
    resume() {}
    get currentTime() { return serverTime / 1000; }
    getOutputTimestamp() {
      return timestamp ? {
        performanceTime: serverTime + clockOffset,
        contextTime: this.currentTime - outputDelay / 1000,
      } : {performanceTime: 0, contextTime: 0};
    }
    createOscillator() {
      return {
        frequency: {},
        connect: node => node,
        start: at => starts.push(at),
        stop() {},
      };
    }
    createGain() {
      return {gain: {setValueAtTime() {}, exponentialRampToValueAtTime() {}}, connect() {}};
    }
  }
  runInNewContext(script, {
    document: {querySelector: name => elements.get(name)},
    performance: {now: () => serverTime + clockOffset},
    fetch: async () => ({ok: true, json: async () => ({...state, now: serverTime})}),
    AudioContext,
    AbortController,
    setTimeout,
    clearTimeout,
    setInterval: fn => { poll = fn; return 1; },
  });
  return {
    starts,
    diagnostics: elements.get('#diagnostics'),
    enable: () => elements.get('#enable').onclick(),
    advance: (time, nextState = state) => { serverTime = time; state = nextState; return poll(); },
  };
}

const iphone = client({clockOffset: 710, outputDelay: 42});
const android = client({clockOffset: -600, outputDelay: 16});
const fallback = client({clockOffset: 300, outputDelay: 0, timestamp: false});
await Promise.all([iphone.enable(), android.enable(), fallback.enable()]);
assert(Math.abs(iphone.starts[1] + 0.042 - 1.2) < 1e-9);
assert(Math.abs(android.starts[1] + 0.016 - 1.2) < 1e-9);
assert(Math.abs(fallback.starts[1] - 1.2) < 1e-9);
await iphone.advance(1005);
assert.equal(iphone.starts.length, 2, 'Repeat poll should not duplicate a scheduled beat');
await iphone.advance(1750);
assert.match(iphone.diagnostics.textContent, /Late beats skipped: 1/);
await iphone.advance(1000, {clockId: 'b', session: {start: 1200, count: 4}});
assert.match(iphone.diagnostics.textContent, /Late beats skipped: 0/);
assert.equal(iphone.starts.length, 3, 'A restarted clock should schedule a new session');
console.log('Simulated client timing, output compensation, fallback, duplicate protection, late beat, and restart checks passed.');

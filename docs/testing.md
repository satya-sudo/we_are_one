# Test Plan and Results

## Two-phone playback

1. Place the iPhone and Android side by side. Connect both phones and the Mac to the same Wi-Fi.
2. In the prototype folder, run `node server.mjs`. Open the printed Wi-Fi address in iPhone Safari and Android Chrome.
3. Raise media volume, tap **Enable speaker** on both phones, and keep both screens open. Confirm that each plays a short click when enabled.
4. Select **16-second check** on the phone that starts the session. Leave both playback delays at 0 ms. Tap **Start sync test** on either phone. Listen for a single click or a double click at the start and end.
5. If you can identify the earlier phone, increase its **Playback delay** in small steps. Restart the test and repeat at the same setting. Record both delays and whether the clicks stay together.

After the short check passes, run **2-minute drift check** with the same delays. Compare the clicks in the first and last ten seconds. Record **Best Wi-Fi round trip** and **Late beats skipped** from both screens after the run. A growing separation is evidence of a timing problem. A non-zero skipped count indicates a device missed one or more scheduling deadlines. The round-trip figure measures the fastest recent exchange with the Mac, independent of speaker delay.

A pass requires both audible speakers and one perceived click on two consecutive runs at the recorded settings. This is a listening test. A microphone recording and waveform measurement can quantify timing later.

## Automated checks

Run `node --test tests/*.test.mjs` from the project directory with Node.js 22 or later. The timing check simulates Web Audio clocks without speakers. The HTTP check starts a temporary server on an available port and requires local socket access.

## Results

| Date | Check | Result |
| --- | --- | --- |
| 2026-11-25 | Node syntax checks for server and browser script | Passed |
| 2026-11-25 | Local HTTP endpoint verification | Blocked by the execution environment’s socket permissions |
| 2026-11-26 | HTTP smoke test for both modes, concurrent starts, clock identity and unknown routes | Passed on the Mac |
| 2026-11-26 | Simulated phone timing with different clocks and output delays | Passed, including fallback timing, duplicate prevention, missed deadlines and a server restart |
| Pending | iPhone Safari and Android Chrome playback | Requires physical devices |

For the physical test, record phone models, OS versions, the delay on each phone, whether each speaker made the enable click, and whether the shared beat sounded single or doubled at the start and end.

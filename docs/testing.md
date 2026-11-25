# Test Plan and Results

## Two-phone playback

1. Place the iPhone and Android side by side. Connect both phones and the Mac to the same Wi-Fi.
2. In the prototype folder, run `node server.mjs`. Open the printed Wi-Fi address in iPhone Safari and Android Chrome.
3. Raise media volume, tap **Enable speaker** on both phones, and keep both screens open. Confirm that each plays a short click when enabled.
4. Leave both playback delays at 0 ms. Tap **Start sync test** on either phone. Listen for a single click or a double click at the start and end.
5. If you can identify the earlier phone, increase its **Playback delay** in small steps. Restart the test and repeat at the same setting. Record both delays and whether the clicks stay together.

A pass requires both audible speakers and one perceived click on two consecutive runs at the recorded settings. This is a listening test. A microphone recording and waveform measurement can quantify timing later.

## Results

| Date | Check | Result |
| --- | --- | --- |
| 2026-11-25 | Node syntax checks for server and browser script | Passed |
| 2026-11-25 | Local HTTP endpoint verification | Blocked by the execution environment’s socket permissions |
| Pending | iPhone Safari and Android Chrome playback | Requires physical devices |

For the physical test, record phone models, OS versions, the delay on each phone, whether each speaker made the enable click, and whether the shared beat sounded single or doubled at the start and end.

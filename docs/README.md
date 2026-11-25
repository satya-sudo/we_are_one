# We Are One Project Report

We Are One aims to make nearby iPhones and Android phones act as a single speaker. One phone selects the group as its system media output and controls playback in the original app. YouTube, YouTube Music, and Spotify are launch compatibility targets. The host phone is intended to play alongside the group.

The first prototype uses a Mac on the same Wi-Fi network to coordinate a 16-second or two-minute test beat on two phone browsers. It includes device-specific delay adjustment. Local HTTP and simulated browser timing checks passed. Playback on physical devices remains pending.

## Roadmap

| Phase | Deliverable | Evidence needed |
| --- | --- | --- |
| 1. Two-phone playback | Scheduled test beats on iPhone and Android | Repeatable single clicks with both speakers active |
| 2. Live audio | One authorized live audio stream sent to both phones | Sustained playback and recovery after a brief disconnect |
| 3. System output | Android system route and an AirPlay-compatible iPhone host prototype | A source app plays through the route and the host speaker joins in sync |
| 4. Streaming compatibility | YouTube, YouTube Music, and Spotify through supported routes | Per-service tests and confirmation of the applicable permissions |

Investigate iPhone hosting alongside the sync prototype. Its system output path and the host speaker are significant feasibility questions.

## Project records

- [Technical and product decisions](decisions.md)
- [Test plan and results](testing.md)
- [Development log](progress.md)
- [Prototype server](../server.mjs) and [phone interface](../index.html)

Update the decision record when a choice changes. Record the device, browser or app, conditions, and result for each test. Add dated progress entries with evidence and remaining work. Leave private network addresses and device identifiers out of the report.

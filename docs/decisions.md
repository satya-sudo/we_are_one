# Technical and Product Decisions

| Status | Decision | Rationale or evidence still needed |
| --- | --- | --- |
| Accepted | Keep playback controls in the host’s original app. | The group should feel like choosing a speaker. The user ruled out an import-and-play workflow. |
| Accepted | Target YouTube, YouTube Music, and Spotify. | These are the requested sources. Verify each service separately and confirm an authorized path for redistribution where applicable. |
| Accepted | Include the host speaker in the intended group. | The host and listeners need a common playback schedule. Immediate local playback can create an audible double hit. |
| Implemented for testing | Use Wi-Fi, a Mac timing server, and browser-generated clicks for the first experiment. | This isolates synchronization using one existing iPhone and one Android phone. |
| Proposed | Prototype system hosting on a custom Android build. | Android exposes privileged audio routing APIs. A system build can test where the group output fits. [Android audio routing](https://source.android.com/docs/core/audio/combined-audio-routing) |
| Investigating | Evaluate the iOS 27 Media Device extension and use AirPlay to Mac as a baseline. | Verify entitlement eligibility, a phone-based receiver, host speaker participation, and each source app. [iPhone hosting feasibility](iphone-hosting.md) |

YouTube’s terms restrict retransmission, and its API policies restrict audio separation. YouTube Music Premium is subject to YouTube’s terms. Spotify’s developer policy identifies playing from one source to several simultaneous listeners as an example of prohibited webcasting. Validate technical compatibility and service authorization before making launch claims. [YouTube terms](https://www.youtube.com/t/terms) · [YouTube API policies](https://developers.google.com/youtube/terms/developer-policies) · [YouTube Music terms](https://music.youtube.com/premium/restrictions) · [Spotify policy](https://developer.spotify.com/policy)

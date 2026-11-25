# iPhone Hosting Feasibility

Apple's iOS 27 Media Device framework is a candidate for the We Are One host. It lets an entitled media device extension advertise an output in the system media picker. A receiver can implement a custom protocol. For real-time audio, the extension publishes an audio server driver plug-in that receives mixed audio samples. This is a documented route to test alongside an AirPlay receiver. [Media Device framework](https://developer.apple.com/documentation/MediaDevice) · [Creating a media device extension](https://developer.apple.com/documentation/MediaDevice/creating-a-media-device-extension)

The extension and its container app require the Media Sharing Extension entitlement. Apple specifies that the container app is dedicated to installing the extension. A receiving app would therefore be a separate component. Eligibility for a phone-based receiver and distribution of the extension for this use case still need confirmation. [Media Sharing Extension entitlement](https://developer.apple.com/documentation/bundleresources/entitlements/com.apple.developer.media-device-extension)

## Validation order

1. Verify the available iPhone OS version, Xcode SDK and entitlement provisioning.
2. Advertise a single test receiver over local Wi-Fi. On the iPhone, verify that it appears in the system picker and can be selected.
3. Play authorized sample audio in a separate source app. Verify that the Android phone hears the selected output and measure its delay.
4. Check whether the iPhone speaker can also participate at the same playback time. Record its route and any audible echo.
5. Validate YouTube, YouTube Music, and Spotify separately through the supported sharing route after confirming authorization. Record the source app, OS, route, and result.

AirPlay from the iPhone to a Mac can provide a baseline using existing hardware. It proves the source app can use that AirPlay destination only. [AirPlay from iPhone to Mac](https://support.apple.com/guide/iphone/stream-video-and-audio-from-your-iphone-iphd668e80e6/ios)

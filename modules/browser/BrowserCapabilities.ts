import BrowserDetection from '@jitsi/js-utils/browser-detection/BrowserDetection';

/* Minimum required Chrome / Chromium version. This applies also to derivatives. */
const MIN_REQUIRED_CHROME_VERSION = 72;
const MIN_REQUIRED_FIREFOX_VERSION = 91;
const MIN_REQUIRED_SAFARI_VERSION = 14;
const MIN_REQUIRED_IOS_VERSION = 14;

// Starting with iPadOS 13 the actual Safari / iPadOS version is concealed from the UA string and
// the system pretends to be macOS 10.15.7. Yeah, you read that right.
const FROZEN_MACOS_VERSION = '10.15.7';

// TODO: Move this code to js-utils.

// NOTE: Now we are extending BrowserDetection in order to preserve
// RTCBrowserType interface but maybe it worth exporting BrowserCapabilities
// and BrowserDetection as separate objects in future.

/**
 * Implements browser capabilities for lib-jitsi-meet.
 */
export default class BrowserCapabilities extends BrowserDetection {
    /**
     * Returns the version of an ios browser.
     *
     * @returns {Number}
     */
    _getIOSVersion(): number {
        if (this.isWebKitBased()) {
            return Number.parseInt(this.getOSVersion(), 10);
        }

        return -1;
    }

    /**
     * Returns the version of a Safari browser.
     *
     * @returns {Number}
     */
    _getSafariVersion(): number {
        if (this.isSafari()) {
            return Number.parseInt(this.getVersion(), 10);
        }

        return -1;
    }

    /**
     * Tells whether or not the <tt>MediaStream/tt> is removed from the <tt>PeerConnection</tt> and disposed on video
     * mute (in order to turn off the camera device). This is needed on Firefox because of the following bug
     * https://bugzilla.mozilla.org/show_bug.cgi?id=1735951
     *
     * @return {boolean} <tt>true</tt> if the current browser supports this strategy or <tt>false</tt> otherwise.
     */
    doesVideoMuteByStreamRemove(): boolean {
        return this.isChromiumBased() || this.isWebKitBased() || this.isFirefox();
    }

    /**
     * Checks if the client is running on an Android browser.
     *
     * @returns {boolean}
     */
    isAndroidBrowser(): boolean {
        return !this.isReactNative() && this.getOS() === 'Android';
    }

    /**
     * Checks if the current platform is iOS.
     *
     * @returns {boolean}
     */
    isIosBrowser(): boolean {
        return !this.isReactNative() && this.getOS() === 'iOS';
    }

    /**
     * Checks if the client is running on a mobile device.
     *
     * @returns {boolean}
     */
    isMobileDevice(): boolean {
        return this.isAndroidBrowser() || this.isIosBrowser() || this.isReactNative();
    }

    /**
     * Checks whether current running context is a Trusted Web Application.
     *
     * @returns {boolean} Whether the current context is a TWA.
     */
    isTwa(): boolean {
        return 'matchMedia' in window && window.matchMedia('(display-mode:standalone)').matches;
    }

    /**
     * Checks if the current browser is supported.
     *
     * @returns {boolean} true if the browser is supported, false otherwise.
     */
    isSupported(): boolean {
        // First check for WebRTC APIs because some "security" extensions are dumb.
        if (typeof RTCPeerConnection === 'undefined'
                || !navigator?.mediaDevices?.enumerateDevices || !navigator?.mediaDevices?.getUserMedia) {
            return false;
        }

        if (this.isSafari() && this._getSafariVersion() < MIN_REQUIRED_SAFARI_VERSION) {
            return false;
        }

        return (this.isChromiumBased() && this.isEngineVersionGreaterThan(MIN_REQUIRED_CHROME_VERSION - 1))
            || (this.isFirefox() && this.isVersionGreaterThan(MIN_REQUIRED_FIREFOX_VERSION - 1))
            || this.isReactNative()
            || this.isWebKitBased();
    }

    /**
     * Returns whether the browser is supported for Android.
     *
     * @returns {boolean} true if the browser is supported for Android devices.
     */
    isSupportedAndroidBrowser(): boolean {
        return this.isChromiumBased() || this.isFirefox();
    }

    /**
     * Returns whether the browser is supported for iOS.
     *
     * @returns {boolean} true if the browser is supported for iOS devices.
     */
    isSupportedIOSBrowser(): boolean {
        // After iPadOS 13 we have no way to know the Safari or iPadOS version, so YOLO.
        if (!this.isSafari() && this.isWebKitBased() && this.getOSVersion() === FROZEN_MACOS_VERSION) {
            return true;
        }

        return this._getSafariVersion() >= MIN_REQUIRED_IOS_VERSION
                || this._getIOSVersion() >= MIN_REQUIRED_IOS_VERSION;
    }

    /**
     * Returns whether or not the current environment needs a user interaction
     * with the page before any unmute can occur.
     *
     * @returns {boolean}
     */
    isUserInteractionRequiredForUnmute(): boolean {
        return this.isFirefox() && this.isVersionLessThan(68);
    }

    /**
     * Checks if the current browser triggers 'onmute'/'onunmute' events when
     * user's connection is interrupted and the video stops playback.
     *
     * @returns {*|boolean} 'true' if the event is supported or 'false' otherwise.
     */
    supportsVideoMuteOnConnInterrupted(): any | boolean {
        return this.isChromiumBased() || this.isReactNative();
    }

    /**
     * Checks if the current browser reports upload and download bandwidth statistics.
     *
     * @return {boolean}
     */
    supportsBandwidthStatistics(): boolean {
        // FIXME bandwidth stats are currently not implemented for FF on our
        // side, but not sure if not possible ?
        return !this.isFirefox() && !this.isWebKitBased();
    }

    /**
     * Checks if the current browser supports setting codec preferences on the transceiver.
     *
     * @returns {boolean}
     */
    supportsCodecPreferences(): boolean {
        return Boolean('setCodecPreferences' in window.RTCRtpTransceiver?.prototype
            && typeof window.RTCRtpReceiver?.getCapabilities !== 'undefined')

            // this is not working on Safari because of the following bug
            // https://bugs.webkit.org/show_bug.cgi?id=215567
            && !this.isWebKitBased()

            // Calling this API on Firefox is causing freezes when the local endpoint is the answerer.
            // https://bugzilla.mozilla.org/show_bug.cgi?id=1917800
            && !this.isFirefox();
    }

    /**
     * Checks if the browser supports the new codec selection API, i.e., checks if dictionary member
     * RTCRtpEncodingParameters.codec as defined in
     * https://w3c.github.io/webrtc-extensions/#dom-rtcrtpencodingparameters-codec is supported by the browser. It
     * allows the application to change the current codec used by each RTCRtpSender without a renegotiation.
     *
     * @returns {boolean}
     */
    supportsCodecSelectionAPI(): boolean {
        return this.isChromiumBased() && this.isEngineVersionGreaterThan(125);
    }

    /**
     * Returns true if the browser supports Dependency Descriptor header extension.
     *
     * @returns {boolean}
     */
    supportsDDExtHeaders(): boolean {
        return !(this.isFirefox() && this.isVersionLessThan(136));
    }

    /**
     * Checks if the current browser support the device change event.
     * @return {boolean}
     */
    supportsDeviceChangeEvent(): boolean {
        return typeof navigator.mediaDevices?.ondevicechange !== 'undefined'
            && typeof navigator.mediaDevices?.addEventListener !== 'undefined';
    }

    /**
     * Checks if the current browser supports audio level stats on the receivers.
     *
     * @return {boolean}
     */
    supportsReceiverStats(): boolean {
        return typeof window.RTCRtpReceiver !== 'undefined'
            && Object.keys(RTCRtpReceiver.prototype).indexOf('getSynchronizationSources') > -1;
    }

    /**
     * Checks if the current browser reports round trip time statistics for the ICE candidate pair.
     *
     * @return {boolean}
     */
    supportsRTTStatistics(): boolean {
        // Firefox does not seem to report RTT for ICE candidate pair:
        // eslint-disable-next-line max-len
        // https://www.w3.org/TR/webrtc-stats/#dom-rtcicecandidatepairstats-currentroundtriptime
        // It does report mozRTT for RTP streams, but at the time of this
        // writing it's value does not make sense most of the time
        // (is reported as 1):
        // https://bugzilla.mozilla.org/show_bug.cgi?id=1241066
        // For Chrome and others we rely on 'googRtt'.
        return !this.isFirefox();
    }

    /**
     * Returns true if the browser supports the new Scalability Mode API for VP9/AV1 simulcast and full SVC. H.264
     * simulcast will also be supported by the jvb for this version because the bridge is able to read the Dependency
     * Descriptor RTP header extension to extract layers information for H.264 as well.
     *
     * @returns {boolean}
     */
    supportsScalabilityModeAPI(): boolean {
        return this.isChromiumBased() && this.isEngineVersionGreaterThan(112);
    }

    /**
     * Returns true if the browser supports track based statistics for the local video track. Otherwise,
     * track resolution and framerate will be calculated based on the 'outbound-rtp' statistics.
     *
     * @returns {boolean}
     */
    supportsTrackBasedStats(): boolean {
        return this.isChromiumBased() && this.isEngineVersionLessThan(112);
    }

    /**
     * Returns true if VP9 is supported by the client on the browser. VP9 is currently disabled on Safari
     * and older versions of Firefox because of issues. Please check https://bugs.webkit.org/show_bug.cgi?id=231074 for
     * details.
     *
     * @returns {boolean}
     */
    supportsVP9(): boolean {
        // Keep this disabled for FF because simulcast is disabled by default.
        // For versions 136+ if the media.webrtc.simulcast.vp9.enabled config is set to true it will work.
        // TODO: enable for FF with version 136+ once media.webrtc.simulcast.vp9.enabled is set to true by default.
        return !(this.isWebKitBased() || this.isFirefox());
    }

    /**
     * Returns true if SVC is supported.
     *
     * @returns {boolean}
     */
    supportsSVC(): boolean {
        return !this.isFirefox();
    }

    /**
     * Checks if the browser uses SDP munging for turning on simulcast.
     *
     * @returns {boolean}
     */
    usesSdpMungingForSimulcast(): boolean {
        return this.isChromiumBased() || this.isReactNative() || this.isWebKitBased();
    }

    /**
     * Checks if the browser uses RIDs/MIDs for siganling the simulcast streams
     * to the bridge instead of the ssrcs.
     *
     * @returns {boolean}
     */
    usesRidsForSimulcast(): boolean {
        return false;
    }

    /**
     * Checks if the browser supports getDisplayMedia.
     *
     * @returns {boolean} {@code true} if the browser supports getDisplayMedia.
     */
    supportsGetDisplayMedia(): boolean {
        // @ts-ignore
        return typeof navigator.getDisplayMedia !== 'undefined'
            || (typeof navigator.mediaDevices?.getDisplayMedia !== 'undefined');
    }

    /**
     * Checks if the browser supports WebRTC Encoded Transform, an alternative
     * to insertable streams.
     *
     * NOTE: At the time of this writing the only browser supporting this is
     * Safari / WebKit, behind a flag.
     *
     * @returns {boolean} {@code true} if the browser supports it.
     */
    supportsEncodedTransform(): boolean {
        return Boolean(window.RTCRtpScriptTransform);
    }

    /**
     * Checks if the browser supports insertable streams, needed for E2EE.
     *
     * @returns {boolean} {@code true} if the browser supports insertable streams.
     */
    supportsInsertableStreams(): boolean {
        // @ts-ignore
        if (!window.RTCRtpSender?.prototype.createEncodedStreams) {
            return false;
        }

        // Feature-detect transferable streams which we need to operate in a worker.
        // See https://groups.google.com/a/chromium.org/g/blink-dev/c/1LStSgBt6AM/m/hj0odB8pCAAJ
        const stream = new ReadableStream();

        try {
            window.postMessage(stream, '*', [ stream ]);

            return true;
        } catch {
            return false;
        }
    }

    /**
     * Whether the browser supports the RED format for audio.
     *
     * @returns {boolean} {@code true} if the browser supports RED.
     */
    supportsAudioRed(): boolean {
        return Boolean(window.RTCRtpSender?.getCapabilities('audio')?.codecs.some(codec => codec.mimeType === 'audio/red')
            && window.RTCRtpReceiver?.getCapabilities('audio')?.codecs.some(codec => codec.mimeType === 'audio/red'));
    }

    /**
     * Checks if the browser supports voice activity detection via the @type {VADAudioAnalyser} service.
     *
     * @returns {boolean}
     */
    supportsVADDetection(): boolean {
        return this.isChromiumBased();
    }

    /**
     * Check if the browser supports the RTP RTX feature (and it is usable).
     *
     * @returns {boolean}
     */
    supportsRTX(): boolean {
        // Disable RTX on Firefox up to 96 because we prefer simulcast over RTX
        // see https://bugzilla.mozilla.org/show_bug.cgi?id=1738504
        return !(this.isFirefox() && this.isVersionLessThan(96));
    }
}

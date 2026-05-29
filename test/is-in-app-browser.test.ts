import { describe, expect, it } from 'vitest';
import { isInAppBrowser } from '../src/is-in-app-browser.js';
import { UA } from './fixtures.js';

describe('isInAppBrowser', () => {
  describe('matches known in-app browsers', () => {
    it.each([
      ['Facebook iOS (FBAN/FBAV)', UA.facebookIos],
      ['Facebook Android (FB_IAB)', UA.facebookAndroid],
      ['Instagram iOS', UA.instagramIos],
      ['Instagram Android', UA.instagramAndroid],
      ['X / Twitter iOS', UA.twitterIos],
      ['Twitter Android', UA.twitterAndroid],
      ['LinkedIn iOS', UA.linkedinIos],
      ['TikTok iOS', UA.tiktokIos],
      ['TikTok (legacy musical_ly)', UA.tiktokMusicalLy],
      ['Snapchat iOS', UA.snapchatIos],
      ['WeChat (MicroMessenger)', UA.wechatIos],
      ['Line iOS', UA.lineIos],
      ['Telegram iOS', UA.telegramIos],
      ['Pinterest iOS', UA.pinterestIos],
    ])('matches %s', (_label, ua) => {
      expect(isInAppBrowser({ userAgent: ua })).toBe(true);
    });
  });

  describe('rejects standalone browsers', () => {
    it.each([
      ['Chrome desktop', UA.chromeWinDesktop],
      ['Chrome macOS', UA.chromeMacDesktop],
      ['Chrome Android', UA.chromeAndroid],
      ['Chrome iOS', UA.chromeIos],
      ['Edge desktop', UA.edgeWinDesktop],
      ['Edge Android', UA.edgeAndroid],
      ['Edge iOS', UA.edgeIos],
      ['Firefox desktop', UA.firefoxDesktop],
      ['Firefox Windows', UA.firefoxWindows],
      ['Firefox Android', UA.firefoxAndroid],
      ['Firefox iOS', UA.firefoxIos],
      ['Safari macOS', UA.safariMac],
      ['Safari iPhone', UA.safariIPhone],
      ['Safari iPad', UA.safariIPad],
      ['Opera desktop', UA.operaDesktop],
      ['Opera Presto', UA.operaPresto],
      ['Opera Mini', UA.operaMini],
      ['IE 11', UA.ie11],
      ['Android WebView (system)', UA.androidWebView],
      ['Android legacy Browser', UA.androidBrowser],
      ['ChromeOS', UA.chromeOSDesktop],
      ['Chrome 140 macOS', UA.chrome2026Mac],
      ['Safari 18 iPhone', UA.safari2026Iphone],
      ['Safari 18 iPad', UA.safari2026Ipad],
    ])('rejects %s', (_label, ua) => {
      expect(isInAppBrowser({ userAgent: ua })).toBe(false);
    });
  });

  describe('false-positive guards (look-alikes that must NOT match)', () => {
    it.each([
      // Triller is a real TikTok competitor with its own iOS app. The TikTok
      // legacy/regional branch is anchored on `Trill_<version>` precisely so
      // that Triller does not collide with TikTok detection.
      [
        'Triller (TikTok competitor)',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Triller/2.5 CFNetwork/1410.0.3',
      ],
      // Hypothetical `musical_lyric` token — same shape, different word.
      ['musical_lyric-prefixed UA (not TikTok)', 'Mozilla/5.0 (iPhone) musical_lyric/1.0'],
      // A random "Twitter for" substring inside another product's name must not match.
      [
        '"Twitter for embeds" sharing-kit string (not the iOS app)',
        'Mozilla/5.0 (Macintosh) Chrome/140 sharing-kit: Twitter for embeds',
      ],
    ])('rejects %s', (_label, ua) => {
      expect(isInAppBrowser({ userAgent: ua })).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('returns false for empty UA', () => {
      expect(isInAppBrowser({ userAgent: UA.empty })).toBe(false);
    });

    it('returns false for an unknown bot UA', () => {
      expect(isInAppBrowser({ userAgent: UA.unknown })).toBe(false);
    });

    it('is case-insensitive (lowercase facebook token still matches)', () => {
      // Some scraped UAs come through lowercased — match anyway.
      const ua =
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) [fban/fbios;fbav/451.0.0.34.108]';
      expect(isInAppBrowser({ userAgent: ua })).toBe(true);
    });

    it('does not throw without options', () => {
      expect(() => isInAppBrowser()).not.toThrow();
    });
  });

  describe('composition with other predicates', () => {
    it('Facebook-on-Android is BOTH an in-app browser AND Android', async () => {
      const { isAndroid } = await import('../src/is-android.js');
      expect(isInAppBrowser({ userAgent: UA.facebookAndroid })).toBe(true);
      expect(isAndroid({ userAgent: UA.facebookAndroid })).toBe(true);
    });

    it('Instagram-on-iOS is mobile and in-app, but not Safari', async () => {
      const { isMobile } = await import('../src/is-mobile.js');
      const { isSafari } = await import('../src/is-safari.js');
      expect(isInAppBrowser({ userAgent: UA.instagramIos })).toBe(true);
      expect(isMobile({ userAgent: UA.instagramIos })).toBe(true);
      expect(isSafari({ userAgent: UA.instagramIos })).toBe(false);
    });
  });
});

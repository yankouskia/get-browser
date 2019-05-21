[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/yankouskia/get-browser/pulls) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/yankouskia/get-browser/blob/master/LICENSE)

[![NPM](https://nodei.co/npm/get-browser.png?downloads=true)](https://www.npmjs.com/package/get-browser)

# get-browser

💻 Lightweight tool to identify the browser (with mobile/desktop detection) 📱


| <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/35.1.0/internet-explorer/internet-explorer_512x512.png" alt="IE" width="48px" height="48px"/></br> Internet Explorer | <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/35.1.0/edge/edge_512x512.png" alt="Edge" width="48px" height="48px" /></br> Microsoft Edge | <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/35.1.0/firefox/firefox_512x512.png" alt="Firefox" width="48px" height="48px" /><img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/35.1.0/firefox-developer-edition/firefox-developer-edition_512x512.png" alt="Firefox Dev" width="48px" height="48px" /></br> Mozilla Firefox | <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/35.1.0/chrome/chrome_512x512.png" alt="Chrome" width="48px" height="48px" /><img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/35.1.0/chrome-dev/chrome-dev_512x512.png" alt="Chrome Dev" width="48px" height="48px" /><img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/35.1.0/archive/chrome-canary_19-48/chrome-canary_19-48_512x512.png" alt="Chrome Canary" width="48px" height="48px" /></br> Google Chrome | <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/35.1.0/opera/opera_512x512.png" alt="Opera" width="48px" height="48px" /><img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/35.1.0/opera-developer/opera-developer_512x512.png" alt="Opera Dev" width="48px" height="48px" /></br> Opera | <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/35.1.0/safari/safari_512x512.png" alt="Safari" width="48px" height="48px" /><img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/35.1.0/safari-technology-preview/safari-technology-preview_512x512.png" alt="Safari TP" width="48px" height="48px" /><img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/35.1.0/safari-ios/safari-ios_512x512.png" alt="Safari iOS" width="48px" height="48px" /></br> Safari | <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/35.1.0/android-webview-beta/android-webview-beta_512x512.png" alt="Android WebView" width="48px" height="48px" /></br> Android WebView
| --- | --- | --- | --- | --- | --- | ---
| 7+ | 12+ | 5+ | 31+ | 18+ | 6+ | 20+


## Demo

[DEMO can be found here](https://yankouskia.github.com/get-browser/example)


Desktop Chrome            |  Mobile Safari
:-------------------------:|:-------------------------:
<img src="./resources/desktop_chrome.gif" data-canonical-src="./resources/desktop_chrome.gif" width="300" />  |  <img src="./resources/mobile_safari.gif" data-canonical-src="./resources/mobile_safari.gif" width="300" />

## Motivation

Lightweight tool for easy way to identify the browser. User Agent does not always provide entire information about the browser. Additional checks are used.

## How to use

To install library:

```sh
# yarn
yarn add get-browser

# npm
npm install get-browser --save
```

Library is designed to identify browser and device type (mobile / desktop)

```js
// ES6 modules
import {
  browsers,
  detect,
  isMobile,

  isAndroid,
  isChrome,
  isEdge,
  isFirefox,
  isIE,
  isOpera,
  isSafari,
} from 'get-browser';

// CommonJS modules
const {
  browsers,
  detect,
  isMobile,

  isAndroid,
  isChrome,
  isEdge,
  isFirefox,
  isIE,
  isOpera,
  isSafari,
} = require('get-browser');

// Enumeration with all supported browsers is provided:
console.log(browsers);
/*
{
  ANDROID: 'android',
  CHROME: 'chrome',
  EDGE: 'edge',
  FIREFOX: 'firefox',
  IE: 'ie',
  OPERA: 'opera',
  SAFARI: 'safari',
  UNKNOWN: 'unknown',
}
*/

// To detect browser:
const browser = detect(); // one from the browsers list will be displayed

// To detect whether mobile device is used:
const isMobileDevice = isMobile();

// To detect whether user is in Firefox browser:
const isFirefoxBrowser = isFirefox();

```

## API

`browsers`

Exposed enumeration for providing constant for each browser.

`detect(): string<oneof browsers>`

Returns the browser name

`isMobile(): boolean`

Returns true if mobile device is being used

`isAndroid(): boolean`

Return true if Android browser us being used

`isChrome(): boolean`

Return true if Google Chrome browser us being used

`isEdge(): boolean`

Return true if Edge browser us being used

`isFirefox(): boolean`

Return true if Firefox browser us being used

`isIE(): boolean`

Return true if Internet Explorer browser us being used

`isOpera(): boolean`

Return true if Opera browser us being used

`isSafari(): boolean`

Return true if Safari browser us being used


## Contributing

`get-browser` is open-source library, opened for contributions


### License

`get-browser` is [MIT licensed](https://github.com/yankouskia/get-browser/blob/master/LICENSE)

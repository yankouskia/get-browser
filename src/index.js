import * as browsers from './browsers';

import isAndroid from './is-android';
import isChrome from './is-chrome';
import isEdge from './is-edge';
import isFirefox from './is-firefox';
import isIE from './is-ie';
import isMobile from './is-mobile';
import isOpera from './is-opera';
import isSafari from './is-safari';

export function detect() {
  if (isChrome()) {
    return browsers.CHROME;
  } else if (isSafari()) {
    return browsers.SAFARI;
  } else if (isEdge()) {
    return browsers.EDGE;
  } else if (isFirefox()) {
    return browsers.FIREFOX;
  } else if (isIE()) {
    return browsers.IE;
  } else if (isAndroid()) {
    return browsers.ANDROID;
  } else if (isOpera()) {
    return browsers.OPERA;
  }

  return browsers.UNKNOWN;
}

export {
  browsers,
  isAndroid,
  isChrome,
  isEdge,
  isFirefox,
  isIE,
  isMobile,
  isOpera,
  isSafari,
};

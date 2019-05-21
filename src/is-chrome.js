export default function isChrome() {
  const { chrome, navigator, opr } = window;
  const { vendor, userAgent } = navigator;

  const isOpera = typeof opr !== 'undefined';
  const isEdge = userAgent.indexOf('Edge') > -1;
  const isIOSChrome = userAgent.match('CriOS');

  const isDesktopChrome = (
    chrome !== null &&
    chrome !== 'undefined' &&
    vendor === 'Google Inc.' &&
    isOpera === false &&
    isEdge === false
  );

  return isIOSChrome || isDesktopChrome;
};

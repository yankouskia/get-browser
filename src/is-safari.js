export default function isSafari() {
  const { vendor, userAgent } = window.navigator;

  const isAppleVendor = vendor && vendor.indexOf('Apple') > -1;
  const isIOSAgent = userAgent && userAgent.indexOf('CriOS') == -1 && userAgent.indexOf('FxiOS') == -1;

  return isAppleVendor && isIOSAgent;
}

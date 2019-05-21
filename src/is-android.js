export default function isAndroid() {
  const { userAgent } = window.navigator;

  return userAgent.indexOf('Android') > -1 &&
    userAgent.indexOf('Mozilla/5.0') > -1 &&
    userAgent.indexOf('AppleWebKit') > -1;
}

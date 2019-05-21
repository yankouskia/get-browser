export default function isIE() {
  const { userAgent } = window.navigator;

  const msie = userAgent.indexOf('MSIE ');
  const trident = userAgent.indexOf('Trident/');

  return msie > 0 || trident > 0;
}

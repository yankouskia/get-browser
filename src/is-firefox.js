export default function isFirefox() {
  return window.navigator.userAgent.toLowerCase().indexOf('firefox') > -1
}

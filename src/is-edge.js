export default function isEdge() {
  const { userAgent } = window.navigator;
  return userAgent.indexOf('Edge/') > 0;
}

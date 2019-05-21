export default function isOpera() {
  const globalOpera = window.opera || window.opr;
  const matchAgent = window.navigator.userAgent.match(/Opera|OPR\//);

  return globalOpera && matchAgent;
}

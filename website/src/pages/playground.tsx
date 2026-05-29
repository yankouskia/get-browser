import Link from '@docusaurus/Link';
import DetectionCard from '@site/src/components/DetectionCard';
import CodeBlock from '@theme/CodeBlock';
import Layout from '@theme/Layout';
import styles from './playground.module.css';

const RECIPE = `import { detect, getOS, isMobile, browsers, oses } from 'get-browser';

const browser = detect();
const os      = getOS();

switch (browser) {
  case browsers.CHROME:  loadChromeExtensionShim(); break;
  case browsers.SAFARI:  patchSafariScrollBug();    break;
  case browsers.FIREFOX: enableFirefoxOnlyFeature(); break;
  default:               /* nothing */              break;
}

const shortcut = os === oses.MACOS ? '⌘ K' : 'Ctrl K';

if (isMobile()) document.body.classList.add('is-mobile');`;

export default function Playground() {
  return (
    <Layout
      title="Playground"
      description="Interactive playground for get-browser. Detect the current browser, or paste a custom user-agent string to see how each predicate resolves."
    >
      <main className={styles.page}>
        <div className="container">
          <header className={styles.header}>
            <h1 className={styles.title}>Playground</h1>
            <p className={styles.lede}>
              The detection card below uses the real <code>get-browser</code> bundle. Pick a sample
              UA from the dropdown, paste your own, or leave both empty to detect against your
              actual <code>navigator.userAgent</code>.
            </p>
          </header>

          <div className={styles.grid}>
            <DetectionCard />
            <div>
              <h2 className={styles.subhead}>How this page uses get-browser</h2>
              <p className={styles.bodyText}>
                The card is a small React component. It calls <code>detect()</code> and each
                predicate once per render, passing the selected user-agent (or nothing — in which
                case the library reads from the browser's <code>navigator</code>). It uses{' '}
                <Link to="https://docusaurus.io/docs/docusaurus-core#browseronly">
                  <code>&lt;BrowserOnly&gt;</code>
                </Link>{' '}
                because Docusaurus pre-renders pages and there's no <code>navigator</code> at build
                time.
              </p>
              <CodeBlock language="tsx" showLineNumbers>
                {RECIPE}
              </CodeBlock>
              <p className={styles.bodyText}>
                See the{' '}
                <Link to="/docs/api/detect">
                  <code>detect()</code> API page
                </Link>{' '}
                for the full signature, or jump to <Link to="/docs/recipes">recipes</Link> for more
                patterns.
              </p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

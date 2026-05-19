import Link from '@docusaurus/Link';
import DetectionCard from '@site/src/components/DetectionCard';
import FeatureGrid from '@site/src/components/FeatureGrid';
import FrameworkStrip from '@site/src/components/FrameworkStrip';
import Hero from '@site/src/components/Hero';
import SizeChart from '@site/src/components/SizeChart';
import UseCases from '@site/src/components/UseCases';
import Layout from '@theme/Layout';
import styles from './index.module.css';

export default function Home() {
  return (
    <Layout
      title="get-browser — tiny, typed, SSR-safe browser detection"
      description="A ~1.5 kB TypeScript utility that returns a strict union for the current user-agent. Works in Node, Next.js, Remix, Workers, Deno, and the browser. Zero runtime dependencies."
    >
      <Hero />

      <main>
        <FrameworkStrip />

        <section className={styles.demoSection}>
          <div className="container">
            <div className={styles.demoGrid}>
              <div>
                <span className={styles.eyebrow}>TRY IT LIVE</span>
                <h2 className={styles.sectionHeading}>
                  This card is reading your <span className={styles.accent}>actual</span> user-agent
                </h2>
                <p className={styles.sectionLede}>
                  Pick a sample UA from the dropdown, paste your own, or leave both empty to detect
                  against your real <code>navigator.userAgent</code>. The code path is exactly the
                  one your app would run.
                </p>
                <ul className={styles.bullets}>
                  <li>
                    <code>detect()</code> returns one of <code>browsers.*</code>
                  </li>
                  <li>
                    Predicates like <code>isSafari()</code> return a strict <code>boolean</code>
                  </li>
                  <li>Pass an explicit UA for SSR / unit-test scenarios</li>
                  <li>
                    The <strong>LIVE</strong> dot says where the UA is coming from
                  </li>
                </ul>
                <Link className="button button--primary button--lg" to="/playground">
                  Open the full playground →
                </Link>
              </div>
              <DetectionCard />
            </div>
          </div>
        </section>

        <FeatureGrid />

        <UseCases />

        <section className={styles.compareSection}>
          <div className="container">
            <span className={styles.eyebrow}>BUNDLE SIZE</span>
            <h2 className={styles.sectionHeading}>
              How it stacks up against the <span className={styles.accent}>alternatives</span>
            </h2>
            <p className={styles.sectionLede}>
              <code>get-browser</code> trades version-parsing and device-info for a fraction of the
              footprint. If your job is "tell me which browser, then get out of my way," this is
              your library.
            </p>
            <SizeChart />
            <p className={styles.fineprint}>
              Sizes are <code>min+gzip</code> of the full library bundle. <code>get-browser</code>{' '}
              also tree-shakes down to <strong>~400 bytes</strong> when you import a single
              predicate.
            </p>
            <Link to="/docs/comparison" className={styles.compareLink}>
              See full feature comparison →
            </Link>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div className="container">
            <div className={styles.ctaInner}>
              <p className={styles.ctaEyebrow}>READY?</p>
              <h2>Install in one line. Ship in the next.</h2>
              <p>
                <code>get-browser</code> is what you reach for when you just want a single,
                lowercase, typed answer to <em>which browser is this?</em>
              </p>
              <pre className={styles.installLine}>$ pnpm add get-browser</pre>
              <div className={styles.ctaButtons}>
                <Link className="button button--primary button--lg" to="/docs/intro">
                  Read the docs →
                </Link>
                <Link
                  className="button button--secondary button--lg"
                  href="https://github.com/yankouskia/get-browser"
                >
                  ⭐ Star on GitHub
                </Link>
                <Link className="button button--link button--lg" to="/playground">
                  Try the playground
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

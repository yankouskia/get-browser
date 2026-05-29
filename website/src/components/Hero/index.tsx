import Link from '@docusaurus/Link';
import LiveCodePreview from '@site/src/components/LiveCodePreview';
import clsx from 'clsx';
import styles from './styles.module.css';

const BROWSERS = [
  { name: 'chrome', color: '#4285F4' },
  { name: 'edge', color: '#0078D7' },
  { name: 'firefox', color: '#FF7139' },
  { name: 'safari', color: '#1AB6FF' },
  { name: 'opera', color: '#FF1B2D' },
  { name: 'ie', color: '#0072C6' },
  { name: 'android', color: '#3DDC84' },
  { name: 'unknown', color: '#8b9bb5' },
] as const;

const STRIP_ITEMS = (['a', 'b', 'c'] as const).flatMap((slot) =>
  BROWSERS.map((b) => ({ ...b, id: `${b.name}-${slot}` })),
);

export default function Hero() {
  return (
    <header className={clsx(styles.hero)}>
      <div className={styles.heroBg} aria-hidden="true" />
      <div className={styles.heroBgGrid} aria-hidden="true" />
      <div className={clsx('container', styles.heroInner)}>
        <div className={styles.heroLeft}>
          <Link to="/docs/migration" className={styles.eyebrow}>
            <span className={styles.eyebrowBadge}>v2</span>
            <span>Now strict TypeScript, dual ESM + CJS, 1.3 kB</span>
            <span className={styles.eyebrowArrow}>→</span>
          </Link>

          <h1 className={styles.title}>
            The browser detector that
            <br />
            <span className={styles.accent}>actually fits in a tweet.</span>
          </h1>

          <p className={styles.subtitle}>
            <code>get-browser</code> answers <strong>which browser?</strong> with a strict
            TypeScript union. <strong>1.3 kB</strong> min+gzip. <strong>Zero</strong> runtime
            dependencies. Works in Node, the browser, edge runtimes, Workers, Deno — same import,
            same call.
          </p>

          <div className={styles.ctaRow}>
            <Link className="button button--primary button--lg" to="/docs/intro">
              Read the docs →
            </Link>
            <Link className="button button--secondary button--lg" to="/playground">
              <span aria-hidden>🧪</span>&nbsp;&nbsp;Live playground
            </Link>
          </div>

          <div className={styles.installRow}>
            <code className={styles.installCmd}>
              <span className={styles.installPrompt}>$</span> pnpm add get-browser
            </code>
            <span className={styles.installAlt}>
              <span>or </span>
              <code>npm</code>
              <span> · </span>
              <code>yarn</code>
              <span> · </span>
              <code>bun</code>
            </span>
          </div>

          <div className={styles.statRow}>
            <div className={styles.stat}>
              <strong>~1.3 kB</strong>
              <span>min+gzip</span>
            </div>
            <div className={styles.stat}>
              <strong>0</strong>
              <span>dependencies</span>
            </div>
            <div className={styles.stat}>
              <strong>168</strong>
              <span>tests · 98% cov</span>
            </div>
            <div className={styles.stat}>
              <strong>8</strong>
              <span>browser families</span>
            </div>
          </div>
        </div>

        <div className={styles.heroRight}>
          <div className={styles.previewGlow} aria-hidden="true" />
          <LiveCodePreview />
        </div>
      </div>

      <div className={styles.strip} role="presentation">
        <div className={styles.stripTrack}>
          {STRIP_ITEMS.map((b) => (
            <span
              key={b.id}
              className={styles.stripChip}
              style={{ '--chip-color': b.color } as React.CSSProperties}
            >
              <span className={styles.stripChipDot} />
              detect() → <code>'{b.name}'</code>
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}

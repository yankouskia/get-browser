import clsx from 'clsx';
import styles from './styles.module.css';

type Feature = {
  icon: string;
  title: string;
  body: React.ReactNode;
};

const FEATURES: Feature[] = [
  {
    icon: '⚡',
    title: 'Tiny by design',
    body: (
      <>
        ~1.5&nbsp;kB min+gzip, zero runtime dependencies, fully tree-shakeable. Importing only{' '}
        <code>isChrome</code> ships nothing else.
      </>
    ),
  },
  {
    icon: '🔒',
    title: 'Strict TypeScript',
    body: (
      <>
        <code>detect()</code> returns the <code>Browser</code> union — never plain{' '}
        <code>string</code>. Exhaustive <code>switch</code> statements compile.
      </>
    ),
  },
  {
    icon: '🖥️',
    title: 'SSR-safe',
    body: (
      <>
        Every detector takes an optional <code>{`{ userAgent, vendor }`}</code>. No{' '}
        <code>window</code> access at import time — runs in Node, Next.js, Remix, Astro, and tests.
      </>
    ),
  },
  {
    icon: '🌐',
    title: 'Covers what ships',
    body: (
      <>
        Chrome, Edge (legacy + Chromium), Firefox, Safari (macOS / iOS / iPadOS), Opera (Presto +
        OPR), IE 6–11, Android WebView — including <code>CriOS</code>, <code>FxiOS</code>,
        <code>EdgiOS</code>.
      </>
    ),
  },
  {
    icon: '📦',
    title: 'Dual ESM + CJS',
    body: (
      <>
        <code>import</code> and <code>require</code> both work. UMD/IIFE bundle (
        <code>GetBrowser</code> global) ships for <code>&lt;script&gt;</code> tags.
      </>
    ),
  },
  {
    icon: '🎯',
    title: 'Honest scope',
    body: (
      <>
        Answers <em>who</em>, not <em>what</em>. For capability gating, use <code>@supports</code>{' '}
        or <code>matchMedia</code>. We only do the part those can't.
      </>
    ),
  },
];

export default function FeatureGrid() {
  return (
    <section className={clsx('container', styles.section)}>
      <h2 className={styles.heading}>Why get-browser?</h2>
      <p className={styles.lede}>
        User-agent sniffing is a pile of caveats, but sometimes you really do need it — to gate a
        polyfill, render a download badge, or tag analytics. <code>get-browser</code> is the small,
        opinionated utility for those cases.
      </p>
      <div className={styles.grid}>
        {FEATURES.map((f) => (
          <div key={f.title} className={styles.card}>
            <span className={styles.icon} aria-hidden="true">
              {f.icon}
            </span>
            <h3 className={styles.cardTitle}>{f.title}</h3>
            <p className={styles.cardBody}>{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

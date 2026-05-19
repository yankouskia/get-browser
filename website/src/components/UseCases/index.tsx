import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './styles.module.css';

type UseCase = {
  emoji: string;
  title: string;
  body: string;
  to: string;
};

const CASES: UseCase[] = [
  {
    emoji: '🔧',
    title: 'Browser-specific workarounds',
    body: 'Patch a Safari scroll-anchor bug. Polyfill `inert` on Firefox iOS. Tell IE 11 to please upgrade.',
    to: '/docs/recipes',
  },
  {
    emoji: '📊',
    title: 'Analytics tagging',
    body: 'Add browser family + engine + form factor to every event. Exhaustive switch means no silent drift.',
    to: '/docs/guides/analytics',
  },
  {
    emoji: '📦',
    title: 'Lazy polyfill loading',
    body: 'Decide at request time whether to ship a 30 kB polyfill. The check is ~400 bytes once tree-shaken.',
    to: '/docs/recipes',
  },
  {
    emoji: '🏗️',
    title: 'Server-side rendering',
    body: 'Read the UA from the request, render the right markup. Works in Next.js, Remix, Astro, Workers, Deno.',
    to: '/docs/guides/ssr',
  },
  {
    emoji: '🖼️',
    title: 'Download / install badges',
    body: '"Install for Chrome" → store. "Install for Firefox" → store. Type-safe lookup, exhaustive at compile.',
    to: '/docs/recipes',
  },
  {
    emoji: '🧪',
    title: 'Test fixtures',
    body: 'Pass an explicit UA — pure, deterministic, no DOM mock. Write tests that pin browser-specific paths.',
    to: '/docs/recipes',
  },
];

export default function UseCases() {
  return (
    <section className={clsx('container', styles.section)}>
      <div className={styles.head}>
        <p className={styles.eyebrow}>USE CASES</p>
        <h2 className={styles.heading}>
          The narrow set of times you <span className={styles.accent}>actually</span> need UA
          sniffing
        </h2>
        <p className={styles.lede}>
          Most of the time, feature detection is the right answer. These are the cases where it
          isn't.
        </p>
      </div>
      <div className={styles.grid}>
        {CASES.map((c) => (
          <Link key={c.title} to={c.to} className={styles.card}>
            <span className={styles.emoji} aria-hidden="true">
              {c.emoji}
            </span>
            <h3 className={styles.cardTitle}>{c.title}</h3>
            <p className={styles.cardBody}>{c.body}</p>
            <span className={styles.cardLink}>Read more →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

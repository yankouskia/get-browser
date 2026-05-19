import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './styles.module.css';

type Framework = {
  name: string;
  to: string;
  svg: React.ReactNode;
};

const FRAMEWORKS: Framework[] = [
  {
    name: 'Next.js',
    to: '/docs/guides/ssr?framework=next-route',
    svg: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="15" fill="currentColor" />
        <path
          d="M11.5 9.5h2v13h-2zm9 0v13l-2 .01L13 12.4v10.1h-2v-13h2l5.5 10.1V9.5z"
          fill="var(--ifm-background-color)"
        />
      </svg>
    ),
  },
  {
    name: 'Remix',
    to: '/docs/guides/ssr?framework=remix',
    svg: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path
          d="M9 7h10c3 0 5 2 5 5 0 2-1 4-3 4 2 0 3 1 3 4v3h-4v-3c0-2-1-3-3-3h-5v6H9z M13 11v4h6c1 0 2-1 2-2s-1-2-2-2z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: 'Astro',
    to: '/docs/guides/ssr?framework=astro',
    svg: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path
          d="M16 4 L26 26 H18 L16 22 L14 26 H6 Z M12 24 a4 2 0 0 0 8 0 a4 4 0 0 1 -8 0 Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: 'Hono',
    to: '/docs/guides/ssr?framework=hono',
    svg: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path
          d="M16 4 C 11 14, 6 16, 6 22 C 6 27, 10 29, 16 29 C 22 29, 26 27, 26 22 C 26 17, 22 14, 19 12 C 18 14, 19 17, 17 18 C 16 16, 17 12, 16 4 Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: 'Workers',
    to: '/docs/guides/ssr?framework=next-edge',
    svg: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path
          d="M8 22 c -2 0 -4 -2 -4 -4 c 0 -3 3 -5 5 -4 c 1 -4 5 -6 9 -5 c 3 1 5 4 5 7 c 3 0 5 2 5 4 c 0 1 -1 2 -3 2 z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: 'Deno',
    to: '/docs/guides/ssr?framework=deno',
    svg: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="13" fill="currentColor" />
        <circle cx="12" cy="12" r="1.6" fill="var(--ifm-background-color)" />
        <path
          d="M6 26 L8 16"
          stroke="var(--ifm-background-color)"
          stroke-width="1.5"
          fill="none"
          stroke-linecap="round"
        />
      </svg>
    ),
  },
  {
    name: 'React',
    to: '/docs/guides/frameworks#react-hook',
    svg: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="2.4" fill="currentColor" />
        <g fill="none" stroke="currentColor" stroke-width="1.5">
          <ellipse cx="16" cy="16" rx="12" ry="4.5" />
          <ellipse cx="16" cy="16" rx="12" ry="4.5" transform="rotate(60 16 16)" />
          <ellipse cx="16" cy="16" rx="12" ry="4.5" transform="rotate(120 16 16)" />
        </g>
      </svg>
    ),
  },
  {
    name: 'Vue',
    to: '/docs/guides/frameworks#vue-3-composable',
    svg: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M4 6 H10 L16 16 L22 6 H28 L16 26 Z" fill="currentColor" />
        <path d="M11 6 H16 L13.5 10 Z" fill="var(--ifm-background-color)" />
      </svg>
    ),
  },
  {
    name: 'Svelte',
    to: '/docs/guides/frameworks#svelte-5-store',
    svg: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path
          d="M22 5 C 19 4, 13 5, 10 9 C 6 14, 7 19, 10 22 C 13 25, 18 25, 22 21 C 26 17, 26 12, 22 5 Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: 'Solid',
    to: '/docs/guides/frameworks#solid-signal',
    svg: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M6 12 C 10 8, 22 8, 26 12 C 22 15, 10 15, 6 12 Z" fill="currentColor" />
        <path
          d="M6 18 C 10 14, 22 14, 26 18 C 22 21, 10 21, 6 18 Z"
          fill="currentColor"
          opacity="0.7"
        />
        <path
          d="M6 24 C 10 20, 22 20, 26 24 C 22 27, 10 27, 6 24 Z"
          fill="currentColor"
          opacity="0.4"
        />
      </svg>
    ),
  },
];

export default function FrameworkStrip() {
  return (
    <section className={clsx('container', styles.section)}>
      <div className={styles.head}>
        <span className={styles.tag}>BUILT FOR</span>
        <h2 className={styles.heading}>First-class support for every framework you ship with</h2>
        <p className={styles.lede}>
          The library is platform-neutral — same imports, same call shape — and ships dedicated
          recipes for the runtimes and frameworks you actually use.
        </p>
      </div>
      <div className={styles.grid}>
        {FRAMEWORKS.map((f) => (
          <Link key={f.name} to={f.to} className={styles.chip} aria-label={`${f.name} recipe`}>
            <span className={styles.icon}>{f.svg}</span>
            <span className={styles.name}>{f.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

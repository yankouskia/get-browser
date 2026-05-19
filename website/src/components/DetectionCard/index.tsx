import BrowserOnly from '@docusaurus/BrowserOnly';
import clsx from 'clsx';
import {
  type Browser,
  detect,
  isAndroid,
  isChrome,
  isEdge,
  isFirefox,
  isIE,
  isMobile,
  isOpera,
  isSafari,
} from 'get-browser';
import { useMemo, useState } from 'react';
import styles from './styles.module.css';

type PredicateRow = readonly [name: string, fn: (opts: { userAgent: string }) => boolean];

const PREDICATES: readonly PredicateRow[] = [
  ['isChrome', isChrome],
  ['isEdge', isEdge],
  ['isFirefox', isFirefox],
  ['isSafari', isSafari],
  ['isOpera', isOpera],
  ['isIE', isIE],
  ['isAndroid', isAndroid],
  ['isMobile', isMobile],
];

const BROWSER_EMOJI: Record<Browser, string> = {
  chrome: '🟢',
  edge: '🔵',
  firefox: '🦊',
  safari: '🧭',
  opera: '🔴',
  ie: '🪟',
  android: '🤖',
  unknown: '❓',
};

const BROWSER_LABEL: Record<Browser, string> = {
  chrome: 'Google Chrome',
  edge: 'Microsoft Edge',
  firefox: 'Mozilla Firefox',
  safari: 'Apple Safari',
  opera: 'Opera',
  ie: 'Internet Explorer',
  android: 'Android WebView',
  unknown: 'Unknown / bot',
};

type Sample = { label: string; ua: string; tag?: string };

const SAMPLE_UAS: readonly Sample[] = [
  { label: '🔍 Your real user-agent', ua: '', tag: 'live' },
  {
    label: 'Chrome 140 · macOS',
    tag: 'chrome',
    ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
  },
  {
    label: 'Edge 140 · Windows 11',
    tag: 'edge',
    ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0',
  },
  {
    label: 'Firefox 138 · macOS',
    tag: 'firefox',
    ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14.0; rv:138.0) Gecko/20100101 Firefox/138.0',
  },
  {
    label: 'Safari 18 · iPhone',
    tag: 'safari',
    ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.4 Mobile/15E148 Safari/604.1',
  },
  {
    label: 'Safari 18 · iPad',
    tag: 'safari',
    ua: 'Mozilla/5.0 (iPad; CPU OS 18_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.4 Mobile/15E148 Safari/604.1',
  },
  {
    label: 'Chrome 140 · Android 15',
    tag: 'chrome',
    ua: 'Mozilla/5.0 (Linux; Android 15; Pixel 9 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Mobile Safari/537.36',
  },
  {
    label: 'Opera 117 · desktop',
    tag: 'opera',
    ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 OPR/117.0.0.0',
  },
  {
    label: 'IE 11 (legacy)',
    tag: 'ie',
    ua: 'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko',
  },
  {
    label: '🤖 Bot / unknown UA',
    tag: 'unknown',
    ua: 'SomeBot/1.0 (+https://example.test)',
  },
];

function DetectionCardInner() {
  const [selected, setSelected] = useState<string>('');
  const [override, setOverride] = useState<string>('');

  const activeUA = useMemo(() => {
    if (selected === '') return override;
    return selected;
  }, [selected, override]);

  // Empty UA = read from real navigator.
  const opts = activeUA ? { userAgent: activeUA } : undefined;
  const browser: Browser = detect(opts);
  const mobile = isMobile(opts);

  return (
    <div className={styles.card}>
      {/* live indicator strip */}
      <div className={styles.liveStrip}>
        <span className={styles.liveDot} aria-hidden="true" />
        <span className={styles.liveLabel}>LIVE</span>
        <span className={styles.liveSub}>
          {activeUA ? 'using selected UA' : `reading navigator.userAgent`}
        </span>
      </div>

      <div className={styles.headerRow}>
        <div className={styles.headerLeft}>
          <span className={styles.emoji} aria-hidden="true">
            {BROWSER_EMOJI[browser]}
          </span>
          <div>
            <p className={styles.label}>detect() →</p>
            <p className={styles.value}>
              <code>{`'${browser}'`}</code>
            </p>
            <p className={styles.subValue}>{BROWSER_LABEL[browser]}</p>
          </div>
        </div>
        <span
          className={clsx(styles.mobileBadge, {
            [styles.mobileBadgeOn]: mobile,
          })}
        >
          {mobile ? '📱 mobile' : '🖥️ desktop'}
        </span>
      </div>

      <div className={styles.predicateGrid}>
        {PREDICATES.map(([name, fn]) => {
          const value = fn(opts ?? { userAgent: '' });
          return (
            <div
              key={name}
              className={clsx(styles.predicate, {
                [styles.predicateOn]: value,
              })}
            >
              <code>{name}()</code>
              <span>{value ? '✓ true' : 'false'}</span>
            </div>
          );
        })}
      </div>

      <div className={styles.controls}>
        <label htmlFor="ua-preset" className={styles.controlLabel}>
          Pick a sample UA
        </label>
        <select
          id="ua-preset"
          className={styles.select}
          value={selected}
          onChange={(e) => {
            setSelected(e.target.value);
            setOverride('');
          }}
        >
          {SAMPLE_UAS.map((s) => (
            <option key={s.label} value={s.ua}>
              {s.label}
            </option>
          ))}
        </select>

        <label htmlFor="ua-custom" className={styles.controlLabel}>
          Or paste your own
        </label>
        <textarea
          id="ua-custom"
          className={styles.textarea}
          rows={3}
          placeholder="Mozilla/5.0 (…)"
          value={selected === '' ? override : selected}
          onChange={(e) => {
            setSelected('');
            setOverride(e.target.value);
          }}
        />
        <p className={styles.helper}>
          Leave both empty to detect against your real <code>navigator.userAgent</code>.
        </p>
      </div>
    </div>
  );
}

export default function DetectionCard() {
  return (
    <BrowserOnly fallback={<div className={styles.fallback}>Loading detection…</div>}>
      {() => <DetectionCardInner />}
    </BrowserOnly>
  );
}

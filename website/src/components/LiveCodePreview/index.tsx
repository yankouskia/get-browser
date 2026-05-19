import CodeBlock from '@theme/CodeBlock';
import clsx from 'clsx';
import { useState } from 'react';
import styles from './styles.module.css';

type Tab = {
  id: string;
  label: string;
  icon: string;
  filename: string;
  code: string;
  output: string;
};

const TABS: Tab[] = [
  {
    id: 'detect',
    label: 'detect',
    icon: '🎯',
    filename: 'detect.ts',
    code: `import { detect, browsers } from 'get-browser';

const browser = detect();
//    ^? Browser = 'chrome' | 'edge' | 'firefox' | ...

if (browser === browsers.SAFARI) {
  patchSafariScrollBug();
}`,
    output: `→ 'chrome'`,
  },
  {
    id: 'predicates',
    label: 'predicates',
    icon: '✅',
    filename: 'mobile.ts',
    code: `import { isMobile, isChrome, isSafari } from 'get-browser';

if (isMobile() && !isChrome()) {
  showNonChromeMobileBanner();
}

if (isSafari() && isMobile()) {
  applyMobileSafariFix();
}`,
    output: `isMobile()  → true
isSafari()  → true`,
  },
  {
    id: 'ssr',
    label: 'ssr',
    icon: '🏗️',
    filename: 'route.ts',
    code: `// Next.js Edge runtime
export const runtime = 'edge';

import { detect } from 'get-browser';

export function GET(req: Request) {
  const ua = req.headers.get('user-agent') ?? '';
  return Response.json({
    browser: detect({ userAgent: ua }),
  });
}`,
    output: `{ "browser": "chrome" }`,
  },
  {
    id: 'analytics',
    label: 'analytics',
    icon: '📊',
    filename: 'tracker.ts',
    code: `import { type Browser, detect } from 'get-browser';

const engineOf = (b: Browser) =>
  ({
    chrome: 'chromium', edge: 'chromium', opera: 'chromium',
    firefox: 'gecko',   safari: 'webkit',
    ie: 'trident',      android: 'legacy-webkit',
    unknown: 'unknown',
  } as const)[b];

analytics.track('page_view', {
  engine: engineOf(detect()),
});`,
    output: `track: { engine: 'chromium' }`,
  },
  {
    id: 'umd',
    label: '<script>',
    icon: '🌐',
    filename: 'index.html',
    code: `<!-- No bundler? No problem. -->
<script src="https://unpkg.com/get-browser/dist/umd/get-browser.global.js"></script>
<script>
  if (GetBrowser.isMobile()) {
    document.body.classList.add('is-mobile');
  }
  console.log(GetBrowser.detect()); // 'chrome'
</script>`,
    output: `body.className → "is-mobile"`,
  },
];

export default function LiveCodePreview() {
  const [activeId, setActiveId] = useState<string>(TABS[0].id);
  const active = TABS.find((t) => t.id === activeId) ?? TABS[0];

  return (
    <div className={styles.frame}>
      <div className={styles.tabBar}>
        <div className={styles.dots}>
          <span className={styles.dot} style={{ background: '#ff5f57' }} />
          <span className={styles.dot} style={{ background: '#febc2e' }} />
          <span className={styles.dot} style={{ background: '#28c840' }} />
        </div>
        <div className={styles.tabs}>
          {TABS.map((t) => (
            <button
              type="button"
              key={t.id}
              className={clsx(styles.tab, { [styles.tabActive]: t.id === activeId })}
              onClick={() => setActiveId(t.id)}
            >
              <span className={styles.tabIcon} aria-hidden="true">
                {t.icon}
              </span>
              {t.label}
            </button>
          ))}
        </div>
        <span className={styles.filename}>{active.filename}</span>
      </div>
      <div className={styles.body}>
        <CodeBlock language={active.id === 'umd' ? 'html' : 'ts'} className={styles.codeBlock}>
          {active.code}
        </CodeBlock>
        <div className={styles.outputRow}>
          <span className={styles.outputDot} aria-hidden="true" />
          <span className={styles.outputLabel}>output</span>
          <pre className={styles.outputValue}>{active.output}</pre>
        </div>
      </div>
    </div>
  );
}

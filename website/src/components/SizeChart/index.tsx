import clsx from 'clsx';
import styles from './styles.module.css';

type Row = {
  name: string;
  kb: number;
  highlight?: boolean;
  note?: string;
};

const DEFAULT_ROWS: Row[] = [
  { name: 'get-browser', kb: 1.5, highlight: true, note: 'this library' },
  { name: 'detect-browser', kb: 2 },
  { name: 'bowser', kb: 7 },
  { name: 'ua-parser-js', kb: 10 },
];

export default function SizeChart({ rows = DEFAULT_ROWS }: { rows?: Row[] }) {
  const max = Math.max(...rows.map((r) => r.kb));
  return (
    <div className={styles.chart} role="img" aria-label="Bundle size comparison in kB min+gzip">
      <div className={styles.head}>
        <span className={styles.tag}>BUNDLE SIZE (min+gzip)</span>
        <span className={styles.scale}>← smaller is better</span>
      </div>
      <ul className={styles.rows}>
        {rows.map((r) => {
          const pct = (r.kb / max) * 100;
          return (
            <li key={r.name} className={clsx(styles.row, { [styles.rowHi]: r.highlight })}>
              <div className={styles.label}>
                <code className={styles.name}>{r.name}</code>
                {r.note && <span className={styles.note}>{r.note}</span>}
              </div>
              <div className={styles.barWrap}>
                <div className={styles.bar} style={{ width: `${pct}%` }}>
                  <span className={styles.barValue}>{r.kb} kB</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

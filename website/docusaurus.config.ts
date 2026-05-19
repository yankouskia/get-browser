import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

const ORG = 'yankouskia';
const REPO = 'get-browser';

const config: Config = {
  title: 'get-browser',
  tagline:
    'Lightweight, SSR-safe browser detection — strict types, dual ESM + CJS, zero dependencies.',
  favicon: 'img/favicon.svg',

  // GitHub Pages deploys at https://yankouskia.github.io/get-browser/
  url: `https://${ORG}.github.io`,
  baseUrl: `/${REPO}/`,
  organizationName: ORG,
  projectName: REPO,
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
          editUrl: `https://github.com/${ORG}/${REPO}/edit/master/website/`,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.png',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'get-browser',
      logo: {
        alt: 'get-browser',
        src: 'img/logo.svg',
        srcDark: 'img/logo.svg',
      },
      items: [
        {
          to: '/docs/intro',
          position: 'left',
          label: 'Docs',
        },
        { to: '/docs/api/detect', label: 'API', position: 'left' },
        { to: '/docs/recipes', label: 'Recipes', position: 'left' },
        { to: '/playground', label: 'Playground', position: 'left' },
        {
          href: 'https://www.npmjs.com/package/get-browser',
          label: 'npm',
          position: 'right',
        },
        {
          href: `https://github.com/${ORG}/${REPO}`,
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'Intro', to: '/docs/intro' },
            { label: 'Installation', to: '/docs/installation' },
            { label: 'Quickstart', to: '/docs/quickstart' },
            { label: 'API reference', to: '/docs/api/detect' },
            { label: 'Recipes', to: '/docs/recipes' },
            { label: 'Browser support', to: '/docs/browser-support' },
            { label: 'Migration v1 → v2', to: '/docs/migration' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'GitHub Discussions', href: `https://github.com/${ORG}/${REPO}/discussions` },
            { label: 'Issues', href: `https://github.com/${ORG}/${REPO}/issues` },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'npm', href: 'https://www.npmjs.com/package/get-browser' },
            {
              label: 'Changelog',
              href: `https://github.com/${ORG}/${REPO}/blob/master/CHANGELOG.md`,
            },
            { label: 'GitHub', href: `https://github.com/${ORG}/${REPO}` },
          ],
        },
      ],
      copyright: `MIT © ${new Date().getFullYear()} yankouskia and get-browser contributors.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'tsx', 'jsx'],
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    metadata: [
      {
        name: 'keywords',
        content: 'browser detection, user-agent, typescript, ssr, react, nextjs, get-browser',
      },
    ],
  } satisfies Preset.ThemeConfig,
};

export default config;

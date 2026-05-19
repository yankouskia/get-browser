import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    'intro',
    {
      type: 'category',
      label: 'Getting started',
      collapsed: false,
      items: ['installation', 'quickstart'],
    },
    {
      type: 'category',
      label: 'API reference',
      link: { type: 'generated-index', title: 'API reference', slug: '/api' },
      collapsed: false,
      items: [
        'api/detect',
        'api/is-chrome',
        'api/is-edge',
        'api/is-firefox',
        'api/is-safari',
        'api/is-opera',
        'api/is-ie',
        'api/is-android',
        'api/is-mobile',
        'api/browsers',
        'api/types',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      collapsed: false,
      items: ['guides/ssr', 'guides/frameworks', 'guides/analytics', 'guides/feature-vs-ua'],
    },
    'recipes',
    'browser-support',
    'comparison',
    'migration',
    'faq',
  ],
};

export default sidebars;

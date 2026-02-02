// @ts-check

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Maximo 實戰',
  tagline: '從開發到上線的完整指南',
  favicon: 'img/favicon.ico',

  url: 'https://nick0918964388.github.io',
  baseUrl: '/maximo-practice/',

  organizationName: 'nick0918964388',
  projectName: 'maximo-practice',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'zh-Hant',
    locales: ['zh-Hant'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/nick0918964388/maximo-practice/edit/main/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Maximo 實戰',
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: '教學文件',
          },
          {
            href: 'https://github.com/nick0918964388/maximo-practice',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [],
        copyright: `Copyright © ${new Date().getFullYear()} Maximo 實戰. Built with Docusaurus.`,
      },
    }),
};

module.exports = config;

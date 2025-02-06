/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://www.stockpluspro.shop',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ['/dashboard/*'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/dashboard/'] },
    ],
  },
  additionalPaths: async () => [
    {
      loc: '/',
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 1.0,
    },
  ],
};

module.exports = config;

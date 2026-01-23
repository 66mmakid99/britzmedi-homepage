// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://britzmedi-homepage.pages.dev',
  output: 'static',
  build: {
    format: 'directory',
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'ko',
        locales: {
          ko: 'ko-KR',
          en: 'en-US',
        },
      },
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) => !page.includes('/admin'),
    }),
  ],
  vite: {
    build: {
      cssMinify: true,
    },
  },
});

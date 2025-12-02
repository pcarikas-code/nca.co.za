import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base URL of the website
const BASE_URL = 'https://nca.co.za';

// Static routes
const staticRoutes = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/the-act', changefreq: 'monthly', priority: 0.8 },
  { url: '/news', changefreq: 'weekly', priority: 0.8 },
  { url: '/debt-counsellors', changefreq: 'weekly', priority: 0.9 },
  { url: '/faq', changefreq: 'monthly', priority: 0.7 },
];

// Read news data
const newsDataPath = path.join(__dirname, 'client/src/data/news.json');
const newsData = JSON.parse(fs.readFileSync(newsDataPath, 'utf-8'));

// Generate dynamic news routes
const newsRoutes = newsData.map((article) => ({
  url: `/news/${article.id}`,
  changefreq: 'monthly',
  priority: 0.6,
  lastmod: new Date(article.date).toISOString().split('T')[0] // Convert "Sep 12, 2025" to YYYY-MM-DD
}));

// Combine all routes
const allRoutes = [...staticRoutes, ...newsRoutes];

// Generate XML content
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map((route) => {
    return `  <url>
    <loc>${BASE_URL}${route.url}</loc>
    <lastmod>${route.lastmod || new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

// Write sitemap.xml to public folder
const outputPath = path.join(__dirname, 'client/public/sitemap.xml');
fs.writeFileSync(outputPath, sitemapContent);

console.log(`Sitemap generated successfully at ${outputPath}`);
console.log(`Total URLs: ${allRoutes.length}`);

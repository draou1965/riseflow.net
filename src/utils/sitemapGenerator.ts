import { Article } from '../types';

export interface SitemapEntry {
  path: string;
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  title?: string;
  type: 'page' | 'tool' | 'article' | 'legal';
  imageUrl?: string;
}

/**
 * Resolves the primary base URL of the website
 */
export function getSiteBaseUrl(customBaseUrl?: string): string {
  if (customBaseUrl && customBaseUrl.trim()) {
    return customBaseUrl.replace(/\/+$/, '');
  }
  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    return window.location.origin;
  }
  return 'https://careerai.app';
}

/**
 * Returns the static application routes that should be indexed
 */
export function getStaticRoutes(baseUrl?: string): SitemapEntry[] {
  const base = getSiteBaseUrl(baseUrl);
  const today = new Date().toISOString().split('T')[0];

  return [
    {
      path: '/',
      url: `${base}/`,
      lastmod: today,
      changefreq: 'daily',
      priority: 1.0,
      title: 'الرئيسية | RiseFlow منصة التوظيف الذكية',
      type: 'page'
    },
    {
      path: '/tools',
      url: `${base}/tools`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.9,
      title: 'جميع أدوات الذكاء الاصطناعي المهنية',
      type: 'page'
    },
    {
      path: '/tools/resume-builder',
      url: `${base}/tools/resume-builder`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.95,
      title: 'منشئ السيرة الذاتية الذكي المتوافق مع ATS',
      type: 'tool'
    },
    {
      path: '/tools/ats-keywords',
      url: `${base}/tools/ats-keywords`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.95,
      title: 'مستخرج ومطابق الكلمات المفتاحية لأنظمة ATS',
      type: 'tool'
    },
    {
      path: '/tools/resume-analyzer',
      url: `${base}/tools/resume-analyzer`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.95,
      title: 'فاحص ومحلل توافق السيرة الذاتية مع ATS',
      type: 'tool'
    },
    {
      path: '/tools/cover-letter-generator',
      url: `${base}/tools/cover-letter-generator`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.9,
      title: 'مولد رسائل التقديم والخطاب التعريفي الذكي',
      type: 'tool'
    },
    {
      path: '/blog',
      url: `${base}/blog`,
      lastmod: today,
      changefreq: 'daily',
      priority: 0.85,
      title: 'المدونة المهنية ومقالات التوظيف',
      type: 'page'
    },
    {
      path: '/about',
      url: `${base}/about`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.6,
      title: 'من نحن | RiseFlow',
      type: 'page'
    },
    {
      path: '/contact',
      url: `${base}/contact`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.6,
      title: 'تواصل معنا | RiseFlow',
      type: 'page'
    },
    {
      path: '/privacy',
      url: `${base}/privacy`,
      lastmod: today,
      changefreq: 'yearly',
      priority: 0.4,
      title: 'سياسة الخصوصية',
      type: 'legal'
    },
    {
      path: '/terms',
      url: `${base}/terms`,
      lastmod: today,
      changefreq: 'yearly',
      priority: 0.4,
      title: 'شروط الاستخدام',
      type: 'legal'
    }
  ];
}

/**
 * Returns dynamic sitemap entries for all published articles
 */
export function getArticleRoutes(articles: Article[], baseUrl?: string): SitemapEntry[] {
  const base = getSiteBaseUrl(baseUrl);

  return articles
    .filter(article => article.status === 'published')
    .map(article => {
      // Ensure date format is YYYY-MM-DD
      let formattedDate = new Date().toISOString().split('T')[0];
      if (article.updatedAt) {
        formattedDate = article.updatedAt.split('T')[0];
      } else if (article.publishedAt) {
        formattedDate = article.publishedAt.split('T')[0];
      }

      return {
        path: `/blog/${article.slug}`,
        url: `${base}/blog/${encodeURIComponent(article.slug)}`,
        lastmod: formattedDate,
        changefreq: 'weekly',
        priority: 0.8,
        title: article.title,
        type: 'article',
        imageUrl: article.coverImage
      };
    });
}

/**
 * Combines static and dynamic entries
 */
export function getAllSitemapEntries(articles: Article[], baseUrl?: string): SitemapEntry[] {
  const staticRoutes = getStaticRoutes(baseUrl);
  const articleRoutes = getArticleRoutes(articles, baseUrl);
  return [...staticRoutes, ...articleRoutes];
}

/**
 * Escapes XML special characters
 */
function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

/**
 * Generates dynamic, standard-compliant XML sitemap string
 */
export function generateSitemapXml(articles: Article[], baseUrl?: string): string {
  const entries = getAllSitemapEntries(articles, baseUrl);

  const xmlUrls = entries
    .map(entry => {
      let imageXml = '';
      if (entry.imageUrl && entry.imageUrl.startsWith('http')) {
        imageXml = `
    <image:image>
      <image:loc>${escapeXml(entry.imageUrl)}</image:loc>
      <image:title>${escapeXml(entry.title || '')}</image:title>
    </image:image>`;
      }

      return `  <url>
    <loc>${escapeXml(entry.url)}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(2)}</priority>${imageXml}
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${xmlUrls}
</urlset>`.trim();
}

/**
 * Generates standard robots.txt content with dynamic Sitemap declaration
 */
export function generateRobotsTxt(baseUrl?: string): string {
  const base = getSiteBaseUrl(baseUrl);
  return `# RiseFlow Robots.txt
User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/*

# Sitemap index
Sitemap: ${base}/sitemap.xml
`.trim();
}

/**
 * Triggers file download of the generated sitemap in browser
 */
export function downloadSitemapXml(articles: Article[], baseUrl?: string, filename = 'sitemap.xml'): void {
  const xmlContent = generateSitemapXml(articles, baseUrl);
  const blob = new Blob([xmlContent], { type: 'application/xml;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}

/**
 * Triggers file download of robots.txt in browser
 */
export function downloadRobotsTxt(baseUrl?: string, filename = 'robots.txt'): void {
  const content = generateRobotsTxt(baseUrl);
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}

/**
 * Copies the raw sitemap XML to clipboard
 */
export async function copySitemapToClipboard(articles: Article[], baseUrl?: string): Promise<boolean> {
  try {
    const xmlContent = generateSitemapXml(articles, baseUrl);
    await navigator.clipboard.writeText(xmlContent);
    return true;
  } catch (err) {
    console.error('Failed to copy sitemap XML to clipboard:', err);
    return false;
  }
}

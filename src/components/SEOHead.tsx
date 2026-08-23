import React, { useEffect } from 'react';

export interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
  ogType?: 'website' | 'article' | 'product';
  ogImage?: string;
  publishedTime?: string;
  author?: string;
  schemaJson?: object | object[];
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  canonicalPath = '/',
  ogType = 'website',
  ogImage = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&auto=format&fit=crop&q=80',
  publishedTime,
  author = 'فريق خبراء CareerAI',
  schemaJson
}) => {
  useEffect(() => {
    // 1. Update Title
    const fullTitle = title.includes('CareerAI') ? title : `${title} | CareerAI`;
    document.title = fullTitle;

    // Helper to create or update meta tag
    const setMetaTag = (attrName: string, attrVal: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', description);
    if (keywords) {
      setMetaTag('name', 'keywords', keywords);
    }

    // 3. Open Graph Tags
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:image', ogImage);
    const siteUrl = window.location.origin + canonicalPath;
    setMetaTag('property', 'og:url', siteUrl);
    setMetaTag('property', 'og:site_name', 'CareerAI');
    setMetaTag('property', 'og:locale', 'ar_AR');

    if (publishedTime) {
      setMetaTag('property', 'article:published_time', publishedTime);
    }
    if (author) {
      setMetaTag('property', 'article:author', author);
    }

    // 4. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage);

    // 5. Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', siteUrl);

    // 6. Schema.org JSON-LD Script Injection
    const existingSchemaScript = document.getElementById('careerai-schema-jsonld');
    if (existingSchemaScript) {
      existingSchemaScript.remove();
    }

    if (schemaJson) {
      const script = document.createElement('script');
      script.id = 'careerai-schema-jsonld';
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify(schemaJson);
      document.head.appendChild(script);
    }

    return () => {
      // Cleanup schema tag on unmount if needed
      const currentSchema = document.getElementById('careerai-schema-jsonld');
      if (currentSchema) {
        currentSchema.remove();
      }
    };
  }, [title, description, keywords, canonicalPath, ogType, ogImage, publishedTime, author, schemaJson]);

  return null;
};

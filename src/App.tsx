import React, { useState, useEffect } from 'react';
import { BlogProvider, useBlog } from './context/BlogContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ToolsPage } from './pages/ToolsPage';
import { ResumeBuilderPage } from './pages/ResumeBuilderPage';
import { ResumeAnalyzerPage } from './pages/ResumeAnalyzerPage';
import { CoverLetterGeneratorPage } from './pages/CoverLetterGeneratorPage';
import { AtsKeywordPage } from './pages/AtsKeywordPage';
import { BlogPage } from './pages/BlogPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { SitemapPage } from './pages/SitemapPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboardHome } from './pages/admin/AdminDashboardHome';
import { AdminArticlesList } from './pages/admin/AdminArticlesList';
import { AdminArticleEditor } from './pages/admin/AdminArticleEditor';
import { AdminCategories } from './pages/admin/AdminCategories';
import { AdminSettings } from './pages/admin/AdminSettings';

function AppRouter() {
  const { isAdminAuthenticated } = useBlog();
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname + window.location.search || '/';
    }
    return '/';
  });

  // Listen to popstate for browser forward/back buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname + window.location.search || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const pathWithoutQuery = currentPath.split('?')[0];
  const searchParams = new URLSearchParams(currentPath.includes('?') ? currentPath.split('?')[1] : '');

  // Route matching logic
  const renderContent = () => {
    // 1. Admin Routes
    if (pathWithoutQuery.startsWith('/admin')) {
      if (pathWithoutQuery === '/admin/login') {
        return <AdminLoginPage navigate={navigate} />;
      }

      // If not authenticated, redirect to /admin/login
      if (!isAdminAuthenticated) {
        return <AdminLoginPage navigate={navigate} />;
      }

      // Inside Admin Dashboard
      if (pathWithoutQuery === '/admin' || pathWithoutQuery === '/admin/dashboard') {
        return (
          <AdminLayout currentPath={pathWithoutQuery} navigate={navigate}>
            <AdminDashboardHome navigate={navigate} />
          </AdminLayout>
        );
      }

      if (pathWithoutQuery === '/admin/articles') {
        return (
          <AdminLayout currentPath={pathWithoutQuery} navigate={navigate}>
            <AdminArticlesList navigate={navigate} />
          </AdminLayout>
        );
      }

      if (pathWithoutQuery === '/admin/articles/new') {
        return (
          <AdminLayout currentPath={pathWithoutQuery} navigate={navigate}>
            <AdminArticleEditor navigate={navigate} />
          </AdminLayout>
        );
      }

      if (pathWithoutQuery.startsWith('/admin/articles/edit/')) {
        const articleId = pathWithoutQuery.replace('/admin/articles/edit/', '');
        return (
          <AdminLayout currentPath={pathWithoutQuery} navigate={navigate}>
            <AdminArticleEditor articleId={articleId} navigate={navigate} />
          </AdminLayout>
        );
      }

      if (pathWithoutQuery === '/admin/categories') {
        return (
          <AdminLayout currentPath={pathWithoutQuery} navigate={navigate}>
            <AdminCategories navigate={navigate} />
          </AdminLayout>
        );
      }

      if (pathWithoutQuery === '/admin/settings') {
        return (
          <AdminLayout currentPath={pathWithoutQuery} navigate={navigate}>
            <AdminSettings />
          </AdminLayout>
        );
      }

      // Default admin fallback
      return (
        <AdminLayout currentPath="/admin" navigate={navigate}>
          <AdminDashboardHome navigate={navigate} />
        </AdminLayout>
      );
    }

    // 2. Visitor Dynamic Single Article Route (/blog/:slug)
    if (pathWithoutQuery.startsWith('/blog/') && pathWithoutQuery !== '/blog') {
      const slug = pathWithoutQuery.replace('/blog/', '');
      return (
        <div className="min-h-screen flex flex-col bg-slate-50">
          <Navbar currentPath={pathWithoutQuery} navigate={navigate} />
          <div className="flex-1">
            <ArticleDetailPage slug={slug} navigate={navigate} />
          </div>
          <Footer navigate={navigate} />
        </div>
      );
    }

    // 3. Visitor Standard Pages
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar currentPath={pathWithoutQuery} navigate={navigate} />
        
        <main className="flex-1">
          {pathWithoutQuery === '/' && <HomePage navigate={navigate} />}
          {pathWithoutQuery === '/tools' && <ToolsPage navigate={navigate} />}
          {pathWithoutQuery === '/tools/resume-builder' && <ResumeBuilderPage navigate={navigate} />}
          {pathWithoutQuery === '/tools/resume-analyzer' && <ResumeAnalyzerPage navigate={navigate} />}
          {pathWithoutQuery === '/tools/cover-letter-generator' && <CoverLetterGeneratorPage navigate={navigate} />}
          {pathWithoutQuery === '/tools/ats-keywords' && <AtsKeywordPage navigate={navigate} />}
          {pathWithoutQuery === '/blog' && (
            <BlogPage 
              navigate={navigate} 
              initialSearchQuery={searchParams.get('q') || ''} 
              initialCategory={searchParams.get('category') || 'all'}
            />
          )}
          {pathWithoutQuery === '/about' && <AboutPage navigate={navigate} />}
          {pathWithoutQuery === '/contact' && <ContactPage />}
          {pathWithoutQuery === '/privacy' && <PrivacyPage />}
          {pathWithoutQuery === '/terms' && <TermsPage />}
          {(pathWithoutQuery === '/sitemap' || pathWithoutQuery === '/sitemap.xml' || pathWithoutQuery === '/robots.txt') && (
            <SitemapPage navigate={navigate} />
          )}
        </main>

        <Footer navigate={navigate} />
      </div>
    );
  };

  return <>{renderContent()}</>;
}

export default function App() {
  return (
    <BlogProvider>
      <AppRouter />
    </BlogProvider>
  );
}

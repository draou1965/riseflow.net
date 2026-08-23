import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { Article, Category, SiteSettings } from '../types';
import { INITIAL_ARTICLES, INITIAL_CATEGORIES, INITIAL_SETTINGS } from '../data/initialData';

interface BlogContextType {
  articles: Article[];
  categories: Category[];
  settings: SiteSettings;
  isAdminAuthenticated: boolean;
  adminUser: { email: string; name: string } | null;
  // Article CRUD
  addArticle: (data: Omit<Article, 'id' | 'viewsCount' | 'likesCount' | 'updatedAt'>) => Promise<Article>;
  updateArticle: (id: string, updates: Partial<Article>) => Promise<Article>;
  deleteArticle: (id: string) => Promise<boolean>;
  toggleArticleStatus: (id: string) => Promise<void>;
  getArticleBySlug: (slug: string) => Article | undefined;
  incrementArticleViews: (id: string) => void;
  incrementArticleLikes: (id: string) => void;
  // Category CRUD
  addCategory: (data: Omit<Category, 'id'>) => Promise<Category>;
  updateCategory: (id: string, updates: Partial<Category>) => Promise<Category>;
  deleteCategory: (id: string) => Promise<boolean>;
  // Admin Auth
  loginAdmin: (password: string, email?: string) => boolean;
  logoutAdmin: () => void;
  // Settings
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  // Stats
  stats: {
    totalArticles: number;
    publishedCount: number;
    draftsCount: number;
    totalCategories: number;
    totalViews: number;
    totalLikes: number;
  };
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

const ARTICLES_STORAGE_KEY = 'careerai_articles_v2';
const CATEGORIES_STORAGE_KEY = 'careerai_categories_v2';
const SETTINGS_STORAGE_KEY = 'careerai_settings_v2';
const ADMIN_AUTH_KEY = 'careerai_admin_session_v2';

export const BlogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Articles state
  const [articles, setArticles] = useState<Article[]>(() => {
    try {
      const saved = localStorage.getItem(ARTICLES_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading articles from localStorage', e);
    }
    return INITIAL_ARTICLES;
  });

  // Categories state
  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem(CATEGORIES_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading categories from localStorage', e);
    }
    return INITIAL_CATEGORIES;
  });

  // Settings state
  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading settings from localStorage', e);
    }
    return INITIAL_SETTINGS;
  });

  // Admin Auth state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [adminUser, setAdminUser] = useState<{ email: string; name: string } | null>(() => {
    if (isAdminAuthenticated) {
      return { email: 'admin@careerai.com', name: 'مدير المنصة' };
    }
    return null;
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(articles));
    } catch (e) {
      console.error('Failed to save articles to localStorage', e);
    }
  }, [articles]);

  useEffect(() => {
    try {
      localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
    } catch (e) {
      console.error('Failed to save categories to localStorage', e);
    }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings to localStorage', e);
    }
  }, [settings]);

  // Article Methods
  const addArticle = async (data: Omit<Article, 'id' | 'viewsCount' | 'likesCount' | 'updatedAt'>): Promise<Article> => {
    const category = categories.find(c => c.id === data.categoryId);
    const newArticle: Article = {
      ...data,
      id: `art-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      categoryName: category ? category.name : 'عام',
      viewsCount: 0,
      likesCount: 0,
      updatedAt: new Date().toISOString().split('T')[0],
      publishedAt: data.publishedAt || new Date().toISOString().split('T')[0],
      readingTimeMinutes: data.readingTimeMinutes || Math.max(2, Math.ceil(data.content.split(/\s+/).length / 150))
    };

    setArticles(prev => [newArticle, ...prev]);
    return newArticle;
  };

  const updateArticle = async (id: string, updates: Partial<Article>): Promise<Article> => {
    let updatedArticle: Article | undefined;
    setArticles(prev =>
      prev.map(art => {
        if (art.id === id) {
          const category = updates.categoryId 
            ? categories.find(c => c.id === updates.categoryId) 
            : categories.find(c => c.id === art.categoryId);
          
          updatedArticle = {
            ...art,
            ...updates,
            categoryName: category ? category.name : art.categoryName,
            updatedAt: new Date().toISOString().split('T')[0]
          };
          return updatedArticle;
        }
        return art;
      })
    );

    if (!updatedArticle) {
      throw new Error('المقال غير موجود');
    }
    return updatedArticle;
  };

  const deleteArticle = async (id: string): Promise<boolean> => {
    setArticles(prev => prev.filter(art => art.id !== id));
    return true;
  };

  const toggleArticleStatus = async (id: string): Promise<void> => {
    setArticles(prev =>
      prev.map(art => {
        if (art.id === id) {
          return {
            ...art,
            status: art.status === 'published' ? 'draft' : 'published',
            updatedAt: new Date().toISOString().split('T')[0]
          };
        }
        return art;
      })
    );
  };

  const getArticleBySlug = (slug: string): Article | undefined => {
    return articles.find(art => art.slug === slug);
  };

  const incrementArticleViews = (id: string) => {
    setArticles(prev =>
      prev.map(art => (art.id === id ? { ...art, viewsCount: art.viewsCount + 1 } : art))
    );
  };

  const incrementArticleLikes = (id: string) => {
    setArticles(prev =>
      prev.map(art => (art.id === id ? { ...art, likesCount: art.likesCount + 1 } : art))
    );
  };

  // Category Methods
  const addCategory = async (data: Omit<Category, 'id'>): Promise<Category> => {
    const newCategory: Category = {
      ...data,
      id: `cat-${Date.now()}`
    };
    setCategories(prev => [...prev, newCategory]);
    return newCategory;
  };

  const updateCategory = async (id: string, updates: Partial<Category>): Promise<Category> => {
    let updatedCat: Category | undefined;
    setCategories(prev =>
      prev.map(cat => {
        if (cat.id === id) {
          updatedCat = { ...cat, ...updates };
          return updatedCat;
        }
        return cat;
      })
    );

    // Also update categoryName in articles
    if (updates.name) {
      setArticles(prev =>
        prev.map(art => (art.categoryId === id ? { ...art, categoryName: updates.name! } : art))
      );
    }

    if (!updatedCat) {
      throw new Error('التصنيف غير موجود');
    }
    return updatedCat;
  };

  const deleteCategory = async (id: string): Promise<boolean> => {
    // Check if any articles use this category
    const hasArticles = articles.some(art => art.categoryId === id);
    if (hasArticles) {
      // Reassign to first available category or 'عام'
      const fallbackCat = categories.find(c => c.id !== id);
      if (fallbackCat) {
        setArticles(prev =>
          prev.map(art =>
            art.categoryId === id
              ? { ...art, categoryId: fallbackCat.id, categoryName: fallbackCat.name }
              : art
          )
        );
      }
    }
    setCategories(prev => prev.filter(cat => cat.id !== id));
    return true;
  };

  // Admin Auth Methods
  const loginAdmin = (password: string, email?: string): boolean => {
    // Admin password check: 'admin123' or 'careerai2026' or 'admin'
    const validPasswords = ['admin123', 'admin', 'careerai2026', '123456'];
    if (validPasswords.includes(password.trim())) {
      setIsAdminAuthenticated(true);
      setAdminUser({
        email: email || 'admin@careerai.com',
        name: 'مدير المنصة'
      });
      localStorage.setItem(ADMIN_AUTH_KEY, 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    setAdminUser(null);
    localStorage.removeItem(ADMIN_AUTH_KEY);
  };

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  // Derived stats
  const stats = useMemo(() => {
    const totalArticles = articles.length;
    const publishedCount = articles.filter(a => a.status === 'published').length;
    const draftsCount = articles.filter(a => a.status === 'draft').length;
    const totalCategories = categories.length;
    const totalViews = articles.reduce((acc, curr) => acc + (curr.viewsCount || 0), 0);
    const totalLikes = articles.reduce((acc, curr) => acc + (curr.likesCount || 0), 0);

    return {
      totalArticles,
      publishedCount,
      draftsCount,
      totalCategories,
      totalViews,
      totalLikes
    };
  }, [articles, categories]);

  return (
    <BlogContext.Provider
      value={{
        articles,
        categories,
        settings,
        isAdminAuthenticated,
        adminUser,
        addArticle,
        updateArticle,
        deleteArticle,
        toggleArticleStatus,
        getArticleBySlug,
        incrementArticleViews,
        incrementArticleLikes,
        addCategory,
        updateCategory,
        deleteCategory,
        loginAdmin,
        logoutAdmin,
        updateSettings,
        stats
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = (): BlogContextType => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};

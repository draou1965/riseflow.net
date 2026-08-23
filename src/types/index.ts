export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  iconName?: string;
  articlesCount?: number;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  categoryId: string;
  categoryName: string;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  status: 'published' | 'draft';
  publishedAt: string;
  updatedAt: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  readingTimeMinutes: number;
  viewsCount: number;
  likesCount: number;
  featured?: boolean;
}

export interface ToolItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'cv' | 'interview' | 'search' | 'ats' | 'networking';
  badge: 'متاح' | 'تجريبي' | 'قريباً';
  features: string[];
  color: string;
}

export interface Comment {
  id: string;
  articleId: string;
  authorName: string;
  content: string;
  createdAt: string;
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  adSenseEnabled: boolean;
  adSensePublisherId: string;
  adSenseSlotId?: string;
}

export interface ExperienceItem {
  id: string;
  jobTitle: string;
  company: string;
  city: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  graduationDate: string;
  cityCountry: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  level: string; // e.g. 'اللغة الأم' | 'متقدم' | 'جيد جداً' | 'متوسط' | 'مبتدئ'
}

export interface ResumeData {
  personalInfo: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    cityCountry: string;
    linkedinUrl: string;
    portfolioUrl: string;
  };
  summary: string;
  experiences: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  languages: LanguageItem[];
}


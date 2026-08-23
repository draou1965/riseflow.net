import React, { useState, useEffect } from 'react';
import { useBlog } from '../../context/BlogContext';
import { RichTextEditor } from '../../components/RichTextEditor';
import { SERPPreview } from '../../components/SERPPreview';
import { HtmlArticleImporter } from '../../components/HtmlArticleImporter';
import { 
  Save, 
  ArrowLeft, 
  Eye, 
  Sparkles, 
  Image as ImageIcon, 
  Tag, 
  Calendar, 
  CheckCircle2, 
  Globe, 
  FileText,
  AlertCircle,
  RefreshCw,
  FileCode2
} from 'lucide-react';

interface AdminArticleEditorProps {
  articleId?: string;
  navigate: (path: string) => void;
}

const COVER_IMAGE_PRESETS = [
  {
    title: 'سيرة ذاتية وأوراق',
    url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'مقابلة عمل وتوظيف',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'كتابة وتخطيط مهني',
    url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'لينكد إن وتواصل',
    url: 'https://images.unsplash.com/photo-1611944212129-29977ae1398c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'فريق عمل واجتماع',
    url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'ذكاء اصطناعي وتكنولوجيا',
    url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80'
  }
];

export const AdminArticleEditor: React.FC<AdminArticleEditorProps> = ({ articleId, navigate }) => {
  const { articles, categories, addArticle, updateArticle } = useBlog();
  const isEditMode = !!articleId;

  // Form states
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [coverImage, setCoverImage] = useState(COVER_IMAGE_PRESETS[0].url);
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [status, setStatus] = useState<'published' | 'draft'>('published');
  const [publishedAt, setPublishedAt] = useState(new Date().toISOString().split('T')[0]);
  const [authorName, setAuthorName] = useState('فريق خبراء CareerAI');
  const [authorRole, setAuthorRole] = useState('مستشارون مهنيون');
  const [authorAvatar, setAuthorAvatar] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80');
  
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showHtmlImporter, setShowHtmlImporter] = useState(false);

  const handleHtmlImport = (importedData: {
    title: string;
    slug?: string;
    excerpt?: string;
    content: string;
    metaTitle?: string;
    metaDescription?: string;
    tags?: string[];
  }) => {
    if (importedData.title) {
      setTitle(importedData.title);
      if (!slugManuallyEdited) {
        setSlug(generateSlugFromTitle(importedData.title));
      }
    }
    if (importedData.excerpt) {
      setExcerpt(importedData.excerpt);
    }
    if (importedData.content) {
      setContent(importedData.content);
    }
    if (importedData.metaTitle) {
      setMetaTitle(importedData.metaTitle);
    }
    if (importedData.metaDescription) {
      setMetaDescription(importedData.metaDescription);
    }
    if (importedData.tags && importedData.tags.length > 0) {
      setTagsInput(importedData.tags.join(', '));
    }
    setShowHtmlImporter(false);
    setToastMessage('تم استيراد محتوى الـ HTML بنجاح إلى جميع الحقول!');
    setTimeout(() => setToastMessage(''), 4000);
  };

  // Auto initialize category
  useEffect(() => {
    if (categories.length > 0 && !categoryId) {
      setCategoryId(categories[0].id);
    }
  }, [categories]);

  // Load existing article if edit mode
  useEffect(() => {
    if (isEditMode && articleId) {
      const existing = articles.find(a => a.id === articleId);
      if (existing) {
        setTitle(existing.title);
        setSlug(existing.slug);
        setSlugManuallyEdited(true);
        setCoverImage(existing.coverImage);
        setExcerpt(existing.excerpt);
        setContent(existing.content);
        setCategoryId(existing.categoryId);
        setTagsInput(existing.tags.join(', '));
        setMetaTitle(existing.metaTitle || '');
        setMetaDescription(existing.metaDescription || '');
        setStatus(existing.status);
        setPublishedAt(existing.publishedAt);
        if (existing.author) {
          setAuthorName(existing.author.name);
          setAuthorRole(existing.author.role);
          setAuthorAvatar(existing.author.avatar);
        }
      }
    }
  }, [isEditMode, articleId, articles]);

  // Auto slug generation from title helper
  const generateSlugFromTitle = (text: string) => {
    return text
      .trim()
      .toLowerCase()
      .replace(/[^\u0621-\u064A\w\s-]/g, '') // Keep Arabic and English alphanumeric
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slugManuallyEdited) {
      const autoSlug = generateSlugFromTitle(val);
      setSlug(autoSlug);
    }
    if (!metaTitle) {
      setMetaTitle(`${val} | CareerAI`);
    }
  };

  const handleExcerptChange = (val: string) => {
    setExcerpt(val);
    if (!metaDescription) {
      setMetaDescription(val.slice(0, 155));
    }
  };

  const handleSave = async (forceStatus?: 'published' | 'draft') => {
    if (!title.trim()) {
      alert('يرجى إدخال عنوان المقال');
      return;
    }
    if (!slug.trim()) {
      alert('يرجى تحديد رابط المقال Slug');
      return;
    }
    if (!content.trim()) {
      alert('يرجى كتابة محتوى المقال');
      return;
    }

    const currentStatus = forceStatus || status;
    const cleanTags = tagsInput
      .split(/[,،]/)
      .map(t => t.trim())
      .filter(Boolean);

    const calculatedReadingTime = Math.max(2, Math.ceil(content.split(/\s+/).length / 150));

    setSaving(true);

    try {
      if (isEditMode && articleId) {
        await updateArticle(articleId, {
          title: title.trim(),
          slug: slug.trim(),
          coverImage: coverImage.trim(),
          excerpt: excerpt.trim(),
          content: content.trim(),
          categoryId,
          tags: cleanTags,
          metaTitle: metaTitle.trim() || `${title.trim()} | CareerAI`,
          metaDescription: metaDescription.trim() || excerpt.trim().slice(0, 155),
          status: currentStatus,
          publishedAt,
          readingTimeMinutes: calculatedReadingTime,
          author: {
            name: authorName,
            role: authorRole,
            avatar: authorAvatar
          }
        });
        setToastMessage('تم تحديث المقال بنجاح!');
      } else {
        const newArt = await addArticle({
          title: title.trim(),
          slug: slug.trim(),
          coverImage: coverImage.trim(),
          excerpt: excerpt.trim(),
          content: content.trim(),
          categoryId,
          categoryName: categories.find(c => c.id === categoryId)?.name || 'عام',
          tags: cleanTags,
          metaTitle: metaTitle.trim() || `${title.trim()} | CareerAI`,
          metaDescription: metaDescription.trim() || excerpt.trim().slice(0, 155),
          status: currentStatus,
          publishedAt,
          readingTimeMinutes: calculatedReadingTime,
          author: {
            name: authorName,
            role: authorRole,
            avatar: authorAvatar
          }
        });
        setToastMessage('تم إنشاء وحفظ المقال بنجاح!');
      }

      setTimeout(() => {
        navigate('/admin/articles');
      }, 700);
    } catch (err: any) {
      alert(err?.message || 'حدث خطأ أثناء حفظ المقال');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Bar Navigation & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/admin/articles')}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition"
            title="رجوع للمقالات"
          >
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              {isEditMode ? 'تعديل المقال' : 'إضافة مقال جديد'}
            </h1>
            <p className="text-xs text-slate-500">
              املأ الحقول أدناه مع ضبط إعدادات السيو وتنسيق المحتوى
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setShowHtmlImporter(!showHtmlImporter)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              showHtmlImporter
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200'
            }`}
          >
            <FileCode2 className="w-4 h-4" />
            <span>{showHtmlImporter ? 'إغلاق نافذة HTML' : 'إضافة مقال بصيغة HTML'}</span>
          </button>

          {isEditMode && slug && (
            <button
              onClick={() => navigate(`/blog/${slug}`)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition flex items-center gap-1.5"
            >
              <Eye className="w-4 h-4 text-blue-600" />
              <span>معاينة حية</span>
            </button>
          )}

          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave('draft')}
            className="px-4 py-2 rounded-xl text-xs font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 transition"
          >
            حفظ كمسودة
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave('published')}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md transition flex items-center gap-1.5 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'جارٍ الحفظ...' : 'نشر المقال مباشرة'}</span>
          </button>
        </div>
      </div>

      {/* HTML Importer Accordion / Section */}
      {showHtmlImporter && (
        <HtmlArticleImporter
          onImport={handleHtmlImport}
          onCancel={() => setShowHtmlImporter(false)}
        />
      )}

      {toastMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-sm font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Two Column Layout: Main Content (Right) & Sidebar Settings (Left) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Column (8 cols): Title, Slug, Excerpt, Rich Editor */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Title & Slug Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            
            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 block">
                عنوان المقال <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="مثال: دليل كتابة سيرة ذاتية احترافية تتجاوز أنظمة ATS في 2026..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm sm:text-base font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
                dir="rtl"
              />
            </div>

            {/* Slug URL */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <label className="font-bold flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-blue-600" />
                  رابط المقال (Slug) <span className="text-rose-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setSlug(generateSlugFromTitle(title));
                    setSlugManuallyEdited(false);
                  }}
                  className="text-[11px] text-blue-600 hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  توليد تلقائي من العنوان
                </button>
              </div>

              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden text-xs">
                <span className="bg-slate-200/80 text-slate-600 px-3 py-2.5 font-mono select-none" dir="ltr">
                  /blog/
                </span>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value);
                    setSlugManuallyEdited(true);
                  }}
                  placeholder="how-to-write-professional-cv"
                  className="flex-1 px-3 py-2.5 bg-transparent font-mono text-slate-800 focus:outline-hidden"
                  dir="ltr"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 block">
                وصف مختصر للمقال (Excerpt) <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={3}
                required
                value={excerpt}
                onChange={(e) => handleExcerptChange(e.target.value)}
                placeholder="نبذة موجزة من سطرين أو ثلاثة تلخص فائدة المقال وتظهر في بطاقة المقال والبحث..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white resize-y"
                dir="rtl"
              />
            </div>

          </div>

          {/* Rich Content Editor */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-600" />
                محتوى المقال الكامل <span className="text-rose-500">*</span>
              </label>
              <span className="text-[11px] text-slate-400">
                استخدم الأزرار لتنسيق العناوين والاقتباسات والجداول والنصائح
              </span>
            </div>

            <RichTextEditor
              value={content}
              onChange={setContent}
            />
          </div>

          {/* Google SERP SEO Preview */}
          <SERPPreview
            title={metaTitle || title}
            description={metaDescription || excerpt}
            slug={slug}
          />

        </div>

        {/* Sidebar Column (4 cols): Category, Status, Cover Image, Meta Tags */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Publish Settings Card */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-r-2 border-blue-600 pr-2">
              إعدادات النشر والحالة
            </h3>

            {/* Status */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">حالة المقال</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setStatus('published')}
                  className={`py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    status === 'published'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>منشور (Published)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStatus('draft')}
                  className={`py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    status === 'draft'
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>مسودة (Draft)</span>
                </button>
              </div>
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                التصنيف <span className="text-rose-500">*</span>
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                dir="rtl"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Publish Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">تاريخ النشر</label>
              <div className="relative">
                <input
                  type="date"
                  value={publishedAt}
                  onChange={(e) => setPublishedAt(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              </div>
            </div>

            {/* Tags / Keywords */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                الكلمات المفتاحية والوسوم (مفصولة بفواصل)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="السيرة الذاتية, نظام ATS, مقابلات..."
                  className="w-full pl-3.5 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  dir="rtl"
                />
                <Tag className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5" />
              </div>
            </div>
          </div>

          {/* Cover Image Card */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-r-2 border-emerald-600 pr-2 flex items-center justify-between">
              <span>الصورة الرئيسية للمقال</span>
              <ImageIcon className="w-4 h-4 text-emerald-600" />
            </h3>

            {/* Preview */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              {coverImage ? (
                <img
                  src={coverImage}
                  alt="معاينة الصورة"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                  لا توجد صورة محددة
                </div>
              )}
            </div>

            {/* Custom URL Input */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-600">رابط الصورة المباشر (URL):</label>
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                dir="ltr"
              />
            </div>

            {/* Quick Presets Picker */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <p className="text-[11px] font-bold text-slate-500">أو اختر صورة جاهزة عالية الجودة:</p>
              <div className="grid grid-cols-3 gap-2">
                {COVER_IMAGE_PRESETS.map((preset, idx) => (
                  <div
                    key={idx}
                    onClick={() => setCoverImage(preset.url)}
                    className={`cursor-pointer rounded-lg overflow-hidden border-2 transition aspect-video relative group ${
                      coverImage === preset.url ? 'border-blue-600 shadow-xs' : 'border-transparent hover:opacity-80'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-[9px] text-white font-bold text-center p-1">
                      {preset.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SEO Meta Tags Card */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-r-2 border-violet-600 pr-2">
              تهيئة محركات البحث (SEO Meta)
            </h3>

            {/* Meta Title */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <label className="font-bold text-slate-700">Meta Title</label>
                <span className={`text-[10px] ${metaTitle.length > 65 ? 'text-amber-600 font-bold' : 'text-slate-400'}`}>
                  {metaTitle.length}/60
                </span>
              </div>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="عنوان السيو الذي يظهر في جوجل..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                dir="rtl"
              />
            </div>

            {/* Meta Description */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <label className="font-bold text-slate-700">Meta Description</label>
                <span className={`text-[10px] ${metaDescription.length > 160 ? 'text-amber-600 font-bold' : 'text-slate-400'}`}>
                  {metaDescription.length}/155
                </span>
              </div>
              <textarea
                rows={3}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="وصف السيو الذي يظهر في نتائج البحث..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 resize-y"
                dir="rtl"
              />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

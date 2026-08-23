import React, { useState, useMemo } from 'react';
import { useBlog } from '../context/BlogContext';
import { AdSenseBanner } from '../components/AdSenseBanner';
import { SEOHead } from '../components/SEOHead';
import { 
  Search, 
  Clock, 
  Eye, 
  ArrowLeft, 
  Tag, 
  BookOpen, 
  Filter, 
  Sparkles, 
  TrendingUp,
  X
} from 'lucide-react';

interface BlogPageProps {
  navigate: (path: string) => void;
  initialSearchQuery?: string;
  initialCategory?: string;
}

export const BlogPage: React.FC<BlogPageProps> = ({ 
  navigate, 
  initialSearchQuery = '', 
  initialCategory = 'all' 
}) => {
  const { articles, categories } = useBlog();
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(initialCategory);

  // Filter only published articles for the public blog
  const publishedArticles = useMemo(() => {
    return articles.filter(a => a.status === 'published');
  }, [articles]);

  // Filter based on search & category
  const filteredArticles = useMemo(() => {
    return publishedArticles.filter(art => {
      const matchesCategory = selectedCategoryId === 'all' || art.categoryId === selectedCategoryId;
      const matchesSearch = !searchQuery.trim() ||
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        art.categoryName.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [publishedArticles, selectedCategoryId, searchQuery]);

  const featuredArticle = publishedArticles.find(a => a.featured) || publishedArticles[0];
  const popularArticles = [...publishedArticles].sort((a, b) => (b.viewsCount || 0) - (a.viewsCount || 0)).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <SEOHead
        title="المدونة المهنية والمقالات | RiseFlow"
        description="تصفح أحدث المقالات المهنية والنصائح الحصرية حول كتابة السيرة الذاتية، اجتياز مقابلات العمل، أسرار أنظمة ATS، وتطوير الحساب المهني في لينكد إن."
        keywords="مدونة التوظيف, مقالات السيرة الذاتية, نصائح المقابلات, نظام ATS, سوق العمل"
        canonicalPath="/blog"
        schemaJson={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "مدونة CareerAI المهنية",
          "description": "مقالات وأدلة متخصصة في التوظيف والسيرة الذاتية والذكاء الاصطناعي",
          "url": "https://careerai.app/blog"
        }}
      />
      
      {/* Blog Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          المكتبة المهنية المتخصصة
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900">
          مدونة CareerAI للمسار الوظيفي
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          مقالات حصرية، نصائح لاجتياز المقابلات، أسرار أنظمة ATS، وأحدث استراتيجيات سوق العمل المعاصر.
        </p>
      </div>

      {/* Featured Article Hero (Shown if no search query active) */}
      {!searchQuery && selectedCategoryId === 'all' && featuredArticle && (
        <div 
          onClick={() => navigate(`/blog/${featuredArticle.slug}`)}
          className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 cursor-pointer grid grid-cols-1 lg:grid-cols-12 group"
        >
          <div className="lg:col-span-7 relative aspect-video lg:aspect-auto overflow-hidden bg-slate-100 min-h-[280px]">
            <img
              src={featuredArticle.coverImage}
              alt={featuredArticle.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              مقال مميز
            </span>
          </div>

          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                  {featuredArticle.categoryName}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {featuredArticle.readingTimeMinutes} د قراءة
                </span>
                <span>{featuredArticle.publishedAt}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                {featuredArticle.title}
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                {featuredArticle.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={featuredArticle.author.avatar}
                  alt={featuredArticle.author.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <p className="text-xs font-bold text-slate-800">{featuredArticle.author.name}</p>
                  <p className="text-[10px] text-slate-400">{featuredArticle.author.role}</p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 px-3.5 py-2 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition">
                <span>قراءة المقال</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          
          {/* Categories Horizontal Scroll */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedCategoryId('all')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                selectedCategoryId === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              جميع التصنيفات ({publishedArticles.length})
            </button>
            {categories.map((cat) => {
              const count = publishedArticles.filter(a => a.categoryId === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategoryId(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
                    selectedCategoryId === cat.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-[10px] opacity-75">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في عناوين ومحتوى المقالات..."
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
              dir="rtl"
            />
            {searchQuery ? (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-3 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            )}
          </div>
        </div>

        {/* Active Filter summary */}
        {(selectedCategoryId !== 'all' || searchQuery) && (
          <div className="flex items-center justify-between bg-blue-50/70 border border-blue-200/70 px-4 py-2 rounded-xl text-xs text-blue-900">
            <span>
              عرض نتائج: {selectedCategoryId !== 'all' && `قسم "${categories.find(c => c.id === selectedCategoryId)?.name}"`}
              {selectedCategoryId !== 'all' && searchQuery && ' مع '}
              {searchQuery && `البحث عن "${searchQuery}"`} ({filteredArticles.length} مقال)
            </span>
            <button
              onClick={() => {
                setSelectedCategoryId('all');
                setSearchQuery('');
              }}
              className="font-bold underline hover:text-blue-700"
            >
              إعادة تعيين
            </button>
          </div>
        )}
      </div>

      {/* Main Content Layout (Grid + Sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left / Main Column: Articles Grid */}
        <div className="lg:col-span-8 space-y-8">
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  onClick={() => navigate(`/blog/${article.slug}`)}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col group"
                >
                  <div className="relative aspect-video overflow-hidden bg-slate-100">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-lg bg-white/95 text-blue-700 backdrop-blur-xs shadow-xs">
                      {article.categoryName}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readingTimeMinutes} د قراءة
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {article.viewsCount}
                        </span>
                        <span>{article.publishedAt}</span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                        {article.title}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500 font-medium">
                        بواسطة: {article.author.name}
                      </span>
                      <span className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-[-4px] transition-transform">
                        <span>اقرأ المقال</span>
                        <ArrowLeft className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center space-y-4">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-lg font-bold text-slate-800">لم يتم العثور على أي مقالات مطابقة</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                جرب تغيير مصطلحات البحث أو اختيار تصنيف آخر للوصول إلى أدلتنا ومقالاتنا المهنية.
              </p>
              <button
                onClick={() => { setSelectedCategoryId('all'); setSearchQuery(''); }}
                className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition"
              >
                عرض كافة المقالات
              </button>
            </div>
          )}

          {/* AdSense slot inside blog feed */}
          <AdSenseBanner slot="in-article" />
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Categories Widget */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-r-2 border-blue-600 pr-2">
              أقسام وتصنيفات المدونة
            </h3>
            <div className="space-y-1.5">
              {categories.map((cat) => {
                const count = publishedArticles.filter(a => a.categoryId === cat.id).length;
                const isSelected = selectedCategoryId === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategoryId(cat.id)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition ${
                      isSelected
                        ? 'bg-blue-50 text-blue-700 font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-[10px]">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Popular Articles Widget */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-r-2 border-emerald-600 pr-2 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              المقالات الأكثر قراءة
            </h3>
            <div className="space-y-3">
              {popularArticles.map((art, idx) => (
                <div
                  key={art.id}
                  onClick={() => navigate(`/blog/${art.slug}`)}
                  className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition cursor-pointer group"
                >
                  <span className="w-6 h-6 rounded-lg bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-slate-500 text-xs font-black flex items-center justify-center shrink-0 transition-colors">
                    {idx + 1}
                  </span>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-blue-600 line-clamp-2 transition-colors">
                      {art.title}
                    </h4>
                    <p className="text-[10px] text-slate-400">{art.viewsCount} مشاهدة • {art.readingTimeMinutes} د قراءة</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AdSense Sidebar Widget */}
          <AdSenseBanner slot="sidebar" />

        </div>

      </div>

    </div>
  );
};

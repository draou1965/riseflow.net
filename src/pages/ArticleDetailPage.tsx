import React, { useEffect, useState, useMemo } from 'react';
import { useBlog } from '../context/BlogContext';
import { AdSenseBanner } from '../components/AdSenseBanner';
import { SEOHead } from '../components/SEOHead';
import { 
  Clock, 
  Eye, 
  Heart, 
  Calendar, 
  Tag, 
  ArrowLeft, 
  Share2, 
  Check, 
  Copy, 
  ChevronRight, 
  BookOpen, 
  Sparkles, 
  User, 
  MessageSquare,
  ThumbsUp,
  List
} from 'lucide-react';

interface ArticleDetailPageProps {
  slug: string;
  navigate: (path: string) => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({ slug, navigate }) => {
  const { getArticleBySlug, incrementArticleViews, incrementArticleLikes, articles, categories } = useBlog();
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState<Array<{ name: string; text: string; date: string }>>([
    {
      name: 'عبدالله السعدي',
      text: 'مقال رائع ودقيق جداً! قمت بتعديل سيرتي الذاتية وفق هذه النصائح وبدأت أتلقى اتصالات للمقابلات.',
      date: 'منذ يومين'
    },
    {
      name: 'مها الشمري',
      text: 'شرح مبسط ومباشر لأنظمة ATS وطريقة التعامل معها. شكراً لفريق CareerAI.',
      date: 'منذ 4 أيام'
    }
  ]);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');

  const article = getArticleBySlug(slug);

  // Track views on load
  useEffect(() => {
    if (article) {
      incrementArticleViews(article.id);
      
      // Update browser tab title & meta tags for SEO
      document.title = article.metaTitle || `${article.title} | CareerAI`;
      
      // Update meta description
      let metaDescTag = document.querySelector('meta[name="description"]');
      if (metaDescTag) {
        metaDescTag.setAttribute('content', article.metaDescription || article.excerpt);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  // Extract headings for Table of Contents
  const tableOfContents = useMemo(() => {
    if (!article) return [];
    const headings: Array<{ id: string; text: string; level: number }> = [];
    const regex = /<h([23])[^>]*>(.*?)<\/h\1>/gi;
    let match;
    let index = 0;
    while ((match = regex.exec(article.content)) !== null) {
      const level = parseInt(match[1]);
      const cleanText = match[2].replace(/<[^>]*>/g, '').trim();
      const id = `heading-${index++}`;
      headings.push({ id, text: cleanText, level });
    }
    return headings;
  }, [article]);

  // Related articles in same category
  const relatedArticles = useMemo(() => {
    if (!article) return [];
    return articles
      .filter(a => a.status === 'published' && a.id !== article.id && (a.categoryId === article.categoryId || a.tags.some(t => article.tags.includes(t))))
      .slice(0, 3);
  }, [articles, article]);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
          <BookOpen className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-black text-slate-900">المقال غير موجود أو تم نقله</h1>
        <p className="text-slate-600 text-sm max-w-md mx-auto">
          عذراً، الرابط الذي تحاول الوصول إليه غير متوفر. قد يكون المقال في حالة مسودة أو تم تعديل رابطه.
        </p>
        <button
          onClick={() => navigate('/blog')}
          className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition"
        >
          العودة للمدونة
        </button>
      </div>
    );
  }

  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://careerai.com/blog/${article.slug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleLike = () => {
    if (!liked) {
      incrementArticleLikes(article.id);
      setLiked(true);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCommentName.trim() && newCommentText.trim()) {
      setComments(prev => [
        {
          name: newCommentName.trim(),
          text: newCommentText.trim(),
          date: 'الآن'
        },
        ...prev
      ]);
      setNewCommentName('');
      setNewCommentText('');
    }
  };

  return (
    <div className="py-8 space-y-10">
      <SEOHead
        title={article.metaTitle || `${article.title} | مدونة CareerAI`}
        description={article.metaDescription || article.excerpt}
        keywords={article.tags ? article.tags.join(', ') : 'سيرة ذاتية, توظيف, ATS, CareerAI'}
        canonicalPath={`/blog/${article.slug}`}
        ogType="article"
        ogImage={article.coverImage}
        publishedTime={article.publishedAt}
        author={article.author?.name || 'فريق خبراء CareerAI'}
        schemaJson={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": article.title,
          "description": article.excerpt,
          "image": [article.coverImage],
          "datePublished": article.publishedAt,
          "author": {
            "@type": "Person",
            "name": article.author?.name || "CareerAI Team"
          },
          "publisher": {
            "@type": "Organization",
            "name": "CareerAI",
            "logo": {
              "@type": "ImageObject",
              "url": "https://careerai.app/logo.png"
            }
          }
        }}
      />
      
      {/* Top Breadcrumbs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <nav className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto py-2">
          <button onClick={() => navigate('/')} className="hover:text-blue-600 transition whitespace-nowrap">
            الرئيسية
          </button>
          <span className="text-slate-300">/</span>
          <button onClick={() => navigate('/blog')} className="hover:text-blue-600 transition whitespace-nowrap">
            المدونة
          </button>
          <span className="text-slate-300">/</span>
          <button 
            onClick={() => navigate(`/blog?category=${article.categoryId}`)} 
            className="text-blue-600 font-semibold hover:underline whitespace-nowrap"
          >
            {article.categoryName}
          </button>
        </nav>
      </div>

      {/* Article Header */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
              {article.categoryName}
            </span>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {article.publishedAt}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readingTimeMinutes} دقائق قراءة
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {article.viewsCount + 1} مشاهدة
              </span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            {article.excerpt}
          </p>
        </div>

        {/* Author & Share Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-y border-slate-200">
          <div className="flex items-center gap-3">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-xs"
            />
            <div>
              <p className="text-sm font-bold text-slate-900">{article.author.name}</p>
              <p className="text-xs text-slate-500">{article.author.role}</p>
            </div>
          </div>

          {/* Social Share Buttons */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium ml-1">مشاركة:</span>
            
            {/* WhatsApp */}
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${article.title} - ${currentUrl}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition"
              title="مشاركة عبر واتساب"
            >
              <span className="text-xs font-bold">WhatsApp</span>
            </a>

            {/* X / Twitter */}
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(currentUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 transition text-xs font-bold"
              title="مشاركة على X"
            >
              X / Twitter
            </a>

            {/* LinkedIn */}
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition text-xs font-bold"
              title="مشاركة على لينكد إن"
            >
              LinkedIn
            </a>

            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'تم النسخ!' : 'نسخ الرابط'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Cover Image */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl bg-slate-100 border border-slate-200/80">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Top AdSense Slot */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <AdSenseBanner slot="top-banner" />
      </div>

      {/* Article Content Layout */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Table of contents if headings exist */}
        {tableOfContents.length > 2 && (
          <div className="my-8 p-5 bg-gradient-to-br from-slate-50 to-blue-50/40 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
              <List className="w-4 h-4 text-blue-600" />
              محتويات هذا الدليل
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-600 pr-2">
              {tableOfContents.map((item, idx) => (
                <li key={idx} className="hover:text-blue-600 transition flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Rich HTML Content Body */}
        <div 
          className="article-content bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xs text-slate-800"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-blue-600" />
              الوسوم:
            </span>
            {article.tags.map((tag, idx) => (
              <button
                key={idx}
                onClick={() => navigate(`/blog?q=${encodeURIComponent(tag)}`)}
                className="text-xs px-3 py-1 bg-slate-100 text-slate-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
              >
                #{tag}
              </button>
            ))}
          </div>
        )}

        {/* Cross-Tool Promotion Box */}
        <div className="my-8 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-5 border border-slate-800 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold">طبّق ما قرأته الآن باستخدام أدوات الذكاء الاصطناعي المجانية</h3>
              <p className="text-xs text-slate-300">أدوات فورية ومجانية 100% بدون تسجيل حساب</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
            <button
              onClick={() => navigate('/tools/resume-builder')}
              className="p-3.5 bg-slate-800/90 hover:bg-blue-600 rounded-2xl border border-slate-700 hover:border-blue-500 text-right transition group flex flex-col justify-between"
            >
              <span className="text-xs font-bold text-white mb-1">منشئ السيرة الذاتية</span>
              <span className="text-[11px] text-slate-400 group-hover:text-blue-100">صياغة وتصدير PDF A4 متوافق مع ATS ←</span>
            </button>

            <button
              onClick={() => navigate('/tools/ats-keywords')}
              className="p-3.5 bg-slate-800/90 hover:bg-indigo-600 rounded-2xl border border-slate-700 hover:border-indigo-500 text-right transition group flex flex-col justify-between"
            >
              <span className="text-xs font-bold text-white mb-1">مستخرج الكلمات المفتاحية</span>
              <span className="text-[11px] text-slate-400 group-hover:text-indigo-100">استخراج مهارات الوصف الوظيفي ←</span>
            </button>

            <button
              onClick={() => navigate('/tools/resume-analyzer')}
              className="p-3.5 bg-slate-800/90 hover:bg-emerald-600 rounded-2xl border border-slate-700 hover:border-emerald-500 text-right transition group flex flex-col justify-between"
            >
              <span className="text-xs font-bold text-white mb-1">فاحص ومحلل ATS</span>
              <span className="text-[11px] text-slate-400 group-hover:text-emerald-100">فحص فوري وتحديد الثغرات ←</span>
            </button>

            <button
              onClick={() => navigate('/tools/cover-letter-generator')}
              className="p-3.5 bg-slate-800/90 hover:bg-amber-600 rounded-2xl border border-slate-700 hover:border-amber-500 text-right transition group flex flex-col justify-between"
            >
              <span className="text-xs font-bold text-white mb-1">كاتب رسائل التقديم</span>
              <span className="text-[11px] text-slate-400 group-hover:text-amber-100">توليد Cover Letter احترافي ←</span>
            </button>
          </div>
        </div>

        {/* Helpful / Like Action */}
        <div className="my-10 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl p-6 text-white text-center space-y-4 shadow-lg shadow-blue-600/15">
          <h3 className="text-lg font-bold">هل وجدت هذا المقال مفيداً لمسيرتك المهنية؟</h3>
          <p className="text-xs text-blue-100 max-w-md mx-auto">
            مشاركتك وإعجابك يساعدنا في نشر المزيد من المحتوى المتخصص المجاني لمساعدة الباحثين عن عمل.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleLike}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition shadow-md ${
                liked 
                  ? 'bg-rose-500 text-white' 
                  : 'bg-white text-slate-800 hover:bg-blue-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-white' : 'text-rose-500'}`} />
              <span>{liked ? 'شكراً لإعجابك!' : `أعجبني المقال (${article.likesCount + (liked ? 1 : 0)})`}</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-white/20 hover:bg-white/30 text-white transition flex items-center gap-2 border border-white/30"
            >
              <Share2 className="w-4 h-4" />
              <span>مشاركة مع صديق</span>
            </button>
          </div>
        </div>

        {/* In-Article / Bottom AdSense Slot */}
        <AdSenseBanner slot="in-article" />

        {/* Author Bio Box */}
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-sm shrink-0"
          />
          <div className="space-y-1.5 text-center sm:text-right">
            <h4 className="text-base font-bold text-slate-900">{article.author.name}</h4>
            <p className="text-xs text-blue-600 font-semibold">{article.author.role}</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              فريق استشاري مهني متخصص في تحليل متطلبات سوق العمل، استراتيجيات التوظيف الحديثة، ومساعدة الكفاءات في بناء مسارات وظيفية ناجحة.
            </p>
          </div>
        </div>

        {/* Comments / Discussion Section */}
        <div className="mt-12 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              التعليقات والآراء ({comments.length})
            </h3>
            <span className="text-xs text-slate-500">متاح لجميع الزوار بدون تسجيل</span>
          </div>

          {/* Add Comment Form */}
          <form onSubmit={handleAddComment} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-slate-700">أضف تعليقك أو استفسارك:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                required
                value={newCommentName}
                onChange={(e) => setNewCommentName(e.target.value)}
                placeholder="اسمك الكريم..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                dir="rtl"
              />
            </div>
            <textarea
              required
              rows={3}
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              placeholder="اكتب تعليقك أو تجربتك هنا..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 resize-y"
              dir="rtl"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition"
              >
                نشر التعليق
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-3">
            {comments.map((cmt, idx) => (
              <div key={idx} className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/80 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">{cmt.name}</span>
                  <span className="text-slate-400 text-[10px]">{cmt.date}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{cmt.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <div className="mt-16 pt-8 border-t border-slate-200 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">مقالات ذات صلة قد تهمك</h3>
              <button
                onClick={() => navigate('/blog')}
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
              >
                <span>تصفح المزيد</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => navigate(`/blog/${rel.slug}`)}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-300 hover:shadow-lg transition cursor-pointer flex flex-col group"
                >
                  <div className="aspect-video relative overflow-hidden bg-slate-100">
                    <img
                      src={rel.coverImage}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <span className="text-[10px] font-bold text-blue-600">{rel.categoryName}</span>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 line-clamp-2 leading-snug">
                      {rel.title}
                    </h4>
                    <p className="text-[10px] text-slate-400">{rel.readingTimeMinutes} دقائق قراءة</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

    </div>
  );
};

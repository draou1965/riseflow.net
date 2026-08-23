import React, { useState } from 'react';
import { useBlog } from '../context/BlogContext';
import { AI_TOOLS_SHOWCASE } from '../data/initialData';
import { AdSenseBanner } from '../components/AdSenseBanner';
import { SEOHead } from '../components/SEOHead';
import { 
  Sparkles, 
  ArrowLeft, 
  CheckCircle2, 
  FileText, 
  Users, 
  Cpu, 
  TrendingUp, 
  Compass, 
  Mail, 
  Clock, 
  Eye, 
  ChevronDown, 
  ShieldCheck, 
  Zap, 
  Target, 
  Award,
  BookOpen,
  Search
} from 'lucide-react';

interface HomePageProps {
  navigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const { articles, categories } = useBlog();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Filter only published articles for visitors
  const publishedArticles = articles.filter(a => a.status === 'published');
  const featuredArticle = publishedArticles.find(a => a.featured) || publishedArticles[0];
  const latestArticles = publishedArticles.slice(0, 6);

  const faqs = [
    {
      q: 'كيف يساعد الذكاء الاصطناعي في زيادة فرص قبولي في الوظائف؟',
      a: 'يساعدك الذكاء الاصطناعي في تحليل وتخصيص سيرتك الذاتية لتتوافق بدقة مع معايير ومتطلبات الوصف الوظيفي، واستخراج الكلمات المفتاحية الأساسية التي تبحث عنها أنظمة الفرز التلقائي (ATS) ومسؤولو التوظيف، بالإضافة إلى محاكاة أسئلة المقابلات بدقة.'
    },
    {
      q: 'ما هو نظام ATS ولماذا يتم استبعاد الكثير من السير الذاتية بسببه؟',
      a: 'نظام ATS (Applicant Tracking System) هو برنامج تستخدمه الشركات لفلترة مئات السير الذاتية آلياً. يتم استبعاد السير الذاتية عادة بسبب التنسيقات المعقدة، غياب الكلمات المفتاحية المطابقة، أو وضع النصوص داخل صور وجداول لا تستطيع الخوارزميات قراءتها.'
    },
    {
      q: 'هل مقالات ونصائح مدونة RiseFlow مجانية لجميع الزوار؟',
      a: 'نعم، جميع المقالات، الأدلة المهنية، والنصائح المتخصصة في مدونة RiseFlow متاحة ومجانية 100% لجميع الباحثين عن عمل بدون الحاجة لإنشاء حساب.'
    },
    {
      q: 'هل يمكنني مواءمة السيرة الذاتية لأكثر من وظيفة مختلفة؟',
      a: 'بالتأكيد! القاعدة الذهبية في التوظيف الحديث هي تخصيص السيرة الذاتية وخطاب التغطية لكل وظيفة على حدة لإبراز المهارات الأكثر ملاءمة لكل شاغر وظيفي.'
    },
    {
      q: 'ما الفرق بين المهارات الصلبة (Hard Skills) والمهارات الشخصية (Soft Skills)؟',
      a: 'المهارات الصلبة هي المعارف والقدرات التقنية التي تم تعلمها (مثل البرمجة، التحليل المالي، التصميم)، بينما المهارات الشخصية تتعلق بطريقة تفاعلك في العمل (مثل التواصل الفعال، القيادة، وحل المشكلات والتفكير النقدي).'
    }
  ];

  const features = [
    {
      icon: Cpu,
      title: 'توافق كامل مع أنظمة ATS',
      desc: 'إرشادات وأدوات تضمن تخطي سيرتك الذاتية لجميع خوارزميات الفرز الآلي بنسبة 95% وأكثر.'
    },
    {
      icon: Target,
      title: 'تحليل دقيق للوصف الوظيفي',
      desc: 'استخراج فوري لأهم المهارات والكلمات المفتاحية المطلوبة في إعلانات التوظيف.'
    },
    {
      icon: Users,
      title: 'تدريب واقعي على المقابلات',
      desc: 'نماذج إجابات مبنية على تقنية STAR المعتمدة من كبرى الشركات العالمية.'
    },
    {
      icon: BookOpen,
      title: 'محتوى مهني متجدد وموثوق',
      desc: 'مقالات وأدلة أسبوعية يكتبها خبراء موارد بشرية لمواكبة تغيرات سوق العمل.'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24">
      <SEOHead
        title="RiseFlow | منصة التوظيف الذكية وأدوات السيرة الذاتية ونظام ATS"
        description="أنشئ وحلل سيرتك الذاتية ورسائل التغطية بالذكاء الاصطناعي مجاناً وبدون تسجيل. أدوات احترافية متوافقة 100% مع أنظمة التوظيف والفرز الآلي ATS."
        keywords="الذكاء الاصطناعي, سيرة ذاتية, فحص ATS, استخراج الكلمات المفتاحية, رسالة التغطية, مقابلات العمل, وظائف"
        canonicalPath="/"
        schemaJson={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "RiseFlow",
          "url": "https://careerai.app",
          "description": "منصة التوظيف الذكية بالذكاء الاصطناعي والمدونة المهنية المتخصصة",
          "inLanguage": "ar",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://careerai.app/blog?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }}
      />
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-16 bg-gradient-to-b from-blue-50/70 via-white to-slate-50 border-b border-slate-200/60">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs sm:text-sm font-bold shadow-xs animate-in fade-in slide-in-from-top-3">
              <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
              <span>مستقبل التوظيف الذكي بين يديك</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight sm:leading-tight font-['Cairo',sans-serif]">
              ضاعف فرص قبولك الوظيفي بمساعدة{' '}
              <span className="bg-gradient-to-r from-blue-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                الذكاء الاصطناعي
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
              منصة <strong className="text-slate-900 font-bold">RiseFlow</strong> دليلك المتكامل لاجتياز أنظمة ATS، صياغة سيرة ذاتية لا تُقاوم، والاستعداد للمقابلات الوظيفية بأعلى درجات الاحترافية.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <button
                onClick={() => navigate('/tools')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 shadow-md shadow-blue-500/25 hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 text-base"
              >
                <span>استكشف جميع الأدوات الذكية</span>
                <ArrowLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => navigate('/blog')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-xs transition-all flex items-center justify-center gap-2 text-base"
              >
                <BookOpen className="w-5 h-5 text-blue-600" />
                <span>تصفح مقالات المدونة</span>
              </button>
            </div>

            {/* Key Trust Points */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-slate-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>متوافق 100% مع أنظمة ATS</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>مقالات وأدلة مهنية مجانية</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>تحديثات مستمرة لسوق العمل</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. STATS TRUST BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12">
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1 border-l border-slate-100 last:border-0">
            <p className="text-2xl sm:text-4xl font-black text-blue-600 font-['Plus_Jakarta_Sans',sans-serif]">+50,000</p>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">باحث عن عمل استفاد</p>
          </div>
          <div className="space-y-1 sm:border-l border-slate-100">
            <p className="text-2xl sm:text-4xl font-black text-emerald-600 font-['Plus_Jakarta_Sans',sans-serif]">95%</p>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">نسبة تجاوز أنظمة ATS</p>
          </div>
          <div className="space-y-1 border-l border-slate-100 last:border-0">
            <p className="text-2xl sm:text-4xl font-black text-violet-600 font-['Plus_Jakarta_Sans',sans-serif]">15+</p>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">أدلة ومقالات متخصصة</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl sm:text-4xl font-black text-amber-600 font-['Plus_Jakarta_Sans',sans-serif]">100%</p>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">محتوى مجاني ومتاح للجميع</p>
          </div>
        </div>
      </section>

      {/* 3. FEATURES SECTION (مميزات الموقع) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            لماذا تختار CareerAI؟
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
            مميزات مصممة خصيصاً لتفوقك في سوق العمل
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            نجمع بين أحدث خوارزميات الذكاء الاصطناعي وخبرات التوظيف البشرية لمنحك ميزة تنافسية لا تضاهى.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/70 hover:border-blue-300 hover:shadow-lg transition-all duration-200 group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. AI TOOLS SHOWCASE (قسم عرض الأدوات) */}
      <section className="bg-slate-900 text-white py-16 sm:py-20 rounded-3xl mx-4 sm:mx-6 lg:mx-8 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-8">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
                حزمة الأدوات الذكية
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white">
                أدوات الذكاء الاصطناعي المتخصصة للباحثين عن عمل
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                حلول رقمية مبتكرة تسهل عليك كل خطوة في رحلتك المهنية من كتابة السيرة حتى توقيع العقد.
              </p>
            </div>

            <button
              onClick={() => navigate('/tools')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition shrink-0"
            >
              <span>عرض جميع الأدوات ({AI_TOOLS_SHOWCASE.length})</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AI_TOOLS_SHOWCASE.map((tool) => (
              <div
                key={tool.id}
                className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 rounded-2xl p-6 transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-emerald-400 flex items-center justify-center text-white font-bold shadow-xs">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                      tool.badge === 'متاح'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : tool.badge === 'تجريبي'
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {tool.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white mb-1.5">{tool.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{tool.description}</p>
                  </div>

                  <div className="pt-2 space-y-1.5 border-t border-slate-700/60">
                    {tool.features.map((feat, fIdx) => (
                      <div key={fIdx} className="text-xs text-slate-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 mt-4">
                  {tool.id === 'tool-cv-builder' ? (
                    <button
                      onClick={() => navigate('/tools/resume-builder')}
                      className="w-full py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 transition flex items-center justify-center gap-1 shadow-xs"
                    >
                      <span>ابدأ إنشاء الـ CV مجاناً</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                  ) : tool.id === 'tool-ats-keywords' ? (
                    <button
                      onClick={() => navigate('/tools/ats-keywords')}
                      className="w-full py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 transition flex items-center justify-center gap-1 shadow-xs"
                    >
                      <span>استخرج الكلمات المفتاحية مجاناً</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                  ) : tool.id === 'tool-ats-scanner' ? (
                    <button
                      onClick={() => navigate('/tools/resume-analyzer')}
                      className="w-full py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 transition flex items-center justify-center gap-1 shadow-xs"
                    >
                      <span>حلل سيرتك مع ATS مجاناً</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                  ) : tool.id === 'tool-cover-letter-writer' ? (
                    <button
                      onClick={() => navigate('/tools/cover-letter-generator')}
                      className="w-full py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 transition flex items-center justify-center gap-1 shadow-xs"
                    >
                      <span>أنشئ Cover Letter مجاناً</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate('/tools')}
                      className="w-full py-2 rounded-xl text-xs font-bold text-slate-200 bg-slate-700/70 hover:bg-slate-700 hover:text-white transition flex items-center justify-center gap-1"
                    >
                      <span>معرفة المزيد وتجربة الأداة</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* AdSense Space */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSenseBanner slot="top-banner" />
      </div>

      {/* 5. LATEST ARTICLES SECTION (قسم أحدث المقالات من قاعدة البيانات) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              مدونة المعرفة المهنية
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
              أحدث المقالات والإرشادات التوظيفية
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              مقالات حصرية مبنية على أسس علمية لمساعدتك في بناء هوية مهنية متألقة.
            </p>
          </div>

          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline shrink-0"
          >
            <span>عرض جميع المقالات ({publishedArticles.length})</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => navigate(`/blog/${article.slug}`)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col group"
            >
              {/* Image Container */}
              <div className="relative aspect-video overflow-hidden bg-slate-100">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-lg bg-white/95 text-blue-700 backdrop-blur-xs shadow-xs">
                  {article.categoryName}
                </span>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readingTimeMinutes} دقائق قراءة
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {article.viewsCount} مشاهدة
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={article.author.avatar}
                      alt={article.author.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-xs text-slate-600 font-medium">{article.author.name}</span>
                  </div>

                  <span className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-[-4px] transition-transform">
                    <span>اقرأ المقال</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 6. FAQ ACCORDION (الأسئلة الشائعة) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
            إجابات لاستفساراتك
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
            الأسئلة الشائعة حول التوظيف والذكاء الاصطناعي
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            إليك إجابات شاملة على أكثر التساؤلات التي تدور في ذهن الباحثين عن عمل.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-right flex items-center justify-between gap-4 font-bold text-slate-800 hover:text-blue-600 transition"
                >
                  <span className="text-sm sm:text-base leading-snug">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. BOTTOM CTA HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl shadow-blue-600/20 space-y-6 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-black">
              جاهز لبدء مرحلة جديدة في مسيرتك المهنية؟
            </h2>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
              استكشف الأدوات الذكية، واقرأ مقالاتنا الإرشادية، واجعل ملفك المهني محط أنظار كبرى الشركات.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigate('/tools')}
              className="px-6 py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 shadow-md transition"
            >
              ابدأ الآن مجاناً
            </button>
            <button
              onClick={() => navigate('/blog')}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold rounded-xl transition"
            >
              تصفح المدونة
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

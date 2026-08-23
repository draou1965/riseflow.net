import React, { useState, useMemo } from 'react';
import { useBlog } from '../context/BlogContext';
import { SEOHead } from '../components/SEOHead';
import { 
  generateSitemapXml, 
  generateRobotsTxt, 
  getAllSitemapEntries, 
  downloadSitemapXml, 
  downloadRobotsTxt, 
  copySitemapToClipboard,
  getSiteBaseUrl,
  SitemapEntry
} from '../utils/sitemapGenerator';
import { 
  FileCode, 
  Download, 
  Copy, 
  Check, 
  ExternalLink, 
  Globe, 
  Layers, 
  Sparkles, 
  FileText, 
  Search, 
  Wrench, 
  ShieldAlert,
  Bot
} from 'lucide-react';

interface SitemapPageProps {
  navigate: (path: string) => void;
}

export const SitemapPage: React.FC<SitemapPageProps> = ({ navigate }) => {
  const { articles } = useBlog();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'visual' | 'xml' | 'robots'>('visual');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://careerai.app';
  
  const entries: SitemapEntry[] = useMemo(() => {
    return getAllSitemapEntries(articles, baseUrl);
  }, [articles, baseUrl]);

  const xmlContent = useMemo(() => {
    return generateSitemapXml(articles, baseUrl);
  }, [articles, baseUrl]);

  const robotsContent = useMemo(() => {
    return generateRobotsTxt(baseUrl);
  }, [baseUrl]);

  const filteredEntries = useMemo(() => {
    return entries.filter(entry => {
      const matchesType = filterType === 'all' || entry.type === filterType;
      const matchesSearch = !searchQuery || 
        entry.path.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (entry.title && entry.title.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesType && matchesSearch;
    });
  }, [entries, filterType, searchQuery]);

  const handleCopyXml = async () => {
    const success = await copySitemapToClipboard(articles, baseUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const getTypeBadge = (type: SitemapEntry['type']) => {
    switch (type) {
      case 'tool':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">أداة ذكية</span>;
      case 'article':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">مقال منشور</span>;
      case 'legal':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700">سياسات</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">صفحة رئيسية</span>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <SEOHead
        title="خريطة الموقع التفاعلية والمولد الذكي (Sitemap.xml) | RiseFlow"
        description="استعرض وحمّل خريطة الموقع sitemap.xml المحدثة ديناميكياً لجميع صفحات منصة RiseFlow والمقالات المنشورة والأدوات الذكية لتسهيل الزحف والفهرسة في محركات البحث."
        keywords="sitemap.xml, خريطة الموقع, فهرسة محركات البحث, robots.txt, Google Search Console"
        canonicalPath="/sitemap"
      />

      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              <Bot className="w-3.5 h-3.5" />
              Dynamic Sitemap & SEO Engine
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              خريطة الموقع الشاملة (Sitemap.xml)
            </h1>
            <p className="text-sm text-slate-500">
              توليد فوري ومحدث لجميع الروابط المتاحة والمقالات المنشورة والأدوات الذكية لمساعدة محركات البحث (Google, Bing) في الفهرسة الكاملة.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={handleCopyXml}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm rounded-xl transition flex items-center gap-1.5"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
              <span>{copied ? 'تم النسخ بنجاح' : 'نسخ كود XML'}</span>
            </button>

            <button
              onClick={() => downloadSitemapXml(articles, baseUrl)}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>تحميل sitemap.xml</span>
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100">
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-center">
            <span className="text-xs text-slate-500 block">إجمالي الروابط المفهرسة</span>
            <span className="text-xl font-black text-slate-900 font-mono">{entries.length}</span>
          </div>

          <div className="bg-blue-50/60 p-3.5 rounded-2xl border border-blue-100 text-center">
            <span className="text-xs text-blue-600 block">الأدوات الذكية</span>
            <span className="text-xl font-black text-blue-700 font-mono">
              {entries.filter(e => e.type === 'tool').length}
            </span>
          </div>

          <div className="bg-emerald-50/60 p-3.5 rounded-2xl border border-emerald-100 text-center">
            <span className="text-xs text-emerald-600 block">المقالات المنشورة</span>
            <span className="text-xl font-black text-emerald-700 font-mono">
              {entries.filter(e => e.type === 'article').length}
            </span>
          </div>

          <div className="bg-indigo-50/60 p-3.5 rounded-2xl border border-indigo-100 text-center">
            <span className="text-xs text-indigo-600 block">الصفحات الأساسية</span>
            <span className="text-xl font-black text-indigo-700 font-mono">
              {entries.filter(e => e.type === 'page' || e.type === 'legal').length}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs Controller */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-1 overflow-x-auto">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('visual')}
            className={`px-4 py-2.5 text-sm font-bold rounded-xl transition flex items-center gap-2 ${
              activeTab === 'visual'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>عرض الفهرس التفاعلي ({entries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('xml')}
            className={`px-4 py-2.5 text-sm font-bold rounded-xl transition flex items-center gap-2 ${
              activeTab === 'xml'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>كود sitemap.xml النقي</span>
          </button>

          <button
            onClick={() => setActiveTab('robots')}
            className={`px-4 py-2.5 text-sm font-bold rounded-xl transition flex items-center gap-2 ${
              activeTab === 'robots'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>ملف robots.txt</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Interactive Visual Sitemap */}
      {activeTab === 'visual' && (
        <div className="space-y-4">
          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ابحث عن مسار أو عنوان صفحة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 pl-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                  filterType === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                الكل ({entries.length})
              </button>
              <button
                onClick={() => setFilterType('tool')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                  filterType === 'tool' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                الأدوات ({entries.filter(e => e.type === 'tool').length})
              </button>
              <button
                onClick={() => setFilterType('article')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                  filterType === 'article' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                المقالات ({entries.filter(e => e.type === 'article').length})
              </button>
              <button
                onClick={() => setFilterType('page')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                  filterType === 'page' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                الصفحات ({entries.filter(e => e.type === 'page').length})
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs sm:text-sm">
                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4">الصفحة / العنوان</th>
                    <th className="py-3.5 px-4">المسار (URL Path)</th>
                    <th className="py-3.5 px-4 text-center">النوع</th>
                    <th className="py-3.5 px-4 text-center">الأولوية (Priority)</th>
                    <th className="py-3.5 px-4 text-center">التحديث (Changefreq)</th>
                    <th className="py-3.5 px-4 text-center">آخر تعديل</th>
                    <th className="py-3.5 px-4 text-center">انتقال</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredEntries.map((entry, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 px-4 font-bold text-slate-900 max-w-xs truncate">
                        {entry.title || entry.path}
                      </td>
                      <td className="py-3 px-4 font-mono text-xs text-blue-600 dir-ltr text-left">
                        {entry.path}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {getTypeBadge(entry.type)}
                      </td>
                      <td className="py-3 px-4 text-center font-mono font-bold text-slate-600">
                        {entry.priority.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-center text-xs text-slate-500 font-mono">
                        {entry.changefreq}
                      </td>
                      <td className="py-3 px-4 text-center font-mono text-xs text-slate-500">
                        {entry.lastmod}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => navigate(entry.path)}
                          className="p-1.5 bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-700 rounded-lg transition inline-flex items-center"
                          title="فتح الصفحة"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredEntries.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-400">
                        لم يتم العثور على أي صفحات مطابقة للبحث.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Raw XML View */}
      {activeTab === 'xml' && (
        <div className="bg-slate-950 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-slate-300 text-xs font-mono">
              <FileCode className="w-4 h-4 text-blue-400" />
              <span>sitemap.xml (Standard 0.9 Protocol)</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyXml}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'تم النسخ' : 'نسخ XML'}</span>
              </button>

              <button
                onClick={() => downloadSitemapXml(articles, baseUrl)}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>تحميل الملف</span>
              </button>
            </div>
          </div>

          <pre className="text-emerald-400 font-mono text-xs overflow-x-auto p-4 bg-slate-900/90 rounded-2xl max-h-[500px] leading-relaxed select-all" dir="ltr">
            {xmlContent}
          </pre>
        </div>
      )}

      {/* Tab 3: robots.txt View */}
      {activeTab === 'robots' && (
        <div className="bg-slate-950 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-slate-300 text-xs font-mono">
              <Bot className="w-4 h-4 text-indigo-400" />
              <span>robots.txt</span>
            </div>

            <button
              onClick={() => downloadRobotsTxt(baseUrl)}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>تحميل robots.txt</span>
            </button>
          </div>

          <pre className="text-indigo-300 font-mono text-xs overflow-x-auto p-4 bg-slate-900/90 rounded-2xl leading-relaxed select-all" dir="ltr">
            {robotsContent}
          </pre>
        </div>
      )}

      {/* Google Search Console Submission Guide */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 space-y-4 border border-blue-800 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold">كيف ترسل خريطة الموقع إلى Google Search Console؟</h3>
            <p className="text-xs text-blue-200">خطوات بسيطة لضمان أرشفة فورية وسريعة لموقعك ومقالاتك</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10 space-y-2">
            <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center">1</span>
            <h4 className="text-xs font-bold text-white">انسخ رابط الخريطة</h4>
            <p className="text-[11px] text-blue-200 font-mono bg-blue-950/60 p-2 rounded-lg break-all" dir="ltr">
              {baseUrl}/sitemap.xml
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10 space-y-2">
            <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center">2</span>
            <h4 className="text-xs font-bold text-white">افتح مشرفي المواقع</h4>
            <p className="text-[11px] text-blue-200">
              ادخل إلى Google Search Console &gt; قائمة "خرائط الموقع" (Sitemaps).
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10 space-y-2">
            <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center">3</span>
            <h4 className="text-xs font-bold text-white">إرسال وتحديث فوري</h4>
            <p className="text-[11px] text-blue-200">
              ألصق <code className="text-amber-300 font-mono">sitemap.xml</code> واضغط إرسال لتبدأ خوارزميات جوجل بالزحف الدوري.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

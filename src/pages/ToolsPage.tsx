import React, { useState } from 'react';
import { AI_TOOLS_SHOWCASE } from '../data/initialData';
import { ToolItem } from '../types';
import { AdSenseBanner } from '../components/AdSenseBanner';
import { SEOHead } from '../components/SEOHead';
import { 
  Sparkles, 
  Search, 
  CheckCircle2, 
  ArrowLeft, 
  Cpu, 
  FileText, 
  Users, 
  Mail, 
  TrendingUp, 
  Compass,
  Info,
  ExternalLink
} from 'lucide-react';

interface ToolsPageProps {
  navigate: (path: string) => void;
}

export const ToolsPage: React.FC<ToolsPageProps> = ({ navigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalTool, setActiveModalTool] = useState<ToolItem | null>(null);

  const categories = [
    { id: 'all', label: 'جميع الأدوات' },
    { id: 'cv', label: 'السيرة الذاتية' },
    { id: 'ats', label: 'فحص ATS' },
    { id: 'interview', label: 'المقابلات' },
    { id: 'networking', label: 'التواصل والتشبيك' },
    { id: 'search', label: 'البحث عن وظائف' }
  ];

  const filteredTools = AI_TOOLS_SHOWCASE.filter(tool => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <SEOHead
        title="أدوات الذكاء الاصطناعي المهنية | CareerAI"
        description="استكشف جميع أدوات CareerAI المجانية: منشئ السيرة الذاتية، فاحص ومحلل ATS، كاتب رسائل التغطية، ومستخرج الكلمات المفتاحية لمطابقة الوظائف."
        keywords="أدوات ذكاء اصطناعي للتوظيف, سيرة ذاتية مجانية, ATS scanner, Cover Letter generator, ATS Keywords"
        canonicalPath="/tools"
        schemaJson={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "أدوات الذكاء الاصطناعي للباحثين عن عمل | CareerAI",
          "description": "مجموعة أدوات مجانية لمساعدة الباحثين عن عمل على كتابة وفحص السيرة الذاتية ورسائل التقديم واستخراج الكلمات المفتاحية لأنظمة ATS.",
          "url": "https://careerai.app/tools"
        }}
      />
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs sm:text-sm font-bold">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>ترسانة الذكاء الاصطناعي المهنية</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900">
          أدوات الذكاء الاصطناعي للباحثين عن عمل
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          استكشف حلولنا الذكية المصممة لتسريع رحلتك المهنية، من فحص السيرة الذاتية وصياغة رسائل التقديم إلى تدريب المقابلات الافتراضية.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن أداة معينة..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
            dir="rtl"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Tools Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${tool.color} flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/10`}>
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    tool.badge === 'متاح'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : tool.badge === 'تجريبي'
                      ? 'bg-blue-100 text-blue-800 border border-blue-200'
                      : 'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}>
                    {tool.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    أبرز الإمكانيات:
                  </span>
                  {tool.features.map((feat, fIdx) => (
                    <div key={fIdx} className="text-xs text-slate-700 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-4">
                {tool.id === 'tool-cv-builder' ? (
                  <button
                    onClick={() => navigate('/tools/resume-builder')}
                    className="w-full py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white transition flex items-center justify-center gap-2 shadow-md shadow-blue-500/20"
                  >
                    <span>ابدأ إنشاء سيرتك الذاتية (مجاناً)</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                ) : tool.id === 'tool-ats-keywords' ? (
                  <button
                    onClick={() => navigate('/tools/ats-keywords')}
                    className="w-full py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white transition flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20"
                  >
                    <span>استخرج الكلمات المفتاحية (مجاناً)</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                ) : tool.id === 'tool-ats-scanner' ? (
                  <button
                    onClick={() => navigate('/tools/resume-analyzer')}
                    className="w-full py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white transition flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20"
                  >
                    <span>افحص سيرتك الذاتية الآن (مجاناً)</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                ) : tool.id === 'tool-cover-letter-writer' ? (
                  <button
                    onClick={() => navigate('/tools/cover-letter-generator')}
                    className="w-full py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white transition flex items-center justify-center gap-2 shadow-md shadow-amber-500/20"
                  >
                    <span>أنشئ رسالة تقديم مخصصة (مجاناً)</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveModalTool(tool)}
                    className="w-full py-2.5 rounded-xl font-bold text-sm bg-slate-900 text-white hover:bg-blue-600 transition flex items-center justify-center gap-2 shadow-xs"
                  >
                    <span>تفاصيل الأداة وكيفية العمل</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 space-y-3">
          <Info className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">لا توجد أدوات مطابقة لبحثك</h3>
          <p className="text-xs text-slate-500">جرب البحث بكلمات أخرى أو تغيير التصنيف المختار.</p>
        </div>
      )}

      {/* AdSense Slot */}
      <AdSenseBanner slot="bottom-banner" />

      {/* Informational Guidance Callout */}
      <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl p-8 border border-blue-100/80 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-900">
            تريد معرفة كيف تكتب سيرة ذاتية ممتازة بنفسك؟
          </h3>
          <p className="text-sm text-slate-600 max-w-2xl">
            اطلع على مقالاتنا الحصرية في المدونة، حيث يشرح خبراؤنا استراتيجيات تفصيلية لاجتياز المقابلات وأنظمة ATS خطوة بخطوة.
          </p>
        </div>
        <button
          onClick={() => navigate('/blog')}
          className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shrink-0 flex items-center gap-2"
        >
          <span>تصفح المدونة المهنية</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Modal for Tool Details */}
      {activeModalTool && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-100 animate-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${activeModalTool.color} flex items-center justify-center text-white font-bold`}>
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{activeModalTool.title}</h3>
                  <span className="text-xs text-blue-600 font-medium">حالة الأداة: {activeModalTool.badge}</span>
                </div>
              </div>
              <button
                onClick={() => setActiveModalTool(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {activeModalTool.description}
            </p>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                مزايا وتفاصيل الأداة:
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {activeModalTool.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 text-xs text-blue-800 leading-relaxed">
              <strong>ملاحظة:</strong> يتم تشغيل وتحديث نماذج الذكاء الاصطناعي لهذه الأداة دورياً لتتوافق مع أحدث معايير الموارد البشرية لعام 2026.
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setActiveModalTool(null)}
                className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition"
              >
                إغلاق
              </button>
              <button
                onClick={() => {
                  setActiveModalTool(null);
                  navigate('/blog');
                }}
                className="px-5 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition flex items-center gap-1.5"
              >
                <span>اقرأ دليلاً مرتبطاً بالأداة</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

import React, { useState } from 'react';
import { useBlog } from '../../context/BlogContext';
import { 
  Settings, 
  Sparkles, 
  DollarSign, 
  Globe, 
  Save, 
  CheckCircle2, 
  Info,
  ShieldCheck,
  FileCode,
  Download,
  Copy,
  Check,
  ExternalLink
} from 'lucide-react';
import { 
  generateSitemapXml, 
  downloadSitemapXml, 
  downloadRobotsTxt, 
  copySitemapToClipboard,
  getAllSitemapEntries
} from '../../utils/sitemapGenerator';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings, articles } = useBlog();
  const [adSenseEnabled, setAdSenseEnabled] = useState(settings.adSenseEnabled);
  const [adSensePublisherId, setAdSensePublisherId] = useState(settings.adSensePublisherId);
  const [siteName, setSiteName] = useState(settings.siteName);
  const [siteDescription, setSiteDescription] = useState(settings.siteDescription);
  const [contactEmail, setContactEmail] = useState(settings.contactEmail);
  const [savedToast, setSavedToast] = useState(false);
  const [copiedSitemap, setCopiedSitemap] = useState(false);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://careerai.app';
  const totalIndexedUrls = getAllSitemapEntries(articles, baseUrl).length;

  const handleCopySitemap = async () => {
    const success = await copySitemapToClipboard(articles, baseUrl);
    if (success) {
      setCopiedSitemap(true);
      setTimeout(() => setCopiedSitemap(false), 2500);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      adSenseEnabled,
      adSensePublisherId,
      siteName,
      siteDescription,
      contactEmail
    });
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <h1 className="text-xl sm:text-2xl font-black text-slate-900">
          إعدادات الإعلانات وتهيئة الموقع (Settings)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          التحكم في ظهور إعلانات Google AdSense ومعلومات وبيانات الموقع
        </p>
      </div>

      {savedToast && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-sm font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>تم حفظ وتحديث الإعدادات بنجاح!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Google AdSense Settings Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base font-bold text-slate-900">إعدادات إعلانات Google AdSense</h2>
            </div>
            <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">
              Monetization
            </span>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="space-y-0.5">
              <label className="text-sm font-bold text-slate-900">تفعيل المساحات الإعلانية في المدونة والمقالات</label>
              <p className="text-xs text-slate-500">
                عند التفعيل، ستظهر الوحدات الإعلانية في المقالات والصفحة الرئيسية والمدونة.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={adSenseEnabled}
                onChange={(e) => setAdSenseEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              معرف الناشر في Google AdSense (Publisher ID)
            </label>
            <input
              type="text"
              value={adSensePublisherId}
              onChange={(e) => setAdSensePublisherId(e.target.value)}
              placeholder="ca-pub-XXXXXXXXXXXXXXXX"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
              dir="ltr"
            />
            <p className="text-[11px] text-slate-400">
              المعرف الخاص بحسابك في جوجل أدسنس والمستخدم للتحقق من ملكية الموقع وتفعيل الإعلانات.
            </p>
          </div>
        </div>

        {/* General Site Information */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Globe className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900">بيانات وهوية الموقع العامة</h2>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">اسم الموقع</label>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              dir="rtl"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">الوصف التعريفي العام للموقع (Site Meta Description)</label>
            <textarea
              rows={3}
              value={siteDescription}
              onChange={(e) => setSiteDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 resize-y"
              dir="rtl"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">بريد الدعم والتواصل</label>
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              dir="ltr"
            />
          </div>
        </div>

        {/* SEO & Sitemap Generator Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <FileCode className="w-5 h-5 text-indigo-600" />
              <h2 className="text-base font-bold text-slate-900">محركات البحث وخريطة الموقع (Sitemap.xml & Robots)</h2>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
              {totalIndexedUrls} رابط مفهرس
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600">
            يتم توليد ملف <code className="text-blue-600 font-mono font-bold">sitemap.xml</code> تلقائياً وديناميكياً ليشمل جميع الصفحات الثابتة، الأدوات الذكية، وجميع المقالات المنشورة في المدونة فور نشرها.
          </p>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-slate-900 block">رابط خريطة الموقع المباشر:</span>
                <span className="text-xs text-blue-600 font-mono" dir="ltr">{baseUrl}/sitemap.xml</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopySitemap}
                  className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 transition flex items-center gap-1.5"
                >
                  {copiedSitemap ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSitemap ? 'تم النسخ' : 'نسخ كود XML'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => downloadSitemapXml(articles, baseUrl)}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>تحميل sitemap.xml</span>
                </button>

                <button
                  type="button"
                  onClick={() => downloadRobotsTxt(baseUrl)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>تحميل robots.txt</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-md transition flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>حفظ جميع التغييرات</span>
          </button>
        </div>

      </form>
    </div>
  );
};

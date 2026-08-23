import React, { useState } from 'react';
import { useBlog } from '../context/BlogContext';
import { 
  Sparkles, 
  Mail, 
  ArrowLeft, 
  ShieldCheck, 
  Heart, 
  CheckCircle2
} from 'lucide-react';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const { categories } = useBlog();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1 & 2: Brand & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-3 cursor-pointer group select-none inline-flex"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-emerald-400 p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <span className="text-2xl font-black tracking-tight text-white font-['Plus_Jakarta_Sans',sans-serif]">
                Rise<span className="text-blue-400">Flow</span>
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              المنصة المتخصصة الأولى في تمكين الباحثين عن عمل بأحدث تقنيات الذكاء الاصطناعي، ومساعدتهم في كتابة سير ذاتية متوافقة مع أنظمة ATS، واجتياز المقابلات الوظيفية بثقة.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-2">
                انضم لنشرتنا البريدية الأسبوعية
              </h4>
              {subscribed ? (
                <div className="p-3 bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 rounded-xl text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>شكراً لاشتراكك! ستصلك أحدث النصائح الوظيفية أسبوعياً.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="أدخل بريدك الإلكتروني..."
                    className="bg-slate-800/90 border border-slate-700 text-white text-xs rounded-xl px-3.5 py-2.5 flex-1 focus:outline-hidden focus:border-blue-500"
                    dir="rtl"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition flex items-center gap-1 shrink-0"
                  >
                    <span>اشتراك</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider border-r-2 border-blue-500 pr-2">
              روابط المنصة
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-blue-400 transition">
                  الصفحة الرئيسية
                </button>
              </li>
              <li>
                <button onClick={() => { navigate('/tools'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-blue-400 transition">
                  جميع الأدوات الذكية
                </button>
              </li>
              <li>
                <button onClick={() => { navigate('/blog'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-blue-400 transition">
                  مدونة المقالات المهنية
                </button>
              </li>
              <li>
                <button onClick={() => { navigate('/about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-blue-400 transition">
                  من نحن
                </button>
              </li>
              <li>
                <button onClick={() => { navigate('/contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-blue-400 transition">
                  اتصل بنا
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Top Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider border-r-2 border-emerald-500 pr-2">
              أقسام المدونة
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <button 
                    onClick={() => { navigate(`/blog?category=${cat.id}`); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="hover:text-emerald-400 transition text-right"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Legal & Admin */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider border-r-2 border-amber-500 pr-2">
              السياسات والإدارة
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => { navigate('/privacy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-amber-400 transition">
                  سياسة الخصوصية
                </button>
              </li>
              <li>
                <button onClick={() => { navigate('/terms'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-amber-400 transition">
                  شروط الاستخدام
                </button>
              </li>
              <li>
                <button onClick={() => { navigate('/sitemap'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-amber-400 transition">
                  خريطة الموقع (Sitemap.xml)
                </button>
              </li>
              <li className="pt-2">
                <button 
                  onClick={() => { navigate('/admin/login'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-300 bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700 transition"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                  <span>دخول الإدارة (Admin)</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} RiseFlow. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>صُنع بشغف لتمكين الكفاءات العربية</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </div>
        </div>

      </div>
    </footer>
  );
};

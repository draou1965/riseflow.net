import React, { useState } from 'react';
import { useBlog } from '../context/BlogContext';
import { 
  Sparkles, 
  BookOpen, 
  Wrench, 
  Users, 
  Mail, 
  Home, 
  ShieldCheck, 
  Menu, 
  X, 
  Search,
  ArrowLeft,
  LayoutDashboard
} from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, navigate }) => {
  const { isAdminAuthenticated } = useBlog();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { label: 'الرئيسية', path: '/', icon: Home },
    { label: 'الأدوات الذكية', path: '/tools', icon: Wrench },
    { label: 'المدونة', path: '/blog', icon: BookOpen },
    { label: 'من نحن', path: '/about', icon: Users },
    { label: 'تواصل معنا', path: '/contact', icon: Mail },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/blog?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Logo */}
            <div 
              onClick={() => handleNavClick('/')}
              className="flex items-center gap-3 cursor-pointer group select-none"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-emerald-500 p-0.5 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
                    Rise<span className="text-blue-600">Flow</span>
                  </span>
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium -mt-1 hidden sm:block">
                  دليلك المهني بالذكاء الاصطناعي
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navItems.map((item) => {
                const isActive = currentPath === item.path || 
                  (item.path !== '/' && currentPath.startsWith(item.path));
                const Icon = item.icon;

                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavClick(item.path)}
                    className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 flex items-center gap-1.5 ${
                      isActive
                        ? 'text-blue-600 bg-blue-50/80 font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Actions (Search, Admin Portal, CTA) */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Modal Trigger */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
                title="بحث في المقالات"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Admin Dashboard or Login Link */}
              {isAdminAuthenticated ? (
                <button
                  onClick={() => handleNavClick('/admin')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 transition shadow-xs"
                >
                  <LayoutDashboard className="w-4 h-4 text-amber-700" />
                  <span>لوحة التحكم</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </button>
              ) : (
                <button
                  onClick={() => handleNavClick('/admin/login')}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 transition"
                  title="تسجيل دخول الإدارة"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                  <span>دخول الإدارة</span>
                </button>
              )}

              {/* Primary CTA */}
              <button
                onClick={() => handleNavClick('/tools')}
                className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 shadow-sm shadow-blue-500/20 hover:shadow-md transition-all active:scale-95"
              >
                <span>استكشف الأدوات</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
                aria-label="القائمة"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200 shadow-xl">
            <div className="grid grid-cols-1 gap-1 pt-2">
              {navItems.map((item) => {
                const isActive = currentPath === item.path;
                const Icon = item.icon;
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavClick(item.path)}
                    className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}

              {/* Mobile Quick Tools Drawer */}
              <div className="border-t border-slate-100 my-2 pt-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-4 mb-2">
                  الأدوات الذكية المباشرة
                </span>
                <div className="grid grid-cols-2 gap-2 px-2">
                  <button
                    onClick={() => handleNavClick('/tools/resume-builder')}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-right border border-slate-100 hover:border-blue-200 transition"
                  >
                    <span className="text-xs font-bold text-slate-800 block">منشئ السيرة الذاتية</span>
                    <span className="text-[10px] text-slate-500">متوافق 100% مع ATS</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('/tools/ats-keywords')}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50 text-right border border-slate-100 hover:border-indigo-200 transition"
                  >
                    <span className="text-xs font-bold text-slate-800 block">مستخرج الكلمات</span>
                    <span className="text-[10px] text-slate-500">تحليل إعلان الوظيفة</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('/tools/resume-analyzer')}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-right border border-slate-100 hover:border-emerald-200 transition"
                  >
                    <span className="text-xs font-bold text-slate-800 block">فاحص ومحلل ATS</span>
                    <span className="text-[10px] text-slate-500">كشف الثغرات ونسبة المطابقة</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('/tools/cover-letter-generator')}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 text-right border border-slate-100 hover:border-amber-200 transition"
                  >
                    <span className="text-xs font-bold text-slate-800 block">كاتب Cover Letter</span>
                    <span className="text-[10px] text-slate-500">رسائل تقديم مخصصة</span>
                  </button>
                </div>
              </div>

              <div className="border-t border-slate-100 my-2 pt-2">
                <button
                  onClick={() => handleNavClick('/admin/login')}
                  className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-slate-400" />
                    لوحة تحكم المدير
                  </span>
                  {isAdminAuthenticated && (
                    <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                      نشط
                    </span>
                  )}
                </button>
              </div>

              <button
                onClick={() => handleNavClick('/tools')}
                className="w-full mt-2 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-emerald-600 flex items-center justify-center gap-2 shadow-md shadow-blue-500/20"
              >
                <span>استكشف جميع الأدوات مجاناً</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center pt-20 px-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-4 border border-slate-100 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <span className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Search className="w-4 h-4 text-blue-600" />
                بحث سريع في مقالات RiseFlow
              </span>
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن: السيرة الذاتية، المقابلات، نظام ATS، رسائل التقديم..."
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm"
                dir="rtl"
              />
              <button
                type="submit"
                className="absolute left-2.5 top-2.5 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition"
              >
                بحث
              </button>
            </form>

            <div className="mt-4 pt-2">
              <p className="text-xs text-slate-400 mb-2">مواضيع مقترحة:</p>
              <div className="flex flex-wrap gap-1.5">
                {['السيرة الذاتية', 'نظام ATS', 'مقابلات العمل', 'لينكد إن', 'رسائل التغطية'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      navigate(`/blog?q=${encodeURIComponent(tag)}`);
                      setSearchOpen(false);
                    }}
                    className="text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

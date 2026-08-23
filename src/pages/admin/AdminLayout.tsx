import React, { useState } from 'react';
import { useBlog } from '../../context/BlogContext';
import { 
  LayoutDashboard, 
  FileText, 
  PlusCircle, 
  FolderTree, 
  Settings, 
  LogOut, 
  ExternalLink, 
  Sparkles, 
  Menu, 
  X, 
  ShieldCheck,
  ChevronLeft
} from 'lucide-react';

interface AdminLayoutProps {
  currentPath: string;
  navigate: (path: string) => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ currentPath, navigate, children }) => {
  const { logoutAdmin, adminUser, stats } = useBlog();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { label: 'الرئيسية والإحصائيات', path: '/admin', icon: LayoutDashboard },
    { label: 'إدارة المقالات', path: '/admin/articles', icon: FileText, badge: stats.totalArticles },
    { label: 'إضافة مقال جديد', path: '/admin/articles/new', icon: PlusCircle },
    { label: 'إدارة التصنيفات', path: '/admin/categories', icon: FolderTree, badge: stats.totalCategories },
    { label: 'إعدادات الإعلانات وSEO', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logoutAdmin();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-['Cairo',sans-serif]">
      
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-slate-900 text-white border-b border-slate-800 shadow-md">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Right Side: Toggle + Logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <div 
                onClick={() => navigate('/admin')}
                className="flex items-center gap-2.5 cursor-pointer select-none"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 to-emerald-400 flex items-center justify-center text-white font-bold shadow-md">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg font-black tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
                      Rise<span className="text-blue-400">Flow</span>
                    </span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold border border-emerald-500/30">
                      لوحة المدير
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Left Side: Live Site Link, Admin Badge, Logout */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => navigate('/')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition"
                title="عرض واجهة الزوار"
              >
                <span>زيارة الموقع المباشر</span>
                <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              </button>

              <div className="hidden md:flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700 text-xs">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-slate-300 font-medium">{adminUser?.name || 'مدير المنصة'}</span>
              </div>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-rose-300 hover:bg-rose-950/40 border border-rose-900/50 transition"
                title="تسجيل الخروج من لوحة التحكم"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-400" />
                <span className="hidden sm:inline">خروج</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Main Layout Body */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-1">
            <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              قوائم الإدارة
            </div>

            {navItems.map((item) => {
              const isActive = currentPath === item.path || 
                (item.path !== '/admin' && currentPath.startsWith(item.path));
              const Icon = item.icon;

              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
                    isActive
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Help Tip */}
          <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl p-4 border border-blue-100 text-xs text-slate-700 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-blue-900">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>نصيحة للنشر</span>
            </div>
            <p className="leading-relaxed text-slate-600 text-[11px]">
              احرص على ملء حقول Meta Title وMeta Description لكل مقال لضمان تصدر نتائج بحث Google.
            </p>
          </div>
        </aside>

        {/* Mobile Drawer */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden bg-slate-900/50 backdrop-blur-xs flex">
            <div className="bg-white w-72 h-full p-4 space-y-4 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="font-bold text-slate-800 text-sm">لوحة تحكم RiseFlow</span>
                  <button onClick={() => setSidebarOpen(false)} className="p-1 rounded-lg hover:bg-slate-100">
                    <X className="w-5 h-5 text-slate-500" />
                  </button>
                </div>

                <div className="space-y-1">
                  {navItems.map((item) => {
                    const isActive = currentPath === item.path;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.path}
                        onClick={() => {
                          navigate(item.path);
                          setSidebarOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                          isActive
                            ? 'bg-blue-600 text-white font-bold'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                          <span>{item.label}</span>
                        </div>
                        {item.badge !== undefined && (
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <button
                  onClick={() => { navigate('/'); setSidebarOpen(false); }}
                  className="w-full py-2.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                  <span>معاينة الموقع كزائر</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full py-2.5 bg-rose-50 text-rose-700 text-xs font-bold rounded-xl flex items-center justify-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>تسجيل الخروج</span>
                </button>
              </div>
            </div>
            <div className="flex-1" onClick={() => setSidebarOpen(false)} />
          </div>
        )}

        {/* Dynamic Admin View Content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>

      </div>

    </div>
  );
};

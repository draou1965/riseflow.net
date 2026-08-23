import React, { useState } from 'react';
import { useBlog } from '../../context/BlogContext';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  KeyRound, 
  AlertCircle,
  Sparkles
} from 'lucide-react';

interface AdminLoginPageProps {
  navigate: (path: string) => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ navigate }) => {
  const { loginAdmin, isAdminAuthenticated } = useBlog();
  const [email, setEmail] = useState('admin@careerai.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already authenticated, redirect to /admin
  React.useEffect(() => {
    if (isAdminAuthenticated) {
      navigate('/admin');
    }
  }, [isAdminAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const success = loginAdmin(password, email);
      if (success) {
        navigate('/admin');
      } else {
        setError('كلمة المرور غير صحيحة. يرجى تجربة كلمة المرور الافتراضية الموضحة أدناه.');
      }
      setLoading(false);
    }, 400);
  };

  const handleFillDemo = () => {
    setEmail('admin@careerai.com');
    setPassword('admin123');
    setError('');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-slate-50">
      <div className="max-w-md w-full space-y-6">
        
        {/* Logo and Brand */}
        <div className="text-center space-y-2">
          <div 
            onClick={() => navigate('/')} 
            className="inline-flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-emerald-500 p-0.5 shadow-lg shadow-blue-500/20">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            تسجيل دخول مدير المنصة
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            بوابة الإدارة الحصرية للتحكم في مقالات وتصنيفات RiseFlow
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 space-y-6">
          
          {error && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">البريد الإلكتروني للمدير</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@careerai.com"
                  className="w-full pl-3.5 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  dir="ltr"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 block">كلمة المرور</label>
                <span className="text-[11px] text-slate-400">لوحة الإدارة محمية</span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  dir="ltr"
                />
                <KeyRound className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3.5 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>دخول إلى لوحة التحكم</span>
                  <ArrowLeft className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Info Box */}
          <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-2xl space-y-2 text-xs text-amber-900">
            <div className="flex items-center justify-between font-bold">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                بيانات الدخول التجريبية الجاهزة:
              </span>
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-[11px] underline text-blue-700 font-bold hover:text-blue-900 cursor-pointer"
              >
                تعبئة تلقائية
              </button>
            </div>
            <div className="font-mono text-[11px] space-y-0.5 text-amber-800 dir-ltr text-right">
              <div>Email: <strong>admin@careerai.com</strong></div>
              <div>Password: <strong>admin123</strong></div>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => navigate('/')}
              className="text-xs text-slate-500 hover:text-slate-800 transition"
            >
              ← العودة إلى الموقع الرئيسي
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

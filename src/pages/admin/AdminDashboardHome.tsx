import React from 'react';
import { useBlog } from '../../context/BlogContext';
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  FolderTree, 
  Eye, 
  Plus, 
  ArrowLeft, 
  ExternalLink, 
  Edit, 
  Trash2, 
  Sparkles,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

interface AdminDashboardHomeProps {
  navigate: (path: string) => void;
}

export const AdminDashboardHome: React.FC<AdminDashboardHomeProps> = ({ navigate }) => {
  const { stats, articles, categories, toggleArticleStatus, deleteArticle } = useBlog();

  const recentArticles = articles.slice(0, 5);

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`هل أنت متأكد من حذف المقال: "${title}"؟`)) {
      await deleteArticle(id);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>نظام إدارة محتوى CareerAI</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            مرحباً بك في لوحة تحكم المقالات
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl">
            من هنا يمكنك نشر وتعديل المقالات المهنية، إدارة تصنيفات السيرة الذاتية والمقابلات، والتحكم في إعدادات محركات البحث SEO.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => navigate('/admin/articles/new')}
            className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة مقال جديد</span>
          </button>

          <button
            onClick={() => navigate('/admin/categories')}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-bold rounded-xl transition"
          >
            <span>إدارة التصنيفات</span>
          </button>
        </div>
      </div>

      {/* 4 Main Statistics Cards Required by User */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* 1. Total Articles */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs text-slate-500 font-semibold">إجمالي المقالات</p>
            <p className="text-3xl font-black text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
              {stats.totalArticles}
            </p>
            <p className="text-[11px] text-slate-400">في قاعدة البيانات</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        {/* 2. Published Articles */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs text-slate-500 font-semibold">المقالات المنشورة</p>
            <p className="text-3xl font-black text-emerald-600 font-['Plus_Jakarta_Sans',sans-serif]">
              {stats.publishedCount}
            </p>
            <p className="text-[11px] text-emerald-600 font-medium">متاحة للزوار الآن</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        {/* 3. Drafts */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs text-slate-500 font-semibold">المسودات</p>
            <p className="text-3xl font-black text-amber-600 font-['Plus_Jakarta_Sans',sans-serif]">
              {stats.draftsCount}
            </p>
            <p className="text-[11px] text-amber-600 font-medium">قيد الإعداد والتجهيز</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* 4. Total Categories */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs text-slate-500 font-semibold">عدد التصنيفات</p>
            <p className="text-3xl font-black text-violet-600 font-['Plus_Jakarta_Sans',sans-serif]">
              {stats.totalCategories}
            </p>
            <p className="text-[11px] text-slate-400">أقسام رئيسية</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center">
            <FolderTree className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Additional Quick Metrics Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2 text-slate-700">
            <Eye className="w-4 h-4 text-blue-600" />
            إجمالي المشاهدات لجميع المقالات: <strong className="text-slate-900 font-bold font-['Plus_Jakarta_Sans',sans-serif]">{stats.totalViews}</strong>
          </span>
          <span className="flex items-center gap-2 text-slate-700">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            التفاعلات والإعجابات: <strong className="text-slate-900 font-bold font-['Plus_Jakarta_Sans',sans-serif]">{stats.totalLikes}</strong>
          </span>
        </div>

        <button
          onClick={() => navigate('/admin/articles/new')}
          className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1"
        >
          <span>كتابة مقال جديد</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Recent Articles Table Section */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">آخر المقالات المضافة والمعدلة</h2>
            <p className="text-xs text-slate-500">نظرة سريعة على أحدث محتوى بالمدونة</p>
          </div>

          <button
            onClick={() => navigate('/admin/articles')}
            className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
          >
            <span>عرض كل المقالات ({articles.length})</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        {recentArticles.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">المقال</th>
                  <th className="py-3 px-4">التصنيف</th>
                  <th className="py-3 px-4">الحالة</th>
                  <th className="py-3 px-4">تاريخ النشر</th>
                  <th className="py-3 px-4">المشاهدات</th>
                  <th className="py-3 px-4 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentArticles.map((article) => (
                  <tr key={article.id} className="hover:bg-slate-50/80 transition">
                    {/* Thumbnail & Title */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={article.coverImage}
                          alt={article.title}
                          className="w-12 h-9 rounded-lg object-cover bg-slate-100 shrink-0"
                        />
                        <div className="space-y-0.5">
                          <p className="font-bold text-slate-900 line-clamp-1 max-w-xs sm:max-w-md">
                            {article.title}
                          </p>
                          <p className="text-[10px] text-slate-400 font-mono">
                            /blog/{article.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="bg-blue-50 text-blue-700 font-semibold px-2.5 py-1 rounded-md text-[11px]">
                        {article.categoryName}
                      </span>
                    </td>

                    {/* Status Toggle */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleArticleStatus(article.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition ${
                          article.status === 'published'
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                        }`}
                        title="انقر لتغيير الحالة"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${article.status === 'published' ? 'bg-emerald-600' : 'bg-amber-600'}`}></span>
                        <span>{article.status === 'published' ? 'منشور' : 'مسودة'}</span>
                      </button>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {article.publishedAt}
                    </td>

                    {/* Views */}
                    <td className="py-3.5 px-4 text-slate-600 font-medium whitespace-nowrap font-['Plus_Jakarta_Sans',sans-serif]">
                      {article.viewsCount}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => navigate(`/blog/${article.slug}`)}
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="عرض في الموقع"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => navigate(`/admin/articles/edit/${article.id}`)}
                          className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                          title="تعديل المقال"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDelete(article.id, article.title)}
                          className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          title="حذف المقال"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-slate-400 text-xs">
            لا توجد مقالات مضافة بعد.
          </div>
        )}
      </div>

      {/* Categories Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">توزيع المقالات حسب التصنيف</h3>
            <button
              onClick={() => navigate('/admin/categories')}
              className="text-xs text-blue-600 font-bold hover:underline"
            >
              إدارة الأقسام
            </button>
          </div>

          <div className="space-y-2.5">
            {categories.map((cat) => {
              const count = articles.filter(a => a.categoryId === cat.id).length;
              const percentage = articles.length > 0 ? Math.round((count / articles.length) * 100) : 0;
              return (
                <div key={cat.id} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-700">{cat.name}</span>
                    <span className="text-slate-500">{count} مقال ({percentage}%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SEO Quick Checklist */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900">قائمة التحقق من تحسين محركات البحث (SEO)</h3>
          <ul className="space-y-2.5 text-xs text-slate-600">
            <li className="flex items-center gap-2 text-emerald-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>روابط صفحات ديناميكية ونظيفة بتنسيق Slug</span>
            </li>
            <li className="flex items-center gap-2 text-emerald-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>توليد تلقائي لبيانات Meta Title وMeta Description</span>
            </li>
            <li className="flex items-center gap-2 text-emerald-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>جاهزية دمج إعلانات Google AdSense في المقالات</span>
            </li>
            <li className="flex items-center gap-2 text-emerald-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>صفحات متوافقة مع الهواتف وسرعة تحميل فائقة</span>
            </li>
          </ul>
        </div>
      </div>

    </div>
  );
};

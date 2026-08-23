import React, { useState, useMemo } from 'react';
import { useBlog } from '../../context/BlogContext';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  ExternalLink, 
  Eye, 
  CheckCircle2, 
  Clock, 
  FileText,
  Sparkles,
  ArrowUpDown,
  FileCode2
} from 'lucide-react';

interface AdminArticlesListProps {
  navigate: (path: string) => void;
}

export const AdminArticlesList: React.FC<AdminArticlesListProps> = ({ navigate }) => {
  const { articles, categories, toggleArticleStatus, deleteArticle } = useBlog();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'views' | 'title'>('date');

  const filteredArticles = useMemo(() => {
    return articles.filter(art => {
      const matchesStatus = statusFilter === 'all' || art.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || art.categoryId === categoryFilter;
      const matchesSearch = !searchQuery.trim() ||
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesStatus && matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'views') return (b.viewsCount || 0) - (a.viewsCount || 0);
      if (sortBy === 'title') return a.title.localeCompare(b.title, 'ar');
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
  }, [articles, statusFilter, categoryFilter, searchQuery, sortBy]);

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`هل أنت متأكد من رغبتك في حذف المقال: "${title}" نهائياً من النظام؟`)) {
      await deleteArticle(id);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            إدارة المقالات ({articles.length})
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            استعراض، تعديل، حذف، وتغيير حالة النشر لجميع مقالات المنصة
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => navigate('/admin/articles/new')}
            className="px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs sm:text-sm font-bold rounded-xl border border-indigo-200 transition flex items-center justify-center gap-2"
          >
            <FileCode2 className="w-4 h-4" />
            <span>إضافة مقال بصيغة HTML</span>
          </button>

          <button
            onClick={() => navigate('/admin/articles/new')}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة مقال عادي</span>
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="بحث بالعنوان أو الرابط أو الوسم..."
              className="w-full pl-3.5 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
              dir="rtl"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
              dir="rtl"
            >
              <option value="all">جميع الحالات (المنشورة والمسودات)</option>
              <option value="published">المنشورة فقط (Published)</option>
              <option value="draft">المسودات فقط (Drafts)</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
              dir="rtl"
            >
              <option value="all">جميع التصنيفات</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
              dir="rtl"
            >
              <option value="date">ترتيب: الأحدث تاريخاً</option>
              <option value="views">ترتيب: الأكثر مشاهدة</option>
              <option value="title">ترتيب: أبجدياً بالعنوان</option>
            </select>
          </div>

        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {filteredArticles.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">المقال والصورة</th>
                  <th className="py-3 px-4">التصنيف</th>
                  <th className="py-3 px-4">الحالة</th>
                  <th className="py-3 px-4">تاريخ النشر</th>
                  <th className="py-3 px-4">المشاهدات</th>
                  <th className="py-3 px-4 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredArticles.map((article) => (
                  <tr key={article.id} className="hover:bg-slate-50/80 transition">
                    {/* Thumbnail & Title */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3.5">
                        <img
                          src={article.coverImage}
                          alt={article.title}
                          className="w-14 h-10 rounded-xl object-cover bg-slate-100 shrink-0 border border-slate-200"
                        />
                        <div className="space-y-1">
                          <h3 className="font-bold text-slate-900 hover:text-blue-600 cursor-pointer line-clamp-1 max-w-sm sm:max-w-md"
                              onClick={() => navigate(`/admin/articles/edit/${article.id}`)}>
                            {article.title}
                          </h3>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                            <span>slug: /{article.slug}</span>
                            <span>•</span>
                            <span>{article.readingTimeMinutes} د قراءة</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="bg-blue-50 text-blue-700 font-semibold px-2.5 py-1 rounded-md text-[11px] border border-blue-100">
                        {article.categoryName}
                      </span>
                    </td>

                    {/* Status Toggle Button */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleArticleStatus(article.id)}
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition shadow-2xs ${
                          article.status === 'published'
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                        }`}
                        title="انقر لتبديل الحالة بين منشور ومسودة"
                      >
                        <span className={`w-2 h-2 rounded-full ${article.status === 'published' ? 'bg-emerald-600' : 'bg-amber-600'}`}></span>
                        <span>{article.status === 'published' ? 'منشور' : 'مسودة'}</span>
                      </button>
                    </td>

                    {/* Published Date */}
                    <td className="py-4 px-4 text-slate-500 whitespace-nowrap">
                      {article.publishedAt}
                    </td>

                    {/* Views Count */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="font-bold text-slate-700 font-['Plus_Jakarta_Sans',sans-serif]">
                        {article.viewsCount}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => navigate(`/blog/${article.slug}`)}
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="معاينة في الموقع"
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
          <div className="p-12 text-center space-y-4">
            <FileText className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">لا توجد مقالات مطابقة للبحث أو التصفية</h3>
            <p className="text-xs text-slate-500">جرب تغيير شروط الفلترة أو أضف مقالاً جديداً.</p>
            <button
              onClick={() => navigate('/admin/articles/new')}
              className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition inline-flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة مقال جديد</span>
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

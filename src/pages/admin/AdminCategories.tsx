import React, { useState } from 'react';
import { useBlog } from '../../context/BlogContext';
import { Category } from '../../types';
import { 
  FolderTree, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  FileText, 
  Sparkles, 
  ArrowLeft,
  X
} from 'lucide-react';

interface AdminCategoriesProps {
  navigate: (path: string) => void;
}

export const AdminCategories: React.FC<AdminCategoriesProps> = ({ navigate }) => {
  const { categories, articles, addCategory, updateCategory, deleteCategory } = useBlog();
  
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('blue');
  const [saving, setSaving] = useState(false);

  const openAddModal = () => {
    setEditingCategory(null);
    setName('');
    setSlug('');
    setDescription('');
    setColor('blue');
    setModalOpen(true);
  };

  const openEditModal = (cat: Category) => {
    setEditingCategory(cat);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description);
    setColor(cat.color || 'blue');
    setModalOpen(true);
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingCategory) {
      const generatedSlug = val
        .trim()
        .toLowerCase()
        .replace(/[^\u0621-\u064A\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-');
      setSlug(generatedSlug);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !slug.trim()) {
      alert('يرجى ملء اسم التصنيف والرابط');
      return;
    }

    setSaving(true);
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, {
          name: name.trim(),
          slug: slug.trim(),
          description: description.trim(),
          color
        });
      } else {
        await addCategory({
          name: name.trim(),
          slug: slug.trim(),
          description: description.trim(),
          color
        });
      }
      setModalOpen(false);
    } catch (err: any) {
      alert(err?.message || 'حدث خطأ أثناء حفظ التصنيف');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, catName: string) => {
    const count = articles.filter(a => a.categoryId === id).length;
    let confirmMsg = `هل أنت متأكد من حذف تصنيف: "${catName}"؟`;
    if (count > 0) {
      confirmMsg += `\nتنبيه: يوجد ${count} مقال مرتبط بهذا التصنيف سيتم نقلها لتصنيف آخر.`;
    }

    if (window.confirm(confirmMsg)) {
      await deleteCategory(id);
    }
  };

  const colorsList = [
    { id: 'blue', label: 'أزرق', class: 'bg-blue-500' },
    { id: 'emerald', label: 'أخضر زمردي', class: 'bg-emerald-500' },
    { id: 'violet', label: 'بنفسجي', class: 'bg-violet-500' },
    { id: 'amber', label: 'عنبري / برتقالي', class: 'bg-amber-500' },
    { id: 'teal', label: 'تركوازي', class: 'bg-teal-500' },
    { id: 'rose', label: 'وردي', class: 'bg-rose-500' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            إدارة تصنيفات المقالات ({categories.length})
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            إنشاء وتعديل وحذف أقسام المدونة وربط المقالات بها
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة تصنيف جديد</span>
        </button>
      </div>

      {/* Categories Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const articleCount = articles.filter(a => a.categoryId === cat.id).length;
          return (
            <div
              key={cat.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-3.5 h-3.5 rounded-full bg-${cat.color || 'blue'}-500`} />
                    <h3 className="text-base font-bold text-slate-900">{cat.name}</h3>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg">
                    {articleCount} مقال
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed min-h-[36px]">
                  {cat.description || 'لا يوجد وصف مخصص لهذا التصنيف.'}
                </p>

                <div className="text-[11px] text-slate-400 font-mono bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                  Slug: {cat.slug}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => navigate(`/blog?category=${cat.id}`)}
                  className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                >
                  <span>عرض مقالات القسم</span>
                  <ArrowLeft className="w-3 h-3" />
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(cat)}
                    className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                    title="تعديل التصنيف"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(cat.id, cat.name)}
                    className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                    title="حذف التصنيف"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Category Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-100 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                {editingCategory ? 'تعديل التصنيف' : 'إضافة تصنيف جديد'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  اسم التصنيف <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="مثال: السيرة الذاتية، مقابلات العمل..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  dir="rtl"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  الرابط المختصر (Slug) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="cv, interviews, job-search"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  dir="ltr"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  وصف مختصر للتصنيف
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="وصف محتوى هذا القسم المهني..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white resize-y"
                  dir="rtl"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  لون التصنيف التمييزي
                </label>
                <div className="flex items-center gap-2">
                  {colorsList.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setColor(c.id)}
                      className={`w-7 h-7 rounded-full ${c.class} transition ${
                        color === c.id ? 'ring-2 ring-offset-2 ring-blue-600 scale-110' : 'opacity-70 hover:opacity-100'
                      }`}
                      title={c.label}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition shadow-md disabled:opacity-50"
                >
                  {saving ? 'جارٍ الحفظ...' : (editingCategory ? 'تحديث التصنيف' : 'حفظ التصنيف')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

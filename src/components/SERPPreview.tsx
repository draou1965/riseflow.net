import React from 'react';
import { Globe, AlertCircle, CheckCircle2 } from 'lucide-react';

interface SERPPreviewProps {
  title: string;
  description: string;
  slug: string;
}

export const SERPPreview: React.FC<SERPPreviewProps> = ({ title, description, slug }) => {
  const displayTitle = title || 'عنوان المقال التجريبي - CareerAI';
  const displayDesc = description || 'وصف المقال الذي سيظهر في نتائج بحث جوجل. احرص على استخدام كلمات مفتاحية جذابة وواضحة لجذب الزوار.';
  const displaySlug = slug || 'article-slug';

  const titleLength = title.length;
  const descLength = description.length;

  const isTitleGood = titleLength >= 30 && titleLength <= 65;
  const isDescGood = descLength >= 80 && descLength <= 165;

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <Globe className="w-4 h-4 text-blue-600" />
          معاينة نتيجة البحث في Google (SERP Preview)
        </h4>
        <span className="text-[11px] text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
          محركات البحث
        </span>
      </div>

      {/* Google Result Box */}
      <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs font-sans text-right" dir="rtl">
        <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-1">
          <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 text-[10px] flex items-center justify-center font-bold">
            C
          </div>
          <span className="text-slate-800 font-medium text-xs">CareerAI</span>
          <span className="text-slate-400">›</span>
          <span className="text-slate-500 truncate max-w-[200px]">blog › {displaySlug}</span>
        </div>
        <h3 className="text-blue-700 text-base font-medium hover:underline cursor-pointer leading-snug line-clamp-1 mb-1">
          {displayTitle}
        </h3>
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {displayDesc}
        </p>
      </div>

      {/* SEO Length Health Checks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
        <div className={`p-2 rounded-lg border flex items-center justify-between ${
          isTitleGood ? 'bg-emerald-50/50 border-emerald-200 text-emerald-800' : 'bg-amber-50/50 border-amber-200 text-amber-800'
        }`}>
          <div className="flex items-center gap-1.5">
            {isTitleGood ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <AlertCircle className="w-3.5 h-3.5 text-amber-600" />}
            <span>طول العنوان: <strong>{titleLength}</strong> حرف</span>
          </div>
          <span className="text-[11px] opacity-80">(المثالي: 40-60)</span>
        </div>

        <div className={`p-2 rounded-lg border flex items-center justify-between ${
          isDescGood ? 'bg-emerald-50/50 border-emerald-200 text-emerald-800' : 'bg-amber-50/50 border-amber-200 text-amber-800'
        }`}>
          <div className="flex items-center gap-1.5">
            {isDescGood ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <AlertCircle className="w-3.5 h-3.5 text-amber-600" />}
            <span>طول الوصف: <strong>{descLength}</strong> حرف</span>
          </div>
          <span className="text-[11px] opacity-80">(المثالي: 120-160)</span>
        </div>
      </div>
    </div>
  );
};

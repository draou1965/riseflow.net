import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <SEOHead
        title="شروط الاستخدام | RiseFlow"
        description="شروط وأحكام استخدام منصة وأدوات ومقالات RiseFlow."
        canonicalPath="/terms"
      />
      <div className="text-center space-y-2 border-b border-slate-200 pb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
          <FileText className="w-4 h-4 text-blue-600" />
          <span>الاتفاقية القانونية</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">شروط الاستخدام</h1>
        <p className="text-xs text-slate-500">آخر تحديث: 20 أغسطس 2026</p>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 space-y-6 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">1. قبول الشروط</h2>
          <p>
            باستخدامك لمنصة وموقع <strong className="text-slate-900">RiseFlow</strong>، فإنك توافق على الالتزام بجميع بنود وشروط الاستخدام الموضحة هنا. إذا كنت لا توافق على هذه الشروط، يرجى التوقف عن استخدام الموقع.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">2. حقوق الملكية الفكرية</h2>
          <p>
            جميع النصوص، المقالات، التصاميم، الشعارات، والشفرات البرمجية المنشورة على RiseFlow هي ملكية فكرية حصرية للموقع ومحمية بموجب قوانين الملكية الفكرية وحقوق النشر. لا يجوز نسخ أو إعادة نشر المقالات دون إذن خطي مسبق وذكر المصدر مع رابط مباشر.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">3. إخلاء المسؤولية المهنية</h2>
          <p>
            المعلومات والنصائح الواردة في مقالات المنصة مخصصة للأغراض الإرشادية والتعليمية العامة. على الرغم من حرصنا على دقة المحتوى، فإن معايير القبول الوظيفي تختلف من شركة لأخرى ومن جهة توظيف لأخرى.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">4. تعديل الشروط</h2>
          <p>
            يحتفظ فريق RiseFlow بالحق في تحديث وتعديل شروط الاستخدام هذه في أي وقت. يصبح أي تعديل نافذاً فور نشره على هذه الصفحة.
          </p>
        </section>
      </div>
    </div>
  );
};

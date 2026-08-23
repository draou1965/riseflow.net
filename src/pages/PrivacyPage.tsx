import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <SEOHead
        title="سياسة الخصوصية | RiseFlow"
        description="سياسة الخصوصية وحماية البيانات في منصة RiseFlow وكيفية التعامل مع بيانات الزوار وملفات تعريف الارتباط."
        canonicalPath="/privacy"
      />
      <div className="text-center space-y-2 border-b border-slate-200 pb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>حماية البيانات والخصوصية</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">سياسة الخصوصية</h1>
        <p className="text-xs text-slate-500">آخر تحديث: 20 أغسطس 2026</p>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 space-y-6 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Lock className="w-5 h-5 text-blue-600" />
            1. مقدمة والتزام
          </h2>
          <p>
            نحن في منصة <strong className="text-slate-900">RiseFlow</strong> نلتزم بأعلى معايير حماية وخصوصية بيانات الزوار والمستخدمين. توضح هذه الوثيقة ماهية البيانات التي قد يتم جمعها وكيفية التعامل معها وفقاً للأنظمة والمعايير الدولية.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Eye className="w-5 h-5 text-blue-600" />
            2. قراءة المقالات وتجربة الزوار
          </h2>
          <p>
            تتيح منصة RiseFlow لجميع الزوار قراءة المقالات، الاستفادة من الأدلة التوظيفية، وتصفح المحتوى بشكل كامل ومجاني دون الحاجة لإنشاء حساب أو تقديم أي بيانات شخصية حساسة.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            3. ملفات تعريف الارتباط وإعلانات Google AdSense
          </h2>
          <p>
            قد يستخدم الموقع ملفات تعريف الارتباط (Cookies) لتحسين تجربة التصفح وتذكر التفضيلات. بالإضافة إلى ذلك، قد يتم استخدام شبكات إعلانية شريكة مثل Google AdSense لعرض إعلانات ملائمة للزوار وفق سياسات الخصوصية المعتمدة من Google.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">4. حماية البيانات وأمان المنصة</h2>
          <p>
            نطبق تدابير أمنية صارمة تشمل التشفير وبروتوكولات الحماية المتقدمة لمنع الوصول غير المصرح به وضمان سلامة بيئة التصفح.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">5. التواصل معنا</h2>
          <p>
            إذا كانت لديك أي استفسارات أو أسئلة بخصوص سياسة الخصوصية، يمكنك مراسلتنا في أي وقت عبر البريد الإلكتروني: <strong className="text-blue-600">privacy@careerai.com</strong>.
          </p>
        </section>
      </div>
    </div>
  );
};

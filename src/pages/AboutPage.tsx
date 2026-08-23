import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { Sparkles, Target, Compass, Users, Award, ShieldCheck, ArrowLeft } from 'lucide-react';

interface AboutPageProps {
  navigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ navigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <SEOHead
        title="من نحن | RiseFlow"
        description="تعرف على منصة RiseFlow ورسالتنا في تمكين الكفاءات والباحثين عن عمل بأحدث تقنيات الذكاء الاصطناعي وأدوات السيرة الذاتية وأنظمة ATS."
        keywords="من نحن, منصة RiseFlow, الذكاء الاصطناعي للتوظيف, مساعدة الباحثين عن عمل"
        canonicalPath="/about"
        schemaJson={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "من نحن | RiseFlow",
          "description": "منصة رائدة لتمكين الباحثين عن عمل بالأدوات الذكية والمحتوى المهني المجاني.",
          "url": "https://careerai.app/about"
        }}
      />
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>من نحن • RiseFlow</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
          نمكن الكفاءات العربية بالذكاء الاصطناعي للوصول إلى وظائف أحلامهم
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          انطلقت منصة RiseFlow بهدف سد الفجوة بين متطلبات التوظيف الحديثة وخوارزميات ATS وبين مهارات الباحثين عن عمل.
        </p>
      </div>

      {/* Vision & Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">رسالتنا</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            توفير أدوات ذكية ومحتوى إرشادي عالي الجودة ومجاني يساعد كل باحث عن عمل في إبراز قدراته الحقيقية، واجتياز مراحل الفرز الأولى، والتألق في المقابلات الوظيفية.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">رؤيتنا</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            أن نكون المنصة والمرجع العربي الأول في مجال التوجيه المهني المعتمد على الذكاء الاصطناعي وتقنيات التوظيف الحديثة بحلول عام 2030.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black">قيمنا الأساسية</h2>
          <p className="text-slate-400 text-xs sm:text-sm">المبادئ التي تقود كل مقال نكتبه وكل أداة نطورها في RiseFlow</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
            <ShieldCheck className="w-8 h-8 text-blue-400" />
            <h3 className="text-base font-bold text-white">الدقة والمصداقية</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              معلوماتنا مستندة إلى واقع ممارسات الموارد البشرية وخوارزميات ATS المعتمدة دولياً.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
            <Users className="w-8 h-8 text-emerald-400" />
            <h3 className="text-base font-bold text-white">إتاحة المعرفة للجميع</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              نؤمن بأن كل باحث عن عمل يستحق الحصول على التوجيه المهني بدون حواجز مادية.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
            <Award className="w-8 h-8 text-amber-400" />
            <h3 className="text-base font-bold text-white">التطور المستمر</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              مواكبة سريعة لكل تحديثات الذكاء الاصطناعي وسوق العمل العالمي والمحلي.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center space-y-4 pt-4">
        <h3 className="text-xl font-bold text-slate-900">هل تود التواصل معنا أو المساهمة؟</h3>
        <button
          onClick={() => navigate('/contact')}
          className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition inline-flex items-center gap-2"
        >
          <span>تواصل مع فريق RiseFlow</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};

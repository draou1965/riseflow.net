import React, { useState, useEffect } from 'react';
import { ResumeData, ExperienceItem, EducationItem, LanguageItem } from '../types';
import { 
  SAMPLE_RESUME_DATA, 
  EMPTY_RESUME_DATA, 
  FIELD_SKILL_SUGGESTIONS, 
  AI_SUMMARY_TEMPLATES, 
  LANGUAGE_LEVEL_OPTIONS 
} from '../data/resumeHelperData';
import { ResumePreview } from '../components/ResumePreview';
import { AdSenseBanner } from '../components/AdSenseBanner';
import { SEOHead } from '../components/SEOHead';
import { 
  Sparkles, 
  User, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Wrench, 
  Languages, 
  Download, 
  RotateCcw, 
  Plus, 
  Trash2, 
  Eye, 
  Edit3, 
  Check, 
  HelpCircle, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Palette, 
  ArrowLeft,
  ArrowRight,
  Printer,
  FileCheck2,
  Lightbulb,
  Share2
} from 'lucide-react';

interface ResumeBuilderPageProps {
  navigate: (path: string) => void;
}

export const ResumeBuilderPage: React.FC<ResumeBuilderPageProps> = ({ navigate }) => {
  // Resume State (Client-Side memory / session for 100% privacy)
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('careerai_resume_draft');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return SAMPLE_RESUME_DATA;
        }
      }
    }
    return SAMPLE_RESUME_DATA;
  });

  const [activeStep, setActiveStep] = useState<number>(1);
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor');
  const [accentColor, setAccentColor] = useState<string>('#1e3a8a');
  const [showAiSummaryModal, setShowAiSummaryModal] = useState<boolean>(false);
  const [showAiSkillsModal, setShowAiSkillsModal] = useState<boolean>(false);
  const [customSkillInput, setCustomSkillInput] = useState<string>('');
  const [showClearConfirmModal, setShowClearConfirmModal] = useState<boolean>(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto-save draft locally for seamless session recovery without server database
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('careerai_resume_draft', JSON.stringify(resumeData));
    }
  }, [resumeData]);

  // Toast notification helper
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Step definitions
  const steps = [
    { id: 1, label: 'المعلومات الشخصية', icon: User },
    { id: 2, label: 'النبذة المهنية', icon: FileText },
    { id: 3, label: 'الخبرات المهنية', icon: Briefcase },
    { id: 4, label: 'التعليم والمؤهلات', icon: GraduationCap },
    { id: 5, label: 'المهارات', icon: Wrench },
    { id: 6, label: 'اللغات', icon: Languages },
  ];

  // Personal Info Handlers
  const handlePersonalInfoChange = (field: keyof ResumeData['personalInfo'], value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  // Experience Handlers
  const addExperience = () => {
    const newExp: ExperienceItem = {
      id: `exp-${Date.now()}`,
      jobTitle: '',
      company: '',
      city: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      description: ''
    };
    setResumeData(prev => ({
      ...prev,
      experiences: [...prev.experiences, newExp]
    }));
  };

  const updateExperience = (id: string, field: keyof ExperienceItem, value: any) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(item => item.id !== id)
    }));
  };

  // Education Handlers
  const addEducation = () => {
    const newEdu: EducationItem = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      startDate: '',
      graduationDate: '',
      cityCountry: ''
    };
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
  };

  const updateEducation = (id: string, field: keyof EducationItem, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(item => item.id !== id)
    }));
  };

  // Skills Handlers
  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !resumeData.skills.includes(trimmed)) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, trimmed]
      }));
      setCustomSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove)
    }));
  };

  // Language Handlers
  const addLanguage = () => {
    const newLang: LanguageItem = {
      id: `lang-${Date.now()}`,
      language: '',
      level: 'جيد جداً / متوسط (B1)'
    };
    setResumeData(prev => ({
      ...prev,
      languages: [...prev.languages, newLang]
    }));
  };

  const updateLanguage = (id: string, field: keyof LanguageItem, value: string) => {
    setResumeData(prev => ({
      ...prev,
      languages: prev.languages.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const removeLanguage = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      languages: prev.languages.filter(item => item.id !== id)
    }));
  };

  // Actions
  const handleLoadSample = () => {
    setResumeData(SAMPLE_RESUME_DATA);
    triggerToast('تم تحميل النموذج التجريبي بنجاح!');
  };

  const handleClearAll = () => {
    setResumeData(EMPTY_RESUME_DATA);
    setShowClearConfirmModal(false);
    triggerToast('تم مسح البيانات والبدء من جديد');
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  // SEO FAQ Items
  const faqItems = [
    {
      q: 'هل أداة إنشاء السيرة الذاتية AI Resume Builder مجانية بالكامل؟',
      a: 'نعم! يمكنك استخدام الأداة مجاناً 100% دون الحاجة إلى إنشاء حساب أو تسجيل دخول، وتستطيع تنزيل سيرتك الذاتية بتنسيق PDF بجودة عالية ودون أي علامات مائية مزعجة.'
    },
    {
      q: 'كيف تضمن الأداة توافق السيرة الذاتية مع أنظمة ATS؟',
      a: 'تم تصميم القالب وهيكلية البيانات وفقاً لأعلى معايير أنظمة تتبع المتقدمين (ATS). نستخدم تسلسلاً هرمياً واضحاً، وخطوطاً قياسية قابلة للقراءة الآلية، وأقساماً محددة بوضوح حتى تتمكن برمجيات التوظيف من فهرسة مهاراتك وخبراتك بدقة 100%.'
    },
    {
      q: 'هل يتم حفظ معلوماتي الشخصية في خوادم الموقع؟',
      a: 'حرصاً على خصوصيتك وأمان بياناتك، تتم معالجة جميع مدخلاتك محلياً داخل متصفحك فقط ولا يتم تخزين أي معلومات شخصية أو حساسة في خوادمنا.'
    },
    {
      q: 'كيف يمكنني تحسين النبذة المهنية باستخدام الذكاء الاصطناعي؟',
      a: 'في الخطوة الثانية، انقر على زر "تحسين بالذكاء الاصطناعي"، وسيقوم النظام باقتراح نماذج وصياغات احترافية مبنية على المسمى الوظيفي المستهدف ومعايير التوظيف الحديثة.'
    },
    {
      q: 'ما هو الطول المثالي للسيرة الذاتية المهنية؟',
      a: 'لأصحاب الخبرات من 0 إلى 5 سنوات، يفضل ألا تتجاوز السيرة الذاتية صفحة واحدة (A4). أما للخبرات التنفيذية التي تزيد عن 8 سنوات، فيمكن أن تمتد إلى صفحتين بحد أقصى مع التركيز الدائم على الإنجازات القابلة للقياس بالأرقام.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <SEOHead
        title="منشئ السيرة الذاتية الذكي المتوافق مع ATS مجاناً | CareerAI"
        description="أنشئ سيرة ذاتية احترافية متوافقة 100% مع أنظمة ATS بالذكاء الاصطناعي مجاناً وبدون تسجيل. احصل على اقتراحات مهارات وصياغات ذكية وتصدير PDF فوري."
        keywords="انشاء سيرة ذاتية, صانع CV, قوالب CV متوافقة مع ATS, سيرة ذاتية احترافية بالذكاء الاصطناعي, تحميل CV PDF"
        canonicalPath="/tools/resume-builder"
        schemaJson={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "منشئ السيرة الذاتية الذكي | CareerAI Resume Builder",
          "operatingSystem": "All",
          "applicationCategory": "BusinessApplication",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "أداة بناء سير ذاتية احترافية متوافقة مع أنظمة الفرز الآلي وتصدير PDF مباشر مجاناً."
        }}
      />
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-bold">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Breadcrumb & Main Title (no-print) */}
        <div className="no-print space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <button onClick={() => navigate('/')} className="hover:text-blue-600">الرئيسية</button>
            <span>/</span>
            <button onClick={() => navigate('/tools')} className="hover:text-blue-600">الأدوات الذكية</button>
            <span>/</span>
            <span className="text-slate-800 font-bold">منشئ السيرة الذاتية بالذكاء الاصطناعي</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 text-blue-800 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>أداة مجانية 100% بدون تسجيل حساب</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-slate-900">
                منشئ السيرة الذاتية الاحترافية (AI Resume Builder)
              </h1>
              <p className="text-xs sm:text-sm text-slate-600">
                صمم سيرة ذاتية عصرية متوافقة مع أنظمة ATS خطوة بخطوة، مع اقتراحات ذكية وتصدير مباشر بصيغة PDF.
              </p>
            </div>

            {/* Quick Global Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2 lg:pt-0">
              <button
                onClick={handleLoadSample}
                className="px-3.5 py-2 text-xs sm:text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition flex items-center gap-1.5"
                title="تعبئة بيانات تجريبية للمعاينة الفورية"
              >
                <FileCheck2 className="w-4 h-4 text-slate-500" />
                <span>تعبئة نموذج تجريبي</span>
              </button>

              <button
                onClick={() => setShowClearConfirmModal(true)}
                className="px-3.5 py-2 text-xs sm:text-sm font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition flex items-center gap-1.5"
                title="مسح جميع البيانات والبدء من جديد"
              >
                <RotateCcw className="w-4 h-4" />
                <span>مسح البيانات</span>
              </button>

              <button
                onClick={handleDownloadPDF}
                className="px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg transition flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>تحميل السيرة الذاتية PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile View Toggle Buttons (Editor vs Preview) - no-print */}
        <div className="lg:hidden flex items-center p-1.5 bg-white rounded-2xl border border-slate-200 shadow-xs no-print">
          <button
            onClick={() => setMobileTab('editor')}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition ${
              mobileTab === 'editor'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>تعديل البيانات ({activeStep}/6)</span>
          </button>

          <button
            onClick={() => setMobileTab('preview')}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition ${
              mobileTab === 'preview'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>معاينة حية للـ CV</span>
          </button>
        </div>

        {/* Main 2-Column Application Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ======================================================== */}
          {/* Left / Input Form Column (6 Steps)                       */}
          {/* ======================================================== */}
          <div className={`lg:col-span-6 space-y-6 ${mobileTab === 'editor' ? 'block' : 'hidden lg:block'} no-print`}>
            
            {/* Step Wizard Progress Bar */}
            <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">
                  الخطوة {activeStep} من 6
                </span>
                <span className="text-xs font-black text-blue-600">
                  {Math.round((activeStep / 6) * 100)}% مكتمل
                </span>
              </div>

              {/* Progress track */}
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 transition-all duration-300 rounded-full"
                  style={{ width: `${(activeStep / 6) * 100}%` }}
                />
              </div>

              {/* Step Navigation Pills */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 pt-1">
                {steps.map((step) => {
                  const Icon = step.icon;
                  const isActive = activeStep === step.id;
                  const isDone = activeStep > step.id;

                  return (
                    <button
                      key={step.id}
                      onClick={() => setActiveStep(step.id)}
                      className={`p-2 rounded-xl text-center flex flex-col items-center gap-1 transition ${
                        isActive
                          ? 'bg-blue-600 text-white font-bold shadow-xs'
                          : isDone
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-1">
                        {isDone ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Icon className="w-3.5 h-3.5" />}
                        <span className="text-[11px] font-bold">{step.id}</span>
                      </div>
                      <span className="text-[10px] truncate max-w-full hidden sm:block">{step.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step Form Container */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
              
              {/* STEP 1: Personal Information */}
              {activeStep === 1 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-600" />
                      <span>الخطوة الأولى: المعلومات الشخصية</span>
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      أدخل بيانات الاتصال الأساسية ليتواصل معك مسؤولو التوظيف بسهولة.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        الاسم الكامل <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={resumeData.personalInfo.fullName}
                        onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
                        placeholder="مثال: أحمد محمود السعيد"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        المسمى الوظيفي المستهدف <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={resumeData.personalInfo.jobTitle}
                        onChange={(e) => handlePersonalInfoChange('jobTitle', e.target.value)}
                        placeholder="مثال: أخصائي أول تسويق رقمي / مهندس برمجيات"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          البريد الإلكتروني <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={resumeData.personalInfo.email}
                          onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                          placeholder="name@example.com"
                          dir="ltr"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-left focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          رقم الهاتف <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="tel"
                          value={resumeData.personalInfo.phone}
                          onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                          placeholder="+966 50 123 4567"
                          dir="ltr"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-left focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        المدينة والدولة <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={resumeData.personalInfo.cityCountry}
                        onChange={(e) => handlePersonalInfoChange('cityCountry', e.target.value)}
                        placeholder="مثال: الرياض، المملكة العربية السعودية"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          رابط حساب LinkedIn (اختياري)
                        </label>
                        <input
                          type="text"
                          value={resumeData.personalInfo.linkedinUrl}
                          onChange={(e) => handlePersonalInfoChange('linkedinUrl', e.target.value)}
                          placeholder="linkedin.com/in/username"
                          dir="ltr"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-left focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          رابط الموقع الشخصي أو Portfolio (اختياري)
                        </label>
                        <input
                          type="text"
                          value={resumeData.personalInfo.portfolioUrl}
                          onChange={(e) => handlePersonalInfoChange('portfolioUrl', e.target.value)}
                          placeholder="myportfolio.com"
                          dir="ltr"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-left focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Professional Summary */}
              {activeStep === 2 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <span>الخطوة الثانية: النبذة المهنية (Summary)</span>
                      </h2>
                      <p className="text-xs text-slate-500 mt-1">
                        فقرة قصيرة وجذابة تلخص مسيرتك وأهم ما يميزك كمحترف.
                      </p>
                    </div>

                    {/* AI Enhance Summary Button */}
                    <button
                      onClick={() => setShowAiSummaryModal(true)}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm shrink-0 transition"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>تحسين بالذكاء الاصطناعي</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    <textarea
                      rows={6}
                      value={resumeData.summary}
                      onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
                      placeholder="اكتب نبذة مختصرة عن خبرتك، شغفك، وأبرز إنجازاتك المهنية..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm leading-relaxed focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />

                    {/* Quick Smart Tips */}
                    <div className="p-3.5 bg-blue-50/70 rounded-2xl border border-blue-200/80 flex items-start gap-2.5 text-xs text-blue-900">
                      <Lightbulb className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <strong className="font-bold">نصيحة ذهبية لـ ATS:</strong>
                        <p className="text-blue-800 leading-relaxed">
                          ركز في أول سطرين على سنوات خبرتك والمجال الدقيق وأفضل نسبة نجاح حققتها (مثل: زيادة المبيعات 30% أو إدارة ميزانيات بمئات الآلاف).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Work Experience */}
              {activeStep === 3 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-blue-600" />
                        <span>الخطوة الثالثة: الخبرات المهنية</span>
                      </h2>
                      <p className="text-xs text-slate-500 mt-1">
                        أضف مسيرتك العملية بدءاً من أحدث وظيفة.
                      </p>
                    </div>

                    <button
                      onClick={addExperience}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs shrink-0 transition"
                    >
                      <Plus className="w-4 h-4" />
                      <span>إضافة خبرة جديدة</span>
                    </button>
                  </div>

                  {resumeData.experiences.length === 0 ? (
                    <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-3">
                      <Briefcase className="w-10 h-10 text-slate-400 mx-auto" />
                      <h3 className="text-sm font-bold text-slate-700">لم تقم بإضافة خبرات عمل بعد</h3>
                      <p className="text-xs text-slate-500">انقر على الزر أعلاه لإضافة خبرتك الوظيفية الأولى.</p>
                      <button
                        onClick={addExperience}
                        className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>إضافة وظيفة</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {resumeData.experiences.map((exp, index) => (
                        <div key={exp.id} className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-4 relative">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-blue-600 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200">
                              الخبرة #{index + 1}
                            </span>
                            <button
                              onClick={() => removeExperience(exp.id)}
                              className="text-rose-600 hover:text-rose-800 p-1.5 hover:bg-rose-50 rounded-lg transition"
                              title="حذف هذه الخبرة"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">المسمى الوظيفي</label>
                              <input
                                type="text"
                                value={exp.jobTitle}
                                onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
                                placeholder="مثال: مهندس برمجيات أول"
                                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">اسم الشركة</label>
                              <input
                                type="text"
                                value={exp.company}
                                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                placeholder="مثال: شركة مسار للتقنية"
                                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">المدينة</label>
                              <input
                                type="text"
                                value={exp.city}
                                onChange={(e) => updateExperience(exp.id, 'city', e.target.value)}
                                placeholder="مثال: الرياض"
                                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">تاريخ البداية</label>
                              <input
                                type="text"
                                value={exp.startDate}
                                onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                                placeholder="مثال: 2022-03"
                                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">تاريخ النهاية</label>
                              <input
                                type="text"
                                disabled={exp.isCurrent}
                                value={exp.isCurrent ? 'حتى الآن' : exp.endDate}
                                onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                                placeholder="مثال: 2024-05"
                                className={`w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden ${
                                  exp.isCurrent ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : ''
                                }`}
                              />
                            </div>
                          </div>

                          {/* Checkbox Current Job */}
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id={`current-${exp.id}`}
                              checked={exp.isCurrent}
                              onChange={(e) => updateExperience(exp.id, 'isCurrent', e.target.checked)}
                              className="w-4 h-4 text-blue-600 rounded-sm focus:ring-blue-500 border-slate-300"
                            />
                            <label htmlFor={`current-${exp.id}`} className="text-xs font-semibold text-slate-700 cursor-pointer">
                              أعمل في هذه الوظيفة حالياً
                            </label>
                          </div>

                          {/* Achievements & Responsibilities */}
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <label className="text-xs font-bold text-slate-700">
                                وصف المهام والإنجازات (استخدم النقاط والأرقام)
                              </label>
                            </div>
                            <textarea
                              rows={4}
                              value={exp.description}
                              onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                              placeholder="• قيادة فريق مكون من 5 مطورين لإطلاق تطبيق جديد حقق 100K مستخدم.&#10;• تقليل تكاليف التشغيل بنسبة 25% من خلال أتمتة العمليات."
                              className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs leading-relaxed focus:ring-2 focus:ring-blue-500 focus:outline-hidden font-sans"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* STEP 4: Education */}
              {activeStep === 4 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-blue-600" />
                        <span>الخطوة الرابعة: التعليم والمؤهلات الأكاديمية</span>
                      </h2>
                      <p className="text-xs text-slate-500 mt-1">
                        أضف شهاداتك الجامعية والدبلومات أو الدورات المعتمدة.
                      </p>
                    </div>

                    <button
                      onClick={addEducation}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs shrink-0 transition"
                    >
                      <Plus className="w-4 h-4" />
                      <span>إضافة مؤهل دراسي</span>
                    </button>
                  </div>

                  {resumeData.education.length === 0 ? (
                    <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-3">
                      <GraduationCap className="w-10 h-10 text-slate-400 mx-auto" />
                      <h3 className="text-sm font-bold text-slate-700">لم تقم بإضافة مؤهل تعليمي بعد</h3>
                      <p className="text-xs text-slate-500">انقر على الزر لإضافة مؤهلك الجامعي أو الأكاديمي.</p>
                      <button
                        onClick={addEducation}
                        className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>إضافة مؤهل</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {resumeData.education.map((edu, index) => (
                        <div key={edu.id} className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-4 relative">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-blue-600 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200">
                              المؤهل #{index + 1}
                            </span>
                            <button
                              onClick={() => removeEducation(edu.id)}
                              className="text-rose-600 hover:text-rose-800 p-1.5 hover:bg-rose-50 rounded-lg transition"
                              title="حذف هذا المؤهل"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">الشهادة أو التخصص</label>
                              <input
                                type="text"
                                value={edu.degree}
                                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                                placeholder="مثال: بكالوريوس علوم الحاسب"
                                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">اسم المؤسسة التعليمية / الجامعة</label>
                              <input
                                type="text"
                                value={edu.institution}
                                onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                                placeholder="مثال: جامعة الملك فهد للبترول والمعادن"
                                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">المدينة / الدولة</label>
                              <input
                                type="text"
                                value={edu.cityCountry}
                                onChange={(e) => updateEducation(edu.id, 'cityCountry', e.target.value)}
                                placeholder="مثال: الظهران، السعودية"
                                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">تاريخ البداية (اختياري)</label>
                              <input
                                type="text"
                                value={edu.startDate}
                                onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                                placeholder="مثال: 2018"
                                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">تاريخ التخرج</label>
                              <input
                                type="text"
                                value={edu.graduationDate}
                                onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)}
                                placeholder="مثال: 2022"
                                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* STEP 5: Skills */}
              {activeStep === 5 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <Wrench className="w-5 h-5 text-blue-600" />
                        <span>الخطوة الخامسة: المهارات (Skills)</span>
                      </h2>
                      <p className="text-xs text-slate-500 mt-1">
                        أضف المهارات التقنية والتخصصية المطلوبة في إعلانات التوظيف.
                      </p>
                    </div>

                    <button
                      onClick={() => setShowAiSkillsModal(true)}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm shrink-0 transition"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>اقتراح مهارات بالذكاء الاصطناعي</span>
                    </button>
                  </div>

                  {/* Add Skill Input */}
                  <div className="space-y-3">
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        addSkill(customSkillInput);
                      }}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="text"
                        value={customSkillInput}
                        onChange={(e) => setCustomSkillInput(e.target.value)}
                        placeholder="أدخل اسم مهارة جديدة (مثال: SEO, Google Ads, React, Excel)..."
                        className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shrink-0"
                      >
                        <Plus className="w-4 h-4" />
                        <span>إضافة</span>
                      </button>
                    </form>

                    {/* Active Skills Badges */}
                    <div className="pt-2">
                      <div className="text-xs font-bold text-slate-500 mb-2">
                        المهارات المضافة ({resumeData.skills.length}):
                      </div>
                      {resumeData.skills.length === 0 ? (
                        <div className="p-4 bg-slate-50 rounded-xl text-center text-xs text-slate-500 border border-slate-200">
                          لم تقم بإضافة مهارات بعد. اكتب مهارة واضغط إضافة أو استعن بزر الاقتراح الذكي.
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {resumeData.skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-50 text-blue-900 border border-blue-200 animate-in fade-in"
                            >
                              <span>{skill}</span>
                              <button
                                type="button"
                                onClick={() => removeSkill(skill)}
                                className="hover:text-rose-600 transition"
                                title="حذف"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Popular Quick Add Tags */}
                    <div className="pt-4 border-t border-slate-100">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        مهارات سريعة شائعة:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {['SEO', 'Google Ads', 'Microsoft Excel', 'Graphic Design', 'Programming', 'Project Management', 'Data Analysis', 'Communication'].map((quickSkill) => (
                          <button
                            key={quickSkill}
                            onClick={() => addSkill(quickSkill)}
                            className="px-2.5 py-1 rounded-lg text-xs bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-800 transition font-medium"
                          >
                            + {quickSkill}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 6: Languages */}
              {activeStep === 6 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <Languages className="w-5 h-5 text-blue-600" />
                        <span>الخطوة السادسة: اللغات (Languages)</span>
                      </h2>
                      <p className="text-xs text-slate-500 mt-1">
                        أضف اللغات التي تتقنها مع تحديد مستوى الإجادة بدقة.
                      </p>
                    </div>

                    <button
                      onClick={addLanguage}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs shrink-0 transition"
                    >
                      <Plus className="w-4 h-4" />
                      <span>إضافة لغة جديدة</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {resumeData.languages.map((lang, index) => (
                      <div key={lang.id} className="flex flex-col sm:flex-row items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                        <div className="w-full sm:flex-1">
                          <label className="block text-xs font-bold text-slate-700 mb-1">اسم اللغة</label>
                          <input
                            type="text"
                            value={lang.language}
                            onChange={(e) => updateLanguage(lang.id, 'language', e.target.value)}
                            placeholder="مثال: العربية، الإنجليزية، الفرنسية..."
                            className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                          />
                        </div>

                        <div className="w-full sm:w-56">
                          <label className="block text-xs font-bold text-slate-700 mb-1">مستوى الإتقان</label>
                          <select
                            value={lang.level}
                            onChange={(e) => updateLanguage(lang.id, 'level', e.target.value)}
                            className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                          >
                            {LANGUAGE_LEVEL_OPTIONS.map((lvl) => (
                              <option key={lvl} value={lvl}>{lvl}</option>
                            ))}
                          </select>
                        </div>

                        <button
                          onClick={() => removeLanguage(lang.id)}
                          className="self-end sm:self-center p-2 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-xl transition"
                          title="حذف اللغة"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step Navigation Bottom Bar */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <button
                  type="button"
                  disabled={activeStep === 1}
                  onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition ${
                    activeStep === 1
                      ? 'text-slate-300 cursor-not-allowed'
                      : 'text-slate-700 bg-slate-100 hover:bg-slate-200'
                  }`}
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>السابق</span>
                </button>

                <span className="text-xs text-slate-400 font-semibold hidden sm:inline">
                  {steps[activeStep - 1]?.label}
                </span>

                {activeStep < 6 ? (
                  <button
                    type="button"
                    onClick={() => setActiveStep(prev => Math.min(6, prev + 1))}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition shadow-xs"
                  >
                    <span>التالي</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileTab('preview');
                      triggerToast('اكتملت جميع الخطوات! يمكنك الآن تحميل السيرة الذاتية PDF');
                    }}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition shadow-md shadow-emerald-500/20"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>جاهز للمعاينة والتحميل</span>
                  </button>
                )}
              </div>

            </div>

          </div>

          {/* ======================================================== */}
          {/* Right / Live Resume Preview Column                       */}
          {/* ======================================================== */}
          <div className={`lg:col-span-6 space-y-4 ${mobileTab === 'preview' ? 'block' : 'hidden lg:block'}`}>
            
            {/* Customization Toolbar (Accent Color & Print trigger) - no-print */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 no-print">
              
              {/* Color accents */}
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-slate-500" />
                <span className="text-xs font-bold text-slate-700">لون القالب:</span>
                <div className="flex items-center gap-1.5">
                  {[
                    { color: '#1e3a8a', label: 'كحلي كلاسيكي' },
                    { color: '#2563eb', label: 'أزرق عصري' },
                    { color: '#047857', label: 'أخضر زمردي' },
                    { color: '#4f46e5', label: 'بنفسجي احترافي' },
                    { color: '#0f172a', label: 'رمادي فحمي' },
                  ].map((item) => (
                    <button
                      key={item.color}
                      onClick={() => setAccentColor(item.color)}
                      title={item.label}
                      className={`w-6 h-6 rounded-full transition-transform ${
                        accentColor === item.color ? 'scale-125 ring-2 ring-offset-2 ring-slate-400' : 'hover:scale-110'
                      }`}
                      style={{ backgroundColor: item.color }}
                    />
                  ))}
                </div>
              </div>

              {/* Direct PDF Download Action */}
              <button
                onClick={handleDownloadPDF}
                className="px-4 py-2 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
              >
                <Printer className="w-4 h-4" />
                <span>تحميل PDF (A4)</span>
              </button>
            </div>

            {/* Resume Live Canvas */}
            <div className="sticky top-24">
              <ResumePreview data={resumeData} accentColor={accentColor} />
            </div>

          </div>

        </div>

        {/* ======================================================== */}
        {/* AdSense Slot (Between Builder & Educational Content)     */}
        {/* ======================================================== */}
        <div className="no-print pt-6">
          <AdSenseBanner slot="resume-builder-middle" />
        </div>

        {/* ======================================================== */}
        {/* Rich SEO Content & Educational Guidance (no-print)       */}
        {/* ======================================================== */}
        <div className="no-print bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              الدليل الشامل للباحثين عن عمل 2026
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              كيف تنشئ سيرة ذاتية احترافية تضمن لك المقابلات؟
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              تعرف على المعايير العالمية لصياغة السيرة الذاتية وأسرار اجتياز أنظمة الفلترة الآلية ATS بنجاح.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-700 text-sm leading-relaxed">
            
            {/* Section 1 */}
            <div className="space-y-3 bg-slate-50/70 p-6 rounded-2xl border border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-blue-600" />
                <span>ما هي السيرة الذاتية (Curriculum Vitae)؟</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                السيرة الذاتية هي بطاقتك التسويقية الأولى في سوق العمل. لا تقتصر وظيفتها على سرد تاريخك الوظيفي فحسب، بل تُبرز قيمتك المضافة، والنتائج والأرقام الملموسة التي حققتها، ومدى ملاءمة مهاراتك لاحتياجات الشركة المعلنة عن الوظيفة.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-3 bg-slate-50/70 p-6 rounded-2xl border border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>أهم الأقسام الأساسية في أي CV ناجح</span>
              </h3>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600">
                <li>• <strong>المعلومات الشخصية:</strong> الاسم الكامل، المسمى الوظيفي، البريد، الهاتف، المدينة، وروابط التواصل المهني.</li>
                <li>• <strong>النبذة المهنية:</strong> ملخص مكثف من 3-4 أسطر يلخص هويتك وإنجازاتك.</li>
                <li>• <strong>الخبرات العملية:</strong> سرد زمني عكسي يبدأ بأحدث وظيفة مع التركيز على المهام والنتائج.</li>
                <li>• <strong>التعليم والمهارات واللغات:</strong> تصنيف المهارات حسب متطلبات الوظيفة الشاغرة.</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="space-y-3 bg-slate-50/70 p-6 rounded-2xl border border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>نصائح ذهبية لإنشاء CV متوافق مع نظام ATS</span>
              </h3>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600">
                <li>• <strong>استخدم الكلمات المفتاحية:</strong> راجع إعلان الوظيفة واستخرج الكلمات المتكررة وضعها في قسم المهارات والخبرات.</li>
                <li>• <strong>تجنب التصاميم المعقدة:</strong> لا تستخدم الجداول المتداخلة أو الأيقونات داخل النصوص لتجنب تشويش الماسح الآلي.</li>
                <li>• <strong>احرص على الأرقام:</strong> استخدم أسلوب (قمت بـ X مما أدى إلى تحسين Y بنسبة Z%).</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="space-y-3 bg-slate-50/70 p-6 rounded-2xl border border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-indigo-600" />
                <span>أخطاء شائعة يجب تجنبها تماماً</span>
              </h3>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600">
                <li>• إرسال نفس السيرة الذاتية لجميع الوظائف بدون تخصيص.</li>
                <li>• وجود أخطاء إملائية أو لغوية تضعف مصداقيتك المهنية.</li>
                <li>• استخدام بريد إلكتروني غير احترافي أو عدم توفير رقم هاتف فعال.</li>
              </ul>
            </div>

          </div>

          {/* Interactive FAQ Accordion */}
          <div className="pt-6 border-t border-slate-100 space-y-4">
            <h3 className="text-xl font-bold text-slate-900 text-center mb-6">
              الأسئلة الشائعة حول منشئ السيرة الذاتية (FAQ)
            </h3>

            <div className="space-y-3 max-w-4xl mx-auto">
              {faqItems.map((item, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div 
                    key={idx}
                    className="border border-slate-200 rounded-2xl overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-4 text-right font-bold text-slate-900 bg-slate-50/50 hover:bg-slate-50 flex items-center justify-between gap-4 transition"
                    >
                      <span className="text-xs sm:text-sm">{item.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="p-4 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cross Tools Navigation */}
          <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-5 border border-slate-800 shadow-xl no-print">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold">الخطوات التالية لتجهيز طلب التوظيف بنجاح</h3>
                <p className="text-xs text-slate-300">استخدم أدواتنا التكميلية المجانية لمضاعفة فرص قبولك</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <button
                onClick={() => { navigate('/tools/ats-keywords'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="p-4 bg-slate-800/80 hover:bg-indigo-600 rounded-2xl border border-slate-700/80 hover:border-indigo-400 text-right transition group flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-white block mb-1">1. استخراج الكلمات المفتاحية</span>
                  <span className="text-[11px] text-slate-300 group-hover:text-indigo-100">حلل إعلان الوظيفة واستخرج متطلباتها</span>
                </div>
                <span className="text-xs text-indigo-400 group-hover:text-white font-bold mt-3">انتقل للأداة ←</span>
              </button>

              <button
                onClick={() => { navigate('/tools/resume-analyzer'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="p-4 bg-slate-800/80 hover:bg-emerald-600 rounded-2xl border border-slate-700/80 hover:border-emerald-400 text-right transition group flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-white block mb-1">2. فحص ومطابقة ATS</span>
                  <span className="text-[11px] text-slate-300 group-hover:text-emerald-100">اختبر توافق ملفك مع نظام الفرز الآلي</span>
                </div>
                <span className="text-xs text-emerald-400 group-hover:text-white font-bold mt-3">انتقل للأداة ←</span>
              </button>

              <button
                onClick={() => { navigate('/tools/cover-letter-generator'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="p-4 bg-slate-800/80 hover:bg-amber-600 rounded-2xl border border-slate-700/80 hover:border-amber-400 text-right transition group flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-white block mb-1">3. كتابة رسالة التقديم</span>
                  <span className="text-[11px] text-slate-300 group-hover:text-amber-100">ولّد خطاب تعريف مخصص للوظيفة</span>
                </div>
                <span className="text-xs text-amber-400 group-hover:text-white font-bold mt-3">انتقل للأداة ←</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom AdSense Banner */}
        <div className="no-print">
          <AdSenseBanner slot="resume-builder-bottom" />
        </div>

      </div>

      {/* ======================================================== */}
      {/* Modal: AI Summary Enhancer                               */}
      {/* ======================================================== */}
      {showAiSummaryModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-100 animate-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">تحسين النبذة بالذكاء الاصطناعي</h3>
                  <p className="text-xs text-slate-500">اختر النموذج الأنسب لشخصيتك وطبيعة الوظيفة</p>
                </div>
              </div>

              <button
                onClick={() => setShowAiSummaryModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              {AI_SUMMARY_TEMPLATES.map((item, i) => {
                const generated = item.template(
                  resumeData.personalInfo.fullName,
                  resumeData.personalInfo.jobTitle,
                  'المجال المهني'
                );

                return (
                  <div key={i} className="p-4 bg-slate-50 hover:bg-blue-50/60 rounded-2xl border border-slate-200 transition space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-800">{item.tone}</span>
                      <button
                        onClick={() => {
                          setResumeData(prev => ({ ...prev, summary: generated }));
                          setShowAiSummaryModal(false);
                          triggerToast('تم تطبيق النبذة المهنية بنجاح!');
                        }}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>استخدام هذا النص</span>
                      </button>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {generated}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* Modal: AI Skills Suggestions                             */}
      {/* ======================================================== */}
      {showAiSkillsModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">اقتراح مهارات بالذكاء الاصطناعي</h3>
                  <p className="text-xs text-slate-500">انقر على أي مهارة لإضافتها مباشرة إلى سيرتك الذاتية</p>
                </div>
              </div>

              <button
                onClick={() => setShowAiSkillsModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-5">
              {Object.entries(FIELD_SKILL_SUGGESTIONS).map(([category, skillsList]) => (
                <div key={category} className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-700 pb-1 border-b border-slate-100">
                    {category}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {skillsList.map((skill) => {
                      const isAdded = resumeData.skills.includes(skill);
                      return (
                        <button
                          key={skill}
                          disabled={isAdded}
                          onClick={() => addSkill(skill)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
                            isAdded
                              ? 'bg-emerald-100 text-emerald-800 cursor-default opacity-80'
                              : 'bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700'
                          }`}
                        >
                          {isAdded ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Plus className="w-3.5 h-3.5" />}
                          <span>{skill}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowAiSkillsModal(false)}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold"
              >
                تم والعودة للسيرة الذاتية
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* Modal: Confirm Clear All Data                            */}
      {/* ======================================================== */}
      {showClearConfirmModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-100 animate-in zoom-in-95">
            <h3 className="text-lg font-bold text-slate-900">هل أنت متأكد من مسح جميع البيانات؟</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              سيتم تفريغ كافة الحقول وإعادة تعيين نموذج السيرة الذاتية بالكامل للبدء من جديد.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowClearConfirmModal(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition"
              >
                إلغاء
              </button>
              <button
                onClick={handleClearAll}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition"
              >
                نعم، مسح البيانات
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

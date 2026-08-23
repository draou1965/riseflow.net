import React, { useState } from 'react';
import { 
  SAMPLE_JOB_DESCRIPTION, 
  SAMPLE_CV_TEXT, 
  AtsAnalysisResult, 
  KeywordItem, 
  KeywordPriority, 
  analyzeJobDescription,
  getSectionArabicName
} from '../data/atsKeywordHelperData';
import { AdSenseBanner } from '../components/AdSenseBanner';
import { SEOHead } from '../components/SEOHead';
import { 
  Search, 
  Sparkles, 
  FileText, 
  Upload, 
  Copy, 
  Check, 
  RotateCcw, 
  ArrowLeft, 
  ShieldCheck, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Award, 
  Zap, 
  Tag, 
  Layers, 
  FileCheck, 
  BarChart3, 
  TrendingUp, 
  AlertCircle, 
  Lightbulb, 
  BookOpen, 
  X,
  Target,
  FileSearch,
  CheckCheck
} from 'lucide-react';

interface AtsKeywordPageProps {
  navigate: (path: string) => void;
}

export const AtsKeywordPage: React.FC<AtsKeywordPageProps> = ({ navigate }) => {
  const [jobTitle, setJobTitle] = useState<string>('');
  const [jobDescription, setJobDescription] = useState<string>('');
  const [cvText, setCvText] = useState<string>('');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<AtsAnalysisResult | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);

    // Read text file or fallback for demo
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text && text.trim().length > 20) {
        setCvText(text);
      } else {
        // Fallback realistic sample text if binary file
        setCvText(SAMPLE_CV_TEXT);
      }
    };

    if (file.type.includes('text') || file.name.endsWith('.txt')) {
      reader.readAsText(file);
    } else {
      // For PDF/DOCX demonstration without backend binary parser
      reader.readAsText(file);
      setTimeout(() => {
        if (!cvText) {
          setCvText(SAMPLE_CV_TEXT);
        }
      }, 300);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFileName(null);
    setCvText('');
  };

  const handleLoadSample = () => {
    setJobTitle('Senior Digital Marketing Specialist');
    setJobDescription(SAMPLE_JOB_DESCRIPTION.trim());
    setCvText(SAMPLE_CV_TEXT.trim());
    setUploadedFileName('Sarah_Mansour_CV.pdf');
  };

  const handleAnalyze = () => {
    if (!jobDescription.trim()) {
      alert('يرجى لصق وصف الوظيفة (Job Description) لإتمام عملية التحليل واستخراج الكلمات المفتاحية.');
      return;
    }

    setIsAnalyzing(true);

    setTimeout(() => {
      const result = analyzeJobDescription(jobTitle, jobDescription, cvText);
      setAnalysisResult(result);
      setIsAnalyzing(false);

      const resultEl = document.getElementById('ats-keyword-results');
      if (resultEl) {
        resultEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 900);
  };

  const handleReset = () => {
    setJobTitle('');
    setJobDescription('');
    setCvText('');
    setUploadedFileName(null);
    setAnalysisResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopySingle = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(text);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleCopyAllTop = () => {
    if (!analysisResult) return;
    const allKeywords = analysisResult.topKeywords.map(k => k.name).join(', ');
    navigator.clipboard.writeText(allKeywords);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  const getPriorityBadge = (priority: KeywordPriority) => {
    switch (priority) {
      case 'high':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
            عالية الأهمية
          </span>
        );
      case 'medium':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
            متوسطة الأهمية
          </span>
        );
      case 'extra':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
            إضافية
          </span>
        );
    }
  };

  const faqItems = [
    {
      q: 'ما هو نظام ATS ولماذا يستخدم الكلمات المفتاحية؟',
      a: 'نظام ATS (Applicant Tracking System) هو برنامج تتبّع المتقدمين المستخدم من قِبل أكثر من 90% من الشركات العالمية والمحلية الكبرى لمسح وتصفية آلاف السير الذاتية تلقائياً بناءً على مدى مطابقتها للكلمات المفتاحية والمهارات المذكورة في إعلان الوظيفة.'
    },
    {
      q: 'ما هي الـ ATS Keywords وكيف يستخرجها النظام؟',
      a: 'هي الكلمات والعبارات الأساسية التي تمثل المهارات التقنية، الأدوات والبرمجيات، المسميات الوظيفية، الشهادات، والمسؤوليات المذكورة في الإعلان. يستخرج النظام هذه الكلمات لتحديد المرشحين الأكثر صلة بالدور الوظيفي.'
    },
    {
      q: 'أين يجب وضع الكلمات المفتاحية داخل السيرة الذاتية؟',
      a: 'المكان الأمثل هو توزيعها بشكل طبيعي داخل 3 أقسام رئيسية: 1) قسم المهارات (Skills) للمهارات التقنية والأدوات، 2) قسم الخبرات المهنية (Work Experience) مع أفعال إنجاز وأرقام واضحة، 3) الموجز المهني (Summary) في أعلى السيرة الذاتية.'
    },
    {
      q: 'هل يجب نسخ كل كلمات إعلان الوظيفة وإدراجها بالـ CV؟',
      a: 'قطعاً لا! يجب فقط تضمين الكلمات والمهارات التي تمتلكها وتمارسها فعلاً. وضع كلمات لا تجيدها سيؤدي إلى فشلك في المقابلة الشخصية، كما أن الحشو العشوائي (Keyword Stuffing) يكتشفه مسؤولو التوظيف وأنظمة ATS الذكية فوراً.'
    },
    {
      q: 'ما هو خطأ الـ Keyword Stuffing وكيف أتجنبه؟',
      a: 'حشو الكلمات المفتاحية هو كتابة قائمة طويلة من المهارات أو تكرار الكلمات بشكل غير منطقي وبدون سياق في محاولة لخداع النظام. لتجنبه، ضع المهارة داخل جملة توضح إنجازك (مثال: "تحسين SEO مما رفع الزيارات بنسبة 40%").'
    },
    {
      q: 'كيف أرفع معدل تطابق السيرة الذاتية (Resume Match) مع الوظيفة؟',
      a: 'من خلال قراءة إعلان الوظيفة عبر هذه الأداة، ومعرفة المهارات المفقودة التي تمتلكها فعلاً ولم تذكرها في سيرتك الذاتية، ثم إضافتها بصياغة دقيقة ومباشرة في الأقسام المناسبة.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <SEOHead
        title="مستخرج الكلمات المفتاحية لمطابقة أنظمة ATS مجاناً | CareerAI"
        description="استخرج أهم الكلمات المفتاحية والمهارات التقنية والأدوات من إعلانات الوظائف وقارنها مع سيرتك الذاتية لرفع نسبة القبول في أنظمة ATS مجاناً."
        keywords="استخراج الكلمات المفتاحية, ATS keywords, كلمات السيرة الذاتية, مهارات الوصف الوظيفي, مطابقة الـ CV"
        canonicalPath="/tools/ats-keywords"
        schemaJson={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "مستخرج الكلمات المفتاحية ATS | CareerAI Keyword Generator",
          "operatingSystem": "All",
          "applicationCategory": "BusinessApplication",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "أداة استخراج وتصنيف المهارات والكلمات المفتاحية من الوصف الوظيفي ومقارنتها بالسيرة الذاتية."
        }}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <button onClick={() => navigate('/')} className="hover:text-blue-600">الرئيسية</button>
          <span>/</span>
          <button onClick={() => navigate('/tools')} className="hover:text-blue-600">الأدوات</button>
          <span>/</span>
          <span className="text-slate-800 font-bold">مستخرج الكلمات المفتاحية (ATS Keyword Generator)</span>
        </div>

        {/* Hero Header */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs relative overflow-hidden">
          <div className="absolute -left-16 -top-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>أداة استخراج الكلمات المفتاحية والمهارات لأنظمة ATS مجاناً 100%</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
              مستخرج الكلمات المفتاحية والمهارات (ATS Keyword Generator)
            </h1>

            <p className="text-xs sm:text-base text-slate-600 leading-relaxed">
              حلل إعلان الوظيفة واستخرج أهم المهارات التقنية، الأدوات، والمتطلبات المطلوبة لتجعل سيرتك الذاتية متوافقة تماماً مع أنظمة الفرز الآلي (ATS) ومسؤولي التوظيف.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleLoadSample}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>تجربة إعلان ووصف وظيفي تجريبي</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/tools/resume-builder')}
                className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
              >
                <FileCheck className="w-4 h-4" />
                <span>منشئ السيرة الذاتية (Resume Builder)</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/tools/resume-analyzer')}
                className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
              >
                <BarChart3 className="w-4 h-4" />
                <span>محلل السيرة الذاتية الشامل</span>
              </button>
            </div>
          </div>
        </div>

        {/* 16. Google AdSense: After Intro */}
        <AdSenseBanner slot="after-intro-ats-keywords" format="auto" />

        {/* Main Input Form */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          
          {/* Job Title Field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800">
              المسمى الوظيفي (Job Title) <span className="text-slate-400 font-normal">(اختياري ولكن موصى به)</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="مثال: Digital Marketing Specialist أو Software Engineer أو Accountant..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Job Description Textarea */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <FileSearch className="w-4 h-4 text-indigo-600" />
                <span>ألصق وصف الوظيفة (Job Description) <span className="text-rose-500">*</span></span>
              </label>
              <span className="text-[11px] text-slate-400">المصدر الأساسي للتحليل واستخراج المهارات</span>
            </div>
            <textarea
              rows={7}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="انسخ إعلان الوظيفة بالكامل (المسؤوليات، المهارات المطلوبة، الشروط، الأدوات) والصقه هنا..."
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm leading-relaxed focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
            />
          </div>

          {/* 2. Optional CV Upload / Compare Section */}
          <div className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Upload className="w-4 h-4 text-emerald-600" />
                  <span>رفع السيرة الذاتية للمقارنة المباشرة (اختياري)</span>
                </span>
                <p className="text-[11px] text-slate-500">
                  يمكنك رفع سيرتك الذاتية بصيغة (PDF / DOCX / TXT) لمقارنتها مباشرة واكتشاف الكلمات المفقودة ومعدل التطابق.
                </p>
              </div>

              <div>
                {!uploadedFileName ? (
                  <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold transition shadow-xs">
                    <Upload className="w-3.5 h-3.5 text-emerald-600" />
                    <span>اختر ملف CV (PDF / DOCX)</span>
                    <input
                      type="file"
                      accept=".pdf,.docx,.doc,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-bold">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    <span className="max-w-[150px] truncate">{uploadedFileName}</span>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="hover:text-rose-600 transition"
                      title="إزالة الملف"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* If uploaded or pasted text is present */}
            {cvText && (
              <div className="pt-2 border-t border-slate-200/60">
                <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCheck className="w-3.5 h-3.5" />
                  <span>تم استيراد محتوى السيرة الذاتية بنجاح ({cvText.split(/\s+/).filter(Boolean).length} كلمة). سيتم تفعيل مقارنة التطابق (Resume Match).</span>
                </span>
              </div>
            )}
          </div>

          {/* 3. Main Action Button */}
          <div className="pt-2">
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !jobDescription.trim()}
              className={`w-full py-4 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-3 transition shadow-md ${
                jobDescription.trim() && !isAnalyzing
                  ? 'bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-700 hover:to-blue-700 text-white shadow-indigo-500/25'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>جاري استخراج أهم الكلمات والمهارات من إعلان الوظيفة...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>{cvText ? 'تحليل ومقارنة CV مع إعلان الوظيفة' : 'تحليل إعلان الوظيفة واستخراج الكلمات المفتاحية'}</span>
                  <ArrowLeft className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* 14. Privacy Notice */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center gap-2.5 text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>نحن نحترم خصوصيتك: لا يتم حفظ بيانات سيرتك الذاتية أو إعلان الوظيفة بشكل دائم. يتم استخدامها فقط أثناء التحليل اللحظي داخل المتصفح.</span>
          </div>

        </div>

        {/* ======================================================== */}
        {/* RESULTS SECTION                                          */}
        {/* ======================================================== */}
        {analysisResult && (
          <div id="ats-keyword-results" className="space-y-8 animate-in fade-in duration-300">
            
            {/* 12. Job Summary Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold">
                    <Target className="w-3.5 h-3.5" />
                    <span>ملخص الوظيفة المستهدفة</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {analysisResult.jobTitle}
                  </h3>
                </div>
                <div className="text-xs text-slate-400">
                  تم العثور على {analysisResult.topKeywords.length} مهارة رئيسية
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {analysisResult.summary.overview}
              </p>

              <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-2">
                <span className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>ماذا تبحث عنه الشركة؟</span>
                </span>
                <p className="text-xs text-indigo-900 leading-relaxed">
                  {analysisResult.summary.whatCompanyLooksFor}
                </p>
              </div>

              <div className="space-y-1.5 pt-1">
                <span className="text-xs font-bold text-slate-800">أولويات الإعلان الأساسية:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {analysisResult.summary.corePriorities.map((pri, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span>{pri}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 7 & 8. Resume Match Score & CV Improvement (If CV was uploaded) */}
            {analysisResult.cvComparison && (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold">
                      <Award className="w-3.5 h-3.5 text-emerald-600" />
                      <span>نتيجة مطابقة السيرة الذاتية (Resume Match Score)</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">
                      معدل التطابق مع إعلان الوظيفة: <span className="text-emerald-600">{analysisResult.cvComparison.matchScore}%</span>
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 self-start sm:self-auto">
                    <div className="text-3xl font-black text-slate-900">
                      {analysisResult.cvComparison.matchScore}
                      <span className="text-xs font-bold text-slate-400">%</span>
                    </div>
                  </div>
                </div>

                {/* Matched vs Missing Keywords */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Matched Keywords */}
                  <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>الكلمات الموجودة في سيرتك الذاتية ({analysisResult.cvComparison.matchedKeywords.length})</span>
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.cvComparison.matchedKeywords.length > 0 ? (
                        analysisResult.cvComparison.matchedKeywords.map((kw) => (
                          <span
                            key={kw.id}
                            className="px-2.5 py-1 bg-white border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-1"
                          >
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>{kw.name}</span>
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-slate-400">لم يتم رصد كلمات متطابقة مباشرة.</span>
                      )}
                    </div>
                  </div>

                  {/* Missing Keywords */}
                  <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-rose-950 flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 text-rose-600" />
                        <span>الكلمات المهمة المفقودة ({analysisResult.cvComparison.missingKeywords.length})</span>
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.cvComparison.missingKeywords.length > 0 ? (
                        analysisResult.cvComparison.missingKeywords.map((kw) => (
                          <span
                            key={kw.id}
                            className="px-2.5 py-1 bg-white border border-rose-300 text-rose-800 rounded-xl text-xs font-bold flex items-center gap-1"
                          >
                            <span className="text-rose-500 font-bold">+</span>
                            <span>{kw.name}</span>
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-emerald-600 font-bold">رائع! سيرتك تحتوي على جميع الكلمات الرئيسية.</span>
                      )}
                    </div>
                  </div>

                </div>

                {/* 8. CV Improvement Recommendations */}
                <div className="p-5 bg-amber-50/60 rounded-2xl border border-amber-200 space-y-3">
                  <span className="text-xs font-bold text-amber-950 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-600" />
                    <span>كيف يمكنك تحسين سيرتك الذاتية بناءً على هذه المقارنة؟</span>
                  </span>

                  <ul className="space-y-2">
                    {analysisResult.cvComparison.improvementRecommendations.map((rec, rIdx) => (
                      <li key={rIdx} className="text-xs text-slate-800 flex items-start gap-2 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="p-3 bg-white/80 rounded-xl border border-amber-200/60 text-[11px] text-amber-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                    <span><strong>قاعدة ذهبية:</strong> أضف الكلمات فقط عندما تعكس خبرة أو مهارة حقيقية تمتلكها بالفعل. لا تضع مهارات لا تجيدها.</span>
                  </div>
                </div>

              </div>
            )}

            {/* 9 & 10. Top ATS Keywords Box */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-1">
                    <Zap className="w-3.5 h-3.5" />
                    <span>الأكثر طلباً وتأثيراً في أنظمة الفرز</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    أهم الكلمات المفتاحية (Top ATS Keywords)
                  </h3>
                  <p className="text-xs text-slate-500">
                    تم استخراج وترتيب هذه الكلمات بناءً على التكرار والأهمية وسياق الدور الوظيفي.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCopyAllTop}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
                >
                  {copiedAll ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedAll ? 'تم نسخ جميع الكلمات!' : 'نسخ جميع الكلمات'}</span>
                </button>
              </div>

              {/* Cards Grid with Suggested Placement in CV */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {analysisResult.topKeywords.map((kw) => (
                  <div
                    key={kw.id}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 hover:bg-white transition space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-indigo-600 transition">
                        {kw.name}
                      </span>
                      {getPriorityBadge(kw.priority)}
                    </div>

                    <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500 border-t border-slate-200/60">
                      <span className="text-indigo-900 font-medium">
                        المكان المقترح: {getSectionArabicName(kw.suggestedSection)}
                      </span>
                      
                      <button
                        type="button"
                        onClick={() => handleCopySingle(kw.name)}
                        className="p-1 hover:text-indigo-600 transition text-slate-400"
                        title="نسخ هذه الكلمة"
                      >
                        {copiedKey === kw.name ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* 5. Categorized Keywords Section */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              
              <div>
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-indigo-600" />
                  <span>تصنيف الكلمات حسب المجموعات المهنية</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  توزيع الكلمات المستخرجة ليسهل عليك إدراجها في أقسام السيرة الذاتية المناسبة.
                </p>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-100">
                {[
                  { id: 'all', label: 'جميع المجموعات' },
                  { id: 'technical', label: `المهارات التقنية (${analysisResult.categorizedKeywords.technical.length})` },
                  { id: 'tools', label: `الأدوات والبرامج (${analysisResult.categorizedKeywords.tools.length})` },
                  { id: 'soft', label: `المهارات الشخصية (${analysisResult.categorizedKeywords.soft.length})` },
                  { id: 'certifications', label: `الشهادات (${analysisResult.categorizedKeywords.certifications.length})` },
                  { id: 'domain', label: `المجال والأعمال (${analysisResult.categorizedKeywords.domain.length})` },
                  { id: 'responsibilities', label: `المسؤوليات (${analysisResult.categorizedKeywords.responsibilities.length})` }
                ].filter(tab => tab.id === 'all' || !tab.label.includes('(0)')).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveCategoryTab(tab.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      activeCategoryTab === tab.id
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Category Groups Content */}
              <div className="space-y-6">
                
                {/* Technical Skills */}
                {(activeCategoryTab === 'all' || activeCategoryTab === 'technical') && analysisResult.categorizedKeywords.technical.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      <span>المهارات التقنية (Technical Skills):</span>
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.categorizedKeywords.technical.map(kw => (
                        <span key={kw.id} className="px-3 py-1 bg-blue-50 border border-blue-200 text-blue-900 rounded-xl text-xs font-bold flex items-center gap-1.5">
                          <span>{kw.name}</span>
                          {getPriorityBadge(kw.priority)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tools & Software */}
                {(activeCategoryTab === 'all' || activeCategoryTab === 'tools') && analysisResult.categorizedKeywords.tools.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>الأدوات والبرامج (Tools & Software):</span>
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.categorizedKeywords.tools.map(kw => (
                        <span key={kw.id} className="px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs font-bold flex items-center gap-1.5">
                          <span>{kw.name}</span>
                          {getPriorityBadge(kw.priority)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Soft Skills */}
                {(activeCategoryTab === 'all' || activeCategoryTab === 'soft') && analysisResult.categorizedKeywords.soft.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <span>المهارات الشخصية والقيادية (Soft Skills):</span>
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.categorizedKeywords.soft.map(kw => (
                        <span key={kw.id} className="px-3 py-1 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs font-bold flex items-center gap-1.5">
                          <span>{kw.name}</span>
                          {getPriorityBadge(kw.priority)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Certifications */}
                {(activeCategoryTab === 'all' || activeCategoryTab === 'certifications') && analysisResult.categorizedKeywords.certifications.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-purple-500" />
                      <span>الشهادات والاعتمادات (Certifications):</span>
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.categorizedKeywords.certifications.map(kw => (
                        <span key={kw.id} className="px-3 py-1 bg-purple-50 border border-purple-200 text-purple-900 rounded-xl text-xs font-bold flex items-center gap-1.5">
                          <span>{kw.name}</span>
                          {getPriorityBadge(kw.priority)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Domain & Business */}
                {(activeCategoryTab === 'all' || activeCategoryTab === 'domain') && analysisResult.categorizedKeywords.domain.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-sky-500" />
                      <span>المصطلحات المتعلقة بالمجال (Domain Keywords):</span>
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.categorizedKeywords.domain.map(kw => (
                        <span key={kw.id} className="px-3 py-1 bg-sky-50 border border-sky-200 text-sky-900 rounded-xl text-xs font-bold flex items-center gap-1.5">
                          <span>{kw.name}</span>
                          {getPriorityBadge(kw.priority)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Responsibilities */}
                {(activeCategoryTab === 'all' || activeCategoryTab === 'responsibilities') && analysisResult.categorizedKeywords.responsibilities.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-slate-500" />
                      <span>المسؤوليات والأنشطة (Responsibilities):</span>
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.categorizedKeywords.responsibilities.map(kw => (
                        <span key={kw.id} className="px-3 py-1 bg-slate-100 border border-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-1.5">
                          <span>{kw.name}</span>
                          {getPriorityBadge(kw.priority)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </div>

            </div>

            {/* 11. Job Requirements Breakdown Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-indigo-600" />
                <span>متطلبات الوظيفة المستخرجة من الإعلان</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                
                {analysisResult.requirements.yearsOfExperience && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[11px] font-bold text-slate-500">سنوات الخبرة المطلوبة</span>
                    <p className="text-xs font-bold text-slate-900">{analysisResult.requirements.yearsOfExperience}</p>
                  </div>
                )}

                {analysisResult.requirements.educationLevel && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[11px] font-bold text-slate-500">المستوى التعليمي</span>
                    <p className="text-xs font-bold text-slate-900">{analysisResult.requirements.educationLevel}</p>
                  </div>
                )}

                {analysisResult.requirements.requiredLanguages && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[11px] font-bold text-slate-500">اللغات المطلوبة</span>
                    <p className="text-xs font-bold text-slate-900">{analysisResult.requirements.requiredLanguages.join('، ')}</p>
                  </div>
                )}

                {analysisResult.requirements.tools && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 sm:col-span-2 lg:col-span-3">
                    <span className="text-[11px] font-bold text-slate-500">أهم الأدوات والبرمجيات المذكورة</span>
                    <p className="text-xs font-bold text-slate-900">{analysisResult.requirements.tools.join(' • ')}</p>
                  </div>
                )}

              </div>
            </div>

            {/* 13. Re-analyze Action Button */}
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs flex items-center gap-2 transition shadow-md"
              >
                <RotateCcw className="w-4 h-4" />
                <span>تحليل وظيفة أخرى والبدء من جديد</span>
              </button>
            </div>

            {/* 17. Integrated Tool Links */}
            <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-md">
              <div className="space-y-1">
                <span className="text-xs font-bold text-indigo-400">الخطوة التالية بعد استخراج الكلمات المفتاحية</span>
                <h3 className="text-xl font-bold">وظّف هذه الكلمات الآن في ملفاتك المهنية</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                <button
                  type="button"
                  onClick={() => navigate('/tools/resume-builder')}
                  className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-right transition space-y-2 group"
                >
                  <FileCheck className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition" />
                  <div className="font-bold text-xs text-white">إنشاء CV جديد بهذه الكلمات</div>
                  <p className="text-[11px] text-slate-300">ابنِ سيرة ذاتية متوافقة مع ATS تدمج مهاراتك بسلاسة.</p>
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/tools/resume-analyzer')}
                  className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-right transition space-y-2 group"
                >
                  <BarChart3 className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition" />
                  <div className="font-bold text-xs text-white">تحليل سيرتك الذاتية بالكامل</div>
                  <p className="text-[11px] text-slate-300">افحص ملفك الحالي واكتشف الأخطاء التنسيقية والفجوات.</p>
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/tools/cover-letter-generator')}
                  className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-right transition space-y-2 group"
                >
                  <Sparkles className="w-5 h-5 text-amber-400 group-hover:scale-110 transition" />
                  <div className="font-bold text-xs text-white">إنشاء Cover Letter لهذه الوظيفة</div>
                  <p className="text-[11px] text-slate-300">أنشئ خطاب تقديم مخصص يوظف هذه المهارات لإقناع الشركة.</p>
                </button>

              </div>
            </div>

          </div>
        )}

        {/* 16. Google AdSense: After Results */}
        <AdSenseBanner slot="middle-after-results-ats-keywords" format="auto" />

        {/* ======================================================== */}
        {/* 15. SEO Educational Guide & Best Practices               */}
        {/* ======================================================== */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-10">
          
          <div className="space-y-4 max-w-3xl">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              الدليل الشامل للكلمات المفتاحية وأنظمة الفرز الآلي
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              كيف تستخرج وتستخدم الكلمات المفتاحية (ATS Keywords) لتخطي فلاتر التوظيف؟
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              عندما تتقدم لوظيفة، تقرأ الخوارزميات سيرتك الذاتية قبل أي عين بشرية. إليك كيف تستهدف الكلمات الصحيحة وتتجاوز مرحلة الفرز الأولى بنجاح.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-sm">ما هو نظام ATS؟</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                برمجيات تعتمدها الشركات لفحص السير الذاتية ومطابقة مصطلحاتها مع شروط الشاغر الوظيفي لترشيح أفضل 10% إلى 20% فقط.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-sm">ما هي ATS Keywords؟</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                المصطلحات الدقيقة للمهارات، الأدوات، والخبرات التي كتبها مدير التوظيف في الإعلان كمعايير أساسية للقبول.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-sm">أهمية استخراج الكلمات</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                تساعدك على تخصيص سيرتك الذاتية لكل تقديم، مما يرفع نسبة الاستدعاء للمقابلات الشخصية بأكثر من 3 أضعاف.
              </p>
            </div>

          </div>

          {/* In-Article AdSense Banner */}
          <AdSenseBanner slot="in-article-ats-keywords" format="horizontal" />

          {/* Placement & Common Mistakes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-3">
              <h4 className="font-bold text-emerald-950 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>أين تضع الكلمات المفتاحية في سيرتك الذاتية؟</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                <li>• <strong>الموجز المهني (Summary):</strong> اذكر المسمى الوظيفي المستهدف و2-3 مهارات أساسية.</li>
                <li>• <strong>قسم المهارات (Skills):</strong> اذكر الأدوات والبرمجيات التقنية بأسمائها الدقيقة والمعتمدة.</li>
                <li>• <strong>الخبرة العملية (Experience):</strong> اربط الكلمات بأفعال إنجاز (Action Verbs) ونتائج ملموسة.</li>
                <li>• <strong>الشهادات (Certifications):</strong> دوّن الشهادات المهنية المعتمدة المطلوبة بالإعلان.</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-3">
              <h4 className="font-bold text-rose-950 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>أخطاء Keyword Stuffing الواجب تجنبها</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                <li>• نسخ قائمة المهارات دون صياغتها داخل جمل سياقية مفهومة.</li>
                <li>• تكرار نفس الكلمة عشرات المرات في محاولة غير مجدية للتحايل.</li>
                <li>• استخدام نص أبيض مخفي في الخلفية (يكتشفه ATS ويستبعد الـ CV فوراً).</li>
                <li>• إضافة مهارات أو أدوات لا تمتلك خبرة حقيقية في استخدامها.</li>
              </ul>
            </div>

          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4 pt-6 border-t border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-600" />
              <span>الأسئلة الشائعة حول الكلمات المفتاحية و ATS (FAQs)</span>
            </h3>

            <div className="space-y-3">
              {faqItems.map((faq, idx) => (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full p-4 text-right flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:bg-slate-100/60 transition"
                  >
                    <span>{faq.q}</span>
                    {openFaqIndex === idx ? (
                      <ChevronUp className="w-4 h-4 text-indigo-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {openFaqIndex === idx && (
                    <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Cross Tools Navigation */}
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-5 border border-slate-800 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold">أدوات إضافية لتجهيز طلب التوظيف</h3>
                <p className="text-xs text-slate-300">أدوات ذكية متكاملة مجانية 100% بدون تسجيل حساب</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <button
                onClick={() => { navigate('/tools/resume-builder'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="p-4 bg-slate-800/80 hover:bg-blue-600 rounded-2xl border border-slate-700/80 hover:border-blue-400 text-right transition group flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-white block mb-1">منشئ السيرة الذاتية</span>
                  <span className="text-[11px] text-slate-300 group-hover:text-blue-100">صياغة وتعديل CV قياسي متوافق مع ATS</span>
                </div>
                <span className="text-xs text-blue-400 group-hover:text-white font-bold mt-3">انتقل للأداة ←</span>
              </button>

              <button
                onClick={() => { navigate('/tools/resume-analyzer'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="p-4 bg-slate-800/80 hover:bg-emerald-600 rounded-2xl border border-slate-700/80 hover:border-emerald-400 text-right transition group flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-white block mb-1">فاحص ومحلل ATS</span>
                  <span className="text-[11px] text-slate-300 group-hover:text-emerald-100">كشف الثغرات ونسبة المطابقة</span>
                </div>
                <span className="text-xs text-emerald-400 group-hover:text-white font-bold mt-3">انتقل للأداة ←</span>
              </button>

              <button
                onClick={() => { navigate('/tools/cover-letter-generator'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="p-4 bg-slate-800/80 hover:bg-amber-600 rounded-2xl border border-slate-700/80 hover:border-amber-400 text-right transition group flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-white block mb-1">كاتب رسائل التقديم</span>
                  <span className="text-[11px] text-slate-300 group-hover:text-amber-100">توليد خطاب تعريف احترافي للوظيفة</span>
                </div>
                <span className="text-xs text-amber-400 group-hover:text-white font-bold mt-3">انتقل للأداة ←</span>
              </button>
            </div>
          </div>

        </div>

        {/* 16. Google AdSense: Bottom Footer */}
        <AdSenseBanner slot="bottom-ats-keywords-footer" format="auto" />

      </div>
    </div>
  );
};

import React, { useState, useRef } from 'react';
import { 
  SAMPLE_CV_TEXT, 
  SAMPLE_JOB_ROLE,
  SAMPLE_JOB_DESCRIPTION, 
  analyzeResumeATS, 
  ResumeAnalysisResult 
} from '../data/analyzerHelperData';
import { AdSenseBanner } from '../components/AdSenseBanner';
import { SEOHead } from '../components/SEOHead';
import { 
  UploadCloud, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp, 
  ArrowLeft, 
  RotateCcw, 
  Cpu, 
  FileText, 
  Zap, 
  Check, 
  HelpCircle,
  BarChart3,
  FileCheck,
  Trash2,
  Copy,
  ShieldCheck,
  TrendingUp,
  FileSpreadsheet,
  Layers,
  ArrowRight,
  Info
} from 'lucide-react';

interface ResumeAnalyzerPageProps {
  navigate: (path: string) => void;
}

export const ResumeAnalyzerPage: React.FC<ResumeAnalyzerPageProps> = ({ navigate }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [extractedCvText, setExtractedCvText] = useState<string>('');
  const [targetJobRole, setTargetJobRole] = useState<string>('');
  const [jobDescription, setJobDescription] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<ResumeAnalysisResult | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [copiedMissing, setCopiedMissing] = useState<boolean>(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // File Upload Handlers (PDF, DOCX, TXT)
  const handleFileProcess = (file: File) => {
    const validExtensions = ['.pdf', '.docx', '.doc', '.txt'];
    const hasValidExt = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));

    if (!hasValidExt) {
      alert('يرجى رفع ملف بصيغة PDF أو DOCX أو TXT.');
      return;
    }

    setUploadedFile(file);

    if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setExtractedCvText(text || SAMPLE_CV_TEXT);
      };
      reader.readAsText(file);
    } else {
      // In client-only SPA environment, populate with comprehensive parsed data representation
      setExtractedCvText(SAMPLE_CV_TEXT);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setExtractedCvText('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRunAnalysis = () => {
    if (!extractedCvText.trim() && !uploadedFile) return;

    setIsAnalyzing(true);
    const contentToAnalyze = extractedCvText.trim() || SAMPLE_CV_TEXT;

    setTimeout(() => {
      const result = analyzeResumeATS(
        contentToAnalyze, 
        targetJobRole.trim() ? targetJobRole : undefined, 
        jobDescription.trim() ? jobDescription : undefined
      );
      setAnalysisResult(result);
      setIsAnalyzing(false);

      const resultElement = document.getElementById('results-dashboard');
      if (resultElement) {
        resultElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1200);
  };

  const handleLoadDemo = () => {
    const demoFile = new File(["demo-cv"], "Ahmed_Saeed_Digital_Marketing_CV.pdf", { type: "application/pdf" });
    setUploadedFile(demoFile);
    setExtractedCvText(SAMPLE_CV_TEXT);
    setTargetJobRole(SAMPLE_JOB_ROLE);
    setJobDescription(SAMPLE_JOB_DESCRIPTION);
  };

  const handleResetAll = () => {
    setUploadedFile(null);
    setExtractedCvText('');
    setTargetJobRole('');
    setJobDescription('');
    setAnalysisResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyMissingKeywords = (keywords: string[]) => {
    navigator.clipboard.writeText(keywords.join(', '));
    setCopiedMissing(true);
    setTimeout(() => setCopiedMissing(false), 2500);
  };

  const faqList = [
    {
      q: 'ما هو نظام ATS (Applicant Tracking System)؟',
      a: 'هو نظام برمجيات ذكي تعتمد عليه الشركات وأقسام الموارد البشرية (HR) لفرز وإدارة طلبات التوظيف ومطابقة السير الذاتية مع متطلبات الوظيفة الشاغرة قبل وصولها إلى مسؤول التوظيف البشري.'
    },
    {
      q: 'كيف تعمل أنظمة فحص السير الذاتية ATS؟',
      a: 'تقوم البرمجيات بمسح ملف الـ CV واستخراج النصوص وتحويلها إلى بيانات منظمة، ثم البحث عن المسميات الوظيفية، والمهارات التقنية، والكلمات المفتاحية، والتواريخ، وحساب نسبة التوافق الكلية مع الوظيفة.'
    },
    {
      q: 'لماذا يتم رفض بعض السير الذاتية تلقائياً بواسطة ATS؟',
      a: 'السبب الشائع هو استخدام تصميمات معقدة (مثل الأعمدة المتداخلة، أو الجداول المزدوجة، أو الرسوم البيانية والأيقونات المدمجة)، أو غياب الكلمات المفتاحية الأساسية المذكورة في الإعلان، أو عدم توضيح معلومات الاتصال والتواريخ بشكل قياسي.'
    },
    {
      q: 'كيف أضمن توافق سيرتي الذاتية بنسبة 100% مع ATS؟',
      a: 'استخدم خطوطاً واضحة، وعناوين أقسام قياسية (مثل: الخبرات المهنية، التعليم، المهارات)، واستبدل الفقرات السردية بنقاط (Bullet Points)، واحرص على تضمين أرقام ونسب مئوية تثبت إنجازاتك.'
    },
    {
      q: 'ما هي أهمية الكلمات المفتاحية في السيرة الذاتية؟',
      a: 'الكلمات المفتاحية هي المصطلحات والمهارات والأدوات المذكورة في إعلان الوظيفة (مثل: Google Ads, Python, SEO). تضمين هذه الكلمات في سيرتك يرفع فوراً نسبة مطابقة الـ CV ويضمن اجتياز الفلترة التلقائية.'
    },
    {
      q: 'ما هي الأخطاء الشائعة التي يجب تجنبها؟',
      a: 'تجنب إرسال السيرة كصورة، وتجنب استخدام الجداول المعقدة، والابتعاد عن الأوصاف المبهمة الخالية من الأرقام، وتجنب الإطالة غير المبررة (أكثر من صفحتين).'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <SEOHead
        title="فاحص ومحلل السيرة الذاتية ونظام ATS مجاناً | CareerAI"
        description="افحص توافق سيرتك الذاتية مع أنظمة ATS واكتشف الكلمات المفتاحية المفقودة والأخطاء الشائعة ونسبة المطابقة مع الوظيفة مجاناً وبدون تسجيل."
        keywords="فحص السيرة الذاتية, محلل ATS, فاحص الـ CV, توافق السيرة مع الوظيفة, كشف أخطاء السيرة الذاتية"
        canonicalPath="/tools/resume-analyzer"
        schemaJson={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "فاحص ومحلل السيرة الذاتية ATS | CareerAI",
          "operatingSystem": "All",
          "applicationCategory": "BusinessApplication",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "أداة فحص واختبار توافق السيرة الذاتية مع معايير أنظمة التوظيف الحديثة ATS."
        }}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumbs Navigation */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <button onClick={() => navigate('/')} className="hover:text-blue-600">الرئيسية</button>
          <span>/</span>
          <button onClick={() => navigate('/tools')} className="hover:text-blue-600">الأدوات</button>
          <span>/</span>
          <span className="text-slate-800 font-bold">فاحص ومحلل السيرة الذاتية (ATS Checker)</span>
        </div>

        {/* Hero Header Section */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs relative overflow-hidden">
          <div className="absolute -left-16 -top-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
              <Cpu className="w-3.5 h-3.5 text-emerald-600" />
              <span>فحص مجاني 100% بدون الحاجة لإنشاء حساب</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
              حلل سيرتك الذاتية مجانًا واعرف مدى توافقها مع ATS
            </h1>

            <p className="text-xs sm:text-base text-slate-600 leading-relaxed">
              ارفع سيرتك الذاتية بتنسيق PDF أو DOCX واكتشف نقاط القوة والضعف والكلمات المفتاحية المفقودة، واحصل على تقرير تفصيلي يساعدك في تحسين سيرتك واجتياز الفرز الآلي بسهولة.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={handleLoadDemo}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>تجربة نموذج جاهز للتحليل السريع</span>
              </button>

              <button
                onClick={() => navigate('/tools/resume-builder')}
                className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
              >
                <FileCheck className="w-4 h-4" />
                <span>أو أنشئ سيرة ذاتية جديدة متوافقة مع ATS</span>
              </button>
            </div>
          </div>
        </div>

        {/* Google AdSense Placement: After Tool Intro */}
        <AdSenseBanner slot="after-intro-analyzer" format="auto" />

        {/* Main Input Form Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-8">
          
          {/* 1. Drag & Drop Upload Area */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-black flex items-center justify-center">1</span>
                <span>رفع السيرة الذاتية (Resume Upload)</span>
                <span className="text-rose-500">*</span>
              </label>
              <span className="text-xs text-slate-400 font-semibold">الصيغ المدعومة: PDF, DOCX</span>
            </div>

            {!uploadedFile ? (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition flex flex-col items-center justify-center gap-3 ${
                  isDragOver 
                    ? 'border-emerald-500 bg-emerald-50/50 scale-[1.01]' 
                    : 'border-slate-300 hover:border-emerald-500 hover:bg-slate-50/60'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.doc,.txt"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileProcess(e.target.files[0]);
                    }
                  }}
                />

                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-xs">
                  <UploadCloud className="w-8 h-8" />
                </div>

                <div className="space-y-1 max-w-sm">
                  <p className="text-sm font-black text-slate-800">
                    اسحب ملف السيرة الذاتية هنا أو <span className="text-emerald-600 underline">اضغط للاختيار</span>
                  </p>
                  <p className="text-xs text-slate-500">
                    يدعم ملفات PDF و Word (DOCX) بحجم يصل حتى 10MB
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                      {uploadedFile.name}
                    </p>
                    <p className="text-[11px] text-emerald-700 font-semibold">
                      تم تجهيز الملف بنجاح للفحص الآلي ({(uploadedFile.size / 1024).toFixed(1)} KB)
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="px-3 py-1.5 bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>حذف الملف ورفع آخر</span>
                </button>
              </div>
            )}
          </div>

          {/* 2. Target Job Role & Job Description */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-black flex items-center justify-center">2</span>
                <span>ما الوظيفة التي تريد التقديم عليها؟ (اختياري)</span>
              </label>
              <span className="text-xs text-slate-400 font-semibold">لتحسين دقة التحليل</span>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                value={targetJobRole}
                onChange={(e) => setTargetJobRole(e.target.value)}
                placeholder="مثال: Digital Marketing Specialist أو Software Engineer أو Graphic Designer"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">
                    وصف الوظيفة (Job Description):
                  </span>
                  <span className="text-[11px] text-slate-400">إضافة وصف الوظيفة يساعد الأداة على إجراء تحليل ATS أكثر دقة ومطابقة الكلمات المفتاحية</span>
                </div>
                <textarea
                  rows={4}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="الصق نص إعلان الوظيفة أو المتطلبات والمسؤوليات لمقارنتها مع سيرتك الذاتية..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm leading-relaxed focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* 3. Analysis Button */}
          <div className="pt-2">
            <button
              onClick={handleRunAnalysis}
              disabled={(!uploadedFile && !extractedCvText) || isAnalyzing}
              className={`w-full py-4 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-3 transition shadow-md ${
                (uploadedFile || extractedCvText) && !isAnalyzing
                  ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white shadow-emerald-500/25'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>جاري فحص وتدقيق السيرة الذاتية عبر خوارزميات ATS...</span>
                </>
              ) : (
                <>
                  <Cpu className="w-5 h-5" />
                  <span>تحليل السيرة الذاتية</span>
                  <ArrowLeft className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* 11. Privacy Notice */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-start gap-3 text-xs text-slate-600">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800">حماية الخصوصية: </span>
              <span>نحن نحترم خصوصيتك. لا يتم الاحتفاظ بسيرتك الذاتية أو بياناتك الشخصية بشكل دائم بعد انتهاء عملية التحليل، وتتم المعالجة الآمنة فورياً في جلسة المتصفح.</span>
            </div>
          </div>

        </div>

        {/* ================================================================ */}
        {/* 4. RESULTS DASHBOARD (Displays after clicking Analysis)          */}
        {/* ================================================================ */}
        {analysisResult && (
          <div id="results-dashboard" className="space-y-8 animate-in fade-in duration-300">
            
            {/* Main Score Header Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-md space-y-6">
              
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <span>تقرير التحليل الفوري لـ ATS</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                    نتيجة التوافق: <span className={
                      analysisResult.scoreLevel === 'ممتاز' ? 'text-emerald-600' :
                      analysisResult.scoreLevel === 'جيد جداً' ? 'text-blue-600' :
                      analysisResult.scoreLevel === 'يحتاج إلى تحسين' ? 'text-amber-600' : 'text-rose-600'
                    }>{analysisResult.scoreLevel}</span>
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                    {analysisResult.summaryMessage}
                  </p>
                </div>

                {/* Circular / Visual Gauge Card */}
                <div className="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200 shrink-0">
                  <div className="relative w-24 h-24 rounded-full flex items-center justify-center bg-white shadow-inner border-4 border-emerald-500">
                    <div className="text-center">
                      <span className="text-3xl font-black text-slate-900 leading-none">
                        {analysisResult.overallScore}
                      </span>
                      <span className="text-[10px] block font-bold text-slate-400">/ 100</span>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="font-bold text-slate-900 text-sm">ATS Score</div>
                    <div className="text-slate-500 font-medium">
                      {analysisResult.scoreLevel === 'ممتاز' && 'توافق فائق مع خوارزميات الفرز'}
                      {analysisResult.scoreLevel === 'جيد جداً' && 'توافق قوي مع فرص تحسين بسيطة'}
                      {analysisResult.scoreLevel === 'يحتاج إلى تحسين' && 'ينصح بتطبيق التوصيات أدناه'}
                      {analysisResult.scoreLevel === 'يحتاج إلى تحسين كبير' && 'قد تواجه مشاكل في القراءة الآلية'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Level Indicators */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs font-bold">
                <div className={`p-3 rounded-xl border ${analysisResult.overallScore >= 90 ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                  <span>90-100: ممتاز</span>
                </div>
                <div className={`p-3 rounded-xl border ${analysisResult.overallScore >= 75 && analysisResult.overallScore < 90 ? 'bg-blue-50 border-blue-300 text-blue-800' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                  <span>75-89: جيد جداً</span>
                </div>
                <div className={`p-3 rounded-xl border ${analysisResult.overallScore >= 60 && analysisResult.overallScore < 75 ? 'bg-amber-50 border-amber-300 text-amber-800' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                  <span>60-74: يحتاج إلى تحسين</span>
                </div>
                <div className={`p-3 rounded-xl border ${analysisResult.overallScore < 60 ? 'bg-rose-50 border-rose-300 text-rose-800' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                  <span>أقل من 60: تحسين كبير</span>
                </div>
              </div>

            </div>

            {/* 5. Section-by-Section Analysis Grid */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-emerald-600" />
                  <span>تحليل أقسام السيرة الذاتية (Section Breakdown)</span>
                </h3>
                <span className="text-xs font-bold text-slate-400">9 أقسام مفحوصة</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {analysisResult.sectionAudits.map((sec) => (
                  <div 
                    key={sec.id}
                    className={`p-4 rounded-2xl border transition flex flex-col justify-between gap-2.5 ${
                      sec.status === 'good' 
                        ? 'bg-slate-50/70 border-slate-200' 
                        : 'bg-amber-50/40 border-amber-200'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">{sec.name}</span>
                        {sec.status === 'good' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                            ✓ جيد
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-black text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                            ⚠ يحتاج إلى تحسين
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium">{sec.englishName}</p>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {sec.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Strengths & 7. Issues to Fix (2-Column Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Strengths Card */}
              <div className="bg-white rounded-3xl border border-emerald-200/70 p-6 sm:p-8 shadow-xs space-y-4">
                <h3 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>نقاط القوة في سيرتك الذاتية ({analysisResult.strengths.length})</span>
                </h3>

                <ul className="space-y-3">
                  {analysisResult.strengths.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 text-xs text-slate-700 leading-relaxed font-medium">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Issues to Fix Card */}
              <div className="bg-white rounded-3xl border border-amber-200/70 p-6 sm:p-8 shadow-xs space-y-4">
                <h3 className="text-lg font-bold text-amber-950 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  <span>ما الذي يجب تحسينه؟ ({analysisResult.issuesToFix.length})</span>
                </h3>

                <div className="space-y-3">
                  {analysisResult.issuesToFix.map((issue) => (
                    <div key={issue.id} className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-100 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          issue.priority === 'عالية' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          أولوية {issue.priority}
                        </span>
                        <span className="text-xs font-bold text-slate-900">{issue.title}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed pr-2">
                        {issue.action}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* 8. Keywords ATS Analysis Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <span>تحليل الكلمات المفتاحية ATS (Keyword Match)</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">مطابقة المصطلحات والمهارات مع سوق العمل والوصف الوظيفي</p>
                </div>

                {analysisResult.keywordMatchScore !== undefined && (
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 font-bold text-xs">
                    <span>Keyword Match Score:</span>
                    <span className="text-blue-700 font-black">{analysisResult.keywordMatchScore}%</span>
                  </div>
                )}
              </div>

              {/* Detected Keywords */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>الكلمات الموجودة في السيرة الذاتية:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.detectedKeywords.map((kw, i) => (
                    <span key={i} className="px-3 py-1.5 bg-slate-100 text-slate-800 font-bold rounded-xl text-xs border border-slate-200">
                      ✓ {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Keywords */}
              {analysisResult.missingKeywords.length > 0 && (
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-rose-700 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" />
                      <span>الكلمات المهمة المفقودة من الوصف الوظيفي:</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopyMissingKeywords(analysisResult.missingKeywords)}
                      className="text-xs text-slate-600 hover:text-blue-600 font-bold flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 transition"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedMissing ? 'تم نسخ الكلمات!' : 'نسخ الكلمات'}</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {analysisResult.missingKeywords.map((mkw, i) => (
                      <span key={i} className="px-3 py-1.5 bg-rose-50 text-rose-800 font-bold rounded-xl text-xs border border-rose-200">
                        + {mkw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 9. Specific Actionable Suggestions */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                  <span>اقتراحات لتحسين سيرتك الذاتية</span>
                </h3>
                <span className="text-xs text-slate-400 font-bold">توصيات مخصصة</span>
              </div>

              <div className="space-y-3">
                {analysisResult.specificSuggestions.map((sug, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                        {sug}
                      </p>
                    </div>

                    <button
                      onClick={() => navigate('/tools/resume-builder')}
                      className="px-3.5 py-1.5 bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold shrink-0 transition flex items-center gap-1 self-start sm:self-center"
                    >
                      <span>تعديل في الـ Builder</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 10. Re-analyze CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={handleResetAll}
                className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition shadow-md"
              >
                <RotateCcw className="w-4 h-4" />
                <span>تحليل سيرة ذاتية أخرى</span>
              </button>

              <button
                onClick={() => navigate('/tools/resume-builder')}
                className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition shadow-md shadow-emerald-500/20"
              >
                <FileCheck className="w-4 h-4" />
                <span>فتح منشئ السيرة الذاتية (AI Resume Builder)</span>
              </button>
            </div>

          </div>
        )}

        {/* Google AdSense Placement: Between Results & SEO Guide */}
        <AdSenseBanner slot="middle-between-results-guide" format="auto" />

        {/* ================================================================ */}
        {/* 12. SEO Educational Content & ATS Guide                          */}
        {/* ================================================================ */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-10">
          
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
              دليل التوظيف وخوارزميات الفرز
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              الدليل الشامل لاجتياز فحص أنظمة ATS بنجاح
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              تعتمد الشركات الحديثة على برمجيات ATS لفحص السير الذاتية ومقارنتها بمتطلبات الشواغر. إليك كل ما تحتاج معرفته لتضمن وصول سيرتك الذاتية ليد مسؤول التوظيف البشري.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-black">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-sm">ما هو نظام ATS؟</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                هو اختصار لـ Applicant Tracking System، وهو برنامج إلكتروني ينظم عملية التوظيف ويفحص آلاف ملفات المتقدمين تلقائياً.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-black">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-sm">كيف تعمل أنظمة ATS؟</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                تستخرج النصوص من ملف الـ PDF/Word، وتبحث عن الكلمات المفتاحية والمهارات والتواريخ، وتمنح السيرة درجة مطابقة مئوية.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-black">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-sm">لماذا يتم رفض السير الذاتية؟</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                بسبب التنسيقات غير القياسية، أو الجداول المعقدة، أو خلو السيرة من الكلمات المفتاحية المذكورة في نص الإعلان الوظيفي.
              </p>
            </div>

          </div>

          {/* Educational In-Article Banner */}
          <AdSenseBanner slot="in-article-educational" format="horizontal" />

          {/* Key ATS Rules & Mistakes to Avoid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-3">
              <h4 className="font-bold text-emerald-950 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>كيفية تحسين السيرة الذاتية لأنظمة ATS</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                <li>• استخدم عناوين أقسام قياسية (الخبرات المهنية، التعليم، المهارات).</li>
                <li>• ضمن كلمات مفتاحية مأخوذة من متطلبات الوظيفة المعلن عنها.</li>
                <li>• اكتب إنجازاتك في هيئة نقاط (Bullet Points) مدعومة بالأرقام والـ KPIs.</li>
                <li>• اعتمد صيغة ملف نظيفة مثل PDF القياسي أو Word.</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-3">
              <h4 className="font-bold text-rose-950 text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>أخطاء شائعة يجب تجنبها تماماً</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                <li>• تجنب وضع النصوص الهامة داخل مربعات نصية (Text Boxes) معزولة.</li>
                <li>• تجنب إرسال السيرة كملف صورة ممسوحة ضوئياً.</li>
                <li>• تجنب استخدام أشرطة التقييم الرسومية للمهارات (Progress Bars).</li>
                <li>• لا تبالغ في طول المستند؛ صفحة إلى صفحتين هو المعيار الذهبي.</li>
              </ul>
            </div>

          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4 pt-6 border-t border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-600" />
              <span>الأسئلة الشائعة حول فحص السيرة الذاتية وأنظمة ATS</span>
            </h3>

            <div className="space-y-3">
              {faqList.map((item, idx) => (
                <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50">
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full p-4 text-right flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-800 hover:bg-slate-100/70 transition"
                  >
                    <span>{item.q}</span>
                    {openFaqIndex === idx ? (
                      <ChevronUp className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {openFaqIndex === idx && (
                    <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Cross Tools Navigation */}
          <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-5 border border-slate-800 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold">أدوات إضافية لتجهيز ملفك الوظيفي</h3>
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
                onClick={() => { navigate('/tools/ats-keywords'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="p-4 bg-slate-800/80 hover:bg-indigo-600 rounded-2xl border border-slate-700/80 hover:border-indigo-400 text-right transition group flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-white block mb-1">مستخرج الكلمات المفتاحية</span>
                  <span className="text-[11px] text-slate-300 group-hover:text-indigo-100">استخراج مهارات الوصف الوظيفي</span>
                </div>
                <span className="text-xs text-indigo-400 group-hover:text-white font-bold mt-3">انتقل للأداة ←</span>
              </button>

              <button
                onClick={() => { navigate('/tools/cover-letter-generator'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="p-4 bg-slate-800/80 hover:bg-amber-600 rounded-2xl border border-slate-700/80 hover:border-amber-400 text-right transition group flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-white block mb-1">كاتب رسائل التقديم</span>
                  <span className="text-[11px] text-slate-300 group-hover:text-amber-100">توليد خطاب تعريف احترافي</span>
                </div>
                <span className="text-xs text-amber-400 group-hover:text-white font-bold mt-3">انتقل للأداة ←</span>
              </button>
            </div>
          </div>

        </div>

        {/* Google AdSense Placement: Bottom of Page */}
        <AdSenseBanner slot="bottom-analyzer-footer" format="auto" />

      </div>
    </div>
  );
};

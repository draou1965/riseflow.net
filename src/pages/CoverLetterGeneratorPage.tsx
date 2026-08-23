import React, { useState } from 'react';
import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel } from 'docx';
import { 
  CoverLetterFormData, 
  CoverLetterTone, 
  CoverLetterLength, 
  CoverLetterLanguage, 
  CoverLetterScoreBreakdown,
  ExtractedJobKeyword,
  SAMPLE_COVER_LETTER_INPUT, 
  generateCoverLetter,
  calculateCoverLetterScore,
  extractJobKeywords
} from '../data/coverLetterHelperData';
import { AdSenseBanner } from '../components/AdSenseBanner';
import { SEOHead } from '../components/SEOHead';
import { 
  Sparkles, 
  Copy, 
  Check, 
  RotateCcw, 
  Download, 
  FileText, 
  Globe2, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ArrowLeft, 
  ShieldCheck, 
  Lightbulb, 
  FileCheck,
  Edit3,
  Scissors,
  Award,
  Zap,
  Tag,
  BarChart3,
  BookOpen,
  Printer
} from 'lucide-react';

interface CoverLetterGeneratorPageProps {
  navigate: (path: string) => void;
}

export const CoverLetterGeneratorPage: React.FC<CoverLetterGeneratorPageProps> = ({ navigate }) => {
  const [formData, setFormData] = useState<CoverLetterFormData>({
    fullName: '',
    currentTitle: '',
    yearsOfExperience: '',
    skills: '',
    achievements: '',
    targetJobTitle: '',
    companyName: '',
    hiringManager: '',
    companyLocation: '',
    jobDescription: '',
    tone: 'professional',
    length: 'medium',
    language: 'ar'
  });

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isModifying, setIsModifying] = useState<boolean>(false);
  const [isExportingDocx, setIsExportingDocx] = useState<boolean>(false);
  const [generatedLetter, setGeneratedLetter] = useState<string | null>(null);
  const [editedLetter, setEditedLetter] = useState<string>('');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [scoreData, setScoreData] = useState<CoverLetterScoreBreakdown | null>(null);
  const [extractedKeywords, setExtractedKeywords] = useState<ExtractedJobKeyword[]>([]);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleInputChange = (field: keyof CoverLetterFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerate = (modifier?: 'shorter' | 'more_professional' | 'more_persuasive') => {
    if (!formData.fullName.trim() || !formData.targetJobTitle.trim() || !formData.companyName.trim()) {
      alert('يرجى تعبئة الحقول الأساسية: الاسم الكامل، مسمى الوظيفة المستهدفة، واسم الشركة.');
      return;
    }

    if (modifier) {
      setIsModifying(true);
    } else {
      setIsGenerating(true);
    }

    setTimeout(() => {
      const letter = generateCoverLetter(formData, modifier);
      setGeneratedLetter(letter);
      setEditedLetter(letter);

      const score = calculateCoverLetterScore(formData, letter);
      setScoreData(score);

      if (formData.jobDescription) {
        const keywords = extractJobKeywords(formData.jobDescription, letter);
        setExtractedKeywords(keywords);
      } else {
        setExtractedKeywords([]);
      }

      setIsGenerating(false);
      setIsModifying(false);

      const resultEl = document.getElementById('cover-letter-result');
      if (resultEl && !modifier) {
        resultEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, modifier ? 600 : 1000);
  };

  const handleLoadDemo = () => {
    setFormData(SAMPLE_COVER_LETTER_INPUT);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      currentTitle: '',
      yearsOfExperience: '',
      skills: '',
      achievements: '',
      targetJobTitle: '',
      companyName: '',
      hiringManager: '',
      companyLocation: '',
      jobDescription: '',
      tone: 'professional',
      length: 'medium',
      language: 'ar'
    });
    setGeneratedLetter(null);
    setEditedLetter('');
    setScoreData(null);
    setExtractedKeywords([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopy = () => {
    const textToCopy = editedLetter || generatedLetter || '';
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  // 9. Download Native DOCX File (Clean Word document)
  const handleDownloadDocx = async () => {
    const content = editedLetter || generatedLetter || '';
    if (!content.trim()) return;

    setIsExportingDocx(true);
    try {
      const isArabic = formData.language === 'ar';
      const alignment = isArabic ? AlignmentType.RIGHT : AlignmentType.LEFT;

      const rawParagraphs = content.split('\n\n').filter(p => p.trim().length > 0);
      
      const docParagraphs: Paragraph[] = rawParagraphs.map((block, index) => {
        const lines = block.split('\n');
        const textRuns: TextRun[] = [];
        
        lines.forEach((line, lineIdx) => {
          const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-');
          const cleanLine = isBullet ? line.replace(/^[•\-]\s*/, '') : line;
          
          textRuns.push(
            new TextRun({
              text: isBullet ? `• ${cleanLine}` : cleanLine,
              font: isArabic ? 'Arial' : 'Calibri',
              size: 23, // ~11.5pt
              color: '222222',
              bold: index === 0 && lineIdx === 0, // Candidate name bold
            })
          );

          if (lineIdx < lines.length - 1) {
            textRuns.push(new TextRun({ break: 1 }));
          }
        });

        return new Paragraph({
          children: textRuns,
          alignment,
          spacing: {
            line: 280, // 1.4 line height
            after: 200, // 10pt after paragraph
          },
          bidirectional: isArabic,
        });
      });

      const doc = new Document({
        creator: 'CareerAI Cover Letter Generator',
        title: `Cover Letter - ${formData.targetJobTitle} - ${formData.companyName}`,
        description: 'Professional Cover Letter generated with CareerAI',
        sections: [
          {
            properties: {
              page: {
                margin: {
                  top: 1440, // 1 inch (2.54 cm)
                  bottom: 1440,
                  left: 1440,
                  right: 1440,
                },
              },
            },
            children: docParagraphs,
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const safeCandidate = (formData.fullName || 'Candidate').trim().replace(/\s+/g, '_');
      const safeCompany = (formData.companyName || 'Job_Application').trim().replace(/\s+/g, '_');
      link.download = `Cover_Letter_${safeCandidate}_${safeCompany}.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to generate docx natively, fallback to Word HTML', err);
      const isArabic = formData.language === 'ar';
      const direction = isArabic ? 'rtl' : 'ltr';
      const wordHtml = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' 
              xmlns:w='urn:schemas-microsoft-com:office:word' 
              xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset='utf-8'>
          <title>Cover Letter - ${formData.targetJobTitle}</title>
          <style>
            body { font-family: 'Calibri', 'Arial', sans-serif; font-size: 11.5pt; line-height: 1.5; color: #1a1a1a; direction: ${direction}; padding: 40px; }
            p { margin-bottom: 14pt; }
          </style>
        </head>
        <body>
          ${content.split('\n\n').map(p => `<p>${p.replace(/\n/g, '<br/>')}</p>`).join('')}
        </body>
        </html>
      `;
      const blob = new Blob(['\ufeff', wordHtml], { type: 'application/msword;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Cover_Letter_${(formData.companyName || 'Application').replace(/\s+/g, '_')}.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } finally {
      setIsExportingDocx(false);
    }
  };

  // 9. Download PDF / Print
  const handlePrintPdf = () => {
    window.print();
  };

  const faqItems = [
    {
      q: 'ما هي رسالة التقديم (Cover Letter)؟',
      a: 'رسالة التغطية أو التقديم هي وثيقة مهنية من صفحة واحدة ترسلها مع سيرتك الذاتية. تهدف لشرح من أنت، ولماذا تقدمت لهذه الوظيفة بالتحديد، وما هي القيمة المضافة والإنجازات التي ستقدمها للشركة.'
    },
    {
      q: 'هل ما زالت Cover Letter مهمة في التوظيف الحديث؟',
      a: 'نعم بالتأكيد! تشير الإحصاءات إلى أن أكثر من 83% من مسؤولي التوظيف يعتبرون رسالة التقديم المخصصة عاملاً حاسماً للاختيار بين المرشحين متقاربي المؤهلات، لأنها تعكس شغف المرشح واهتمامه الحقيقي بالشركة.'
    },
    {
      q: 'ما الفرق بين السيرة الذاتية (CV) ورسالة التقديم (Cover Letter)؟',
      a: 'السيرة الذاتية هي ملخص شامل وتاريخي لجميع خبراتك ومؤهلاتك بترتيب زمني، بينما رسالة التقديم هي خطاب موجه ومخصص يركز على نقطتين أو ثلاث من أهم إنجازاتك التي تتطابق مباشرة مع احتياجات الوظيفة المعلنة.'
    },
    {
      q: 'كيف أخصص رسالة التقديم لكل وظيفة بكفاءة؟',
      a: 'ادرس إعلان الوظيفة جيداً، واستخرج المهارات والمسؤوليات الرئيسية، ثم اذكر اسم الشركة واسم مسؤول التوظيف (إن وُجد) واشرح كيف تساهم خبراتك السابقة في حل التحديات التي تبحث عنها الشركة.'
    },
    {
      q: 'ما هي أهم أخطاء رسائل التقديم التي يجب تجنبها؟',
      a: 'أهم الأخطاء هي: إرسال خطاب عام مكرر لجميع الشركات، وتكرار ما هو مكتوب في الـ CV حرفياً، والإطالة المفرطة (أكثر من صفحة)، وعدم ذكر نتائج وأرقام واضحة للإنجازات.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <SEOHead
        title="مولد رسالة التقديم والخطاب التعريفي الذكي مجاناً | CareerAI"
        description="أنشئ خطاب تقديم احترافي (Cover Letter) مخصص لأي وظيفة باللغتين العربية والإنجليزية بالذكاء الاصطناعي مع قياس قوة الخطاب وتصدير DOCX و PDF."
        keywords="رسالة تقديم, كاتب Cover Letter, خطاب تعريفي للوظيفة, رسالة دافع, خطاب تغطية بالذكاء الاصطناعي"
        canonicalPath="/tools/cover-letter-generator"
        schemaJson={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "كاتب رسائل التغطية الذكي | CareerAI Cover Letter Generator",
          "operatingSystem": "All",
          "applicationCategory": "BusinessApplication",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "أداة صياغة وتوليد رسائل تقديم احترافية ومخصصة وفق معايير مسؤولي التوظيف."
        }}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 print:hidden">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <button onClick={() => navigate('/')} className="hover:text-blue-600">الرئيسية</button>
          <span>/</span>
          <button onClick={() => navigate('/tools')} className="hover:text-blue-600">الأدوات</button>
          <span>/</span>
          <span className="text-slate-800 font-bold">مولد رسالة التقديم (Cover Letter Generator)</span>
        </div>

        {/* Hero Banner Section */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs relative overflow-hidden">
          <div className="absolute -left-16 -top-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>توليد ذكي ومخصص 100% مجاناً بدون تسجيل</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
              مولد رسالة التقديم على الوظائف بالذكاء الاصطناعي (AI Cover Letter)
            </h1>

            <p className="text-xs sm:text-base text-slate-600 leading-relaxed">
              أنشئ خطاب تقديم احترافي ومقنع مخصص لكل وظيفة تقدم عليها في ثوانٍ معدودة. اختر النبرة واللغة والطول، واجعل ملفك المهني يبرز بين مئات المتقدمين.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleLoadDemo}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>تعبئة نموذج تجريبي جاهز</span>
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
                <span>فحص السيرة الذاتية مع ATS</span>
              </button>
            </div>
          </div>
        </div>

        {/* 15. Google AdSense Placement: After Hero */}
        <AdSenseBanner slot="after-intro-coverletter" format="auto" />

        {/* Generator Form Box */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-8">
          
          {/* Section 1: User Info */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-black flex items-center justify-center">1</span>
                <span>معلوماتك وخبراتك المهنية</span>
              </h2>
              <span className="text-xs text-slate-400">الحقول المميزة بـ (*) إلزامية</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  الاسم الكامل <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="مثال: سارة خالد المنصور"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  المسمى الحالي أو التخصص
                </label>
                <input
                  type="text"
                  value={formData.currentTitle}
                  onChange={(e) => handleInputChange('currentTitle', e.target.value)}
                  placeholder="مثال: أخصائي تسويق رقمي / خريج حاسب"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2 lg:col-span-1">
                <label className="block text-xs font-bold text-slate-700">
                  سنوات الخبرة (اختياري)
                </label>
                <input
                  type="text"
                  value={formData.yearsOfExperience}
                  onChange={(e) => handleInputChange('yearsOfExperience', e.target.value)}
                  placeholder="مثال: 4 سنوات / حديث تخرج"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  أهم المهارات ذات الصلة (اختياري)
                </label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) => handleInputChange('skills', e.target.value)}
                  placeholder="مثال: SEO, Google Ads, تحليل البيانات, إدارة المشاريع"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  أهم الإنجازات أو النتائج المحققة (اختياري)
                </label>
                <input
                  type="text"
                  value={formData.achievements}
                  onChange={(e) => handleInputChange('achievements', e.target.value)}
                  placeholder="مثال: مضاعفة المبيعات بنسبة 30% وإدارة فريق من 5 أشخاص"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Target Job Info */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-black flex items-center justify-center">2</span>
              <span>معلومات الوظيفة والشركة المستهدفة</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1.5 sm:col-span-2 lg:col-span-1">
                <label className="block text-xs font-bold text-slate-700">
                  اسم الوظيفة المستهدفة <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.targetJobTitle}
                  onChange={(e) => handleInputChange('targetJobTitle', e.target.value)}
                  placeholder="مثال: Senior Marketing Specialist"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2 lg:col-span-1">
                <label className="block text-xs font-bold text-slate-700">
                  اسم الشركة <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  placeholder="مثال: شركة تقنية المستقبل"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  اسم مسؤول التوظيف (اختياري)
                </label>
                <input
                  type="text"
                  value={formData.hiringManager}
                  onChange={(e) => handleInputChange('hiringManager', e.target.value)}
                  placeholder="مثال: أ. أحمد السعدي / HR Team"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  مقر الشركة / الدولة (اختياري)
                </label>
                <input
                  type="text"
                  value={formData.companyLocation}
                  onChange={(e) => handleInputChange('companyLocation', e.target.value)}
                  placeholder="مثال: الرياض، السعودية / عن بعد"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Job Description Box */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  <span>وصف الوظيفة (Job Description)</span>
                </label>
                <span className="text-[11px] text-slate-400">
                  إضافة وصف الوظيفة يساعد الذكاء الاصطناعي على إنشاء رسالة أكثر تخصيصاً
                </span>
              </div>
              <textarea
                rows={4}
                value={formData.jobDescription}
                onChange={(e) => handleInputChange('jobDescription', e.target.value)}
                placeholder="انسخ متطلبات الوظيفة ومسؤولياتها هنا لمطابقتها في الخطاب بدقة..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm leading-relaxed focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Section 3: Style, Length & Language */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black flex items-center justify-center">3</span>
              <span>تخصيص الأسلوب والطول واللغة</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              {/* Tone Selection */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  أسلوب ونبرة الرسالة (Tone)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'professional', label: 'احترافي', desc: 'متوازن وواثق' },
                    { id: 'concise', label: 'مختصر ومباشر', desc: 'سريع للقراءة' },
                    { id: 'friendly', label: 'ودود', desc: 'متحمس وشغوف' },
                    { id: 'formal', label: 'رسمي', desc: 'تنفيذي ومحافظ' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => handleInputChange('tone', t.id)}
                      className={`p-2.5 rounded-xl border text-right transition ${
                        formData.tone === t.id
                          ? 'bg-amber-50/70 border-amber-400 text-amber-950 font-bold ring-1 ring-amber-400'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="text-xs font-bold">{t.label}</div>
                      <div className="text-[10px] text-slate-400">{t.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Length Selection */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  طول الرسالة (Length)
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'short', label: 'قصيرة (Short)', desc: '~ 150-200 كلمة' },
                    { id: 'medium', label: 'متوسطة (Medium)', desc: '~ 250-350 كلمة (موصى بها)' },
                    { id: 'detailed', label: 'مفصلة (Detailed)', desc: '~ 400+ كلمة مع إنجازات موسعة' }
                  ].map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => handleInputChange('length', l.id)}
                      className={`w-full p-2 rounded-xl border text-right transition flex items-center justify-between ${
                        formData.length === l.id
                          ? 'bg-blue-50/70 border-blue-400 text-blue-950 font-bold ring-1 ring-blue-400'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-xs">{l.label}</span>
                      <span className="text-[10px] text-slate-400 font-normal">{l.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Language Selection */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 flex items-center gap-1">
                  <Globe2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>لغة الخطاب (Language)</span>
                </label>
                <div className="space-y-1.5">
                  {[
                    { id: 'ar', label: 'العربية (Arabic)', flag: '🇸🇦' },
                    { id: 'en', label: 'الإنجليزية (English)', flag: '🇺🇸' },
                    { id: 'fr', label: 'الفرنسية (French)', flag: '🇫🇷' },
                    { id: 'es', label: 'الإسبانية (Spanish)', flag: '🇪🇸' },
                    { id: 'de', label: 'الألمانية (German)', flag: '🇩🇪' }
                  ].map((lang) => (
                    <button
                      key={lang.id}
                      type="button"
                      onClick={() => handleInputChange('language', lang.id)}
                      className={`w-full px-3 py-2 rounded-xl border text-right transition flex items-center justify-between text-xs ${
                        formData.language === lang.id
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold ring-1 ring-emerald-400'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{lang.label}</span>
                      <span className="text-sm">{lang.flag}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Action Generate Button */}
          <div className="pt-2">
            <button
              onClick={() => handleGenerate()}
              disabled={isGenerating || !formData.fullName || !formData.targetJobTitle || !formData.companyName}
              className={`w-full py-4 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-3 transition shadow-md ${
                formData.fullName && formData.targetJobTitle && formData.companyName && !isGenerating
                  ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white shadow-amber-500/25'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>جاري إنشاء رسالة تقديم مخصصة لهذه الوظيفة...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>إنشاء رسالة التقديم (Cover Letter)</span>
                  <ArrowLeft className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* 13. Privacy Note */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center gap-2.5 text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>نحن نحترم خصوصيتك: يتم استخدام البيانات فقط لإنشاء النتيجة داخل جلستك الحالية، ولا يتم تخزين أو حفظ معلوماتك الشخصية بشكل دائم.</span>
          </div>

        </div>

        {/* ======================================================== */}
        {/* RESULT SECTION (Cover Letter Output & Quality Score)     */}
        {/* ======================================================== */}
        {generatedLetter && (
          <div id="cover-letter-result" className="space-y-8 animate-in fade-in duration-300">
            
            {/* 10. Cover Letter Score Card */}
            {scoreData && (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                      <Award className="w-3.5 h-3.5" />
                      <span>مؤشر جودة الرسالة (Cover Letter Score)</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">
                      تقييم الرسالة: <span className="text-blue-600">{scoreData.grade}</span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      {scoreData.summaryFeedback}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200 self-start sm:self-auto">
                    <div className="text-3xl font-black text-slate-900">
                      {scoreData.overallScore}
                      <span className="text-xs font-bold text-slate-400">/100</span>
                    </div>
                  </div>
                </div>

                {/* Score Breakdown Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="block text-[11px] text-slate-500 font-semibold mb-1">التخصيص للوظيفة</span>
                    <span className="text-sm font-black text-slate-900">{scoreData.customizationScore}/20</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="block text-[11px] text-slate-500 font-semibold mb-1">الوضوح والهيكل</span>
                    <span className="text-sm font-black text-slate-900">{scoreData.clarityScore}/20</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="block text-[11px] text-slate-500 font-semibold mb-1">توازن الطول</span>
                    <span className="text-sm font-black text-slate-900">{scoreData.lengthScore}/20</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="block text-[11px] text-slate-500 font-semibold mb-1">الأسلوب المهني</span>
                    <span className="text-sm font-black text-slate-900">{scoreData.toneScore}/20</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 col-span-2 sm:col-span-1">
                    <span className="block text-[11px] text-slate-500 font-semibold mb-1">الكلمات المفتاحية</span>
                    <span className="text-sm font-black text-slate-900">{scoreData.vocabularyScore}/20</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 font-medium text-center">
                  * هذا التقييم إرشادي لمساعدتك في التحسين، ولا يعد ضماناً للحصول على الوظيفة.
                </p>
              </div>
            )}

            {/* 11. Extracted Job Keywords Box (if Job Description is present) */}
            {extractedKeywords.length > 0 && (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-amber-600" />
                    <span>الكلمات المهمة في إعلان الوظيفة ({extractedKeywords.length})</span>
                  </h3>
                  <span className="text-[11px] text-slate-400">مستخرجة من الوصف الوظيفي</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {extractedKeywords.map((item, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 rounded-xl text-xs font-bold border flex items-center gap-1.5 ${
                        item.isUsedInLetter
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      {item.isUsedInLetter ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <span className="text-slate-400">+</span>
                      )}
                      <span>{item.keyword}</span>
                      {item.isUsedInLetter && (
                        <span className="text-[10px] text-emerald-600 font-normal">(مستخدمة)</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Main Generated Letter Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-lg space-y-6">
              
              {/* Header Title and Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>تم تجهيز رسالة التقديم بنجاح</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    رسالة التقديم لوظيفة: {formData.targetJobTitle}
                  </h2>
                  <p className="text-xs text-slate-500">
                    مقدمة إلى: {formData.companyName} ({formData.language.toUpperCase()})
                  </p>
                </div>

                {/* 9. Action Buttons: Copy, PDF, DOCX */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                  >
                    {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{isCopied ? 'تم النسخ!' : 'نسخ الرسالة'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadDocx}
                    disabled={isExportingDocx}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs disabled:opacity-75"
                  >
                    {isExportingDocx ? (
                      <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Download className="w-3.5 h-3.5" />
                    )}
                    <span>{isExportingDocx ? 'جاري تجهيز DOCX...' : 'تحميل DOCX (Word)'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handlePrintPdf}
                    className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>تحميل PDF / طباعة</span>
                  </button>
                </div>
              </div>

              {/* 7. Quick Modification Bar */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-2.5">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-600" />
                  <span>تحسين وتعديل فوري:</span>
                </span>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleGenerate('shorter')}
                    disabled={isModifying}
                    className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition flex items-center gap-1"
                  >
                    <Scissors className="w-3 h-3 text-slate-500" />
                    <span>اجعلها أقصر</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleGenerate('more_professional')}
                    disabled={isModifying}
                    className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition flex items-center gap-1"
                  >
                    <Award className="w-3 h-3 text-blue-600" />
                    <span>اجعلها أكثر احترافية</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleGenerate('more_persuasive')}
                    disabled={isModifying}
                    className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3 text-amber-600" />
                    <span>اجعلها أكثر إقناعًا</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleGenerate()}
                    disabled={isModifying}
                    className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3 text-emerald-600" />
                    <span>إعادة الإنشاء</span>
                  </button>
                </div>
              </div>

              {/* 8. In-place Editable Text Box */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold flex items-center gap-1 text-slate-700">
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>يمكنك تحرير وتعديل أي جزء من النص مباشرة في الصندوق أدناه:</span>
                  </span>
                  <span>{editedLetter.split(/\s+/).filter(Boolean).length} كلمة</span>
                </div>

                <div className="relative">
                  <textarea
                    rows={15}
                    value={editedLetter}
                    onChange={(e) => {
                      setEditedLetter(e.target.value);
                      const updatedScore = calculateCoverLetterScore(formData, e.target.value);
                      setScoreData(updatedScore);
                    }}
                    dir={formData.language === 'ar' ? 'rtl' : 'ltr'}
                    className="w-full bg-slate-50/70 border border-slate-200 rounded-2xl p-6 sm:p-8 text-xs sm:text-sm font-sans leading-relaxed text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                  {isModifying && (
                    <div className="absolute inset-0 bg-white/70 backdrop-blur-xs rounded-2xl flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-amber-600 border-t-transparent rounded-full animate-spin" />
                      <span className="text-xs font-bold text-slate-800">جاري تحديث الصياغة...</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Tips after generation */}
              <div className="p-4 bg-amber-50/50 rounded-2xl border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-bold">نصيحة للإرسال: </span>
                  <span>تأكد من مراجعة الأسماء والتواريخ قبل الإرسال، وأرفق الخطاب بصيغة DOCX أو PDF وفق ما يطلبه صاحب العمل.</span>
                </div>
              </div>

              {/* 12. Create New Letter Button */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition shadow-md"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>إنشاء Cover Letter جديدة</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/tools/resume-analyzer')}
                  className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition shadow-md shadow-emerald-500/20"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>افحص سيرتك الذاتية مع نظام ATS</span>
                </button>
              </div>

            </div>

            {/* Clean Printable A4 Document for PDF Generation */}
            <div 
              className="hidden print:block print-only-cover-letter bg-white text-slate-900 font-sans p-10 leading-relaxed text-sm"
              dir={formData.language === 'ar' ? 'rtl' : 'ltr'}
            >
              {(editedLetter || generatedLetter || '').split('\n\n').map((paragraph, pIdx) => (
                <p key={pIdx} className="mb-4 whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
            </div>

          </div>
        )}

        {/* 15. Google AdSense Placement: After Result */}
        <AdSenseBanner slot="middle-after-result-coverletter" format="auto" />

        {/* ======================================================== */}
        {/* 14. SEO Educational Guide & Best Practices               */}
        {/* ======================================================== */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-10">
          
          <div className="space-y-4 max-w-3xl">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              الدليل الشامل لكتابة رسائل التقديم الاحترافية
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              كيف تكتب رسالة تقديم (Cover Letter) مخصصة تقنع مسؤولي التوظيف؟
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              رسالة التغطية هي بوابتك الذهبية لترك انطباع أولي لا يُنسى. إليك الهيكل المعتمد عالمياً لإنشاء خطاب تقديم قوي يتكامل مع سيرتك الذاتية.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-sm">ما هي Cover Letter؟</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                وثيقة موجزة تعرف صاحب العمل بشخصيتك ودوافعك، وتوضح التوافق المباشر بين خبراتك السابقة وشاغر الوظيفة.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-sm">هل ما زالت مهمة؟</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                نعم؛ يفضل مسؤولو الموارد البشرية الخطابات المخصصة لأنها تميز المتقدم الجاد عن أصحاب التقديم الآلي العشوائي.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-sm">الفرق بين CV و Cover Letter</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                الـ CV يخبر مسؤول التوظيف "ماذا فعلت سابقاً"، بينما رسالة التقديم تشرح "كيف ستفيد هذه الشركة في المستقبل".
              </p>
            </div>

          </div>

          {/* Educational In-Article Banner */}
          <AdSenseBanner slot="in-article-coverletter-guide" format="horizontal" />

          {/* Customization Rules & Common Mistakes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-3">
              <h4 className="font-bold text-emerald-950 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>كيفية تخصيص Cover Letter لكل وظيفة</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                <li>• اذكر اسم الشركة وشاغرها الوظيفي بوضوح في أول فقرة.</li>
                <li>• استخرج الكلمات المفتاحية من إعلان الوظيفة وادمجها بسلاسة.</li>
                <li>• اختر 2 إلى 3 إنجازات رقمية تثبت قدرتك على حل مشاكل العمل.</li>
                <li>• أنهِ الخطاب بطلب واضح ومؤدب لإجراء مقابلة شخصية.</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-3">
              <h4 className="font-bold text-rose-950 text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-rose-600" />
                <span>أهم أخطاء رسائل التقديم لتجنبها</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                <li>• إرسال نفس الخطاب العام المكرر لعدة شركات مختلفة.</li>
                <li>• إعادة نسخ ولصق فقرات السيرة الذاتية دون قيمة إضافية.</li>
                <li>• التحدث فقط عما ستستفيده أنت، بدلاً مما ستقدمه للشركة.</li>
                <li>• الإطالة وتجاوز صفحة واحدة (المثالي بين 250 - 350 كلمة).</li>
              </ul>
            </div>

          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4 pt-6 border-t border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-600" />
              <span>الأسئلة الشائعة حول رسائل التقديم (Cover Letter FAQs)</span>
            </h3>

            <div className="space-y-3">
              {faqItems.map((item, idx) => (
                <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50">
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full p-4 text-right flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-800 hover:bg-slate-100/70 transition"
                  >
                    <span>{item.q}</span>
                    {openFaqIndex === idx ? (
                      <ChevronUp className="w-4 h-4 text-amber-600 shrink-0" />
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
          <div className="bg-gradient-to-br from-slate-900 via-amber-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-5 border border-slate-800 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold">أدوات إضافية لاكتمال ملفك الوظيفي</h3>
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
                  <span className="text-[11px] text-slate-300 group-hover:text-blue-100">صياغة وتصدير CV قياسي متوافق مع ATS</span>
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
                onClick={() => { navigate('/tools/resume-analyzer'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="p-4 bg-slate-800/80 hover:bg-emerald-600 rounded-2xl border border-slate-700/80 hover:border-emerald-400 text-right transition group flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-white block mb-1">فاحص ومحلل ATS</span>
                  <span className="text-[11px] text-slate-300 group-hover:text-emerald-100">كشف الأخطاء ونسبة التطابق</span>
                </div>
                <span className="text-xs text-emerald-400 group-hover:text-white font-bold mt-3">انتقل للأداة ←</span>
              </button>
            </div>
          </div>

        </div>

        {/* 15. Google AdSense Placement: Bottom of Page */}
        <AdSenseBanner slot="bottom-coverletter-footer" format="auto" />

      </div>

      {/* Clean Printable A4 Document for PDF Generation (Outside print:hidden) */}
      {(generatedLetter || editedLetter) && (
        <div 
          className="hidden print:block print-only-cover-letter bg-white text-slate-900 font-sans p-12 leading-relaxed text-sm"
          dir={formData.language === 'ar' ? 'rtl' : 'ltr'}
        >
          {(editedLetter || generatedLetter || '').split('\n\n').map((paragraph, pIdx) => (
            <p key={pIdx} className="mb-4 whitespace-pre-line text-justify">
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

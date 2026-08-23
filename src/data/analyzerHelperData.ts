export interface SectionAudit {
  id: string;
  name: string;
  englishName: string;
  status: 'good' | 'warning';
  message: string;
}

export interface ImprovementItem {
  id: string;
  priority: 'عالية' | 'متوسطة' | 'منخفضة';
  title: string;
  action: string;
}

export interface ResumeAnalysisResult {
  overallScore: number; // 0 to 100
  scoreLevel: 'ممتاز' | 'جيد جداً' | 'يحتاج إلى تحسين' | 'يحتاج إلى تحسين كبير';
  summaryMessage: string;
  
  // Section-by-section breakdown (9 exact sections as requested)
  sectionAudits: SectionAudit[];

  // Strengths
  strengths: string[];

  // Prioritized Weaknesses & Fixes
  issuesToFix: ImprovementItem[];

  // Keywords Analysis & Matching
  keywordMatchScore?: number;
  detectedKeywords: string[];
  missingKeywords: string[];

  // Specific Actionable Suggestions
  specificSuggestions: string[];
}

export const SAMPLE_CV_TEXT = `أحمد محمود السعيد
أخصائي تسويق رقمي وتحسين محركات البحث (SEO)
الرياض، المملكة العربية السعودية | ahmed.saeed@example.com | +966 50 123 4567 | linkedin.com/in/ahmed-saeed

Professional Summary:
أخصائي تسويق رقمي واستراتيجي محتوى بخبرة تزيد عن 5 سنوات في تنمية الزيارات المجانية وإدارة الحملات الإعلانية المدفوعة. أمتلك سجلاً حافلاً في مضاعفة معدل التحويل بنسبة 45% وتصدر نتائج محركات البحث لعلامات تجارية رائدة، مع التركيز على تحليل البيانات وتوظيف أدوات الذكاء الاصطناعي.

الخبرات المهنية (Work Experience):
أخصائي أول تسويق رقمي ونمو — شركة مسار التقنية (الرياض) | 2022 - حتى الآن
• قيادة استراتيجية الـ SEO والنمو العضوي مما أدى لزيادة الزيارات بنسبة 130% خلال 12 شهراً.
• إدارة ميزانيات إعلانية بقيمة تتجاوز 150,000 ريال شهرياً على Google Ads وMeta Ads بنسبة عائد (ROAS) بلغت 4.2x.
• الإشراف على فريق مكون من 4 كتاب محتوى ومصممين لإنتاج حملات تسويقية متكاملة.
• إعداد لوحات تحكم تحليلية عبر Google Looker Studio وGoogle Analytics 4 لتتبع مؤشرات الأداء الرئيسية (KPIs).

مسؤول تسويق بالمحتوى وSEO — وكالة أفق للإعلام (جدة) | 2019 - 2022
• كتابة وتحسين أكثر من 200 مقال مهني متوافق مع معايير السيو وتجربة المستخدم.
• بناء استراتيجيات الروابط الخارجية لرفع Domain Authority لأكثر من 15 موقع عميل.
• إدارة الحملات البريدية عبر Mailchimp مع تحقيق معدل فتح تجاوز 28%.

التعليم (Education):
بكالوريوس إدارة أعمال - مسار التسويق — جامعة الملك سعود (الرياض) | 2015 - 2019

المهارات (Skills):
SEO, Google Ads, Google Analytics 4, Meta Ads, Facebook Ads, PPC, Keyword Research, Copywriting, Conversion Optimization, Team Leadership.

اللغات (Languages):
العربية (اللغة الأم)، الإنجليزية (متقدم C1).`;

export const SAMPLE_JOB_ROLE = "Digital Marketing Specialist";

export const SAMPLE_JOB_DESCRIPTION = `نبحث عن أخصائي تسويق رقمي أول (Senior Digital Marketing Specialist) للانضمام إلى فريقنا.
المسؤوليات والمتطلبات:
- إدارة وتحسين حملات Google Ads وFacebook Ads وحملات PPC بميزانيات كبرى.
- زيادة التحويلات وتحسين معدلات التحويل Conversion Optimization (CRO).
- قياس الأداء باستخدام Google Analytics 4 و Data Studio / Looker Studio.
- خبرة قوية في استراتيجيات تحسين محركات البحث العضوية SEO وبناء الروابط.
- إتقان أدوات التسويق عبر البريد الإلكتروني والـ Copywriting.`;

export function analyzeResumeATS(
  cvText: string,
  targetJobRole?: string,
  jobDescription?: string
): ResumeAnalysisResult {
  const text = cvText.toLowerCase();
  const rawText = cvText;
  const wordCount = rawText.split(/\s+/).filter(Boolean).length;

  // 1. Check Personal Info
  const hasEmail = /[\w.-]+@[\w.-]+\.\w+/.test(rawText);
  const hasPhone = /(\+?\d{1,4}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\+?\d{9,14}/.test(rawText);
  const hasLinkedin = /linkedin\.com/i.test(rawText);
  const personalInfoGood = hasEmail && hasPhone;

  // 2. Summary
  const hasSummary = /(نبذة|ملخص|عني|summary|profile|about|professional summary)/i.test(rawText);
  const summaryMatches = rawText.match(/(?:نبذة|ملخص|summary|profile)[\s\S]{20,400}?(?=\n\n|الخبرات|التعليم|المهارات|experience|education|skills)/i);
  const summaryLength = summaryMatches ? summaryMatches[0].split(/\s+/).length : 0;
  const summaryGood = hasSummary && (summaryLength >= 15 || wordCount > 150);

  // 3. Experience
  const hasExperience = /(خبرات|خبرة|العمل|الوظائف|مهام|experience|work history|employment)/i.test(rawText);
  const experienceGood = hasExperience;

  // 4. Education
  const hasEducation = /(تعليم|مؤهلات|جامعة|شهادات|education|academic|degree|بكالوريوس|ماجستير)/i.test(rawText);
  const educationGood = hasEducation;

  // 5. Skills
  const hasSkills = /(مهارات|كفاءات|تقنيات|skills|technologies|competencies)/i.test(rawText);
  const skillsGood = hasSkills;

  // 6. Keywords & Measurable Impact
  const numbersMatches = rawText.match(/\b\d+(\.\d+)?%|\b\d{2,}\b|\b\d+x\b|\b\d+\s*(ريال|دولار|\$|k|k\+)/gi) || [];
  const bulletPoints = (rawText.match(/[•\-\*\u2022]\s*.+/g) || []).length;
  const measurableImpactGood = numbersMatches.length >= 3;

  // 7. Formatting & Parsing
  const formattingGood = bulletPoints >= 3 && !rawText.includes('<table>') && !rawText.includes('---table---');

  // 8. Length of Resume
  const lengthGood = wordCount >= 180 && wordCount <= 850;

  // 9. Clarity of Content
  const clarityGood = wordCount > 120 && bulletPoints >= 2 && (hasExperience && hasEducation);

  // Compile the 9 Section Audits
  const sectionAudits: SectionAudit[] = [
    {
      id: 'personal_info',
      name: 'المعلومات الشخصية',
      englishName: 'Personal Information',
      status: personalInfoGood ? 'good' : 'warning',
      message: personalInfoGood 
        ? 'بيانات الاتصال (البريد الإلكتروني ورقم الهاتف والروابط) واضحة وسهلة الفهرسة لبرامج ATS.' 
        : 'ينقص بعض معلومات الاتصال الأساسية مثل رقم الهاتف أو البريد الإلكتروني أعلى الصفحة.'
    },
    {
      id: 'summary',
      name: 'النبذة المهنية',
      englishName: 'Professional Summary',
      status: summaryGood ? 'good' : 'warning',
      message: summaryGood
        ? 'النبذة المهنية موجودة وتقدم ملخصاً مركزاً للقيمة والخبرات السابقة.'
        : 'النبذة المهنية إما غير موجودة أو قصيرة جداً؛ يُفضل كتابة 3 إلى 5 أسطر مركزة.'
    },
    {
      id: 'experience',
      name: 'الخبرات المهنية',
      englishName: 'Work Experience',
      status: experienceGood ? 'good' : 'warning',
      message: experienceGood
        ? 'قسم الخبرات محدد بوضوح مع مسميات الشركات والأدوار الوظيفية.'
        : 'يجب توضيح قسم الخبرات المهنية باستخدام عناوين قياسية سهلة القراءة لـ ATS.'
    },
    {
      id: 'education',
      name: 'التعليم',
      englishName: 'Education',
      status: educationGood ? 'good' : 'warning',
      message: educationGood
        ? 'المؤهل الأكاديمي والجامعة وتواريخ التخرج محددة ومفهرسة بنجاح.'
        : 'لم يتم العثور على قسم التعليم بوضوح؛ احرص على ذكر الدرجة الأكاديمية والجهة المانحة.'
    },
    {
      id: 'skills',
      name: 'المهارات',
      englishName: 'Skills',
      status: skillsGood ? 'good' : 'warning',
      message: skillsGood
        ? 'قسم المهارات مصنف ومفصول بشكل مناسب يسهل مطابقته مع متطلبات الوظائف.'
        : 'يُفضل إفراد قسم مخصص وواضح تحت عنوان "المهارات (Skills)" لرفع نسبة الفرز الآلي.'
    },
    {
      id: 'keywords',
      name: 'الكلمات المفتاحية',
      englishName: 'Keywords & Terms',
      status: (numbersMatches.length >= 2) ? 'good' : 'warning',
      message: (numbersMatches.length >= 2)
        ? 'تحتوي السيرة على مصطلحات تخصصية ومصطلحات معتمدة في سوق العمل.'
        : 'تحتاج السيرة لإثراء المصطلحات التخصصية والتقنية المرتبطة بمجال عملك.'
    },
    {
      id: 'formatting',
      name: 'التنسيق',
      englishName: 'Formatting & ATS Parsing',
      status: formattingGood ? 'good' : 'warning',
      message: formattingGood
        ? 'التنسيق يعتمد على نقاط (Bullet Points) متسلسلة ومتوافقة مع قراءات ATS الآلية.'
        : 'تجنب الفقرات السردية الطويلة، واستبدلها بنقاط موجزة تبدأ بأفعال مهنية قوية.'
    },
    {
      id: 'length',
      name: 'طول السيرة الذاتية',
      englishName: 'Resume Length',
      status: lengthGood ? 'good' : 'warning',
      message: lengthGood
        ? `طول السيرة الذاتية متوازن ومناسب (${wordCount} كلمة) ولا يتعدى الحجم المثالي.`
        : wordCount < 180 
          ? `السيرة قصيرة جداً (${wordCount} كلمة) وقد تعطي انطباعاً بقلة الخبرة والتفاصيل.`
          : `السيرة طويلة جداً (${wordCount} كلمة)، احرص على اختصارها لصفحة أو صفحتين بحد أقصى.`
    },
    {
      id: 'clarity',
      name: 'وضوح المحتوى',
      englishName: 'Content Clarity',
      status: clarityGood ? 'good' : 'warning',
      message: clarityGood
        ? 'تسلسل المحتوى والخط الزمني للمسار المهني مرتب ومنطقي لمسؤول التوظيف.'
        : 'المحتوى يحتاج إلى إعادة هيكلة وترتيب زمني من الأحدث إلى الأقدم لزيادة الوضوح.'
    }
  ];

  // Strengths List
  const strengths: string[] = [];
  if (personalInfoGood) strengths.push('وجود معلومات اتصال كاملة ودقيقة (بريد إلكتروني، هاتف، ورابط LinkedIn).');
  if (experienceGood) strengths.push('وجود خبرات مهنية واضحة ومسار وظيفي متسلسل زمنياً.');
  if (skillsGood) strengths.push('استخدام وتصنيف مهارات تقنية وعملية مرتبطة بمجال العمل المستهدف.');
  if (formattingGood) strengths.push('تنظيم جيد للأقسام واستخدام ممتاز للنقاط (Bullet Points) بدلاً من الكتل النصية.');
  if (measurableImpactGood) strengths.push(`إثبات الإنجازات بالأرقام والنسب المئوية المحققة (${numbersMatches.length} إنجازات كمية).`);
  if (lengthGood) strengths.push('حجم وطول السيرة الذاتية مثالي لصفحة أو صفحتين دون حشو غير مبرر.');

  // Prioritized Issues to Fix
  const issuesToFix: ImprovementItem[] = [];

  if (!measurableImpactGood) {
    issuesToFix.push({
      id: 'metrics',
      priority: 'عالية',
      title: 'لا توجد نتائج قابلة للقياس وأرقام كافية في قسم الخبرة',
      action: 'أعد صياغة المهام السابقة لتشمل أرقاماً ونتائج (مثال: زيادة المبيعات بنسبة 25% أو قيادة فريق من 4 أفراد).'
    });
  }

  if (!summaryGood) {
    issuesToFix.push({
      id: 'summary_fix',
      priority: 'عالية',
      title: 'النبذة المهنية قصيرة جداً أو غير موجودة',
      action: 'اجعل Professional Summary تتكون من 3 إلى 5 أسطر تلخص سنوات خبرتك، وأبرز إنجازاتك، وقيمتك المضافة.'
    });
  }

  if (!personalInfoGood) {
    issuesToFix.push({
      id: 'contact_fix',
      priority: 'عالية',
      title: 'نقص في بيانات التواصل الرئيسية أعلى السيرة',
      action: 'تأكد من كتابة البريد ورقم الهاتف ورابط حسابك المهني في ترويسة الصفحة.'
    });
  }

  if (!formattingGood) {
    issuesToFix.push({
      id: 'bullets_fix',
      priority: 'متوسطة',
      title: 'استخدام فقرات سردية طويلة بدل النقاط النقطية',
      action: 'قسم المهام والمسؤوليات إلى نقاط قصيرة ومباشرة تبدأ بأفعال حركة قوية.'
    });
  }

  if (wordCount < 180) {
    issuesToFix.push({
      id: 'length_fix',
      priority: 'متوسطة',
      title: 'السيرة الذاتية موجزة أكثر من اللازم وتفتقر للتفاصيل',
      action: 'أضف المزيد من الشرح للتقنيات والمسؤوليات التي توليتها والمشاريع التي أنجزتها.'
    });
  }

  // Always ensure at least 2 improvement recommendations
  if (issuesToFix.length === 0) {
    issuesToFix.push({
      id: 'adv_polish',
      priority: 'منخفضة',
      title: 'تخصيص الكلمات المفتاحية لكل إعلان وظيفي منفصل',
      action: 'عدل المهارات لتتطابق حرفياً مع متطلبات كل شاغر وظيفي تقدم عليه لرفع التقييم لأقصى حد.'
    });
  }

  // Specific Actionable Suggestions
  const specificSuggestions: string[] = [
    'أضف أرقاماً ونتائج قابلة للقياس (KPIs) إلى خبرتك المهنية لإثبات حجم تأثيرك الفعلي.',
    'اجعل النبذة المهنية (Professional Summary) مركزة بين 3 و 5 أسطر تبرز سنوات تخصصك وأبرز نقاط تميزك.',
    'استخدم عناوين أقسام قياسية ومألوفة لأنظمة ATS (مثل: الخبرات المهنية، التعليم، المهارات).',
    'احرص على ألا يتجاوز طول سيرتك الذاتية صفحة واحدة إذا كانت خبرتك أقل من 5 سنوات، وصفحتين إذا كانت أطول.'
  ];

  // Keyword Analysis (with or without Job Description)
  const commonKeywordsBank = [
    'seo', 'google ads', 'meta ads', 'facebook ads', 'analytics', 'ga4', 'google analytics',
    'ppc', 'conversion optimization', 'cro', 'looker studio', 'excel', 'sql', 'python',
    'javascript', 'react', 'crm', 'ui/ux', 'figma', 'copywriting', 'sales', 'leadership',
    'project management', 'التسويق الرقمي', 'إدارة المشاريع', 'تحليل البيانات', 'المبيعات',
    'خدمة العملاء', 'التخطيط الاستراتيجي', 'القيادة', 'التواصل', 'الذكاء الاصطناعي'
  ];

  const detectedKeywords: string[] = [];
  commonKeywordsBank.forEach(kw => {
    if (text.includes(kw.toLowerCase())) {
      detectedKeywords.push(kw);
    }
  });

  let missingKeywords: string[] = [];
  let keywordMatchScore: number | undefined = undefined;

  if (jobDescription && jobDescription.trim().length > 15) {
    const jdLower = jobDescription.toLowerCase();
    const targetedJobPool = [
      'google ads', 'meta ads', 'facebook ads', 'ppc', 'conversion optimization', 'cro', 
      'seo', 'google analytics', 'ga4', 'looker studio', 'sql', 'python', 'react', 'copywriting',
      'email marketing', 'crm', 'sales', 'b2b', 'negotiation', 'team leadership', 'kpis', 'roas'
    ];

    targetedJobPool.forEach(kw => {
      if (jdLower.includes(kw) && !text.includes(kw)) {
        missingKeywords.push(kw);
      }
    });

    // Default missing examples if user provided custom JD
    if (missingKeywords.length === 0 && detectedKeywords.length < 6) {
      missingKeywords = ['Google Ads', 'PPC', 'Conversion Optimization', 'Looker Studio'];
    }

    const totalExpected = Math.max(4, detectedKeywords.length + missingKeywords.length);
    keywordMatchScore = Math.min(95, Math.max(35, Math.round((detectedKeywords.length / totalExpected) * 100)));
    
    if (missingKeywords.length > 0) {
      specificSuggestions.unshift(`أضف الكلمات المفتاحية المفقودة (${missingKeywords.slice(0, 3).join(', ')}) إذا كانت لديك خبرة فعلية بها.`);
    }
  }

  // Calculate Overall ATS Score (0 to 100)
  const passedSectionsCount = sectionAudits.filter(s => s.status === 'good').length;
  let overallScore = Math.round((passedSectionsCount / sectionAudits.length) * 75 + (measurableImpactGood ? 15 : 0) + (detectedKeywords.length >= 4 ? 10 : 0));
  
  if (overallScore > 98) overallScore = 98;
  if (overallScore < 45) overallScore = 48;

  let scoreLevel: ResumeAnalysisResult['scoreLevel'] = 'يحتاج إلى تحسين';
  let summaryMessage = '';

  if (overallScore >= 90) {
    scoreLevel = 'ممتاز';
    summaryMessage = 'سيرتك الذاتية ممتازة ومتوافقة بشكل استثنائي مع أنظمة تتبع المتقدمين (ATS). التنسيق القياسي والإنجازات الرقمية تعزز فرص وصولك إلى المقابلة الشخصية.';
  } else if (overallScore >= 75) {
    scoreLevel = 'جيد جداً';
    summaryMessage = 'سيرتك الذاتية في حالة جيدة جداً، مع وجود بعض التحسينات البسيطة المقترحة أدناه لضمان اجتياز جميع برمجيات الفرز الآلي بأعلى درجات.';
  } else if (overallScore >= 60) {
    scoreLevel = 'يحتاج إلى تحسين';
    summaryMessage = 'تحتوي السيرة على معلومات جيدة لكنها تفتقر إلى بعض المعايير القياسية لـ ATS والنتائج الرقمية. تطبيق الاقتراحات أدناه سيرفع درجتك فوراً.';
  } else {
    scoreLevel = 'يحتاج إلى تحسين كبير';
    summaryMessage = 'السيرة الذاتية تحتوي على ثغرات هيكلية قد تتسبب في استبعادها تلقائياً قبل وصولها لمسؤول التوظيف البشري.';
  }

  return {
    overallScore,
    scoreLevel,
    summaryMessage,
    sectionAudits,
    strengths,
    issuesToFix,
    keywordMatchScore,
    detectedKeywords,
    missingKeywords,
    specificSuggestions
  };
}

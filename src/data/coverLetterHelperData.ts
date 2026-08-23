export type CoverLetterTone = 'professional' | 'concise' | 'friendly' | 'formal';
export type CoverLetterLength = 'short' | 'medium' | 'detailed';
export type CoverLetterLanguage = 'ar' | 'en' | 'fr' | 'es' | 'de';

export interface CoverLetterFormData {
  fullName: string;
  currentTitle: string;
  yearsOfExperience: string;
  skills: string;
  achievements: string;
  targetJobTitle: string;
  companyName: string;
  hiringManager?: string;
  companyLocation?: string;
  jobDescription?: string;
  tone: CoverLetterTone;
  length: CoverLetterLength;
  language: CoverLetterLanguage;
}

export interface CoverLetterScoreBreakdown {
  overallScore: number; // 0 - 100
  customizationScore: number; // 0 - 20
  clarityScore: number; // 0 - 20
  lengthScore: number; // 0 - 20
  toneScore: number; // 0 - 20
  vocabularyScore: number; // 0 - 20
  grade: 'ممتاز' | 'جيد جداً' | 'جيد' | 'يحتاج تحسين';
  summaryFeedback: string;
}

export interface ExtractedJobKeyword {
  keyword: string;
  isUsedInLetter: boolean;
}

export const SAMPLE_COVER_LETTER_INPUT: CoverLetterFormData = {
  fullName: 'سارة خالد المنصور',
  currentTitle: 'أخصائية تسويق رقمي وإدارة حملات',
  yearsOfExperience: '4 سنوات',
  skills: 'Google Ads, Meta Ads, SEO, Google Analytics 4, Content Strategy, Copywriting',
  achievements: 'زيادة العائد على الإنفاق الإعلاني (ROAS) بنسبة 35%، وإدارة ميزانيات تفوق 200,000 ريال شهرياً، ورفع الزيارات العضوية بنسبة 80%',
  targetJobTitle: 'Senior Digital Marketing Specialist',
  companyName: 'شركة تقنية المستقبل',
  hiringManager: 'أحمد السعدي (مدير استقطاب الكفاءات)',
  companyLocation: 'الرياض، المملكة العربية السعودية',
  jobDescription: 'مطلوب أخصائي تسويق رقمي أول (Senior Digital Marketing Specialist) لقيادة الحملات الإعلانية المدفوعة وإدارة استراتيجيات الـ SEO وتحليل البيانات عبر GA4 و Google Ads لمضاعفة المبيعات والنمو.',
  tone: 'professional',
  length: 'medium',
  language: 'ar'
};

export function generateCoverLetter(data: CoverLetterFormData, modifier?: 'shorter' | 'more_professional' | 'more_persuasive'): string {
  let {
    fullName,
    currentTitle,
    yearsOfExperience,
    skills,
    achievements,
    targetJobTitle,
    companyName,
    hiringManager,
    companyLocation,
    jobDescription,
    tone,
    length,
    language
  } = data;

  if (modifier === 'shorter') {
    length = 'short';
  } else if (modifier === 'more_professional') {
    tone = 'formal';
  }

  const dateStr = new Date().toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const managerSalutation = hiringManager?.trim() 
    ? (language === 'ar' ? `السيد/ة المحترم/ة ${hiringManager}،` :
       language === 'fr' ? `Cher/Chère ${hiringManager},` :
       language === 'es' ? `Estimado/a ${hiringManager},` :
       language === 'de' ? `Sehr geehrte/r Frau/Herr ${hiringManager},` :
       `Dear ${hiringManager},`)
    : (language === 'ar' ? `إلى فريق التوظيف وإدارة الموارد البشرية في ${companyName || 'الشركة الموقرة'}،` :
       language === 'fr' ? `À l'attention de l'équipe de recrutement chez ${companyName || 'votre entreprise'},` :
       language === 'es' ? `Estimado equipo de selección de ${companyName || 'la empresa'},` :
       language === 'de' ? `Sehr geehrtes Recruiting-Team von ${companyName || 'Ihrem Unternehmen'},` :
       `Dear Hiring Team at ${companyName || 'the company'},`);

  // ARABIC GENERATION
  if (language === 'ar') {
    let intro = '';
    if (modifier === 'more_persuasive') {
      intro = `يسرني وبكل ثقة أن أتقدم لشغل دور "${targetJobTitle}" لدى "${companyName}". إن سجلي الحافل في تحويل الأهداف التسويقية إلى نتائج مالية واستراتيجية ملموسة كـ "${currentTitle || 'متخصص'}"، يجعلني قادراً على قيادة مسار النمو لديكم وتحقيق عائد استثماري استثنائي لفريقكم.`;
    } else if (tone === 'formal') {
      intro = `يطيب لي أن أتقدم إليكم بطلب الالتحاق لشغل وظيفة "${targetJobTitle}" لدى "${companyName}". بعد الاطلاع الدقيق على متطلبات الوظيفة وأهداف الشركة الطموحة، يسعدني أن أضع خبرتي العملية ومؤهلاتي في خدمتكم لتحقيق المزيد من النجاحات والنمو المؤسسي.`;
    } else if (tone === 'concise' || modifier === 'shorter') {
      intro = `أكتب إليكم لإبداء اهتمامي المباشر بالانضمام إلى "${companyName}" في منصب "${targetJobTitle}". بخبرة تزيد عن ${yearsOfExperience || 'عدة سنوات'} في مجال ${currentTitle || 'تخصصي'}، أثق في قدرتي على إحداث إضافة ملموسة لفريقكم منذ اليوم الأول.`;
    } else if (tone === 'friendly') {
      intro = `يسعدني جداً التقدم لفرصة العمل كـ "${targetJobTitle}" في "${companyName}". لطالما تابعت إنجازات شركتكم وسمعتها الرائدة في السوق، ويسرني مشاركة شغفي وخبرتي المكتسبة كـ "${currentTitle}" للمساهمة في تحقيق أهداف الفريق.`;
    } else {
      intro = `يسرني التقدم بطلب الانضمام إلى فريق عمل "${companyName}" المتميز لشغل وظيفة "${targetJobTitle}". انطلاقاً من مسيرتي المهنية كـ "${currentTitle || 'متخصص'}" وخبرتي الممتدة لـ ${yearsOfExperience || 'عدة سنوات'}، أجد في هذه الفرصة التوافق المثالي مع أهدافي وإمكانياتي لتقديم قيمة مضافة فورية.`;
    }

    let body = '';
    if (modifier === 'more_persuasive') {
      body = `خلال مسيرتي، أثبتت كفاءة استثنائية في (${skills || 'التخصص المهني'}) عبر دمج التفكير التحليلي بالسرعة في التنفيذ، ونجحت في تحقيق إنجازات فارقة أبرزها:\n• ${achievements || 'تحقيق نمو قياسي في مؤشرات الأداء بنسب فاقت التوقعات'}.\n• ابتكار حلول عملية لتقليل التكاليف التشغيلية وتعظيم العائد التنافسي.\n\nإن شغفي بتحقيق الريادة وتجاوز المستهدفات هو الدافع الرئيسي لانضمامي لـ "${companyName}"، حيث أطمح لمضاعفة هذه النجاحات مع فريقكم الملهم.`;
    } else if (length === 'short' || modifier === 'shorter') {
      body = `خلال مسيرتي، طوّرت مهارات متقدمة في (${skills || 'المجال المهني'})، وأثمرت عن تحقيق إنجازات رئيسية من أبرزها: ${achievements || 'تحسين مؤشرات الأداء ورفع كفاءة العمليات'}. وأتطلع لتوظيف هذه الكفاءات لمواكبة متطلبات دور "${targetJobTitle}".`;
    } else if (length === 'detailed') {
      body = `خلال سنوات عملي كـ ${currentTitle}، ركزت باستمرار على الجمع بين الرؤية الاستراتيجية والتنفيذ الدقيق. وقد مكنني ذلك من إتقان أدوات وتقنيات أساسية تشمل: (${skills}).\n\nمن أبرز المحطات في مسيرتي:\n• ${achievements || 'تحقيق نتائج كمية ملموسة تجاوزت الأهداف المحددة'}.\n• التعاون الفعال مع فرق العمل متعددة التخصصات وقيادة المبادرات لتحقيق أعلى معايير الجودة.\n• التكيف السريع مع متطلبات السوق وحل المشكلات المعقدة بكفاءة عالية.\n\nإن ما جذبني للعمل لدى "${companyName}" هو التزامكم بالتميز والابتكار، وهو ما يتطابق تماماً مع منهجي المهني في تحقيق نتائج استثنائية قابلة للقياس.`;
    } else {
      body = `خلال مسيرتي المهنية الممتدة لـ ${yearsOfExperience || 'سنوات متتالية'}، اكتسبت مهارات عملية متخصصة في (${skills || 'المجال'})، ونجحت في تحويل التحديات إلى فرص نجاح حقيقية. من أهم إنجازاتي: ${achievements || 'تحقيق نمو ملموس في مؤشرات الأداء وقيادة مشاريع ناجحة'}.\n\nإنني على ثقة بأن دمج هذه الخبرات مع بيئة العمل المحفزة في "${companyName}" سيمكنني من مواكبة وتجاوز تطلعاتكم لشغل دور "${targetJobTitle}".`;
    }

    let conclusion = '';
    if (modifier === 'more_persuasive') {
      conclusion = `أرحب بشدة بفرصة اللقاء في مقابلة شخصية لمناقشة خطة العمل المباشرة التي أعتزم تطبيقها للمساهمة في تعزيز نجاحات "${companyName}". شكراً جزيلاً على وقتكم واهتمامكم.\n\nوتفضلوا بقبول وافر التقدير والامتنان،`;
    } else if (tone === 'formal') {
      conclusion = `شاكراً لكم حسن وقتكم واهتمامكم بالاطلاع على ملفي، وأتطلع لفرصة إجراء مقابلة شخصية لمناقشة كيفية توظيف خبراتي لخدمة أهداف "${companyName}".\n\nوتفضلوا بقبول فائق الاحترام والتقدير،`;
    } else if (tone === 'concise' || modifier === 'shorter') {
      conclusion = `أشكركم على وقتكم، ومرفق سيرتي الذاتية للاطلاع. يسعدني تحديد موعد للمقابلة في الوقت الذي يناسبكم.\n\nمع أطيب التحيات،`;
    } else if (tone === 'friendly') {
      conclusion = `متحمس جداً لمناقشة هذا الدور ومشاركة المزيد حول كيف يمكننا تحقيق نجاحات مشتركة. شكراً جزيلاً على وقتكم وفرصتكم الكريمة!\n\nتحياتي الحارة،`;
    } else {
      conclusion = `أشكركم على وقتكم واهتمامكم بمراجعة طلبي، وأتطلع باهتمام لمقابلتكم لمناقشة كيف يمكن لخبراتي ومهاراتي أن تساهم بفاعلية في نجاح فريق "${companyName}".\n\nمع خالص التحية والتقدير،`;
    }

    return `${fullName || 'الاسم الكريم'}
${currentTitle || 'المسمى المهني'}
${companyLocation || 'الموقع'}
${dateStr}

${managerSalutation}

${intro}

${body}

${conclusion}

${fullName || 'المتقدم'}`;
  }

  // ENGLISH GENERATION
  if (language === 'en') {
    let intro = '';
    if (modifier === 'more_persuasive') {
      intro = `I am writing with great excitement and confidence to apply for the ${targetJobTitle} position at ${companyName}. With a proven track record of driving measurable business impact as a ${currentTitle}, I am poised to step into this role and deliver immediate strategic value to your organization.`;
    } else if (tone === 'formal') {
      intro = `I am writing to formally submit my application for the position of ${targetJobTitle} at ${companyName}. Having reviewed the qualifications and organizational objectives of your esteemed company, I am confident that my background as a ${currentTitle} makes me a strong fit for your team.`;
    } else if (tone === 'concise' || modifier === 'shorter') {
      intro = `I am writing to express my strong interest in the ${targetJobTitle} position at ${companyName}. With over ${yearsOfExperience || 'several years'} of experience as a ${currentTitle}, I am eager to deliver immediate impact to your team.`;
    } else if (tone === 'friendly') {
      intro = `I was thrilled to see the opening for ${targetJobTitle} at ${companyName}! Having followed your team's inspiring work and innovation, I would love the opportunity to bring my experience as a ${currentTitle} to your talented team.`;
    } else {
      intro = `I am excited to apply for the ${targetJobTitle} role at ${companyName}. With ${yearsOfExperience || 'extensive experience'} in the industry and a proven track record as a ${currentTitle}, I am confident in my ability to contribute meaningfully to your team's ongoing success.`;
    }

    let body = '';
    if (modifier === 'more_persuasive') {
      body = `Throughout my career, I have consistently combined analytical precision with high-velocity execution. My core competencies in ${skills || 'our industry'} have directly enabled significant milestones, including:\n• ${achievements || 'Exceeding target KPIs and driving sustained ROI growth'}.\n• Spearheading high-performance initiatives that elevated company-wide benchmarks.\n\nI am drawn to ${companyName} because of your relentless commitment to industry leadership, and I am prepared to bring this same energy and standard of excellence to your team.`;
    } else if (length === 'short' || modifier === 'shorter') {
      body = `Throughout my career, I have honed core expertise in ${skills || 'key industry competencies'}, resulting in significant outcomes such as: ${achievements || 'driving measurable operational growth and exceeding KPIs'}. I look forward to bringing this dedication to ${companyName}.`;
    } else if (length === 'detailed') {
      body = `Throughout my career as a ${currentTitle}, I have specialized in turning ambitious goals into measurable results. My core skill set includes: ${skills}.\n\nKey accomplishments from my professional track record include:\n• ${achievements || 'Consistently exceeding performance metrics and delivering high-value projects'}.\n• Collaborating cross-functionally and driving operational excellence.\n• Rapidly adapting to emerging market demands and solving complex problems.\n\nI am particularly drawn to ${companyName} because of your commitment to excellence and high-impact solutions, which aligns closely with my own professional values.`;
    } else {
      body = `In my ${yearsOfExperience || 'previous roles'} as a ${currentTitle}, I have developed deep expertise in ${skills || 'our domain'}. One of my proudest achievements includes ${achievements || 'achieving significant growth and optimizing core workflows'}.\n\nI am confident that combining my hands-on background with ${companyName}'s forward-thinking environment will enable me to hit the ground running as your next ${targetJobTitle}.`;
    }

    let conclusion = '';
    if (modifier === 'more_persuasive') {
      conclusion = `I would welcome the opportunity to discuss in an interview how my actionable skillset can help accelerate ${companyName}'s goals this quarter. Thank you for your time and consideration.\n\nSincerely,`;
    } else if (tone === 'formal') {
      conclusion = `Thank you for your time and consideration of my application. I welcome the opportunity to discuss my qualifications in an interview.\n\nSincerely,`;
    } else if (tone === 'concise' || modifier === 'shorter') {
      conclusion = `Thank you for reviewing my application. I look forward to speaking with you soon.\n\nBest regards,`;
    } else if (tone === 'friendly') {
      conclusion = `I would love the chance to chat more about how I can help ${companyName} reach its upcoming goals. Thank you for your time!\n\nWarm regards,`;
    } else {
      conclusion = `Thank you for your time and consideration. I look forward to the opportunity to discuss how my skill set and passion can support the growth of ${companyName}.\n\nBest regards,`;
    }

    return `${fullName || 'Applicant Name'}
${currentTitle || 'Professional Title'}
${companyLocation || 'Location'}
${dateStr}

${managerSalutation}

${intro}

${body}

${conclusion}

${fullName || 'Candidate'}`;
  }

  // FRENCH GENERATION
  if (language === 'fr') {
    return `${fullName || 'Candidat'}
${currentTitle || 'Titre professionnel'}
${companyLocation || 'Localisation'}
${dateStr}

${managerSalutation}

Je vous adresse ma candidature pour le poste de "${targetJobTitle}" au sein de "${companyName}". Fort(e) d'une expérience de ${yearsOfExperience || 'plusieurs années'} en tant que ${currentTitle}, je souhaite mettre mes compétences à votre service.

Au cours de mon parcours, j'ai développé une solide expertise dans les domaines suivants : ${skills}. J'ai notamment réussi à : ${achievements || 'atteindre et dépasser les objectifs fixés avec rigueur'}.

Je serais ravi(e) d'échanger avec vous lors d'un entretien pour vous exposer plus en détail ma motivation.

Je vous prie d'agréer l'expression de mes salutations distinguées,

${fullName || 'Candidat'}`;
  }

  // SPANISH GENERATION
  if (language === 'es') {
    return `${fullName || 'Candidato'}
${currentTitle || 'Título profesional'}
${companyLocation || 'Ubicación'}
${dateStr}

${managerSalutation}

Le escribo con gran entusiasmo para presentar mi candidatura al puesto de "${targetJobTitle}" en "${companyName}". Con más de ${yearsOfExperience || 'varios años'} de experiencia como ${currentTitle}, confío en aportar un valor significativo a su equipo.

A lo largo de mi trayectoria he consolidado competencias clave en: ${skills}. Entre mis logros más destacados se encuentra: ${achievements || 'la optimización de procesos y el cumplimiento sistemático de objetivos'}.

Agradezco de antemano su tiempo y consideración, y quedo a su entera disposición para mantener una entrevista.

Atentamente,

${fullName || 'Candidato'}`;
  }

  // GERMAN GENERATION
  return `${fullName || 'Bewerber'}
${currentTitle || 'Berufsbezeichnung'}
${companyLocation || 'Standort'}
${dateStr}

${managerSalutation}

hiermit bewerbe ich mich mit großem Interesse um die Position als "${targetJobTitle}" bei "${companyName}". Mit mehr als ${yearsOfExperience || 'mehreren Jahren'} Berufserfahrung als ${currentTitle} möchte ich mein Fachwissen gewinnbringend in Ihr Team einbringen.

Meine Kernkompetenzen umfassen: ${skills}. Zu meinen bisherigen Erfolgen zählen: ${achievements || 'die erfolgreiche Umsetzung anspruchsvoller Projekte und die Steigerung von Leistungskennzahlen'}.

Über die Gelegenheit, mich Ihnen in einem persönlichen Gespräch vorzustellen, freue ich mich sehr.

Mit freundlichen Grüßen,

${fullName || 'Bewerber'}`;
}

// 10. Cover Letter Score Calculator (0 - 100)
export function calculateCoverLetterScore(formData: CoverLetterFormData, letterText: string): CoverLetterScoreBreakdown {
  const text = (letterText || '').toLowerCase();
  const wordCount = letterText.split(/\s+/).filter(Boolean).length;

  // 1. Customization Score (0-20)
  let customizationScore = 12;
  if (formData.companyName && text.includes(formData.companyName.toLowerCase())) customizationScore += 4;
  if (formData.targetJobTitle && text.includes(formData.targetJobTitle.toLowerCase())) customizationScore += 4;

  // 2. Clarity Score (0-20)
  let clarityScore = 15;
  if (text.includes('\n\n') || text.includes('•')) clarityScore += 5;

  // 3. Length Score (0-20)
  let lengthScore = 14;
  if (wordCount >= 120 && wordCount <= 450) {
    lengthScore = 20;
  } else if (wordCount > 450) {
    lengthScore = 16;
  } else {
    lengthScore = 12;
  }

  // 4. Tone Score (0-20)
  let toneScore = 18;
  if (formData.hiringManager?.trim()) toneScore = 20;

  // 5. Role-specific Vocabulary Score (0-20)
  let vocabularyScore = 14;
  if (formData.skills && formData.skills.trim().length > 5) vocabularyScore += 3;
  if (formData.achievements && formData.achievements.trim().length > 10) vocabularyScore += 3;

  const overallScore = Math.min(96, Math.max(50, customizationScore + clarityScore + lengthScore + toneScore + vocabularyScore));

  let grade: CoverLetterScoreBreakdown['grade'] = 'جيد جداً';
  let summaryFeedback = 'الرسالة متوازنة ومخصصة ومكتوبة بأسلوب احترافي يجذب مسؤولي التوظيف.';

  if (overallScore >= 90) {
    grade = 'ممتاز';
    summaryFeedback = 'رسالة تقديم استثنائية! الترابط ممتاز بين مهاراتك ومتطلبات الشركة مع تنسيق نظيف ومقنع.';
  } else if (overallScore >= 75) {
    grade = 'جيد جداً';
    summaryFeedback = 'خطاب قوي ومتماسك، يحمل صياغة مباشرة وتخصيصاً ممتازاً للوظيفة والشركة المستهدفة.';
  } else if (overallScore >= 60) {
    grade = 'جيد';
    summaryFeedback = 'الرسالة جيدة ولكن يمكنك رفع جودتها بإضافة أرقام ونتائج محددة في قسم الإنجازات.';
  } else {
    grade = 'يحتاج تحسين';
    summaryFeedback = 'ينصح بتضمين المزيد من المهارات والربط المباشر مع اسم الشركة لتفادي الظهور بمظهر الخطاب العام.';
  }

  return {
    overallScore,
    customizationScore,
    clarityScore,
    lengthScore,
    toneScore,
    vocabularyScore,
    grade,
    summaryFeedback
  };
}

// 11. Keyword Extractor from Job Description
export function extractJobKeywords(jobDescription: string, coverLetterText: string): ExtractedJobKeyword[] {
  if (!jobDescription || jobDescription.trim().length < 10) {
    return [];
  }

  const jdText = jobDescription.toLowerCase();
  const letterLower = coverLetterText.toLowerCase();

  const commonSkillDatabase = [
    'seo', 'google ads', 'meta ads', 'facebook ads', 'google analytics', 'ga4', 'looker studio',
    'ppc', 'conversion optimization', 'cro', 'copywriting', 'content strategy', 'email marketing',
    'sql', 'python', 'javascript', 'typescript', 'react', 'node.js', 'figma', 'ui/ux', 'crm',
    'sales', 'b2b', 'negotiation', 'project management', 'agile', 'scrum', 'leadership',
    'excel', 'powerbi', 'tableau', 'تحليل البيانات', 'إدارة المشاريع', 'التسويق الرقمي', 'المبيعات',
    'خدمة العملاء', 'التخطيط الاستراتيجي', 'صناعة المحتوى', 'التواصل الفعال', 'الذكاء الاصطناعي'
  ];

  const foundInJd: string[] = [];

  commonSkillDatabase.forEach(kw => {
    if (jdText.includes(kw.toLowerCase())) {
      foundInJd.push(kw);
    }
  });

  // Also extract english uppercase terms / acronyms (e.g. ROI, KPIs, CRM)
  const acronymMatches = jobDescription.match(/\b[A-Z]{2,6}\b/g) || [];
  acronymMatches.forEach(acr => {
    const acrLower = acr.toLowerCase();
    if (!foundInJd.includes(acrLower) && !['AND', 'THE', 'FOR', 'WITH', 'YOU'].includes(acr)) {
      foundInJd.push(acr);
    }
  });

  // If few detected, provide relevant fallbacks
  if (foundInJd.length === 0) {
    foundInJd.push('إدارة المشاريع', 'تحليل البيانات', 'التواصل الفعال', 'حل المشكلات');
  }

  const uniqueKeywords = Array.from(new Set(foundInJd)).slice(0, 10);

  return uniqueKeywords.map(kw => ({
    keyword: kw,
    isUsedInLetter: letterLower.includes(kw.toLowerCase())
  }));
}

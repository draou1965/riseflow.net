export type KeywordCategory = 
  | 'technical' 
  | 'soft' 
  | 'tools' 
  | 'certifications' 
  | 'responsibilities' 
  | 'experience' 
  | 'domain';

export type KeywordPriority = 'high' | 'medium' | 'extra';

export interface KeywordItem {
  id: string;
  name: string;
  category: KeywordCategory;
  priority: KeywordPriority;
  frequency: number;
  suggestedSection: 'skills' | 'experience' | 'summary' | 'education' | 'certifications';
  isMatchedInCv?: boolean;
}

export interface JobRequirementBreakdown {
  yearsOfExperience?: string;
  educationLevel?: string;
  certifications?: string[];
  requiredLanguages?: string[];
  tools?: string[];
  keySkills?: string[];
}

export interface AtsAnalysisResult {
  jobTitle: string;
  summary: {
    overview: string;
    whatCompanyLooksFor: string;
    corePriorities: string[];
  };
  topKeywords: KeywordItem[];
  categorizedKeywords: {
    technical: KeywordItem[];
    soft: KeywordItem[];
    tools: KeywordItem[];
    certifications: KeywordItem[];
    responsibilities: KeywordItem[];
    experience: KeywordItem[];
    domain: KeywordItem[];
  };
  requirements: JobRequirementBreakdown;
  cvComparison?: {
    matchScore: number;
    matchedKeywords: KeywordItem[];
    missingKeywords: KeywordItem[];
    improvementRecommendations: string[];
  };
}

export const SAMPLE_JOB_DESCRIPTION = `
Job Title: Senior Digital Marketing Specialist
Company: NextGen Tech Solutions
Location: Riyadh, Saudi Arabia

Job Overview:
We are looking for an ambitious and results-driven Senior Digital Marketing Specialist to lead our performance marketing, paid acquisition, and growth strategies. The ideal candidate will have strong experience in managing large-scale PPC and paid campaigns across Google Ads, Meta Ads (Facebook & Instagram), LinkedIn Ads, and TikTok.

Key Responsibilities:
- Design, manage, and optimize multi-channel performance campaigns (Google Ads, Meta Ads, Search Ads).
- Lead technical and on-page SEO strategies to maximize organic search visibility and website traffic.
- Analyze campaign data, user journeys, and funnel conversions using Google Analytics 4 (GA4), Looker Studio, and Google Tag Manager.
- Continuously execute A/B testing and Conversion Rate Optimization (CRO) to maximize ROAS and minimize CPA.
- Collaborate with content creators and designers to develop high-converting ad copy and landing page assets.
- Manage monthly ad budgets exceeding $50,000 with clear ROI tracking and executive reporting.

Requirements & Qualifications:
- Bachelor's degree in Marketing, Business, Computer Science, or related field.
- 4 to 6 years of proven experience in Digital Marketing, Growth Marketing, or Performance Advertising.
- Proven mastery in Google Ads, Meta Ads Manager, GA4, SEO Tools (SEMrush, Ahrefs), and HubSpot CRM.
- Strong analytical mindset with proficiency in Excel / Google Sheets and data visualization.
- Google Ads Certification or Meta Certified Media Buying Professional is a strong plus.
- Excellent communication skills in both Arabic and English.
- Strong problem-solving, project management, and cross-functional leadership capabilities.
`;

export const SAMPLE_CV_TEXT = `
Sarah Mansour - Digital Marketing Specialist
Summary:
Results-driven Digital Marketing Specialist with 4 years of experience specializing in SEO, content strategy, and social media campaigns. Proven track record of boosting organic website traffic by 80% and managing email marketing workflows.

Skills:
- Search Engine Optimization (SEO), SEMrush, Ahrefs, WordPress
- Google Analytics (GA4), Data Analysis, Excel
- Content Marketing, Copywriting, Social Media Marketing
- Project Management, Agile, Communication, Problem Solving

Experience:
Digital Marketing Specialist | Growth Media (2022 - Present)
- Spearheaded SEO roadmap, increasing organic leads by 65% year-over-year.
- Monitored user engagement and performance via Google Analytics 4.
- Coordinated cross-functional campaigns with creative designers.
`;

// Helper algorithm to extract and analyze ATS Keywords from Job Description
export function analyzeJobDescription(
  jobTitleInput: string,
  jobDescriptionText: string,
  cvText?: string
): AtsAnalysisResult {
  const jdLower = jobDescriptionText.toLowerCase();
  const cvLower = (cvText || '').toLowerCase();
  const hasCv = Boolean(cvText && cvText.trim().length > 30);

  // Dictionaries for domain, tools, tech, and soft skills
  const dictionary: Array<{
    name: string;
    category: KeywordCategory;
    suggestedSection: 'skills' | 'experience' | 'summary' | 'education' | 'certifications';
    weight: number;
  }> = [
    // Tools & Software
    { name: 'Google Ads', category: 'tools', suggestedSection: 'skills', weight: 3 },
    { name: 'Meta Ads', category: 'tools', suggestedSection: 'skills', weight: 3 },
    { name: 'Google Analytics 4', category: 'tools', suggestedSection: 'skills', weight: 3 },
    { name: 'GA4', category: 'tools', suggestedSection: 'skills', weight: 3 },
    { name: 'Looker Studio', category: 'tools', suggestedSection: 'skills', weight: 2 },
    { name: 'Google Tag Manager', category: 'tools', suggestedSection: 'skills', weight: 2 },
    { name: 'SEMrush', category: 'tools', suggestedSection: 'skills', weight: 2 },
    { name: 'Ahrefs', category: 'tools', suggestedSection: 'skills', weight: 2 },
    { name: 'HubSpot', category: 'tools', suggestedSection: 'skills', weight: 2 },
    { name: 'Salesforce', category: 'tools', suggestedSection: 'skills', weight: 2 },
    { name: 'Excel', category: 'tools', suggestedSection: 'skills', weight: 2 },
    { name: 'Figma', category: 'tools', suggestedSection: 'skills', weight: 2 },
    { name: 'PowerBI', category: 'tools', suggestedSection: 'skills', weight: 2 },
    { name: 'Tableau', category: 'tools', suggestedSection: 'skills', weight: 2 },
    { name: 'Jira', category: 'tools', suggestedSection: 'tools' as any, weight: 2 },
    { name: 'Python', category: 'tools', suggestedSection: 'skills', weight: 2 },
    { name: 'SQL', category: 'technical', suggestedSection: 'skills', weight: 2 },
    { name: 'WordPress', category: 'tools', suggestedSection: 'skills', weight: 1 },

    // Technical Skills
    { name: 'SEO', category: 'technical', suggestedSection: 'skills', weight: 3 },
    { name: 'PPC', category: 'technical', suggestedSection: 'skills', weight: 3 },
    { name: 'Performance Marketing', category: 'technical', suggestedSection: 'experience', weight: 3 },
    { name: 'Conversion Rate Optimization', category: 'technical', suggestedSection: 'experience', weight: 3 },
    { name: 'CRO', category: 'technical', suggestedSection: 'skills', weight: 2 },
    { name: 'A/B Testing', category: 'technical', suggestedSection: 'experience', weight: 2 },
    { name: 'Data Analysis', category: 'technical', suggestedSection: 'skills', weight: 2 },
    { name: 'Content Strategy', category: 'technical', suggestedSection: 'skills', weight: 2 },
    { name: 'Copywriting', category: 'technical', suggestedSection: 'skills', weight: 2 },
    { name: 'Paid Acquisition', category: 'technical', suggestedSection: 'experience', weight: 2 },
    { name: 'Search Engine Optimization', category: 'technical', suggestedSection: 'skills', weight: 2 },
    { name: 'تحليل البيانات', category: 'technical', suggestedSection: 'skills', weight: 2 },
    { name: 'التسويق الرقمي', category: 'technical', suggestedSection: 'skills', weight: 2 },
    { name: 'إدارة الحملات الإعلانية', category: 'technical', suggestedSection: 'experience', weight: 2 },
    { name: 'تحسين محركات البحث', category: 'technical', suggestedSection: 'skills', weight: 2 },

    // Soft Skills
    { name: 'Leadership', category: 'soft', suggestedSection: 'summary', weight: 2 },
    { name: 'Project Management', category: 'soft', suggestedSection: 'experience', weight: 2 },
    { name: 'Communication Skills', category: 'soft', suggestedSection: 'summary', weight: 2 },
    { name: 'Problem Solving', category: 'soft', suggestedSection: 'summary', weight: 2 },
    { name: 'Cross-functional Collaboration', category: 'soft', suggestedSection: 'experience', weight: 2 },
    { name: 'Strategic Thinking', category: 'soft', suggestedSection: 'summary', weight: 2 },
    { name: 'Time Management', category: 'soft', suggestedSection: 'summary', weight: 1 },
    { name: 'التواصل الفعال', category: 'soft', suggestedSection: 'summary', weight: 2 },
    { name: 'العمل الجماعي', category: 'soft', suggestedSection: 'summary', weight: 1 },
    { name: 'إدارة الوقت', category: 'soft', suggestedSection: 'summary', weight: 1 },
    { name: 'حل المشكلات', category: 'soft', suggestedSection: 'summary', weight: 2 },

    // Certifications
    { name: 'Google Ads Certification', category: 'certifications', suggestedSection: 'certifications', weight: 3 },
    { name: 'Meta Certified', category: 'certifications', suggestedSection: 'certifications', weight: 3 },
    { name: 'PMP', category: 'certifications', suggestedSection: 'certifications', weight: 3 },
    { name: 'HubSpot Inbound', category: 'certifications', suggestedSection: 'certifications', weight: 2 },
    { name: 'شهادة احترافية', category: 'certifications', suggestedSection: 'certifications', weight: 2 },

    // Domain & Business Keywords
    { name: 'ROAS', category: 'domain', suggestedSection: 'experience', weight: 3 },
    { name: 'ROI', category: 'domain', suggestedSection: 'experience', weight: 2 },
    { name: 'CPA', category: 'domain', suggestedSection: 'experience', weight: 2 },
    { name: 'CTR', category: 'domain', suggestedSection: 'experience', weight: 2 },
    { name: 'Budget Management', category: 'responsibilities', suggestedSection: 'experience', weight: 2 },
    { name: 'Funnel Optimization', category: 'domain', suggestedSection: 'experience', weight: 2 },
    { name: 'B2B', category: 'domain', suggestedSection: 'experience', weight: 2 },
    { name: 'B2C', category: 'domain', suggestedSection: 'experience', weight: 1 },
    { name: 'العائد على الاستثمار', category: 'domain', suggestedSection: 'experience', weight: 2 },
    { name: 'إدارة الميزانيات', category: 'responsibilities', suggestedSection: 'experience', weight: 2 },

    // Responsibilities & Experience Keywords
    { name: 'Campaign Optimization', category: 'responsibilities', suggestedSection: 'experience', weight: 2 },
    { name: 'Reporting & Analytics', category: 'responsibilities', suggestedSection: 'experience', weight: 2 },
    { name: 'Market Research', category: 'responsibilities', suggestedSection: 'experience', weight: 1 },
    { name: 'Audience Targeting', category: 'responsibilities', suggestedSection: 'experience', weight: 2 },
    { name: 'إعداد التقارير', category: 'responsibilities', suggestedSection: 'experience', weight: 1 },
    { name: 'استهداف الجمهور', category: 'responsibilities', suggestedSection: 'experience', weight: 2 },
    { name: 'الخبرة الميدانية', category: 'experience', suggestedSection: 'experience', weight: 1 },
  ];

  const extractedList: KeywordItem[] = [];

  // Match predefined dictionary with JD
  dictionary.forEach((item, idx) => {
    const termLower = item.name.toLowerCase();
    const regex = new RegExp(`\\b${escapeRegExp(termLower)}\\b`, 'gi');
    const matches = jdLower.match(regex);
    const count = matches ? matches.length : (jdLower.includes(termLower) ? 1 : 0);

    if (count > 0) {
      let priority: KeywordPriority = 'extra';
      const scoreMetric = count * item.weight;

      if (scoreMetric >= 4 || item.weight === 3 || count >= 2) {
        priority = 'high';
      } else if (scoreMetric >= 2) {
        priority = 'medium';
      }

      const isMatchedInCv = hasCv ? cvLower.includes(termLower) : undefined;

      extractedList.push({
        id: `kw-${idx}-${item.name.replace(/\s+/g, '-').toLowerCase()}`,
        name: item.name,
        category: item.category,
        priority,
        frequency: count,
        suggestedSection: item.suggestedSection,
        isMatchedInCv
      });
    }
  });

  // Extract acronyms and uppercase words from JD (e.g. CRM, KPI, SaaS, AWS, API)
  const genericAcronyms = jdDescriptionExtractAcronyms(jobDescriptionText);
  genericAcronyms.forEach((acr, i) => {
    const alreadyExtracted = extractedList.some(k => k.name.toLowerCase() === acr.toLowerCase());
    if (!alreadyExtracted) {
      const isMatchedInCv = hasCv ? cvLower.includes(acr.toLowerCase()) : undefined;
      extractedList.push({
        id: `acr-${i}-${acr.toLowerCase()}`,
        name: acr,
        category: 'technical',
        priority: 'medium',
        frequency: 1,
        suggestedSection: 'skills',
        isMatchedInCv
      });
    }
  });

  // Sort by priority (high > medium > extra) then frequency
  const priorityOrder: Record<KeywordPriority, number> = { high: 3, medium: 2, extra: 1 };
  extractedList.sort((a, b) => {
    if (priorityOrder[b.priority] !== priorityOrder[a.priority]) {
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return b.frequency - a.frequency;
  });

  // Filter categorized keywords
  const categorizedKeywords = {
    technical: extractedList.filter(k => k.category === 'technical'),
    soft: extractedList.filter(k => k.category === 'soft'),
    tools: extractedList.filter(k => k.category === 'tools'),
    certifications: extractedList.filter(k => k.category === 'certifications'),
    responsibilities: extractedList.filter(k => k.category === 'responsibilities'),
    experience: extractedList.filter(k => k.category === 'experience'),
    domain: extractedList.filter(k => k.category === 'domain')
  };

  // Top 5 to 15 keywords
  const topKeywords = extractedList.slice(0, Math.min(15, Math.max(5, extractedList.length)));

  // Extract Job Requirements
  const requirements = extractRequirementsFromJd(jobDescriptionText, extractedList);

  // Generate Executive Summary
  const summary = generateJobSummary(jobTitleInput, jobDescriptionText, extractedList, requirements);

  // Calculate Resume Match if CV was provided
  let cvComparison = undefined;
  if (hasCv && extractedList.length > 0) {
    const matched = extractedList.filter(k => k.isMatchedInCv);
    const missing = extractedList.filter(k => !k.isMatchedInCv);

    // Weighted match score calculation
    let totalScore = 0;
    let earnedScore = 0;

    extractedList.forEach(k => {
      const weight = k.priority === 'high' ? 3 : k.priority === 'medium' ? 2 : 1;
      totalScore += weight;
      if (k.isMatchedInCv) {
        earnedScore += weight;
      }
    });

    const matchScore = totalScore > 0 ? Math.round((earnedScore / totalScore) * 100) : 50;

    const recommendations: string[] = [];

    // High-priority missing keywords recommendations
    const missingHigh = missing.filter(m => m.priority === 'high').slice(0, 3);
    missingHigh.forEach(item => {
      recommendations.push(
        `إذا كانت لديك خبرة حقيقية في "${item.name}"، أضفها بوضوح في ${getSectionArabicName(item.suggestedSection)} لرفع التوافق مع أنظمة ATS.`
      );
    });

    // Frequent keywords recommendations
    const frequentItems = extractedList.filter(k => k.frequency >= 2 && !k.isMatchedInCv).slice(0, 2);
    frequentItems.forEach(item => {
      recommendations.push(
        `يذكر إعلان الوظيفة "${item.name}" عدة مرات (${item.frequency} مرات)، لذلك يجب إبراز خبرتك وإنجازاتك بهذه المهارة إذا كنت تمتلكها فعلاً.`
      );
    });

    if (recommendations.length === 0) {
      recommendations.push(
        'سيرتك الذاتية متطابقة بشكل ممتاز مع متطلبات الوظيفة الأساسية! احرص على تدعيم المهارات بأرقام وإنجازات قابلة للقياس.'
      );
    }

    cvComparison = {
      matchScore,
      matchedKeywords: matched,
      missingKeywords: missing,
      improvementRecommendations: recommendations
    };
  }

  return {
    jobTitle: jobTitleInput || 'الوظيفة المستهدفة',
    summary,
    topKeywords,
    categorizedKeywords,
    requirements,
    cvComparison
  };
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function jdDescriptionExtractAcronyms(jd: string): string[] {
  const commonStopWords = new Set(['AND', 'THE', 'FOR', 'WITH', 'YOU', 'OUR', 'NOT', 'ARE', 'THIS', 'THAT', 'FROM', 'WILL', 'HAVE', 'MUST', 'PLUS', 'WITHIN']);
  const matches = jd.match(/\b[A-Z]{2,6}\b/g) || [];
  const unique = Array.from(new Set(matches.filter(m => !commonStopWords.has(m))));
  return unique.slice(0, 5);
}

function extractRequirementsFromJd(jd: string, extractedList: KeywordItem[]): JobRequirementBreakdown {
  const jdLower = jd.toLowerCase();
  
  // Experience search
  let yearsOfExperience: string | undefined = undefined;
  const expMatch = jd.match(/(\d+\s*(?:to|-)?\s*\d*\+?\s*(?:years|yrs|سنوات|سنوات من الخبرة))/i);
  if (expMatch) {
    yearsOfExperience = expMatch[0];
  } else if (jdLower.includes('fresh graduate') || jdLower.includes('حديث تخرج')) {
    yearsOfExperience = 'حديث تخرج / سنة واحدة';
  } else if (jdLower.includes('senior') || jdLower.includes('أول')) {
    yearsOfExperience = '4 - 7 سنوات خبرة';
  }

  // Education search
  let educationLevel: string | undefined = undefined;
  if (jdLower.includes("bachelor") || jdLower.includes("بكالوريوس") || jdLower.includes("degree in")) {
    educationLevel = 'درجة البكالوريوس في التخصص ذي الصلة';
  } else if (jdLower.includes("master") || jdLower.includes("ماجستير")) {
    educationLevel = 'درجة الماجستير أو ما يعادلها';
  } else if (jdLower.includes("diploma") || jdLower.includes("دبلوم")) {
    educationLevel = 'دبلوم مهني أو شهادة تقنية معتمدة';
  }

  // Languages
  const requiredLanguages: string[] = [];
  if (jdLower.includes('english') || jdLower.includes('إنجليزية') || jdLower.includes('الانجليزية')) {
    requiredLanguages.push('اللغة الإنجليزية (مطلوبة)');
  }
  if (jdLower.includes('arabic') || jdLower.includes('عربية') || jdLower.includes('العربية')) {
    requiredLanguages.push('اللغة العربية (مطلوبة أو مفضلة)');
  }

  // Tools & Skills
  const tools = extractedList.filter(k => k.category === 'tools').map(k => k.name).slice(0, 6);
  const keySkills = extractedList.filter(k => k.category === 'technical' || k.category === 'soft').map(k => k.name).slice(0, 6);
  const certifications = extractedList.filter(k => k.category === 'certifications').map(k => k.name).slice(0, 4);

  return {
    yearsOfExperience,
    educationLevel,
    certifications: certifications.length > 0 ? certifications : undefined,
    requiredLanguages: requiredLanguages.length > 0 ? requiredLanguages : undefined,
    tools: tools.length > 0 ? tools : undefined,
    keySkills: keySkills.length > 0 ? keySkills : undefined
  };
}

function generateJobSummary(
  jobTitle: string,
  jd: string,
  extractedList: KeywordItem[],
  requirements: JobRequirementBreakdown
) {
  const topHigh = extractedList.filter(k => k.priority === 'high').map(k => k.name).slice(0, 4);
  const topTools = (requirements.tools || []).slice(0, 3);
  
  const whatCompanyLooksFor = topHigh.length > 0 
    ? `تبحث الشركة عن مرشح متمكن يمتلك مهارات عملية مثبتة في (${topHigh.join('، ')})، مع قدرة عالية على تحقيق نتائج قابلة للقياس.`
    : `تبحث الشركة عن كفاءة مهنية لشغل دور ${jobTitle || 'الوظيفة المعلنة'} ودعم أهداف النمو والتطوير المؤسسي.`;

  const priorities: string[] = [];
  if (topTools.length > 0) {
    priorities.push(`إتقان استخدام أدوات العمل الرئيسية: ${topTools.join(' و ')}`);
  }
  if (requirements.yearsOfExperience) {
    priorities.push(`تلبية متطلب الخبرة العملية (${requirements.yearsOfExperience})`);
  }
  if (topHigh.length > 0) {
    priorities.push(`التركيز على مهارات: ${topHigh.slice(0, 2).join('، ')}`);
  }
  priorities.push('القدرة على حل المشكلات والتواصل الفعال مع فرق العمل المختلفة');

  return {
    overview: `يستهدف هذا الإعلان استقطاب متخصص لشغل منصب "${jobTitle || 'الوظيفة'}"، حيث تتركز الأولويات على الدمج بين الكفاءة التقنية والتنفيذ عالي الجودة لمواكبة تطلعات الشركة.`,
    whatCompanyLooksFor,
    corePriorities: priorities
  };
}

export function getSectionArabicName(section: KeywordItem['suggestedSection']): string {
  switch (section) {
    case 'skills':
      return 'قسم المهارات الرئيسية (Skills)';
    case 'experience':
      return 'قسم الخبرة المهنية (Experience / Work History)';
    case 'summary':
      return 'الموجز المهني (Professional Summary)';
    case 'education':
      return 'قسم التعليم (Education)';
    case 'certifications':
      return 'قسم الشهادات والاعتمادات (Certifications)';
    default:
      return 'قسم المهارات والخبرة';
  }
}

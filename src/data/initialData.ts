import { Category, Article, ToolItem } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'السيرة الذاتية',
    slug: 'cv',
    description: 'كل ما تحتاجه لإنشاء وتطوير سيرة ذاتية احترافية تجذب مسؤولي التوظيف',
    color: 'blue',
    iconName: 'FileText'
  },
  {
    id: 'cat-2',
    name: 'مقابلات العمل',
    slug: 'interviews',
    description: 'أسرار واستراتيجيات الإجابة على أصعب أسئلة المقابلات الشخصية والتقنية',
    color: 'emerald',
    iconName: 'Users'
  },
  {
    id: 'cat-3',
    name: 'البحث عن وظيفة',
    slug: 'job-search',
    description: 'تقنيات ومنصات البحث الذكي عن فرص العمل المناسبة لمؤهلاتك',
    color: 'violet',
    iconName: 'Compass'
  },
  {
    id: 'cat-4',
    name: 'رسائل التقديم',
    slug: 'cover-letters',
    description: 'كيفية صياغة خطاب تقديمي (Cover Letter) مخصص ومؤثر لكل وظيفة',
    color: 'amber',
    iconName: 'Mail'
  },
  {
    id: 'cat-5',
    name: 'نظام ATS',
    slug: 'ats-systems',
    description: 'كيف تعمل أنظمة تتبع المتقدمين (ATS) وطريقة تهيئة سيرتك لتخطيها بنجاح',
    color: 'teal',
    iconName: 'Cpu'
  },
  {
    id: 'cat-6',
    name: 'تطوير المسار المهني',
    slug: 'career-growth',
    description: 'بناء المهارات، التفاوض على الرواتب، وبناء هوية مهنية قوية على لينكد إن',
    color: 'indigo',
    iconName: 'TrendingUp'
  }
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'دليل كتابة سيرة ذاتية احترافية تتجاوز أنظمة ATS في 2026',
    slug: 'how-to-write-professional-cv',
    excerpt: 'تعرف على القواعد الذهبية لصياغة سيرة ذاتية متوافقة تماماً مع خوارزميات الذكاء الاصطناعي وأنظمة تتبع المتقدمين ATS دون فقدان اللمسة الإنسانية الجذابة.',
    coverImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1200&q=80',
    categoryId: 'cat-5',
    categoryName: 'نظام ATS',
    tags: ['السيرة الذاتية', 'نظام ATS', 'الذكاء الاصطناعي', 'البحث عن وظيفة'],
    metaTitle: 'دليل كتابة سيرة ذاتية احترافية تتجاوز أنظمة ATS في 2026 | CareerAI',
    metaDescription: 'دليل شامل ومجاني لكتابة سيرة ذاتية متوافقة مع أنظمة ATS ومسؤولي التوظيف مع قوالب جاهزة ونصائح عملية.',
    status: 'published',
    publishedAt: '2026-08-15',
    updatedAt: '2026-08-18',
    author: {
      name: 'فريق خبراء CareerAI',
      role: 'مستشارون مهنيون',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    readingTimeMinutes: 6,
    viewsCount: 1420,
    likesCount: 89,
    featured: true,
    content: `
<h2>ما هو نظام تتبع المتقدمين (ATS) ولماذا يُعد مهماً؟</h2>
<p>تستخدم أكثر من 75% من الشركات المتوسطة والكبيرة أنظمة تتبع المتقدمين (Applicant Tracking Systems) لفحص وتصفية مئات السير الذاتية تلقائياً قبل أن تقع أعين مسؤولي التوظيف البشريين عليها. تقوم هذه الأنظمة بتحليل الكلمات المفتاحية، ومطابقة المهارات، وفحص التنسيقات.</p>

<div class="pro-tip">
  <strong>نصيحة ذهبية:</strong> عدم تخطي سيرتك الذاتية لنظام ATS لا يعني أنك غير مؤهل، بل يعني غالباً أن تنسيق السيرة الذاتية أو الكلمات المفتاحية لم تكن متوافقة مع قراءة الروبوت.
</div>

<h2>الأخطاء الشائعة التي تجعل نظام ATS يستبعد سيرتك الذاتية</h2>
<ul>
  <li><strong>استخدام الجداول والأعمدة المعقدة:</strong> أغلب خوارزميات ATS تقرأ النصوص بشكل خطي من اليمين لليسار أو من الأعلى للأسفل، والجداول تتسبب في خلط النصوص.</li>
  <li><strong>إدراج المهارات والبيانات داخل صور:</strong> لا يمكن لمعظم الأنظمة قراءة النصوص المحفوظة كصورة.</li>
  <li><strong>تسميات أقسام غير مألوفة:</strong> استخدم تسميات قياسية مثل "الخبرات المهنية" بدلاً من "رحلتي في العمل".</li>
  <li><strong>تجاهل الكلمات المفتاحية المذكورة في الإعلان الوظيفي:</strong> يجب أن تعكس سيرتك نفس المصطلحات المطلوبة.</li>
</ul>

<h2>هيكل السيرة الذاتية المثالي لعام 2026</h2>
<p>لضمان أعلى معدل قبول، اتبع هذا الترتيب البسيط والمنظم:</p>
<ol>
  <li><strong>الترويسة (Header):</strong> الاسم الكامل، المسمى الوظيفي المستهدف، رقم الهاتف، البريد الإلكتروني المهني، ورابط حساب لينكد إن.</li>
  <li><strong>الملخص المهني (Professional Summary):</strong> فقرة مركزة من 3-4 أسطر تلخص خبراتك وأهم إنجازاتك.</li>
  <li><strong>الخبرات العملية (Work Experience):</strong> مرتبة ترتيباً زمنياً عكسياً (من الأحدث للأقدم)، مع استخدام أفعال الإنجاز والأرقام القياسية (مثل: زيادة المبيعات بنسبة 25%).</li>
  <li><strong>المهارات الأساسية (Core Skills):</strong> مقسمة إلى مهارات تقنية وصلبة (Hard Skills) ومهارات شخصية (Soft Skills).</li>
  <li><strong>التعليم والشهادات (Education & Certifications):</strong> أحدث الشهادات العلمية والاعتمادات المهنية المعتمدة.</li>
</ol>

<blockquote>
  "السيرة الذاتية الناجحة لا تسرد واجباتك اليومية السابقة، بل تبرز التأثير والقيمة المضافة التي أحدثتها في أماكن عملك السابقة."
</blockquote>

<h2>كيف تساعدك أدوات الذكاء الاصطناعي في فحص سيرتك؟</h2>
<p>تستطيع الآن الاستفادة من أدوات الذكاء الاصطناعي لمقارنة نص سيرتك الذاتية مع الوصف الوظيفي للوظيفة المستهدفة، واستخراج الفجوات المهارية ونسبة التطابق بدقة تامة في ثوانٍ معدودة.</p>
    `
  },
  {
    id: 'art-2',
    title: 'أهم 15 سؤال في مقابلات العمل وكيف تجيب عليها بطريقة STAR',
    slug: 'top-15-interview-questions-star-method',
    excerpt: 'اكتشف أشهر الأسئلة السلوكية والتقنية في مقابلات العمل مع نماذج إجابات احترافية تعتمد على تقنية STAR المقنعة.',
    coverImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
    categoryId: 'cat-2',
    categoryName: 'مقابلات العمل',
    tags: ['مقابلات العمل', 'تقنية STAR', 'نصائح مهنية', 'التوظيف'],
    metaTitle: 'أهم 15 سؤال في مقابلات العمل ونماذج إجابات STAR | CareerAI',
    metaDescription: 'تعلم كيفية الإجابة على أسئلة مقابلات التوظيف بثقة باستخدام نموذج STAR مع أمثلة عملية.',
    status: 'published',
    publishedAt: '2026-08-12',
    updatedAt: '2026-08-16',
    author: {
      name: 'أحمد المنصور',
      role: 'خبير مقابلات وموارد بشرية',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    readingTimeMinutes: 8,
    viewsCount: 2150,
    likesCount: 145,
    featured: true,
    content: `
<h2>ما هي تقنية STAR في مقابلات العمل؟</h2>
<p>تقنية STAR هي إطار عمل منظم للإجابة على الأسئلة السلوكية في مقابلات التوظيف، وتتكون من أربعة أركان أساسية:</p>
<ul>
  <li><strong>S - الموقف (Situation):</strong> وصف السياق أو التحدي الذي واجهته في عملك السابق.</li>
  <li><strong>T - المهمة (Task):</strong> ما كانت مسؤوليتك المحددة في هذا الموقف؟</li>
  <li><strong>A - الإجراء (Action):</strong> ما هي الخطوات العملية الملموسة التي اتخذتها لحل المشكلة؟</li>
  <li><strong>R - النتيجة (Result):</strong> ما هي النتائج الإيجابية التي تحققت مدعومة بالأرقام إن أمكن؟</li>
</ul>

<div class="pro-tip">
  <strong>تذكير مهم:</strong> ركز دائماً على حرف A (إجراءاتك الشخصية) وحرف R (النتائج بالأرقام) لأن المقابل يبحث عن تأثيرك المباشر.
</div>

<h2>أشهر أسئلة المقابلات وكيف تتفوق فيها</h2>

<h3>1. حدثني عن نفسك؟ (Tell Me About Yourself)</h3>
<p>لا تسرد سيرتك الذاتية كلمة بكلمة. بدلاً من ذلك، استخدم صيغة: (الحاضر - الماضي - المستقبل): ما تفعله حالياً، أهم إنجازين في ماضيك، ولماذا أنت متحمس لهذه الفرصة تحديداً.</p>

<h3>2. ما هي أكبر نقاط ضعفك؟</h3>
<p>اختر نقطة ضعف حقيقية ولكن ليست أساسية للوظيفة، واشرح الخطوات الإيجابية التي تقوم بها لتطويرها حالياً (مثلاً: صعوبة تفويض المهام سابقاً والاشتراك في دورة إدارة فرق العمل).</p>

<h3>3. أخبرني عن موقف واجهت فيه خلافاً مع زميل أو مدير؟</h3>
<p>هنا يتم قياس ذكائك العاطفي ومهارات التواصل وحل النزاعات. ركز على التفاهم المهني، الاستماع للرأي الآخر، والوصول لحل يخدم مصلحة العمل.</p>
    `
  },
  {
    id: 'art-3',
    title: 'كيف تصيغ خطاب تغطية (Cover Letter) مخصص يقنع مدير التوظيف؟',
    slug: 'write-winning-cover-letter-guide',
    excerpt: 'دليل عملي خطوة بخطوة لكتابة رسالة تقديم مقنعة ومختصرة توضح شغفك وقيمتك المضافة للمؤسسة في أقل من صفحة واحدة.',
    coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
    categoryId: 'cat-4',
    categoryName: 'رسائل التقديم',
    tags: ['رسائل التقديم', 'Cover Letter', 'البحث عن وظيفة', 'سيرة ذاتية'],
    metaTitle: 'كيفية كتابة خطاب تغطية Cover Letter احترافي | CareerAI',
    metaDescription: 'تعلم أسرار كتابة رسالة تقديم للوظيفة تضاعف فرص اتصال مسؤول التوظيف بك.',
    status: 'published',
    publishedAt: '2026-08-10',
    updatedAt: '2026-08-14',
    author: {
      name: 'سارة الشريف',
      role: 'أخصائية كتابة مهنية',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80'
    },
    readingTimeMinutes: 5,
    viewsCount: 980,
    likesCount: 62,
    featured: false,
    content: `
<h2>هل ما زالت رسائل التقديم (Cover Letters) مهمة؟</h2>
<p>نعم، بالتأكيد! على الرغم من أن بعض الشركات لا تشترطها، إلا أن إرفاق خطاب تغطية مكتوب بعناية يُميزك عن 90% من المتقدمين الذين يكتفون بإرسال سيرة ذاتية عامة.</p>

<h2>العناصر الأساسية لرسالة التقديم الناجحة</h2>
<ol>
  <li><strong>الافتتاحية الجذابة:</strong> اذكر الوظيفة، واذكر باختصار سبب شغفك بالشركة ومشاريعها الأخيرة.</li>
  <li><strong>جسر القيمة:</strong> اربط بين متطلبات الوظيفة وأكبر إنجاز حققته يثبت قدرتك على إنجاز تلك المهام.</li>
  <li><strong>الملاءمة الثقافية:</strong> وضح كيف تتوافق قيمك وطريقة عملك مع رؤية الشركة وثقافتها الداخلية.</li>
  <li><strong>الدعوة للإجراء (Call To Action):</strong> عبر عن تطلعك لمناقشة كيفية مساهمتك في أهداف الفريق خلال مقابلة عمل.</li>
</ol>
    `
  },
  {
    id: 'art-4',
    title: 'أسرار تحسين حسابك على لينكد إن لجذب عروض العمل بدون تقديم',
    slug: 'linkedin-profile-optimization-secrets',
    excerpt: 'كيف تجعل مسؤولي التوظيف والباحثين عن الكفاءات (Headhunters) يجدون ملفك الشخصي ويتواصلون معك مباشرة.',
    coverImage: 'https://images.unsplash.com/photo-1611944212129-29977ae1398c?auto=format&fit=crop&w=1200&q=80',
    categoryId: 'cat-6',
    categoryName: 'تطوير المسار المهني',
    tags: ['لينكد إن', 'التطوير المهني', 'التواصل المهني', 'فرص العمل'],
    metaTitle: 'أسرار تحسين حساب لينكد إن لجذب مسؤولي التوظيف | CareerAI',
    metaDescription: 'دليل تحسين حساب LinkedIn لزيادة الظهور في محركات بحث التوظيف وجلب عروض عمل حصرية.',
    status: 'published',
    publishedAt: '2026-08-05',
    updatedAt: '2026-08-08',
    author: {
      name: 'فريق خبراء CareerAI',
      role: 'مستشارون مهنيون',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    readingTimeMinutes: 7,
    viewsCount: 1890,
    likesCount: 120,
    featured: false,
    content: `
<h2>لماذا يجب أن تهتم بحسابك على لينكد إن؟</h2>
<p>يستخدم أكثر من 95% من مسؤولي التوظيف حول العالم منصة لينكد إن للبحث المباشر عن المرشحين المؤهلين. إذا كان ملفك غير مُحسن بالكلمات المفتاحية الصحيحة، فأنت تفوت فرصاً وظيفية يومياً.</p>

<h2>أهم عناصر الملف الشخصي الناجح</h2>
<ul>
  <li><strong>العنوان الرئيسي (Headline):</strong> لا تكتب فقط "باحث عن عمل"، بل اكتب مجالك ومهاراتك الأساسية وما تقدمه من حلول.</li>
  <li><strong>نبذة عني (About Section):</strong> اكتب قصتك المهنية بلغة المتكلم المشوقة، وحدد القيمة التي تصنعها.</li>
  <li><strong>قسم المهارات (Skills):</strong> أضف على الأقل 15 مهارة أساسية وتقنية يبحث عنها مسؤولو التوظيف في تخصصك.</li>
  <li><strong>التوصيات (Recommendations):</strong> اطلب من زملائك ومديريك السابقين كتابة توصيات حقيقية تدعم مصداقيتك.</li>
</ul>
    `
  },
  {
    id: 'art-5',
    title: 'استراتيجيات البحث الذكي عن الوظائف الخفية (The Hidden Job Market)',
    slug: 'hidden-job-market-search-strategies',
    excerpt: 'تشير الدراسات إلى أن ما يقارب 70% من الوظائف لا يتم الإعلان عنها علناً في مواقع التوظيف. كيف تصل إليها بذكاء؟',
    coverImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
    categoryId: 'cat-3',
    categoryName: 'البحث عن وظيفة',
    tags: ['البحث عن وظيفة', 'سوق العمل الخفي', 'التشبيك المهني', 'الاستراتيجيات'],
    metaTitle: 'كيف تصل إلى سوق العمل والوظائف غير المعلنة | CareerAI',
    metaDescription: 'طرق مجربة لاكتشاف الوظائف قبل نشرها وبناء شبكة علاقات مهنية توصلك للفرص الكبرى.',
    status: 'published',
    publishedAt: '2026-08-01',
    updatedAt: '2026-08-03',
    author: {
      name: 'أحمد المنصور',
      role: 'خبير مقابلات وموارد بشرية',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    readingTimeMinutes: 6,
    viewsCount: 1120,
    likesCount: 77,
    featured: false,
    content: `
<h2>ما هو سوق العمل الخفي؟</h2>
<p>سوق العمل الخفي يشير إلى الوظائف التي يتم شغلها من خلال الترشيحات الداخلية، والعلاقات المهنية، والتواصل المباشر مع مديري الأقسام قبل طرح إعلان توظيف عام.</p>

<h2>كيف تخترق هذا السوق؟</h2>
<ol>
  <li><strong>المقابلات الاستكشافية (Informational Interviews):</strong> تواصل مع خبراء يعملون في الشركات التي تطمح للانضمام إليها واطلب استشارتهم.</li>
  <li><strong>متابعة أخبار التوسع والتمويل:</strong> الشركات التي تعلن عن جولات استثمارية أو افتتاح فروع جديدة تبدأ فوراً في التوظيف غير المعلن.</li>
  <li><strong>المشاركة في المجتمعات المهنية:</strong> انضم إلى مجموعات التليغرام والنوادي المتخصصة في مجالك.</li>
</ol>
    `
  },
  {
    id: 'art-6',
    title: 'مسودة: خطة الانتقال المهني وتغيير التخصص في 6 أشهر',
    slug: 'career-transition-blueprint-draft',
    excerpt: 'خطوات تفصيلية وعملية لكيفية تحويل مسارك المهني نحو مجالات جديدة مطلوبة مثل الذكاء الاصطناعي وإدارة المنتجات.',
    coverImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
    categoryId: 'cat-6',
    categoryName: 'تطوير المسار المهني',
    tags: ['تغيير المسار', 'التطوير المهني', 'مهارات المستقبل'],
    metaTitle: 'خطة التحول المهني وتغيير التخصص بنجاح | CareerAI',
    metaDescription: 'دليل عملي لتغيير مجالك المهني واكتساب مهارات جديدة مطلوبة في سوق العمل.',
    status: 'draft',
    publishedAt: '2026-08-20',
    updatedAt: '2026-08-20',
    author: {
      name: 'فريق خبراء CareerAI',
      role: 'مستشارون مهنيون',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    readingTimeMinutes: 7,
    viewsCount: 0,
    likesCount: 0,
    featured: false,
    content: `
<h2>لماذا يُعد التغيير المهني متاحاً أكثر من أي وقت مضى؟</h2>
<p>مع تسارع التكنولوجيا والذكاء الاصطناعي، أصبحت المهارات القابلة للنقل (Transferable Skills) والقدرة على التعلم السريع أهم من عدد سنوات الخبرة التقليدية في مجال واحد.</p>
    `
  }
];

export const AI_TOOLS_SHOWCASE: ToolItem[] = [
  {
    id: 'tool-cv-builder',
    title: 'منشئ السيرة الذاتية الذكي',
    description: 'صياغة سيرة ذاتية احترافية بالذكاء الاصطناعي متوافقة مع أنظمة ATS ومخصصة لمجالك.',
    icon: 'FileText',
    category: 'cv',
    badge: 'متاح',
    features: ['تنسيقات متوافقة مع ATS', 'تحسين النبذة بالذكاء الاصطناعي', 'تصدير PDF قياسي A4 مجاناً'],
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'tool-ats-keywords',
    title: 'مستخرج الكلمات المفتاحية (ATS Keyword Generator)',
    description: 'استخراج وتصنيف أهم الكلمات المفتاحية والمهارات من إعلانات الوظائف لمطابقة سيرتك مع ATS.',
    icon: 'Target',
    category: 'ats',
    badge: 'متاح',
    features: ['استخراج المهارات التقنية والأدوات', 'مقارنة مباشرة مع الـ CV', 'اقتراح أماكن وضع الكلمات في السيرة'],
    color: 'from-indigo-600 to-blue-600'
  },
  {
    id: 'tool-ats-scanner',
    title: 'فاحص ومحلل نظام ATS',
    description: 'قارن سيرتك الذاتية مع الوصف الوظيفي واكتشف الفجوات ونسبة التطابق في ثوانٍ.',
    icon: 'Cpu',
    category: 'ats',
    badge: 'متاح',
    features: ['فحص هيكلية ATS الشامل', 'استخراج الكلمات المفتاحية', 'تقرير فوري بالثغرات والتوصيات'],
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'tool-interview-simulator',
    title: 'محاكي المقابلات الشخصية',
    description: 'تدرب على مقابلات تفاعلية حية مع ذكاء اصطناعي يقيم إجاباتك ويمنحك ملاحظات فورية.',
    icon: 'Users',
    category: 'interview',
    badge: 'قريباً',
    features: ['أسئلة سلوكية وتقنية', 'تقييم نموذج STAR', 'ملاحظات صوتية ونصية'],
    color: 'from-violet-500 to-purple-600'
  },
  {
    id: 'tool-cover-letter-writer',
    title: 'كاتب رسائل التغطية الذكي',
    description: 'توليد خطابات تقديم مخصصة لكل وظيفة تشرح لماذا أنت المرشح الأفضل بدقة وشغف.',
    icon: 'Mail',
    category: 'cv',
    badge: 'متاح',
    features: ['صياغة مقنعة ومختصرة', 'تخصيص كامل لثقافة الشركة', 'نبرة احترافية واثقة'],
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 'tool-linkedin-optimizer',
    title: 'محسن حساب لينكد إن',
    description: 'تحسين العنوان الرئيسي، ونبذة الحساب، والمهارات لجعل ملفك يتصدر نتائج بحث مسؤولي التوظيف.',
    icon: 'TrendingUp',
    category: 'networking',
    badge: 'متاح',
    features: ['صياغة Headlines جذابة', 'كتابة قسم About مشوق', 'استهداف مسؤولي التوظيف'],
    color: 'from-sky-500 to-blue-600'
  },
  {
    id: 'tool-job-matching',
    title: 'مطابق الوظائف الذكي',
    description: 'مطابقة مهاراتك مع أفضل الوظائف المتاحة في السوق وتحديد المسار الأسرع للقبول.',
    icon: 'Compass',
    category: 'search',
    badge: 'قريباً',
    features: ['تحليل فجوات المهارات', 'توصيات كورسات مطلوبة', 'تنبؤات بالرواتب'],
    color: 'from-rose-500 to-pink-600'
  }
];

export const INITIAL_SETTINGS: {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  adSenseEnabled: boolean;
  adSensePublisherId: string;
} = {
  siteName: 'RiseFlow',
  siteDescription: 'المنصة الذكية الرائدة لمساعدة الباحثين عن عمل بأدوات الذكاء الاصطناعي والمحتوى المهني المتخصص',
  contactEmail: 'support@riseflow.app',
  adSenseEnabled: true,
  adSensePublisherId: 'ca-pub-9988776655443322'
};

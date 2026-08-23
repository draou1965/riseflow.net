import React, { useState } from 'react';
import { 
  FileCode2, 
  Sparkles, 
  Check, 
  Copy, 
  ArrowLeft, 
  Info, 
  CheckCircle2, 
  Eye, 
  Layers, 
  FileText 
} from 'lucide-react';

interface HtmlArticleImporterProps {
  onImport: (articleData: {
    title: string;
    slug?: string;
    excerpt?: string;
    content: string;
    metaTitle?: string;
    metaDescription?: string;
    tags?: string[];
  }) => void;
  onCancel?: () => void;
}

const HTML_SAMPLE_TEMPLATE = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <title>دليل شامل لتخطي أنظمة ATS بنجاح في 2026</title>
  <meta name="description" content="تعرف على أفضل الاستراتيجيات والكلمات المفتاحية لاجتياز الفرز الآلي للسير الذاتية ATS والوصول لمقابلة العمل.">
  <meta name="keywords" content="ATS, سيرة ذاتية, وظائف, ذكاء اصطناعي">
</head>
<body>
  <article>
    <h2>مقدمة حول خوارزميات الفرز الآلي ATS</h2>
    <p>تستخدم أكثر من 90% من الشركات العالمية أنظمة تتبع المتقدمين (ATS) لفرز آلاف السير الذاتية تلقائياً قبل أن يراها مسؤول التوظيف البشري.</p>
    
    <div class="pro-tip">
      <strong>نصيحة ذهبية:</strong> احرص دائماً على مواءمة الكلمات المفتاحية في سيرتك الذاتية مع نص الإعلان الوظيفي.
    </div>

    <h2>أهم 5 قواعد لضمان قراءة السيرة الذاتية بنجاح</h2>
    <ul>
      <li>استخدم خطوطاً قياسية وتنسيقاً عمودياً بسيطاً.</li>
      <li>تجنب وضع النصوص الأساسية داخل مربعات رسومية أو جداول معقدة.</li>
      <li>قم بتضمين المسميات الوظيفية والمهارات بصيغتها الصريحة.</li>
    </ul>

    <div class="warning-box">
      <strong>تنبيه هام:</strong> لا تقم بحشو الكلمات المفتاحية بشكل عشوائي، بل ادمجها بسياق إنجازاتك.
    </div>

    <h2>جدول مقارنة بين التنسيق التقليدي والتنسيق المتوافق</h2>
    <table>
      <thead>
        <tr>
          <th>المعيار</th>
          <th>تنسيق غير متوافق</th>
          <th>تنسيق متوافق مع ATS</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>نسبة القراءة</td>
          <td>أقل من 30%</td>
          <td>تتجاوز 95%</td>
        </tr>
        <tr>
          <td>فرصة المقابلة</td>
          <td>منخفضة</td>
          <td>مضاعفة 3x</td>
        </tr>
      </tbody>
    </table>
  </article>
</body>
</html>`;

export const HtmlArticleImporter: React.FC<HtmlArticleImporterProps> = ({ onImport, onCancel }) => {
  const [rawHtml, setRawHtml] = useState('');
  const [copiedSample, setCopiedSample] = useState(false);
  const [parsePreview, setParsePreview] = useState<{
    title: string;
    excerpt: string;
    content: string;
    metaTitle: string;
    metaDescription: string;
    tags: string[];
    wordCount: number;
  } | null>(null);

  const parseHtmlContent = (htmlString: string) => {
    if (!htmlString.trim()) return null;

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, 'text/html');

      // 1. Extract Title
      let title = '';
      const h1 = doc.querySelector('h1');
      const docTitle = doc.querySelector('title');
      const metaOgTitle = doc.querySelector('meta[property="og:title"]');
      
      if (h1 && h1.textContent?.trim()) {
        title = h1.textContent.trim();
      } else if (docTitle && docTitle.textContent?.trim()) {
        title = docTitle.textContent.trim();
      } else if (metaOgTitle) {
        title = metaOgTitle.getAttribute('content') || '';
      } else {
        const firstH2 = doc.querySelector('h2');
        if (firstH2 && firstH2.textContent?.trim()) {
          title = firstH2.textContent.trim();
        }
      }

      // 2. Extract Meta Info
      const metaDescTag = doc.querySelector('meta[name="description"]') || doc.querySelector('meta[property="og:description"]');
      const metaDescription = metaDescTag ? (metaDescTag.getAttribute('content') || '') : '';
      const metaTitle = docTitle ? docTitle.textContent?.trim() || '' : '';

      const metaKeywordsTag = doc.querySelector('meta[name="keywords"]');
      let tags: string[] = [];
      if (metaKeywordsTag) {
        const kw = metaKeywordsTag.getAttribute('content') || '';
        tags = kw.split(/[,،]/).map(t => t.trim()).filter(Boolean);
      }

      // 3. Extract Body/Article Content
      let articleBody = doc.querySelector('article') || doc.querySelector('main') || doc.body;
      
      // Clone so we can clean up if needed
      const clone = articleBody.cloneNode(true) as HTMLElement;
      
      // If h1 was inside article, we can remove it so it's not duplicated in content
      const internalH1 = clone.querySelector('h1');
      if (internalH1 && internalH1.textContent?.trim() === title) {
        internalH1.remove();
      }

      // Remove unwanted tags like script, style, nav, footer
      const unneeded = clone.querySelectorAll('script, style, nav, footer, header, noscript, iframe');
      unneeded.forEach(el => el.remove());

      const cleanHtmlContent = clone.innerHTML.trim();

      // 4. Extract excerpt from first paragraph if meta description is empty
      let excerpt = metaDescription;
      if (!excerpt) {
        const firstP = clone.querySelector('p');
        if (firstP && firstP.textContent) {
          excerpt = firstP.textContent.trim().slice(0, 160);
        }
      }

      const textOnly = clone.textContent || '';
      const wordCount = textOnly.trim().split(/\s+/).filter(Boolean).length;

      return {
        title: title || 'مقال بدون عنوان',
        excerpt: excerpt || '',
        content: cleanHtmlContent,
        metaTitle: metaTitle || (title ? `${title} | RiseFlow` : ''),
        metaDescription: metaDescription || excerpt,
        tags,
        wordCount
      };
    } catch (e) {
      console.error('Error parsing HTML article:', e);
      return null;
    }
  };

  const handleHtmlChange = (text: string) => {
    setRawHtml(text);
    const parsed = parseHtmlContent(text);
    setParsePreview(parsed);
  };

  const handleApplyImport = () => {
    if (!parsePreview || !parsePreview.content) {
      alert('يرجى لصق كود HTML صالح يحتوي على محتوى المقال.');
      return;
    }

    onImport({
      title: parsePreview.title,
      excerpt: parsePreview.excerpt,
      content: parsePreview.content,
      metaTitle: parsePreview.metaTitle,
      metaDescription: parsePreview.metaDescription,
      tags: parsePreview.tags
    });
  };

  const handleUseSample = () => {
    handleHtmlChange(HTML_SAMPLE_TEMPLATE);
  };

  const handleCopySample = () => {
    navigator.clipboard.writeText(HTML_SAMPLE_TEMPLATE);
    setCopiedSample(true);
    setTimeout(() => setCopiedSample(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6 animate-in fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
            <FileCode2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              استيراد أو إضافة مقال بصيغة HTML
            </h2>
            <p className="text-xs text-slate-500">
              الصق كود HTML كامل أو مجزأ وسيتم استخراج العنوان، والوصف، والوسوم، وتنسيق المحتوى تلقائياً
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleUseSample}
            className="px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>تجربة نموذج HTML جاهز</span>
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl transition"
            >
              إلغاء
            </button>
          )}
        </div>
      </div>

      {/* Info Tip */}
      <div className="p-4 bg-blue-50/70 border border-blue-200/80 rounded-2xl text-xs text-blue-900 space-y-1.5">
        <div className="flex items-center gap-2 font-bold text-blue-800">
          <Info className="w-4 h-4 text-blue-600" />
          <span>ما الوسوم المدعومة في كود الـ HTML؟</span>
        </div>
        <p className="text-blue-700 leading-relaxed">
          يمكنك إدخال صفحة HTML كاملة بـ <code className="font-mono bg-blue-100 px-1 rounded">&lt;head&gt;</code> و <code className="font-mono bg-blue-100 px-1 rounded">&lt;meta&gt;</code> أو أجزاء مقتطعة مباشرة. يدعم المحرر وسوم العناوين (<code className="font-mono bg-blue-100 px-1 rounded">h2, h3</code>)، القوائم (<code className="font-mono bg-blue-100 px-1 rounded">ul, ol, li</code>)، الجداول (<code className="font-mono bg-blue-100 px-1 rounded">table</code>)، الصور، والروابط، بالإضافة إلى الصناديق الخاصة (<code className="font-mono bg-blue-100 px-1 rounded">pro-tip</code> و <code className="font-mono bg-blue-100 px-1 rounded">warning-box</code>).
        </p>
      </div>

      {/* Code Textarea */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <label className="font-bold text-slate-800 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-indigo-600" />
            <span>الصق كود الـ HTML هنا:</span>
          </label>
          <button
            type="button"
            onClick={handleCopySample}
            className="text-[11px] text-slate-500 hover:text-indigo-600 flex items-center gap-1"
          >
            {copiedSample ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
            <span>{copiedSample ? 'تم نسخ النموذج' : 'نسخ كود النموذج'}</span>
          </button>
        </div>

        <textarea
          rows={12}
          value={rawHtml}
          onChange={(e) => handleHtmlChange(e.target.value)}
          placeholder={`<!DOCTYPE html>\n<html>\n<head>\n  <title>عنوان المقال...</title>\n  <meta name="description" content="وصف المقال...">\n</head>\n<body>\n  <h2>محتوى المقال</h2>\n  <p>النص والفقرات...</p>\n</body>\n</html>`}
          className="w-full p-4 font-mono text-xs sm:text-sm text-slate-800 bg-slate-950 text-emerald-400 border border-slate-800 rounded-2xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500 resize-y leading-relaxed"
          dir="ltr"
        />
      </div>

      {/* Real-time Parsed Preview Card */}
      {parsePreview && (
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                البيانات المستخرجة بنجاح من كود HTML:
              </h3>
            </div>
            <span className="text-xs bg-indigo-100 text-indigo-700 font-bold px-2.5 py-0.5 rounded-full">
              {parsePreview.wordCount} كلمة
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-white p-3 rounded-xl border border-slate-200">
              <span className="text-slate-400 block mb-0.5">العنوان المستخرج:</span>
              <p className="font-bold text-slate-900">{parsePreview.title}</p>
            </div>

            <div className="bg-white p-3 rounded-xl border border-slate-200">
              <span className="text-slate-400 block mb-0.5">الوسوم / الكلمات المفتاحية:</span>
              <p className="font-semibold text-slate-700">
                {parsePreview.tags.length > 0 ? parsePreview.tags.join('، ') : 'لم تحدد (سيتم تعيين وسوم تلقائية)'}
              </p>
            </div>

            <div className="bg-white p-3 rounded-xl border border-slate-200 sm:col-span-2">
              <span className="text-slate-400 block mb-0.5">الوصف المختصر (Meta Description):</span>
              <p className="text-slate-700">{parsePreview.excerpt || 'لا يوجد وصف (سيتم استخراجه من الفقرة الأولى)'}</p>
            </div>
          </div>

          {/* Quick Content Preview Accordion */}
          <div className="border border-slate-200 rounded-xl bg-white p-4 max-h-56 overflow-y-auto">
            <span className="text-xs font-bold text-slate-400 block mb-2">معاينة تنسيق المحتوى:</span>
            <div 
              className="article-content text-xs"
              dangerouslySetInnerHTML={{ __html: parsePreview.content }}
            />
          </div>
        </div>
      )}

      {/* Footer Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-100 transition"
          >
            إلغاء
          </button>
        )}

        <button
          type="button"
          disabled={!parsePreview || !parsePreview.content}
          onClick={handleApplyImport}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Check className="w-4 h-4" />
          <span>تطبيق واستيراد المقال إلى المحرر</span>
        </button>
      </div>

    </div>
  );
};

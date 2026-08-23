import React, { useState, useRef } from 'react';
import { 
  Heading2, 
  Heading3, 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Quote, 
  Lightbulb, 
  AlertTriangle, 
  Table, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Eye, 
  Code,
  Undo2
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertTag = (startTag: string, endTag: string = '', defaultText: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end) || defaultText;
    const replacement = `${startTag}${selectedText}${endTag}`;

    const newContent = value.substring(0, start) + replacement + value.substring(end);
    onChange(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + startTag.length,
        start + startTag.length + selectedText.length
      );
    }, 10);
  };

  const handleInsertHeading2 = () => insertTag('\n<h2>', '</h2>\n', 'عنوان رئيسي جديد');
  const handleInsertHeading3 = () => insertTag('\n<h3>', '</h3>\n', 'عنوان فرعي');
  const handleInsertBold = () => insertTag('<strong>', '</strong>', 'نص عريض');
  const handleInsertItalic = () => insertTag('<em>', '</em>', 'نص مائل');
  
  const handleInsertList = () => {
    insertTag('\n<ul>\n  <li>', '</li>\n  <li>عنصر ثانٍ</li>\n</ul>\n', 'عنصر أول');
  };

  const handleInsertOrderedList = () => {
    insertTag('\n<ol>\n  <li>', '</li>\n  <li>خطوة ثانية</li>\n</ol>\n', 'خطوة أولى');
  };

  const handleInsertQuote = () => {
    insertTag('\n<blockquote>\n  "', '"\n</blockquote>\n', 'اقتباس مهني ملهم...');
  };

  const handleInsertProTip = () => {
    insertTag(
      '\n<div class="pro-tip">\n  <strong>نصيحة ذهبية: </strong>',
      '\n</div>\n',
      'احرص دائماً على مواءمة خبراتك السابقة مع الوصف الوظيفي المحدد.'
    );
  };

  const handleInsertWarning = () => {
    insertTag(
      '\n<div class="warning-box">\n  <strong>تنبيه هام: </strong>',
      '\n</div>\n',
      'تجنب إرسال نفس السيرة الذاتية لعدة وظائف مختلفة دون تخصيص.'
    );
  };

  const handleInsertTable = () => {
    const tableTemplate = `
\n<table>
  <thead>
    <tr>
      <th>المعيار</th>
      <th>الطريقة التقليدية</th>
      <th>طريقة CareerAI الذكية</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>التوافق مع ATS</td>
      <td>منخفض (20-30%)</td>
      <td>مرتفع جداً (90%+)</td>
    </tr>
    <tr>
      <td>الوقت المستغرق</td>
      <td>ساعات طويلة</td>
      <td>دقائق معدودة</td>
    </tr>
  </tbody>
</table>\n`;
    insertTag(tableTemplate, '', '');
  };

  const handleInsertImage = () => {
    const url = prompt('أدخل رابط الصورة (URL):', 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1000&q=80');
    if (url) {
      const alt = prompt('النص البديل للصورة (Alt text):', 'صورة توضيحية');
      insertTag(`\n<img src="${url}" alt="${alt || 'صورة'}" class="rounded-xl shadow-md my-4 w-full object-cover" />\n`, '', '');
    }
  };

  const handleInsertLink = () => {
    const url = prompt('أدخل رابط URL:', 'https://');
    if (url) {
      insertTag(`<a href="${url}" class="text-blue-600 underline font-medium hover:text-blue-800" target="_blank" rel="noopener noreferrer">`, '</a>', 'رابط الموقع');
    }
  };

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs">
      {/* Header with Editor Mode Tabs */}
      <div className="bg-slate-50 border-b border-slate-200 px-3 py-2 flex flex-wrap items-center justify-between gap-2">
        {/* Formatting Toolbar */}
        <div className="flex flex-wrap items-center gap-1">
          <button
            type="button"
            onClick={handleInsertHeading2}
            title="عنوان رئيسي (H2)"
            className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition flex items-center gap-0.5 text-xs font-bold"
          >
            <Heading2 className="w-4 h-4 text-blue-600" />
            <span>H2</span>
          </button>

          <button
            type="button"
            onClick={handleInsertHeading3}
            title="عنوان فرعي (H3)"
            className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition flex items-center gap-0.5 text-xs font-bold"
          >
            <Heading3 className="w-4 h-4 text-indigo-600" />
            <span>H3</span>
          </button>

          <div className="w-[1px] h-5 bg-slate-300 mx-1" />

          <button
            type="button"
            onClick={handleInsertBold}
            title="نص عريض (Bold)"
            className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition"
          >
            <Bold className="w-4 h-4 font-bold" />
          </button>

          <button
            type="button"
            onClick={handleInsertItalic}
            title="نص مائل (Italic)"
            className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition"
          >
            <Italic className="w-4 h-4" />
          </button>

          <div className="w-[1px] h-5 bg-slate-300 mx-1" />

          <button
            type="button"
            onClick={handleInsertList}
            title="قائمة نقطية"
            className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition"
          >
            <List className="w-4 h-4 text-emerald-600" />
          </button>

          <button
            type="button"
            onClick={handleInsertOrderedList}
            title="قائمة رقمية"
            className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition"
          >
            <ListOrdered className="w-4 h-4 text-emerald-600" />
          </button>

          <div className="w-[1px] h-5 bg-slate-300 mx-1" />

          <button
            type="button"
            onClick={handleInsertQuote}
            title="اقتباس"
            className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition"
          >
            <Quote className="w-4 h-4 text-blue-600" />
          </button>

          <button
            type="button"
            onClick={handleInsertProTip}
            title="مربع نصيحة ذهبية (Pro Tip)"
            className="p-1.5 rounded hover:bg-emerald-100 text-emerald-700 transition flex items-center gap-1 text-xs font-semibold"
          >
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span className="hidden sm:inline">نصيحة</span>
          </button>

          <button
            type="button"
            onClick={handleInsertWarning}
            title="مربع تنبيه وتحذير"
            className="p-1.5 rounded hover:bg-amber-100 text-amber-800 transition flex items-center gap-1 text-xs font-semibold"
          >
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span className="hidden sm:inline">تنبيه</span>
          </button>

          <div className="w-[1px] h-5 bg-slate-300 mx-1" />

          <button
            type="button"
            onClick={handleInsertTable}
            title="إدراج جدول مقارنة"
            className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition"
          >
            <Table className="w-4 h-4 text-violet-600" />
          </button>

          <button
            type="button"
            onClick={handleInsertImage}
            title="إدراج صورة"
            className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition"
          >
            <ImageIcon className="w-4 h-4 text-sky-600" />
          </button>

          <button
            type="button"
            onClick={handleInsertLink}
            title="إدراج رابط"
            className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition"
          >
            <LinkIcon className="w-4 h-4 text-blue-600" />
          </button>

          <button
            type="button"
            onClick={() => insertTag('\n<pre class="bg-slate-900 text-emerald-400 p-4 rounded-xl font-mono text-xs overflow-x-auto my-4" dir="ltr"><code>', '</code></pre>\n', '// اكتب الكود البرمجي هنا')}
            title="إدراج كود برمجي (Code Block)"
            className="p-1.5 rounded hover:bg-slate-200 text-slate-700 transition"
          >
            <Code className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center bg-slate-200/80 p-0.5 rounded-lg text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('edit')}
            className={`px-3 py-1 rounded-md transition flex items-center gap-1.5 ${
              activeTab === 'edit'
                ? 'bg-white text-blue-700 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            المحرر
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1 rounded-md transition flex items-center gap-1.5 ${
              activeTab === 'preview'
                ? 'bg-white text-emerald-700 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            معاينة حية
          </button>
        </div>
      </div>

      {/* Editor Body */}
      {activeTab === 'edit' ? (
        <div className="p-1">
          <textarea
            ref={textareaRef}
            rows={16}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="اكتب أو الصق محتوى المقال هنا... استخدم الأزرار بالأعلى لتنسيق العناوين، القوائم، النصائح، والجداول..."
            className="w-full p-4 font-mono text-sm leading-relaxed text-slate-800 focus:outline-hidden focus:ring-0 resize-y rounded-b-lg border-0"
            dir="rtl"
          />
        </div>
      ) : (
        <div className="p-6 bg-slate-50/50 min-h-[380px] max-h-[500px] overflow-y-auto">
          {value ? (
            <div 
              className="article-content max-w-none prose prose-slate"
              dangerouslySetInnerHTML={{ __html: value }}
            />
          ) : (
            <div className="text-center py-12 text-slate-400 text-sm">
              لم تتم كتابة أي محتوى بعد للمعاينة.
            </div>
          )}
        </div>
      )}

      {/* Footer Word Count & Helper */}
      <div className="bg-slate-50 px-4 py-2 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
        <span>
          عدد الكلمات: <strong>{value.trim() ? value.trim().split(/\s+/).length : 0}</strong> كلمة
        </span>
        <span className="text-[11px] text-slate-400">
          يدعم وسوم HTML المنسقة وأزرار التنسيق المباشرة
        </span>
      </div>
    </div>
  );
};

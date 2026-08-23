import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Clock } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'استفسار عام',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      category: 'استفسار عام',
      message: ''
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <SEOHead
        title="تواصل معنا | RiseFlow"
        description="تواصل مع فريق منصة RiseFlow للاستفسارات العامة، المقترحات المهنية، أو الشراكات المؤسسية."
        keywords="اتصل بنا, تواصل مع RiseFlow, دعم الباحثين عن عمل"
        canonicalPath="/contact"
        schemaJson={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "تواصل معنا | RiseFlow",
          "url": "https://careerai.app/contact"
        }}
      />
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          يسعدنا سماع صوتك
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900">
          تواصل مع فريق RiseFlow
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          لديك استفسار حول مقال معين، اقتراح لأداة ذكاء اصطناعي، أو رغبة في التعاون المهني؟ نحن هنا لمساعدتك.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Info Cards Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <h3 className="text-lg font-bold text-slate-900 border-r-2 border-blue-600 pr-2">
              معلومات التواصل
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400">البريد الإلكتروني</h4>
                  <p className="text-sm font-semibold text-slate-800">support@riseflow.app</p>
                  <p className="text-[11px] text-slate-500">نرد خلال 24 ساعة كحد أقصى</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400">الاستشارات والتعاون</h4>
                  <p className="text-sm font-semibold text-slate-800">partnerships@riseflow.app</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400">أوقات العمل والدعم</h4>
                  <p className="text-sm font-semibold text-slate-800">الأحد - الخميس: 9:00 ص - 6:00 م</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white space-y-3 shadow-md">
            <h4 className="text-base font-bold">هل تبحث عن إجابات سريعة؟</h4>
            <p className="text-xs text-blue-100 leading-relaxed">
              تحقق من قسم الأسئلة الشائعة في الصفحة الرئيسية أو تصفح مقالات المدونة للوصول الفوري إلى أدلة كتابة السيرة الذاتية واجتياز المقابلات.
            </p>
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-7">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">تم إرسال رسالتك بنجاح!</h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  شكراً لتواصلك معنا. سيقوم فريق RiseFlow بمراجعة رسالتك والرد عليك عبر بريدك الإلكتروني بأسرع وقت.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition"
                >
                  إرسال رسالة أخرى
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">الاسم الكامل *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="أدخل اسمك..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
                      dir="rtl"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">البريد الإلكتروني *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="example@mail.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">نوع الاستفسار</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
                      dir="rtl"
                    >
                      <option value="استفسار عام">استفسار عام</option>
                      <option value="اقتراح مقال جديد">اقتراح مقال جديد</option>
                      <option value="استفسار عن أدوات الذكاء الاصطناعي">استفسار عن أدوات الذكاء الاصطناعي</option>
                      <option value="تعاون أو إعلان">تعاون أو إعلان</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">موضوع الرسالة *</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="موضوع مختصر..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">نص الرسالة *</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="اكتب تفاصيل رسالتك أو استفسارك هنا..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white resize-y"
                    dir="rtl"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2"
                >
                  <span>إرسال الرسالة الآن</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

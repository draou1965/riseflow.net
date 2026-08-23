import React from 'react';
import { ResumeData } from '../types';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Globe, 
  Briefcase, 
  GraduationCap, 
  Wrench, 
  Languages, 
  Sparkles,
  Calendar
} from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
  accentColor?: string; // e.g. '#2563eb' (blue), '#0f172a' (slate), '#059669' (emerald), '#4f46e5' (indigo)
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ 
  data, 
  accentColor = '#1e3a8a' // Default ATS Deep Navy
}) => {
  const { personalInfo, summary, experiences, education, skills, languages } = data;

  const hasContact = personalInfo.email || personalInfo.phone || personalInfo.cityCountry || personalInfo.linkedinUrl || personalInfo.portfolioUrl;

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden text-slate-800 font-['Cairo',sans-serif] print-only-resume">
      
      {/* Top ATS Header Bar */}
      <div 
        className="p-6 sm:p-8 border-b-2 text-slate-900 transition-colors"
        style={{ borderBottomColor: accentColor }}
      >
        <div className="space-y-2 text-center sm:text-right">
          <h1 
            className="text-2xl sm:text-3xl font-black tracking-tight"
            style={{ color: accentColor }}
          >
            {personalInfo.fullName || 'الاسم الكامل للمرشح'}
          </h1>
          
          <p className="text-base sm:text-lg font-bold text-slate-600">
            {personalInfo.jobTitle || 'المسمى الوظيفي المستهدف'}
          </p>

          {/* Contact Details Grid / Badges */}
          {hasContact && (
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2 pt-2 text-xs text-slate-600 font-medium">
              {personalInfo.email && (
                <div className="flex items-center gap-1.5" dir="ltr">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <a href={`mailto:${personalInfo.email}`} className="hover:underline text-slate-700">
                    {personalInfo.email}
                  </a>
                </div>
              )}

              {personalInfo.phone && (
                <div className="flex items-center gap-1.5" dir="ltr">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}

              {personalInfo.cityCountry && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{personalInfo.cityCountry}</span>
                </div>
              )}

              {personalInfo.linkedinUrl && (
                <div className="flex items-center gap-1.5" dir="ltr">
                  <Linkedin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <a 
                    href={personalInfo.linkedinUrl.startsWith('http') ? personalInfo.linkedinUrl : `https://${personalInfo.linkedinUrl}`} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="hover:underline text-slate-700 max-w-[180px] truncate"
                  >
                    {personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, 'in/')}
                  </a>
                </div>
              )}

              {personalInfo.portfolioUrl && (
                <div className="flex items-center gap-1.5" dir="ltr">
                  <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <a 
                    href={personalInfo.portfolioUrl.startsWith('http') ? personalInfo.portfolioUrl : `https://${personalInfo.portfolioUrl}`} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="hover:underline text-slate-700 max-w-[180px] truncate"
                  >
                    {personalInfo.portfolioUrl.replace(/^https?:\/\/(www\.)?/, '')}
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Resume Body */}
      <div className="p-6 sm:p-8 space-y-6">
        
        {/* 1. Professional Summary */}
        {summary && (
          <section className="space-y-2">
            <h2 
              className="text-sm font-black uppercase tracking-wider pb-1 border-b border-slate-200 flex items-center gap-2"
              style={{ color: accentColor }}
            >
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>النبذة المهنية (Professional Summary)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
              {summary}
            </p>
          </section>
        )}

        {/* 2. Work Experience */}
        {experiences && experiences.length > 0 && (
          <section className="space-y-4">
            <h2 
              className="text-sm font-black uppercase tracking-wider pb-1 border-b border-slate-200 flex items-center gap-2"
              style={{ color: accentColor }}
            >
              <Briefcase className="w-4 h-4 shrink-0" />
              <span>الخبرات المهنية (Work Experience)</span>
            </h2>

            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div className="font-bold text-slate-900 text-sm sm:text-base">
                      {exp.jobTitle || 'المسمى الوظيفي'}
                      {exp.company && <span className="font-semibold text-slate-600"> — {exp.company}</span>}
                      {exp.city && <span className="font-normal text-slate-500 text-xs"> ({exp.city})</span>}
                    </div>

                    <div className="text-xs font-semibold text-slate-500 flex items-center gap-1 font-mono shrink-0">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{exp.startDate || 'البداية'}</span>
                      <span>—</span>
                      <span>{exp.isCurrent ? 'حتى الآن' : (exp.endDate || 'النهاية')}</span>
                    </div>
                  </div>

                  {exp.description && (
                    <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line pl-1 sm:pl-2">
                      {exp.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 3. Education */}
        {education && education.length > 0 && (
          <section className="space-y-3">
            <h2 
              className="text-sm font-black uppercase tracking-wider pb-1 border-b border-slate-200 flex items-center gap-2"
              style={{ color: accentColor }}
            >
              <GraduationCap className="w-4 h-4 shrink-0" />
              <span>التعليم والمؤهلات الأكاديمية (Education)</span>
            </h2>

            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                      {edu.degree || 'المؤهل أو الشهادة'}
                    </h3>
                    <p className="text-xs text-slate-600">
                      {edu.institution || 'اسم الجامعة أو المؤسسة التعليمية'}
                      {edu.cityCountry && <span> ({edu.cityCountry})</span>}
                    </p>
                  </div>

                  <div className="text-xs font-semibold text-slate-500 font-mono shrink-0">
                    {edu.startDate && `${edu.startDate} — `}{edu.graduationDate || 'سنة التخرج'}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 4. Skills Grid */}
        {skills && skills.length > 0 && (
          <section className="space-y-2">
            <h2 
              className="text-sm font-black uppercase tracking-wider pb-1 border-b border-slate-200 flex items-center gap-2"
              style={{ color: accentColor }}
            >
              <Wrench className="w-4 h-4 shrink-0" />
              <span>المهارات المهنية والتقنية (Skills)</span>
            </h2>

            <div className="flex flex-wrap gap-2 pt-1">
              {skills.map((skill, idx) => (
                <span 
                  key={idx}
                  className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* 5. Languages */}
        {languages && languages.length > 0 && (
          <section className="space-y-2">
            <h2 
              className="text-sm font-black uppercase tracking-wider pb-1 border-b border-slate-200 flex items-center gap-2"
              style={{ color: accentColor }}
            >
              <Languages className="w-4 h-4 shrink-0" />
              <span>اللغات (Languages)</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-1">
              {languages.map((lang) => (
                <div key={lang.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                  <span className="font-bold text-slate-800">{lang.language}</span>
                  <span className="text-slate-500 text-[11px]">{lang.level}</span>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>

      {/* Subtle ATS footer mark */}
      <div className="px-8 py-3 bg-slate-50/70 border-t border-slate-100 text-center text-[10px] text-slate-400 font-mono">
        تم الإنشاء بواسطة منصة CareerAI • نموذج مهني متوافق مع معايير ATS
      </div>

    </div>
  );
};

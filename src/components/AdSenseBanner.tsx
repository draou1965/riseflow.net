import React from 'react';
import { useBlog } from '../context/BlogContext';
import { Sparkles, ExternalLink } from 'lucide-react';

export type AdSlotType = 
  | 'top-banner' 
  | 'in-article' 
  | 'sidebar' 
  | 'bottom-banner' 
  | 'after-intro-analyzer' 
  | 'after-intro-ats-keywords'
  | string;

interface AdSenseBannerProps {
  slot?: AdSlotType;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  className?: string;
}

export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({ 
  slot = 'top-banner', 
  format = 'auto', 
  className = '' 
}) => {
  const { settings } = useBlog();

  // If adSense is disabled globally in admin settings
  if (settings && settings.adSenseEnabled === false) {
    return null;
  }

  const slotDescriptions: Record<string, string> = {
    'top-banner': 'مساحة إعلانية علوية (Responsive Leaderboard 728x90)',
    'in-article': 'مساحة إعلانية مدمجة داخل المقال (Responsive Content Ad)',
    'sidebar': 'مساحة إعلانية جانبية (Sticky Sidebar 300x250 / 300x600)',
    'bottom-banner': 'مساحة إعلانية سفلية (Display Banner)',
    'after-intro-analyzer': 'مساحة إعلانية مميزة أعلى أداة التحليل',
    'after-intro-ats-keywords': 'مساحة إعلانية مميزة أعلى مستخرج الكلمات المفتاحية'
  };

  const currentDesc = slotDescriptions[slot] || 'مساحة إعلانية مخصصة (Google AdSense Responsive Ad)';

  return (
    <div 
      className={`my-6 overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-gradient-to-r from-slate-50 to-blue-50/40 p-3.5 sm:p-4 transition-all hover:border-blue-300 print:hidden ${className}`}
      aria-label="Google AdSense Space"
    >
      <div className="flex items-center justify-between text-xs text-slate-400 mb-2 border-b border-slate-200/60 pb-1.5">
        <span className="flex items-center gap-1 font-medium tracking-wide">
          <Sparkles className="w-3 h-3 text-amber-500" />
          إعلان مدعوم / Google AdSense
        </span>
        <span className="text-[10px] bg-slate-200/80 text-slate-600 px-1.5 py-0.5 rounded font-mono">
          {settings?.adSensePublisherId ? `ca-pub-${settings.adSensePublisherId.replace(/[^0-9]/g, '').slice(0, 8)}...` : 'Ad Slot Auto'}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2.5 px-4 bg-white rounded-xl border border-slate-100 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center font-bold text-base shrink-0">
            AD
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-slate-800">
              {slot === 'in-article' ? 'استخدم أدوات الذكاء الاصطناعي المجانية لتطوير سيرتك' : 'إعلان متجاوب مخصص لاهتماماتك المهنية'}
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-500">
              {currentDesc}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">
            إعلان موصى به
            <ExternalLink className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { useBlog } from '../context/BlogContext';
import { Sparkles, ExternalLink } from 'lucide-react';

export type AdSlotPosition = 
  | 'header-top'
  | 'tool-header-bottom'
  | 'tool-results-middle'
  | 'tool-results-bottom'
  | 'article-top'
  | 'article-middle'
  | 'article-bottom'
  | 'sidebar'
  | 'home-featured-bottom'
  | 'footer-top'
  | string;

export type AdSlotSize = 'responsive' | 'leaderboard' | 'banner' | 'rectangle' | 'in-feed';

export interface AdSlotProps {
  /**
   * Identifies the placement position across the site
   */
  position?: AdSlotPosition;
  /**
   * Google AdSense Ad Slot Client ID or ID (e.g., '1234567890')
   */
  slotId?: string;
  /**
   * Size variant of the ad slot
   */
  size?: AdSlotSize;
  /**
   * Custom title or callout displayed in preview/fallback mode
   */
  label?: string;
  /**
   * Optional manual override to show or hide this specific slot
   */
  visible?: boolean;
  /**
   * Optional extra styling classes
   */
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({
  position = 'tool-header-bottom',
  slotId,
  size = 'responsive',
  label,
  visible = true,
  className = ''
}) => {
  const { settings } = useBlog();

  // 1. If explicitly hidden via prop or globally disabled in Site Admin Settings
  if (!visible || (settings && settings.adSenseEnabled === false)) {
    return null;
  }

  // Get Publisher ID or fallback
  const publisherId = settings?.adSensePublisherId || 'ca-pub-XXXXXXXXXXXXXXXX';
  const resolvedSlotId = slotId || settings?.adSenseSlotId || '0000000000';

  // Size style classes
  const sizeClasses: Record<AdSlotSize, string> = {
    responsive: 'min-h-[90px] w-full',
    leaderboard: 'min-h-[90px] max-w-[728px] mx-auto',
    banner: 'min-h-[60px] w-full',
    rectangle: 'min-h-[250px] max-w-[336px] mx-auto',
    'in-feed': 'min-h-[120px] w-full'
  };

  // Position contextual labels
  const positionDescriptions: Record<string, string> = {
    'header-top': 'مساحة إعلانية علوية (Header Leaderboard)',
    'tool-header-bottom': 'مساحة إعلانية أسفل مقدمة الأداة (Tool Top Ad)',
    'tool-results-middle': 'مساحة إعلانية داخل نتائج التحليل (Results In-Feed Ad)',
    'tool-results-bottom': 'مساحة إعلانية أسفل النتائج وقبل الدليل (Tool Bottom Ad)',
    'article-top': 'مساحة إعلانية أعلى المقال (Article Header Ad)',
    'article-middle': 'مساحة إعلانية مدمجة داخل محتوى المقال (Article Body Ad)',
    'article-bottom': 'مساحة إعلانية أسفل المقال (Article Footer Ad)',
    'sidebar': 'مساحة إعلانية جانبية (Sidebar Ad 300x250)',
    'home-featured-bottom': 'مساحة إعلانية مميزة بالصفحة الرئيسية',
    'footer-top': 'مساحة إعلانية أعلى الفوتر'
  };

  const displayDesc = label || positionDescriptions[position] || 'مساحة إعلانية متجاوبة (Google AdSense Responsive Ad)';

  return (
    <div 
      className={`my-6 overflow-hidden rounded-2xl border border-dashed border-slate-300/80 bg-gradient-to-r from-slate-50/90 via-blue-50/30 to-indigo-50/30 p-3 sm:p-4 transition-all duration-300 hover:border-indigo-300 print:hidden ${sizeClasses[size] || sizeClasses.responsive} ${className}`}
      data-ad-position={position}
      data-ad-slot={resolvedSlotId}
      aria-label="Google AdSense Advertisement"
    >
      {/* Ad Disclosure Label */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2 border-b border-slate-200/50 pb-1.5 px-1">
        <span className="flex items-center gap-1.5 font-medium text-slate-500">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>إعلان مدعوم / Google AdSense</span>
        </span>
        <span className="text-[10px] bg-slate-200/70 text-slate-600 px-2 py-0.5 rounded font-mono">
          {publisherId.replace(/[^0-9]/g, '').length > 5 ? `ca-pub-${publisherId.replace(/[^0-9]/g, '').slice(0, 6)}...` : 'AdSense Auto'}
        </span>
      </div>

      {/* Realistic Ad Container */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-3 px-4 bg-white/95 rounded-xl border border-slate-100 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600/10 text-indigo-600 flex items-center justify-center font-black text-xs shrink-0 border border-indigo-100">
            AD
          </div>
          <div className="space-y-0.5 text-right">
            <h4 className="text-xs sm:text-sm font-bold text-slate-800">
              إعلان ذكي مخصص لاهتماماتك الوظيفية والمهنية
            </h4>
            <p className="text-[11px] text-slate-500">
              {displayDesc}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100 hover:bg-indigo-100 transition-colors">
            <span>محتوى مقترح</span>
            <ExternalLink className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
};

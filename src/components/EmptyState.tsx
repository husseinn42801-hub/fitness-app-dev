import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar, ClipboardList, Dumbbell } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  isDark?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  isDark = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`relative overflow-hidden p-6 rounded-3xl border text-center flex flex-col items-center justify-center space-y-3 ${
        isDark
          ? 'bg-[#1A1A1E]/80 border-white/5 text-white'
          : 'bg-white/90 border-gray-100 text-gray-900 shadow-sm'
      }`}
    >
      {/* Decorative Glow */}
      <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#FF5F2E]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Icon Container */}
      <div className="p-4 rounded-2xl bg-gradient-to-tr from-[#FF5F2E]/15 to-amber-500/15 text-[#FF5F2E] border border-[#FF5F2E]/20 shadow-xs relative">
        {icon || <Sparkles className="w-7 h-7" />}
      </div>

      {/* Title & Description */}
      <div className="max-w-xs space-y-1">
        <h4 className={`text-sm font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {title}
        </h4>
        <p className={`text-xs leading-relaxed font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {description}
        </p>
      </div>

      {/* Action Button if provided */}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-2 px-4 py-2 bg-gradient-to-r from-[#FF5F2E] to-[#FF912E] hover:opacity-90 text-white font-extrabold text-xs rounded-2xl transition-all shadow-xs cursor-pointer active:scale-95"
        >
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
};

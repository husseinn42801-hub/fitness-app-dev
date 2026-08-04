import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, RotateCcw, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
  isDark?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'نعم، متأكد',
  cancelText = 'إغلاق',
  type = 'warning',
  isDark = false
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div id="confirm-modal-portal" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur Overlay */}
          <motion.div
            id="confirm-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Content Box */}
          <motion.div
            id="confirm-modal-box"
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className={`relative w-full max-w-sm rounded-3xl p-6 overflow-hidden border shadow-2xl flex flex-col items-center text-center ${
              isDark 
                ? 'bg-[#18181C] border-white/5 text-white' 
                : 'bg-white border-gray-100 text-gray-900'
            }`}
          >
            {/* Close Cross Button */}
            <button
              id="confirm-modal-close-btn"
              onClick={onClose}
              className={`absolute top-4 right-4 p-1.5 rounded-full transition-all cursor-pointer ${
                isDark 
                  ? 'hover:bg-white/10 text-gray-400 hover:text-white' 
                  : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'
              }`}
            >
              <X className="w-4 h-4" />
            </button>

            {/* Glowing Main Icon Container */}
            <div className="mb-4 mt-2">
              {type === 'danger' ? (
                <div className="w-14 h-14 rounded-2xl bg-rose-500/10 flex items-center justify-center relative">
                  <div className="absolute inset-0 rounded-2xl bg-rose-500/20 animate-ping opacity-75" />
                  <RotateCcw className="w-7 h-7 text-rose-500 relative z-10" />
                </div>
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-[#FF5F2E]/10 flex items-center justify-center relative">
                  <div className="absolute inset-0 rounded-2xl bg-[#FF5F2E]/20 animate-ping opacity-75" />
                  <AlertCircle className="w-7 h-7 text-[#FF5F2E] relative z-10" />
                </div>
              )}
            </div>

            {/* Title & Description */}
            <h3 className="text-base font-black mb-2 tracking-tight px-2">{title}</h3>
            <p className={`text-xs leading-relaxed mb-6 px-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {message}
            </p>

            {/* Actions Stack */}
            <div className="w-full space-y-2.5">
              <button
                id="confirm-modal-yes-btn"
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className={`w-full py-3 px-6 rounded-2xl text-xs font-extrabold transition-all duration-200 active:scale-98 shadow-md flex justify-center items-center gap-2 cursor-pointer ${
                  type === 'danger'
                    ? 'bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white'
                    : 'bg-gradient-to-r from-[#FF5F2E] to-[#FF912E] hover:from-[#e55025] hover:to-[#e58025] text-white'
                }`}
              >
                <span>{confirmText}</span>
              </button>

              <button
                id="confirm-modal-no-btn"
                onClick={onClose}
                className={`w-full py-3 px-6 rounded-2xl text-xs font-bold transition-all duration-200 active:scale-98 border flex justify-center items-center gap-2 cursor-pointer ${
                  isDark
                    ? 'bg-[#222226] border-white/5 hover:bg-[#2c2c32] text-gray-300 hover:text-white'
                    : 'bg-gray-100 hover:bg-gray-200 border-transparent text-gray-700'
                }`}
              >
                <span>{cancelText}</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

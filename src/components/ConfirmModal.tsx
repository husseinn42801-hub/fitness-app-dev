import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, RotateCcw, X } from 'lucide-react';

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
  cancelText = 'إلغاء',
  type = 'warning',
  isDark = false
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div id="confirm-modal-portal" className="fixed inset-0 z-[100] flex items-center justify-center p-4" dir="rtl">
          {/* Backdrop Blur Overlay */}
          <motion.div
            id="confirm-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Content Box */}
          <motion.div
            id="confirm-modal-box"
            initial={{ opacity: 0, scale: 0.92, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 380 }}
            className={`relative w-full max-w-xs rounded-2xl p-5 overflow-hidden border shadow-xl flex flex-col items-center text-center ${
              isDark 
                ? 'bg-[#1C1C20] border-white/10 text-white' 
                : 'bg-white border-gray-200/80 text-gray-900 shadow-lg'
            }`}
          >
            {/* Close Button */}
            <button
              id="confirm-modal-close-btn"
              onClick={onClose}
              className={`absolute top-3 left-3 p-1 rounded-lg transition-all cursor-pointer ${
                isDark 
                  ? 'hover:bg-white/10 text-gray-400 hover:text-white' 
                  : 'hover:bg-gray-100 text-gray-400 hover:text-gray-700'
              }`}
            >
              <X className="w-4 h-4" />
            </button>

            {/* Glowing Icon Container */}
            <div className="mb-3 mt-1">
              {type === 'danger' ? (
                <div className="w-11 h-11 rounded-xl bg-rose-500/15 text-rose-500 flex items-center justify-center">
                  <RotateCcw className="w-5 h-5" />
                </div>
              ) : (
                <div className="w-11 h-11 rounded-xl bg-[#FF5F2E]/15 text-[#FF5F2E] flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
              )}
            </div>

            {/* Title & Description */}
            <h3 className="text-sm font-bold mb-1.5 tracking-tight px-1">{title}</h3>
            <p className={`text-[11px] leading-relaxed mb-5 px-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {message}
            </p>

            {/* Action Buttons */}
            <div className="w-full flex items-center gap-2">
              <button
                id="confirm-modal-yes-btn"
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all active:scale-98 shadow-2xs flex justify-center items-center cursor-pointer ${
                  type === 'danger'
                    ? 'bg-rose-500 hover:bg-rose-600 text-white'
                    : 'bg-[#FF5F2E] hover:bg-[#e55025] text-white'
                }`}
              >
                <span>{confirmText}</span>
              </button>

              <button
                id="confirm-modal-no-btn"
                onClick={onClose}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all active:scale-98 border flex justify-center items-center cursor-pointer ${
                  isDark
                    ? 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-300'
                    : 'bg-gray-100 border-gray-200/80 hover:bg-gray-200 text-gray-700'
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


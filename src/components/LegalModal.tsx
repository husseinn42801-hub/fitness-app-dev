import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, FileText, AlertTriangle, Copyright, LucideIcon } from 'lucide-react';

export type LegalModalType = 'privacy' | 'terms' | 'disclaimer' | 'copyright' | null;

interface LegalModalProps {
  type: LegalModalType;
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

export interface LegalDocument {
  id: Exclude<LegalModalType, null>;
  title: string;
  icon: LucideIcon;
  badge: string;
  content: (isDark: boolean) => React.ReactNode;
}

export const LEGAL_DOCUMENTS: Record<Exclude<LegalModalType, null>, LegalDocument> = {
  privacy: {
    id: 'privacy',
    title: 'سياسة الخصوصية',
    icon: Shield,
    badge: 'سياسة الخصوصية وشروط الاستخدام',
    content: (isDark: boolean) => (
      <div className="space-y-3 text-left max-h-[60vh] overflow-y-auto pr-1 text-[11px] leading-relaxed" dir="ltr">
        <h3 className="text-sm font-bold text-[#FF5F2E]">Privacy Policy</h3>
        <p className="text-[10px] text-gray-400 font-semibold">Effective Date: August 3, 2026</p>
        
        <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
          Thank you for using our application.
        </p>
        <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
          We respect your privacy and are committed to protecting your information. This Privacy Policy explains how information is collected, used, and protected when you use our application.
        </p>

        <div className="space-y-1 pt-1">
          <h4 className="font-bold text-[#FF5F2E]">Information We Collect</h4>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            Our application does not require users to create an account or sign in. We do not directly collect or store personal information such as your name, email address, phone number, or password.
          </p>
        </div>

        <div className="space-y-1 pt-1">
          <h4 className="font-bold text-[#FF5F2E]">Local Data Storage</h4>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            The application may store certain user data and preferences locally on your device to improve your experience and retain your settings. This information remains on your device only and is not transmitted to our servers or shared with any third parties.
          </p>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            We do not have access to this locally stored data unless you choose to share it with us.
          </p>
        </div>

        <div className="space-y-1 pt-1">
          <h4 className="font-bold text-[#FF5F2E]">Advertising</h4>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            Our application uses Google AdMob to display advertisements. AdMob may automatically collect certain information, including but not limited to:
          </p>
          <ul className={`list-disc pl-4 space-y-0.5 text-[10px] ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            <li>Advertising ID</li>
            <li>Device information</li>
            <li>IP address</li>
            <li>App usage information</li>
            <li>Approximate location (where permitted by your device settings)</li>
          </ul>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            This information is collected and processed by Google in accordance with its own Privacy Policy.
          </p>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            For more information, please visit:<br />
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-sky-400 underline">
              https://policies.google.com/privacy
            </a>
          </p>
        </div>

        <div className="space-y-1 pt-1">
          <h4 className="font-bold text-[#FF5F2E]">Data Security</h4>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            We do not directly collect, store, or process your personal information. Any information collected through Google AdMob is managed securely by Google according to its own privacy and security practices.
          </p>
        </div>

        <div className="space-y-1 pt-1">
          <h4 className="font-bold text-[#FF5F2E]">Children's Privacy</h4>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            Our application is not intended to knowingly collect personal information from children. If you believe that a child has provided personal information through the application, please contact us so that appropriate action can be taken.
          </p>
        </div>

        <div className="space-y-1 pt-1">
          <h4 className="font-bold text-[#FF5F2E]">Third-Party Services</h4>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            This application uses the following third-party service:
          </p>
          <ul className={`list-disc pl-4 text-[10px] ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            <li>Google AdMob</li>
          </ul>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            These services have their own Privacy Policies governing the collection and processing of information.
          </p>
        </div>

        <div className="space-y-1 pt-1">
          <h4 className="font-bold text-[#FF5F2E]">Changes to This Privacy Policy</h4>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated Effective Date.
          </p>
        </div>

        <div className="space-y-1 pt-1">
          <h4 className="font-bold text-[#FF5F2E]">Contact Us</h4>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            If you have any questions or concerns about this Privacy Policy, please contact us at:
          </p>
          <p className="font-mono text-[10px] text-[#FF5F2E]">
            Email: husseinn428@gmail.com
          </p>
        </div>
      </div>
    )
  },
  terms: {
    id: 'terms',
    title: 'شروط الاستخدام',
    icon: FileText,
    badge: 'شروط وأحكام الاستخدام',
    content: (isDark: boolean) => (
      <div className="space-y-3 text-left max-h-[60vh] overflow-y-auto pr-1 text-[11px] leading-relaxed" dir="ltr">
        <h3 className="text-sm font-bold text-[#FF5F2E]">Terms and Conditions</h3>
        <p className="text-[10px] text-gray-400 font-semibold">Last Updated: August 2026</p>

        <div className="space-y-1 pt-1">
          <h4 className="font-bold text-[#FF5F2E]">1. Acceptance of Terms</h4>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            By downloading, accessing, or using the "Home Workouts & Fitness" application, you agree to be bound by these Terms and Conditions. If you do not agree to all of these terms, please do not use the application.
          </p>
        </div>

        <div className="space-y-1 pt-1">
          <h4 className="font-bold text-[#FF5F2E]">2. Permitted Use</h4>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            This application is designed solely for personal fitness and nutritional guidance. You agree not to use the application for any unlawful purposes, commercial exploitation, redistribution of content, or reverse engineering.
          </p>
        </div>

        <div className="space-y-1 pt-1">
          <h4 className="font-bold text-[#FF5F2E]">3. Personal Responsibility and Safety</h4>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            All workouts, programs, and dietary suggestions provided in the app are intended for healthy individuals. You assume full personal responsibility for exercising within your physical capabilities and following professional medical recommendations.
          </p>
        </div>

        <div className="space-y-1 pt-1">
          <h4 className="font-bold text-[#FF5F2E]">4. Modifications to Service & Terms</h4>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            We reserve the right to modify, update, or discontinue features of the application or these terms at any time to improve user experience or ensure compliance. Continued use after changes constitutes acceptance.
          </p>
        </div>

        <div className="space-y-1 pt-1">
          <h4 className="font-bold text-[#FF5F2E]">5. Contact & Support</h4>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            If you have any questions or reports regarding these Terms of Use, please contact us at:
          </p>
          <p className="font-mono text-[10px] text-[#FF5F2E]">
            Email: husseinn428@gmail.com
          </p>
        </div>
      </div>
    )
  },
  disclaimer: {
    id: 'disclaimer',
    title: 'إخلاء المسؤولية الطبية',
    icon: AlertTriangle,
    badge: 'إخلاء المسؤولية الطبية والصحية',
    content: (isDark: boolean) => (
      <div className="space-y-3 text-left max-h-[60vh] overflow-y-auto pr-1 text-[11px] leading-relaxed" dir="ltr">
        <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 font-bold text-[11px] flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <span>Important Health & Medical Notice</span>
        </div>

        <div className="space-y-1 pt-1">
          <h4 className="font-bold text-[#FF5F2E]">1. Not Professional Medical Advice</h4>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            The information, workout plans, nutrition guides, and recommendations provided in the "Home Workouts & Fitness" application are for educational and informational purposes only and do not constitute professional medical advice, diagnosis, or treatment.
          </p>
        </div>

        <div className="space-y-1 pt-1">
          <h4 className="font-bold text-[#FF5F2E]">2. Consult Your Physician</h4>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            You should always consult a licensed physician or certified healthcare professional before starting any new exercise routine or dietary program, especially if you have pre-existing medical conditions (such as diabetes, hypertension, or heart disease), joint or bone injuries, or are pregnant.
          </p>
        </div>

        <div className="space-y-1 pt-1">
          <h4 className="font-bold text-[#FF5F2E]">3. Discontinue Use if Unwell</h4>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            If you experience sharp pain, dizziness, shortness of breath, or unusual fatigue at any point during physical exercise, stop immediately and seek medical assistance.
          </p>
        </div>

        <div className="space-y-1 pt-1">
          <h4 className="font-bold text-[#FF5F2E]">4. Limitation of Liability</h4>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            The developers of "Home Workouts & Fitness" assume no legal liability or responsibility for any personal injury, health condition, or damages resulting from the use or application of the information contained within the app.
          </p>
        </div>
      </div>
    )
  },
  copyright: {
    id: 'copyright',
    title: 'حقوق الملكية الفكرية',
    icon: Copyright,
    badge: 'حقوق الملكية الفكرية وحقوق النشر',
    content: (isDark: boolean) => (
      <div className="space-y-3 text-left max-h-[60vh] overflow-y-auto pr-1 text-[11px] leading-relaxed" dir="ltr">
        <h3 className="text-sm font-bold text-[#FF5F2E]">Intellectual Property & Copyright</h3>
        <p className="text-[10px] text-gray-400 font-semibold">All Rights Reserved © 2026 Home Workouts & Fitness</p>

        <div className="space-y-1 pt-1">
          <h4 className="font-bold text-[#FF5F2E]">1. Exclusive Ownership</h4>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            All visual designs, text, graphics, software code, algorithms, database structures, icons, sound effects, and multimedia content within "Home Workouts & Fitness" are the exclusive intellectual property of the developers, protected under applicable copyright laws and international treaties.
          </p>
        </div>

        <div className="space-y-1 pt-1">
          <h4 className="font-bold text-[#FF5F2E]">2. Restrictions on Use</h4>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            You may not copy, modify, distribute, reproduce, reverse engineer, or commercially exploit any portion of this application or its content without prior express written permission from the app administration.
          </p>
        </div>

        <div className="space-y-1 pt-1">
          <h4 className="font-bold text-[#FF5F2E]">3. Trademarks</h4>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            The "Home Workouts & Fitness" name, logo, and associated branding assets are protected trademarks. Unauthorized use or misleading representation of these trademarks is strictly prohibited.
          </p>
        </div>

        <div className="space-y-1 pt-1">
          <h4 className="font-bold text-[#FF5F2E]">4. Legal Contact</h4>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            For legal inquiries or permission requests, please contact us via email:
          </p>
          <p className="font-mono text-[10px] text-[#FF5F2E]">
            Email: husseinn428@gmail.com
          </p>
        </div>
      </div>
    )
  }
};

export const LegalModal: React.FC<LegalModalProps> = ({ type, isOpen, onClose, isDark }) => {
  if (!isOpen || !type) return null;

  const doc = LEGAL_DOCUMENTS[type];
  if (!doc) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4 animate-fade-in" dir="rtl">
        {/* Backdrop */}
        <div className="absolute inset-0" onClick={onClose}></div>

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className={`w-full max-w-sm rounded-3xl border overflow-hidden relative z-10 p-6 space-y-4 ${
            isDark ? 'bg-[#161618] border-white/5 text-white' : 'bg-white border-gray-100 text-gray-900 shadow-2xl'
          }`}
        >
          {/* Header Close & Badge Title */}
          <div className="flex justify-between items-center pb-2 border-b border-white/5">
            <h4 className="text-sm font-extrabold flex items-center gap-1.5">
              <span>{doc.badge}</span>
            </h4>
            <button
              onClick={onClose}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isDark ? 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Rendered Content */}
          {doc.content(isDark)}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

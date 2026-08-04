import React from 'react';
import { TutorialGuidePage } from './TutorialGuidePage';

interface TutorialGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

export const TutorialGuideModal: React.FC<TutorialGuideModalProps> = ({
  isOpen,
  onClose,
  isDark,
}) => {
  if (!isOpen) return null;
  return <TutorialGuidePage onBack={onClose} isDark={isDark} />;
};

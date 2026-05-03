import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  const { t } = useLanguage();
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p>{t('loading')}</p>
    </div>
  );
};

export default LoadingSpinner;
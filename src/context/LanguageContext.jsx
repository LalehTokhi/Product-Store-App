import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '../locales/en.json';
import fa from '../locales/fa.json';

const translations = { en, fa };

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        return key;
      }
    }
    return value;
  };

  const changeLanguage = (lng) => {
    setLanguage(lng);
    localStorage.setItem('language', lng);
    document.documentElement.dir = lng === 'fa' ? 'rtl' : 'ltr';
  };

  useEffect(() => {
    document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, t, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
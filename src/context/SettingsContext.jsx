import React, { createContext, useContext, useReducer, useEffect } from 'react';

// حالت اولیه
const initialState = {
  theme: localStorage.getItem('theme') || 'light',
  viewMode: localStorage.getItem('viewMode') || 'grid',
  selectedCategory: 'all',
  language: 'fa',
};

// اکشن‌ها
const ACTIONS = {
  TOGGLE_THEME: 'TOGGLE_THEME',
  SET_VIEW_MODE: 'SET_VIEW_MODE',
  SET_CATEGORY: 'SET_CATEGORY',
  SET_LANGUAGE: 'SET_LANGUAGE',
};

// reducer function
const settingsReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.TOGGLE_THEME:
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return { ...state, theme: newTheme };
      
    case ACTIONS.SET_VIEW_MODE:
      localStorage.setItem('viewMode', action.payload);
      return { ...state, viewMode: action.payload };
      
    case ACTIONS.SET_CATEGORY:
      return { ...state, selectedCategory: action.payload };
      
    case ACTIONS.SET_LANGUAGE:
      localStorage.setItem('language', action.payload);
      return { ...state, language: action.payload };
      
    default:
      return state;
  }
};

// کانتکست
const SettingsContext = createContext();

// Provider
export const SettingsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(settingsReducer, initialState);

  useEffect(() => {
    document.body.className = state.theme;
  }, [state.theme]);

  const toggleTheme = () => {
    dispatch({ type: ACTIONS.TOGGLE_THEME });
  };

  const setViewMode = (mode) => {
    dispatch({ type: ACTIONS.SET_VIEW_MODE, payload: mode });
  };

  const setCategory = (category) => {
    dispatch({ type: ACTIONS.SET_CATEGORY, payload: category });
  };

  const setLanguage = (lang) => {
    dispatch({ type: ACTIONS.SET_LANGUAGE, payload: lang });
  };

  const value = {
    ...state,
    toggleTheme,
    setViewMode,
    setCategory,
    setLanguage,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

// هوک سفارشی برای استفاده از کانتکست
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
};
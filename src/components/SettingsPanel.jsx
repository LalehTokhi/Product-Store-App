import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useSettings } from '../context/SettingsContext';
import './SettingsPanel.css';

const SettingsPanel = () => {
  const { t, language, changeLanguage } = useLanguage();
  const { theme, viewMode, selectedCategory, toggleTheme, setViewMode, setCategory } = useSettings();

  const categories = ['all', "men's clothing", "women's clothing", 'electronics', 'jewelery'];

  const getCategoryLabel = (cat) => {
    if (cat === 'all') return t('settings.allProducts');
    if (cat === "men's clothing") return t('settings.mensClothing');
    if (cat === "women's clothing") return t('settings.womensClothing');
    if (cat === 'electronics') return t('settings.electronics');
    if (cat === 'jewelery') return t('settings.jewelry');
    return cat;
  };

  return (
    <div className="settings-panel">
      <h2>⚙️ {t('settings.title')}</h2>

      <div className="setting-section">
        <h3>🌙 {t('settings.theme')}</h3>
        <div className="theme-buttons">
          <button className={theme === 'light' ? 'active' : ''} onClick={() => theme !== 'light' && toggleTheme()}>
            ☀️ {t('settings.light')}
          </button>
          <button className={theme === 'dark' ? 'active' : ''} onClick={() => theme !== 'dark' && toggleTheme()}>
            🌙 {t('settings.dark')}
          </button>
        </div>
      </div>

      <div className="setting-section">
        <h3>📱 {t('settings.viewMode')}</h3>
        <div className="view-buttons">
          <button className={viewMode === 'grid' ? 'active' : ''} onClick={() => setViewMode('grid')}>
            ▦ {t('settings.gridView')}
          </button>
          <button className={viewMode === 'list' ? 'active' : ''} onClick={() => setViewMode('list')}>
            ☰ {t('settings.listView')}
          </button>
        </div>
      </div>

      <div className="setting-section">
        <h3>📂 {t('settings.categories')}</h3>
        <div className="category-buttons">
          {categories.map((cat) => (
            <button key={cat} className={selectedCategory === cat ? 'active' : ''} onClick={() => setCategory(cat)}>
              {getCategoryLabel(cat)}
            </button>
          ))}
        </div>
      </div>

      <div className="setting-section">
        <h3>🌐 {t('settings.language')}</h3>
        <div className="language-buttons">
          <button onClick={() => changeLanguage('fa')}>{t('settings.persian')}</button>
          <button onClick={() => changeLanguage('en')}>{t('settings.english')}</button>
        </div>
      </div>

      <div className="info-section">
        <h3>ℹ️ {t('settings.savedInfo')}</h3>
        <p>✅ {t('settings.savedTheme')}</p>
        <p>✅ {t('settings.savedCart')}</p>
        <p>✅ {t('settings.savedCache')}</p>
      </div>
    </div>
  );
};

export default SettingsPanel;
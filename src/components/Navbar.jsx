import React from 'react';
import { useSelector } from 'react-redux';
import { useLanguage } from '../context/LanguageContext';
import { useSettings } from '../context/SettingsContext';
import './Navbar.css';

const Navbar = ({ setCurrentPage, currentPage }) => {
  const { t } = useLanguage();
  const { totalQuantity } = useSelector((state) => state.cart);
  const { theme, toggleTheme } = useSettings();

  return (
    <nav className={`navbar ${theme}`}>
      <div className="navbar-container">
        <div className="logo" onClick={() => setCurrentPage('home')}>
          🛍️ <span>Modern Shop</span>
        </div>
        <div className="nav-links">
          <button
            className={`nav-btn ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => setCurrentPage('home')}
          >
            🏠 {t('nav.home')}
          </button>
          <button
            className={`nav-btn ${currentPage === 'cart' ? 'active' : ''}`}
            onClick={() => setCurrentPage('cart')}
          >
            🛒 {t('nav.cart')}
            {totalQuantity > 0 && <span className="cart-badge">{totalQuantity}</span>}
          </button>
          <button
            className={`nav-btn ${currentPage === 'settings' ? 'active' : ''}`}
            onClick={() => setCurrentPage('settings')}
          >
            ⚙️ {t('nav.settings')}
          </button>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
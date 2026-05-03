import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { useSettings } from '../context/SettingsContext';
import { useLanguage } from '../context/LanguageContext';
import './ProductCard.css';

const ProductCard = ({ product, onViewDetails }) => {
  const dispatch = useDispatch();
  const { viewMode, theme } = useSettings();
  const { t, language } = useLanguage();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    const toast = document.createElement('div');
    toast.textContent = t('toastAdded');
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.backgroundColor = '#4caf50';
    toast.style.color = 'white';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = '8px';
    toast.style.zIndex = '9999';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  };

  const getCategoryKey = (category) => {
    if (category === "men's clothing") return 'mensClothing';
    if (category === "women's clothing") return 'womensClothing';
    if (category === 'electronics') return 'electronics';
    if (category === 'jewelery') return 'jewelry';
    return 'allProducts';
  };

  // استفاده از id محصول برای ترجمه عنوان
  const getTranslatedTitle = () => {
    if (language === 'fa') {
      const translated = t(`productTitlesById.${product.id}`);
      if (translated && translated !== `productTitlesById.${product.id}`) {
        return translated;
      }
    }
    return product.title;
  };

  return (
    <div className={`product-card ${viewMode} ${theme}`} onClick={() => onViewDetails(product)}>
      <div className="product-image">
        <img src={product.image} alt={product.title} loading="lazy" />
        <button className="quick-view">{t('productCard.quickView')}</button>
      </div>
      <div className="product-info">
        <h3 className="product-title">{getTranslatedTitle()}</h3>
        <p className="product-category">{t(`settings.${getCategoryKey(product.category)}`)}</p>
        <div className="product-price">
          <span className="price">${product.price}</span>
          <div className="rating">
            ⭐ {product.rating?.rate || 4.5}
            <span>({product.rating?.count || 100})</span>
          </div>
        </div>
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          🛒 {t('productCard.addToCart')}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
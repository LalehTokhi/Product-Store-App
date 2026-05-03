import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { useLanguage } from '../context/LanguageContext';
import './ProductDetails.css';

const ProductDetails = ({ product, onBack }) => {
  const dispatch = useDispatch();
  const { t, language } = useLanguage();

  if (!product) return <div>{t('productList.errorTitle')}</div>;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    alert(t('alertAdded'));
  };

  const getCategoryKey = (category) => {
    if (category === "men's clothing") return 'mensClothing';
    if (category === "women's clothing") return 'womensClothing';
    if (category === 'electronics') return 'electronics';
    if (category === 'jewelery') return 'jewelry';
    return 'allProducts';
  };

  const getTranslatedTitle = () => {
    if (language === 'fa') {
      const translated = t(`productTitlesById.${product.id}`);
      if (translated && translated !== `productTitlesById.${product.id}`) {
        return translated;
      }
    }
    return product.title;
  };

  const getTranslatedDescription = () => {
    if (language === 'fa') {
      const translated = t(`productDescriptionsById.${product.id}`);
      if (translated && translated !== `productDescriptionsById.${product.id}`) {
        return translated;
      }
    }
    return product.description;
  };

  return (
    <div className="product-details">
      <div style={{ textAlign: language === 'fa' ? 'right' : 'left', marginBottom: '20px' }}>
        <button className="back-btn" onClick={onBack}>
          {language === 'fa' ? '→' : '←'} {t('productDetails.backToShop')}
        </button>
      </div>
      <div className="details-container">
        <div className="details-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="details-info">
          <h1>{getTranslatedTitle()}</h1>
          <p className="category">{t(`settings.${getCategoryKey(product.category)}`)}</p>
          <div className="rating-section">
            <span className="stars">★★★★★</span>
            <span className="rating-value">{product.rating?.rate || 4.5}/5</span>
            <span className="review-count">
              ({product.rating?.count || 100} {t('productDetails.reviews')})
            </span>
          </div>
          <p className="description">{getTranslatedDescription()}</p>
          <div className="price-section">
            <span className="price">${product.price}</span>
            <button className="add-to-cart" onClick={handleAddToCart}>
              🛒 {t('productDetails.addToCart')}
            </button>
          </div>
          <div className="features">
            <h3>{t('productDetails.features')}</h3>
            <ul>
              <li>✅ {t('productDetails.authenticity')}</li>
              <li>✅ {t('productDetails.fastShipping')}</li>
              <li>✅ {t('productDetails.returnPolicy')}</li>
              <li>✅ {t('productDetails.support')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
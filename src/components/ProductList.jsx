import React from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from './ProductCard';
import LoadingSpinner from './LoadingSpinner';
import { useSettings } from '../context/SettingsContext';
import { useLanguage } from '../context/LanguageContext';
import './ProductList.css';

const ProductList = ({ onViewDetails }) => {
  const { data: products, isLoading, error } = useProducts();
  const { viewMode, selectedCategory } = useSettings();
  const { t } = useLanguage();

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h3>{t('productList.errorTitle')}</h3>
        <p>{error.message}</p>
        <button onClick={() => window.location.reload()}>{t('productList.retry')}</button>
      </div>
    );

  const filteredProducts =
    selectedCategory === 'all' ? products : products?.filter((p) => p.category === selectedCategory);

  return (
    <div className="product-list-container">
      <div className={`products-grid ${viewMode}`}>
        {filteredProducts?.map((product) => (
          <ProductCard key={product.id} product={product} onViewDetails={onViewDetails} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
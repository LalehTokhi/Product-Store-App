import React from 'react';
import { useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeFromCart } from '../redux/cartSlice';
import { useLanguage } from '../context/LanguageContext';
import './CartItem.css';

const CartItem = ({ item, index }) => {
  const dispatch = useDispatch();
  const { t, language } = useLanguage();

  const getTranslatedTitle = () => {
    if (language === 'fa') {
      const translated = t(`productTitlesById.${item.id}`);
      if (translated && translated !== `productTitlesById.${item.id}`) {
        return translated;
      }
    }
    return item.title;
  };

  return (
    <div className={`cart-item ${index % 2 === 0 ? 'even' : 'odd'}`}>
      <div className="cart-item-image">
        <img src={item.image} alt={item.title} />
      </div>
      <div className="cart-item-info">
        <h3>{getTranslatedTitle()}</h3>
        <p className="cart-item-price">${item.price}</p>
      </div>
      <div className="cart-item-quantity">
        <button onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
      </div>
      <div className="cart-item-total">
        <span>${item.totalPrice.toFixed(2)}</span>
        <button className="remove-btn" onClick={() => dispatch(removeFromCart(item.id))}>
          🗑️ {t('cartItem.remove')}
        </button>
      </div>
    </div>
  );
};

export default CartItem;
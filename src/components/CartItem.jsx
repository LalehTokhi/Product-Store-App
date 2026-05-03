import React from 'react';
import { useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeFromCart } from '../redux/cartSlice';
import { useLanguage } from '../context/LanguageContext';
import './CartItem.css';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { t } = useLanguage();

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.image} alt={item.title} />
      </div>
      <div className="cart-item-info">
        <h3>{item.title}</h3>
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
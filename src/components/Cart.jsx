import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/cartSlice';
import CartItem from './CartItem';
import { useLanguage } from '../context/LanguageContext';
import './Cart.css';

const Cart = () => {
  const { items, totalQuantity, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { t } = useLanguage();

  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-icon">🛒</div>
        <h2>{t('cart.emptyTitle')}</h2>
        <p>{t('cart.emptyMsg')}</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>{t('cart.title')}</h2>
        <button className="clear-cart" onClick={() => dispatch(clearCart())}>
          {t('cart.clearCart')}
        </button>
      </div>
      <div className="cart-items">
        {items.map((item, idx) => (
          <CartItem key={item.id} item={item} index={idx} />
        ))}
      </div>
      <div className="cart-summary">
        <div className="summary-row">
          <span>{t('cart.totalItems')}</span>
          <span>{totalQuantity}</span>
        </div>
        <div className="summary-row">
          <span>{t('cart.subtotal')}</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="summary-row total">
          <span>{t('cart.totalAmount')}</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <button className="checkout-btn">{t('cart.checkout')}</button>
      </div>
    </div>
  );
};

export default Cart;
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      } else {
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 1,
          totalPrice: product.price,
        });
      }
      
      state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalPrice = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
    },
    
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
      state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalPrice = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
    },
    
    increaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity += 1;
        item.totalPrice = item.price * item.quantity;
        state.totalQuantity = state.items.reduce((sum, i) => sum + i.quantity, 0);
        state.totalPrice = state.items.reduce((sum, i) => sum + i.totalPrice, 0);
      }
    },
    
    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.totalPrice = item.price * item.quantity;
        state.totalQuantity = state.items.reduce((sum, i) => sum + i.quantity, 0);
        state.totalPrice = state.items.reduce((sum, i) => sum + i.totalPrice, 0);
      } else if (item && item.quantity === 1) {
        state.items = state.items.filter(i => i.id !== id);
        state.totalQuantity = state.items.reduce((sum, i) => sum + i.quantity, 0);
        state.totalPrice = state.items.reduce((sum, i) => sum + i.totalPrice, 0);
      }
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  increaseQuantity, 
  decreaseQuantity, 
  clearCart 
} = cartSlice.actions;

export default cartSlice.reducer;
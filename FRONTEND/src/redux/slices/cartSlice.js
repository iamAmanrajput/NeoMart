import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    cartItems: [],
    totalQuantity: 0,
    totalPrice: 0,
  },

  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item._id === newItem._id
      );
      if (existingItemIndex === -1) {
        state.cartItems.push({
          ...newItem,
          quantity: newItem.quantity,
          price: newItem.price,
          totalItemPrice: newItem.quantity * newItem.price,
        });
      } else {
        state.cartItems[existingItemIndex].quantity += newItem.quantity;
        state.cartItems[existingItemIndex].totalItemPrice +=
          newItem.price * newItem.quantity;
      }

      state.totalQuantity += newItem.quantity;
      state.totalPrice = Number(
        state.totalPrice + newItem.price * newItem.quantity.toFixed(2)
      );
    },

    removeFromCart: (state, action) => {
      const itemToRemove = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item._id === itemToRemove._id
      );

      if (existingItemIndex === -1) {
        return;
      }

      const existingItem = state.cartItems[existingItemIndex];
      existingItem.quantity -= itemToRemove.quantity;
      existingItem.totalItemPrice -= itemToRemove.price * itemToRemove.quantity;

      state.totalQuantity -= itemToRemove.quantity;
      state.totalPrice -= Number(
        itemToRemove.price * itemToRemove.quantity.toFixed(2)
      );

      if (existingItem.quantity <= 0) {
        state.cartItems = state.cartItems.splice(existingItemIndex, 1);
      }
    },

    emptyCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;

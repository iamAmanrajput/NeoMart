import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    homepageLoader: false,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setHomepageLoader: (state, action) => {
      state.homepageLoader = action.payload;
    },
  },
});

export const { setProducts, setHomepageLoader } = productSlice.actions;
export default productSlice.reducer;

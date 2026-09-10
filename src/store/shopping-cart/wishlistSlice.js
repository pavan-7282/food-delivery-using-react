import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlistItems: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,

  reducers: {
    toggleWishlist(state, action) {
      const newItem = action.payload;
      const existingItem = state.wishlistItems.find((item) => item.id === newItem.id);

      if (!existingItem) {
        state.wishlistItems.push({
          id: newItem.id,
          title: newItem.title,
          image01: newItem.image01,
          price: newItem.price,
        });
      } else {
        state.wishlistItems = state.wishlistItems.filter((item) => item.id !== newItem.id);
      }
    },
  },
});

export const wishlistActions = wishlistSlice.actions;
export default wishlistSlice;

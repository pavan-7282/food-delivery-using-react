import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./shopping-cart/cartSlice";
import cartUiSlice from "./shopping-cart/cartUiSlice";
import authSlice from "./authSlice";
import cartNotificationSlice from "./shopping-cart/cartNotificationSlice";
import wishlistSlice from "./shopping-cart/wishlistSlice";
import logger from 'redux-logger'
import thunk from 'redux-thunk'

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    cartUi: cartUiSlice.reducer,
    auth: authSlice.reducer,
    cartNotification: cartNotificationSlice.reducer,
    wishlist: wishlistSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk, logger),
});

export default store;

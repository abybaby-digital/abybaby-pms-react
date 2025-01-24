import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/filterProducts/FilterSlice";
import authReducer from "./features/Auth/AuthSlice";
import WishlistReducer from "./features/wishlist/WishlistSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    wishlistings: WishlistReducer,
  },
});

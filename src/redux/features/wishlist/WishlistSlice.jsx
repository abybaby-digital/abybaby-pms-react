import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: []
}

const wishListSlice = createSlice({
  name: "wishlistings",
  initialState: initialState,
  reducers: {
    updateWishListItems: (state, action) => {
      state.wishlist = action.payload;
    }
  }
})

export const { updateWishListItems } = wishListSlice.actions;
export default wishListSlice.reducer;
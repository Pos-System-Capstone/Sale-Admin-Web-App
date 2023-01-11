import { createSlice } from '@reduxjs/toolkit';

const initialState = { collections: [], categories: [], stores: [] };

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setCollections: (state, action) => {
      state.collections = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setStores: (state, action) => {
      state.stores = action.payload;
    }
  }
});

export const { setCollections, setCategories, setStores } = adminSlice.actions;
export default adminSlice.reducer;

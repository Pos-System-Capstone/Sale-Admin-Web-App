import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'store',
  initialState: 0,
  reducers: {
    setStoreId(state, action) {
      return action.payload;
    }
  }
});

const { actions, reducer } = slice;
export const { setStoreId } = actions;

export default reducer;

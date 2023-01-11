import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'store',
  initialState: '8caa954a-7b9b-42d4-bc2a-57099260e62f',
  reducers: {
    setBrandId(state, action) {
      return action.payload;
    }
  }
});

const { actions, reducer } = slice;
export const { setBrandId } = actions;

export default reducer;

import { createSlice } from '@reduxjs/toolkit';
import { removeAppToken, removeUserInfo } from '../../utils/utils';

const initialState = { currentUser: null };

const userState = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    logOut: (state) => {
      state.currentUser = null;
      removeAppToken();
      removeUserInfo();
    }
  }
});

export const { setUser, logOut } = userState.actions;
export default userState.reducer;

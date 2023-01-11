import { setAppToken, setUserInfo } from '../../utils/utils';
import request from '../../utils/axios';

const { createAsyncThunk } = require('@reduxjs/toolkit');
const { setUser } = require('.');

const loginByUsername = createAsyncThunk(
  'globals/loginByUsername',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await request.post(`/admin/login`, data);
      if (response && response?.status === 200) {
        const user = {
          name: 'Admin',
          roles: response.data?.apps.find(({ name }) => name === 'sale').role
        };
        setUserInfo(user);
        setAppToken(response.data.access_token);
        dispatch(setUser(user));
        return response.data;
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export { loginByUsername };

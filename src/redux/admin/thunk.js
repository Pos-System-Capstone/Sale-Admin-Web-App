import { setCategories, setCollections, setStores } from '.';
import { getCategories, getCollection, getStores } from './api';

const { createAsyncThunk } = require('@reduxjs/toolkit');

const fetchGlobalState = createAsyncThunk(
  'admin/fetchGlobalState',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const requestArr = [getCollection(), getCategories(), getStores()];

      const [collections, categories, stores] = await Promise.all(requestArr);
      dispatch(setCollections(collections));
      dispatch(setCategories(categories));
      dispatch(setStores(stores));

      return { collections, categories, stores };
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export { fetchGlobalState };

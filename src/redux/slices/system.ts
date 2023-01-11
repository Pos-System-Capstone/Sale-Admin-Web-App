import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'system',
  initialState: '',
  reducers: {
    ResoSale() {
      return 'reso-sale';
    },
    ResoReport() {
      return 'report-system';
    },
    ResoPromotion() {
      return 'promotion-system';
    }
  }
});

const { actions, reducer } = slice;
export const { ResoSale, ResoReport, ResoPromotion } = actions;

export default reducer;

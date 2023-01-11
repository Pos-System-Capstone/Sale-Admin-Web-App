import AxiosMockAdapter from 'axios-mock-adapter';
import axios from 'axios';
// import axios from '../utils/axios';
// ----------------------------------------------------------------------

const axiosMockAdapter = new AxiosMockAdapter(axios, {
  delayResponse: 0
});

// Removing mocking behavior
axiosMockAdapter.restore();

export default axiosMockAdapter;

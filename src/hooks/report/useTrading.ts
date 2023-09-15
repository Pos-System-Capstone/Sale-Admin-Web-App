import axios from 'axios';
import { useQuery } from 'react-query';
/** Get list root categories */
const useTrading = (params = {}) => {
  return useQuery(
    ['trading', params],
    () =>
      axios
        .get('https://stg-report-api.reso.vn/api/v1/system-report', { params })
        .then((res) => res.data.data),
    {
      refetchOnWindowFocus: false
    }
  );
};

export default useTrading;

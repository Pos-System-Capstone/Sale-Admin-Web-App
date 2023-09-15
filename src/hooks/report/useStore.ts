import storeReportApi from 'api/report/store';
import { useQuery } from 'react-query';
/** Get list root categories */
const useStore = (params = {}) => {
  return useQuery(['store', params], () => storeReportApi.get({ params }).then((res) => res.data), {
    refetchOnWindowFocus: false
  });
};

export default useStore;

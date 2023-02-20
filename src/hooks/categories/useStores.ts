import storeApi from 'api/store';
import { useQuery } from 'react-query';
/** Get list root categories */
const useStores = (params?: any) => {
  return useQuery(['stores', params], () => storeApi.get(params), {
    select: (res) => res.data.items
  });
};

export default useStores;

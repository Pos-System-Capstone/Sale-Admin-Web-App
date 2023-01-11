import categoryApi from 'api/category';
import { useQuery } from 'react-query';
/** Get list extras */
const useExtras = (params?: any) => {
  return useQuery(
    ['extras', params],
    () => categoryApi.get({ ...(params || {}), 'is-extra': true }),
    {
      select: (res) => res.data.data
    }
  );
};

export default useExtras;

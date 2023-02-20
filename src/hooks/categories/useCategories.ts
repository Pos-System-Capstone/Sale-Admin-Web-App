import categoryApi from 'api/category';
import { useQuery } from 'react-query';
/** Get list root categories */
const useCategories = (params?: any) => {
  return useQuery(
    ['categories', params],
    () => categoryApi.get(params).then((res) => res.data.items)
    // {
    //   refetchOnWindowFocus: false
    // }
  );
};

export default useCategories;

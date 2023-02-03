import categoryApi from 'api/category';
import { useQuery } from 'react-query';

/** Get category detail */
const useCategory = (cateId?: string) => {
  return useQuery(
    ['categories', cateId],
    () => categoryApi.getById(cateId).then((res) => res.data),
    {
      enabled: Boolean(cateId)
    }
  );
};

export default useCategory;

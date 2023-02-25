import categoryApi from 'api/category';
import { useQuery } from 'react-query';

const useExtraCategoriesInProductCategory = (cateId?: string, params?: any) => {
  return useQuery(
    ['extra', cateId],
    () =>
      categoryApi
        .getExtraCategoriesInProductCategory(cateId!, params)
        .then((res) => res.data.items),
    {
      enabled: Boolean(cateId)
    }
  );
};
export default useExtraCategoriesInProductCategory;

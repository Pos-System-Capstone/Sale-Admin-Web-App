import categoryApi from 'api/category';
import { useQuery } from 'react-query';

/** Get extracategory from `cateId` */
const useExtraCategory = (cateId: string) => {
  return useQuery(
    ['categories', cateId, 'extras'],
    () => categoryApi.getExtraCategoriesFromCateId(cateId).then((res) => res.data.items),
    {
      enabled: Boolean(cateId)
    }
  );
};

export default useExtraCategory;

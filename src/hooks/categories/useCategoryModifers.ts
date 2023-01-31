import categoryApi from 'api/category';
import { useQuery } from 'react-query';

/** Get list modifier of category */
const useCategoryModifiers = (cateId?: string) => {
  return useQuery(
    ['categories', cateId, 'modifiers'],
    () => categoryApi.getModifiersOfCategory(cateId!).then((res) => res.data),
    {
      enabled: Boolean(cateId)
    }
  );
};

export default useCategoryModifiers;

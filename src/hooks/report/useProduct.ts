import productApi from 'api/report/products';
import { useQuery } from 'react-query';
/** Get list root categories */
const useProduct = (params = {}) => {
  return useQuery(
    ['product', params],
    () => productApi.getProductList({ params }).then((res) => res.data),
    {
      refetchOnWindowFocus: false
    }
  );
};

export default useProduct;

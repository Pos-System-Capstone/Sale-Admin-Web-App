import { useQuery, UseQueryOptions } from 'react-query';
import { getProdById } from 'redux/product/api';

const useProduct = (productId: number, config: UseQueryOptions = {}) => {
  return useQuery(['products', +productId], () => getProdById(productId).then((res) => res.data), {
    enabled: Boolean(productId),
    ...(config as any)
  });
};

export default useProduct;

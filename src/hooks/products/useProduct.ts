import productApi from 'api/product';
import { useQuery, UseQueryOptions } from 'react-query';
import { getProdById } from 'redux/product/api';

export const useProduct = (productId: number, config: UseQueryOptions = {}) => {
  return useQuery(['products', +productId], () => getProdById(productId).then((res) => res.data), {
    enabled: Boolean(productId),
    ...(config as any)
  });
};
export const useProducts = (params?: any) => {
  return useQuery(
    ['products', params],
    () => productApi.get(params).then((res) => res.data.items),
    {
      refetchOnWindowFocus: false
    }
  );
};
export const useProductDetail = (productId: string) => {
  return useQuery(
    ['products', productId],
    () => productApi.getById(productId).then((res) => res.data),
    {
      enabled: Boolean(productId)
    }
  );
};

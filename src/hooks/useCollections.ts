/* eslint-disable prettier/prettier */
import collectionApi from 'api/collection';
import { useQuery } from 'react-query';

export const useCollectionDetails = (id: string, params?: any) => {
    return useQuery(['collections', id], () => collectionApi.getCollectionById(id, params).then((res) => res.data), {
        enabled: Boolean(id)
    });
};
export const useProductsInCollection = (collectionId: string, params?: any) => {
    return useQuery(
        ['products', collectionId],
        () =>
            collectionApi.getProductsInCollection(collectionId, params)
                .then((res) => res.data.items),
        {
            enabled: Boolean(collectionId)
        }
    );
};

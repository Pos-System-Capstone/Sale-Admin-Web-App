/* eslint-disable prettier/prettier */
import collectionApi from 'api/collection';
import { useQuery } from 'react-query';

const useCollection = (id?: string) => {
    return useQuery(['collections', id], () => collectionApi.getById(id).then((res) => res.data), {
        enabled: Boolean(id)
    });
};

export default useCollection;

import categoryApi from 'api/category';
import { useMutation, useQueryClient } from 'react-query';
import { TModifier } from 'types/Modifier';

const useAddModifier = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ data, cateId }: { data: Omit<TModifier, 'id'>; cateId: string }) =>
      categoryApi.addModifiersOfCategory(cateId!, data),
    {
      onSuccess: (_, { cateId }) => {
        queryClient.invalidateQueries(['categories', cateId, 'modifiers']);
      }
    }
  );
};

export default useAddModifier;

import categoryApi from 'api/category';
import { useMutation, useQueryClient } from 'react-query';

const useDeleteModifier = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ modifierId, cateId }: { cateId: number; modifierId: number }) =>
      categoryApi.deleteModifiersOfCategory(cateId!, modifierId),
    {
      onSuccess: (_, { cateId }) => {
        queryClient.invalidateQueries(['categories', cateId, 'modifiers']);
      }
    }
  );
};

export default useDeleteModifier;

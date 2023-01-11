import categoryApi from 'api/category';
import { useMutation, useQueryClient } from 'react-query';
import { TModifier } from 'types/Modifier';

const useUpdateModifier = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({
      data,
      cateId,
      modifierId
    }: {
      data: Omit<TModifier, 'id'>;
      cateId: number;
      modifierId: number;
    }) => categoryApi.updateModifiersOfCategory(cateId!, modifierId, data),
    {
      onSuccess: (_, { cateId }) => {
        queryClient.invalidateQueries(['categories', cateId, 'modifiers']);
      }
    }
  );
};

export default useUpdateModifier;

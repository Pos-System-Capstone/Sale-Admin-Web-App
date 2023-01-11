import extraApi from 'api/extra';
import { useMutation } from 'react-query';
import { TCategoryExtra } from 'types/category';

const useAddExtra = () => {
  return useMutation((data: Partial<TCategoryExtra>) => extraApi.create(data), {
    onSuccess: (_) => {
      // queryClient.invalidateQueries(['categories', cateId, 'extras']);
    }
  });
};

export default useAddExtra;

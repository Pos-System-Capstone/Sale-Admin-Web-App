import extraApi from 'api/extra';
import { useMutation } from 'react-query';

const useDeleteExtra = () => {
  return useMutation((extraId: number) => extraApi.delete(extraId!));
};

export default useDeleteExtra;

import request from '../../utils/axios';

export const getActionById = (id: string) => request.get(`/actions/${id}`);

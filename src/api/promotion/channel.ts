import { TPChannelBase } from 'types/promotion/channelPromotions';
import { BaseReponse } from 'types/response';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.promotion;
const getChannels = (params?: any) =>
  request.get<BaseReponse<TPChannelBase>>(`/channels`, { params });

const createChannel = (data?: any) => request.post<TPChannelBase>(`/channels`, data);
const channelPromotionApi = {
  getChannels,
  createChannel
};

export default channelPromotionApi;

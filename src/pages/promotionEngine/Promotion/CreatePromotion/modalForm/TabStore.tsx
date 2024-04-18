import React, { useRef } from 'react';
import ModalStore from './ModalStore';
import ModalChanel from './ModalChanel';
import { Button } from '@mui/material';
import { getUserInfo } from 'utils/utils';
import { Grid } from '@mui/material';
import TagField from 'components/form/TagField';
import { useQuery } from 'react-query';
import storePromotionApi from 'api/promotion/store';
import channelPromotionApi from 'api/promotion/channel';
interface Props {
  stores: any;
  setStores: any;
  channels: any;
  setChannels: any;
}
export default function TabStore({ stores, setStores, channels, setChannels }: Props) {
  const userRaw = getUserInfo();
  const user: any = JSON.parse(userRaw ?? '{}');
  const tableRef = useRef<any>();

  const { data: storeList } = useQuery(['Store'], async () => {
    return storePromotionApi
      .getStores({ brandId: user.brandId, page: 1, size: 100 })
      .then((res) => res.data.items);
  });

  const arrayStore = storeList
    ? stores.map((storeId: string) => {
        const store = storeList.find((store: any) => store.storeId == storeId);
        return store?.storeName;
      })
    : [];

  const { data: channelList } = useQuery(['Channels'], async () => {
    return channelPromotionApi
      .getChannels({ brandId: user.brandId, page: 1, size: 100 })
      .then((res) => res.data.items);
  });
  const arrayChannel = channelList
    ? channels.map((channelId: string) => {
        const channel = channelList.find((channel: any) => channel.channelId == channelId);
        return channel?.channelName;
      })
    : [];

  return (
    <Grid container spacing={4}>
      <Grid container item xs={6}>
        <Grid item xs={12}>
          <ModalStore
            brandId={user.brandId}
            trigger={<Button variant="outlined">Chọn cửa hàng cho khuyến mãi</Button>}
            onReload={() => tableRef.current?.reload()}
            selectedStoreIds={stores}
            update={setStores}
          />
        </Grid>
        <Grid item xs={12}>
          <TagField dataArray={arrayStore} />
        </Grid>
      </Grid>
      <Grid container item xs={6}>
        <Grid item xs={12}>
          <ModalChanel
            brandId={user.brandId}
            trigger={<Button variant="outlined">Chọn kênh cho khuyến mãi</Button>}
            onReload={() => tableRef.current?.reload()}
            selectedChannelIds={channels}
            update={setChannels}
          />
        </Grid>
        <Grid item xs={12}>
          <TagField dataArray={arrayChannel} />
        </Grid>
      </Grid>
    </Grid>
  );
}

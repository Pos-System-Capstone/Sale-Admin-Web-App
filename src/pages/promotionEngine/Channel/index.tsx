// import { TabContext, TabList } from '@mui/lab';
// material
import { Icon } from '@iconify/react';
import { Button, Card } from '@mui/material';
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import React, { useRef, useEffect } from 'react';
// components
import { useNavigate } from 'react-router-dom';
import { PATH_PROMOTION_APP } from 'routes/promotionAppPaths';
import { fDateTime } from 'utils/formatTime';
import { useSnackbar } from 'notistack';
import { getUserInfo } from 'utils/utils';
import plusFill from '@iconify/icons-eva/plus-fill';
import channelPromotionApi from 'api/promotion/channel';

export default function ChannelPromotion() {
  // const [activeTab, setActiveTab] = useState('1');
  const ref = useRef<any>();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { t } = useLocales();
  const userRaw = getUserInfo();
  const user: any = JSON.parse(userRaw ?? '{}');
  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      hideInSearch: true
    },
    {
      title: 'ID',
      dataIndex: 'channelId',
      hideInSearch: true
    },
    {
      title: 'Tên kênh',
      dataIndex: 'channelName',
      hideInSearch: true
    },
    {
      title: 'Mã kênh',
      dataIndex: 'channelCode',
      hideInSearch: true
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'insDate',
      render: (values: any) => fDateTime(values),
      hideInSearch: true
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'updDate',
      render: (values: any) => fDateTime(values),
      hideInSearch: true
    }
  ];

  useEffect(() => {
    if (ref.current) {
      ref.current.formControl.setValue('brandId', user.brandId!);
    }
  }, [user]);
  return (
    <Page
      title="Kênh bán hàng"
      actions={() => [
        <Button
          key="add-product"
          onClick={() => {
            navigate(PATH_PROMOTION_APP.promotion_channel.new);
          }}
          variant="contained"
          startIcon={<Icon icon={plusFill} />}
        >
          Thêm kênh
        </Button>
      ]}
    >
      <Card>
        <ResoTable
          ref={ref}
          pagination
          getData={(params: any) => channelPromotionApi.getChannels(params)}
          columns={columns}
          rowKey="id"
        />
      </Card>
    </Page>
  );
}

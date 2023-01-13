import { Avatar, Card, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import brandApi from 'api/brand';
import Page from 'components/Page';
import ResoDescriptions, { ResoDescriptionColumnType } from 'components/ResoDescriptions';
import ResoTable from 'components/ResoTable/ResoTable';

import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { TBrandDetail } from 'types/brand';
import { TStore } from 'types/store';

const BrandDetailPage = () => {
  const { brandId } = useParams();

  const { data: brand, isLoading } = useQuery(
    ['brands', brandId],
    () => brandApi.getBrandDetail(brandId!).then((res) => res.data),
    {
      enabled: Boolean(brandId)
    }
  );

  const brandDetailColumns: ResoDescriptionColumnType<TBrandDetail>[] = [
    {
      title: 'STT',
      dataIndex: 'index'
    },
    {
      title: 'Tên nhãn hiệu',
      dataIndex: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },
    {
      title: 'Điện thoại',
      dataIndex: 'phone',
      hideInSearch: true
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      hideInSearch: true
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status'
    },
    {
      title: 'Số lượng cửa hàng: ',
      dataIndex: 'numberOfStores'
    }
  ];

  const storeDetailColumns: ResoDescriptionColumnType<TStore>[] = [
    {
      title: 'STT',
      dataIndex: 'index',
      hideInSearch: true
    },
    {
      title: 'Tên đầy đủ',
      dataIndex: 'name',
      hideInSearch: true
    },
    {
      title: 'Tên rút gọn',
      dataIndex: 'shortName'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      hideInSearch: true
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      hideInSearch: true
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      hideInSearch: true
    }
  ];

  return (
    <Page title={`Chi tiết nhãn hiệu: ${brand?.name}`}>
      <Card>
        {brand?.picUrl ? (
          <>
            <DialogTitle
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Typography variant="h5">Hình ảnh Logo</Typography>
            </DialogTitle>

            <DialogContent sx={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar alt="Remy Sharp" src={brand.picUrl} sx={{ width: 100, height: 100 }} />
            </DialogContent>
          </>
        ) : (
          <></>
        )}

        <DialogContent dividers>
          <Stack spacing={2}>
            <ResoDescriptions
              title="Thông tin"
              labelProps={{ fontWeight: 'bold' }}
              columns={brandDetailColumns as any}
              datasource={brand}
              column={2}
            />
          </Stack>
        </DialogContent>

        <Stack spacing={2}>
          <ResoTable
            showAction={false}
            rowKey="store_id"
            getData={(params: any) => brandApi.getStoreOfBrand(brandId!, params)}
            columns={storeDetailColumns}
          />
        </Stack>
      </Card>
    </Page>
  );
};

export default BrandDetailPage;

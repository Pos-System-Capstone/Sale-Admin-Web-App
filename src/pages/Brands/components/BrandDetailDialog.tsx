import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
import { Avatar } from '@mui/material';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Link,
  Typography
} from '@mui/material';
import brandApi from 'api/brand';
import ResoDescriptions, { ResoDescriptionColumnType } from 'components/ResoDescriptions';
import { Link as RouterLink } from 'react-router-dom';

import React from 'react';
import { useQuery } from 'react-query';
import { TBrandDetail } from 'types/brand';
import { PATH_DASHBOARD } from 'routes/paths';

type Props = {
  open: boolean;
  onClose: VoidFunction;
  brandId?: string | null;
};

const BrandDetailDialog: React.FC<Props> = ({ open, onClose, brandId }) => {
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
      title: 'Số lượng Store của brand',
      dataIndex: 'name',
      render: (brand: TBrandDetail) => (
        <Link component={RouterLink} to={PATH_DASHBOARD.brand.storeInBrand(brand.id)}>
          <Typography>{brand.name}</Typography>
        </Link>
      )
    }
  ];

  return (
    <Dialog maxWidth="lg" scroll="paper" open={open} onClose={onClose}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <DialogTitle
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Typography variant="h4">Chi tiết nhãn hiệu</Typography>
            <IconButton aria-label="close" onClick={onClose} size="large">
              <Icon icon={closeFill} />
            </IconButton>
          </DialogTitle>

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
                column={3}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Đóng</Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default BrandDetailDialog;

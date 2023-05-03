// import { Label } from '@mui/icons-material';
// import AutocompleteCategory from 'components/form/common/Category/AutocompleteCategory';
import { Box, Chip } from '@mui/material';
import { PRODUCT_TYPE_DATA } from 'constraints';
import { TProduct } from 'types/product';
import { TTableColumn } from 'types/table';

export const productColumns: TTableColumn<TProduct>[] = [
  {
    title: 'STT',
    dataIndex: 'index',
    hideInSearch: true
  },
  {
    title: 'Hình ảnh',
    dataIndex: 'picUrl',
    hideInSearch: true,
    render: (src, { name }: any) => (
      // <Avatar alt={name} src={src} variant="circular" style={{ width: '54px', height: '54px' }} />
      <Box
        component="img"
        alt={name}
        src={
          src ??
          'https://firebasestorage.googleapis.com/v0/b/pos-system-47f93.appspot.com/o/files%2Fproduct.png?alt=media&token=8eb70c21-2c0e-4d5c-b92a-0b93c3020c9b'
        }
        sx={{ width: 48, height: 48, borderRadius: 1.5 }}
      />
    )
  },
  {
    title: 'Tên sản phẩm',
    dataIndex: 'name'
  },
  {
    title: 'Giá bán',
    dataIndex: 'sellingPrice',
    hideInSearch: true,
    valueType: 'money'
  },
  {
    title: 'Mã sản phẩm',
    dataIndex: 'code',
    hideInSearch: true
  },
  {
    title: 'Loại Sản Phẩm',
    dataIndex: 'type',
    valueType: 'select',
    valueEnum: PRODUCT_TYPE_DATA,
    render: (type) => <Chip label={PRODUCT_TYPE_DATA.find(({ value }) => value === type)?.label} />
  }
  // {
  //   title: 'Trạng thái',
  //   dataIndex: 'status',
  //   width: 150,
  //   render: (status) =>
  //     status == ProductStatusEnum.Active ? (
  //       <Label color="primary">Hoạt Động</Label>
  //     ) : (
  //       <Label color="disabled">Tạm ẩn</Label>
  //     ),
  //   valueEnum: [
  //     {
  //       label: 'Hoạt động',
  //       value: ProductStatusEnum.Active,
  //       color: 'primary'
  //     },
  //     {
  //       label: 'Tạm ẩn',
  //       value: ProductStatusEnum.Deactive,
  //       color: 'disabled'
  //     }
  //   ],
  //   valueType: 'select',
  //   hideInSearch: true,
  //   formProps: {
  //     fullWidth: true
  //   }
  // }
];

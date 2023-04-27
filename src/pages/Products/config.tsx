// import { Label } from '@mui/icons-material';
// import AutocompleteCategory from 'components/form/common/Category/AutocompleteCategory';
import { Avatar, Chip } from '@mui/material';
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
      <Avatar alt={name} src={src} variant="circular" style={{ width: '54px', height: '54px' }} />
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
    hideInSearch: true,
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

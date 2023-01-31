import { Chip } from '@mui/material';
// import AutocompleteCategory from 'components/form/common/Category/AutocompleteCategory';
import Label from 'components/Label';

import { TTableColumn } from 'types/table';
import { TUser, UserStatus } from 'types/user';

export const accountColumns: TTableColumn<TUser>[] = [
  {
    title: 'STT',
    dataIndex: 'index',
    hideInSearch: true
  },
  // {
  //   title: 'Hình ảnh',
  //   dataIndex: 'pic_url',
  //   hideInSearch: true,
  //   render: (src, { product_name }: any) => (
  //     <Avatar
  //       alt={product_name}
  //       src={src}
  //       variant="square"
  //       style={{ width: '54px', height: '54px' }}
  //     />
  //   )
  // },
  {
    title: 'Tên tài khoản',
    dataIndex: 'username'
  },
  {
    title: 'Họ và tên',
    dataIndex: 'name'
  },
  // {
  //   title: 'Giá mặc định',
  //   dataIndex: 'price',
  //   hideInSearch: true
  // },
  // {
  //   title: 'Danh mục',
  //   dataIndex: 'cate_name',
  //   renderFormItem: () => <AutocompleteCategory name="cat-id" label="Danh mục" />
  // },
  {
    title: 'Loại Sản Phẩm',
    dataIndex: 'role',
    // hideInSearch: true
    render: (type) => <Chip label={type} />
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    width: 150,
    render: (status) => (
      <Label color={status == UserStatus.ACTIVE ? 'primary' : 'default'}>
        {status == UserStatus.ACTIVE ? 'Hoạt động' : 'Ngừng hoạt động'}
      </Label>
    ),
    // valueEnum: [
    //   {
    //     label: 'Đang bán',
    //     value: 'true'
    //   },
    //   {
    //     label: 'Ngừng bán',
    //     value: 'false'
    //   }
    // ],
    valueType: 'select',
    formProps: {
      fullWidth: true
    }
  }
];

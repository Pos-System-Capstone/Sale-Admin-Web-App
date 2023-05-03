import { Box } from '@mui/material';
import AutocompleteCategory from 'components/form/common/Category/AutocompleteCategory';
import Label from 'components/Label';
import React from 'react';
import { TProductBase } from 'types/product';
import { TTableColumn } from 'types/table';

export const comboColumns: TTableColumn<TProductBase>[] = [
  {
    title: 'STT',
    dataIndex: 'index',
    hideInSearch: true
  },
  {
    title: 'Hình ảnh',
    dataIndex: 'pic_url',
    hideInSearch: true,
    render: (src, { product_name }: any) => (
      <Box
        component="img"
        alt={product_name}
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
    dataIndex: 'product_name'
  },
  {
    title: 'Giá mặc định',
    dataIndex: 'price',
    hideInSearch: true
  },
  {
    title: 'Danh mục',
    dataIndex: 'cate_name',
    renderFormItem: () => <AutocompleteCategory isExtra={false} name="cat-id" label="Danh mục" />
  },
  {
    title: 'Trạng thái',
    dataIndex: 'is_available',
    width: 150,
    render: (available) => (
      <Label color={available ? 'primary' : 'default'}>
        {available ? 'Đang bán' : 'Ngừng bán'}
      </Label>
    ),
    valueEnum: [
      {
        label: 'Đang bán',
        value: 'true'
      },
      {
        label: 'Ngừng bán',
        value: 'false'
      }
    ],
    valueType: 'select',
    formProps: {
      fullWidth: true
    }
  }
];

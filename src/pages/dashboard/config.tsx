import { Avatar } from '@mui/material';
import { TBlog } from 'types/blog';
// import { TPost } from 'types/order';
import { TTableColumn } from 'types/table';

export const postColumns: TTableColumn<TBlog>[] = [
  {
    title: 'STT',
    dataIndex: 'index',
    hideInSearch: true
  },
  {
    title: 'Hình ảnh',
    dataIndex: 'image',
    hideInSearch: true,
    render: (src, { title }: any) => (
      <Avatar alt={title} src={src} variant="square" style={{ width: '54px', height: '54px' }} />
    )
  },
  {
    title: 'Tiêu đề',
    dataIndex: 'title'
  }
  // {
  //   title: 'Sắp xếp theo',
  //   dataIndex: 'Direction',
  //   valueType: 'select',
  //   valueEnum: [
  //     {
  //       label: 'Mới nhất',
  //       value: 'dsc'
  //     },
  //     {
  //       label: 'Cũ nhất',
  //       value: 'asc'
  //     }
  //   ],
  //   render: (direction) => <Label>{direction === 'dsc' ? 'Mới nhất' : 'Cũ nhất'}</Label>
  // }
];

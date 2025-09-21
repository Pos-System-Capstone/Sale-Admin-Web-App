import TagField from 'components/form/TagField';
import { TTableColumn } from 'types/table';

export const variantColumn: TTableColumn<any>[] = [
  {
    title: `STT`,
    dataIndex: 'index',
    hideInSearch: true
  },
  { title: 'Tên', dataIndex: 'name', hideInSearch: true },
  {
    title: `Giá trị`,
    dataIndex: 'value',
    hideInSearch: true,
    render: (value: any) => <TagField data={value} punctuation={'_'} />
  },
  {
    title: `Mức độ ưu tiên`,
    dataIndex: 'displayOrder',
    hideInSearch: true
  }
];

import { Stack } from '@mui/material';
import membershipsApi from 'api/promotion/membership';
import Label from 'components/Label';
import ResoTable from 'components/ResoTable/ResoTable';
import { useParams } from 'react-router';
import { TTransactionByMemberShipId } from 'types/promotion/membership';
import { TTableColumn } from 'types/table';
import { getUserInfo } from 'utils/utils';
type Props = {
  watch?: any;
};
export default function TabTwo({ watch }: Props) {
  const userRaw = getUserInfo();
  const user: any = JSON.parse(userRaw ?? '{}');
  const { id } = useParams();

  const membershipsColumns: TTableColumn<TTransactionByMemberShipId>[] = [
    {
      title: 'STT',
      dataIndex: 'index',
      hideInSearch: true
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      hideInSearch: true
    },
    {
      title: 'Giá trị',
      dataIndex: 'amount',
      hideInSearch: true,

      render: (value: any, mem: TTransactionByMemberShipId) => (
        <Label
          color={
            mem.isIncrease === true ? 'success' : mem.isIncrease === false ? 'error' : 'default'
          }
        >
          {mem.isIncrease === true ? '+' : mem.isIncrease === false ? '-' : ''} {value}{' '}
          {mem.currency}
        </Label>
      )
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'insDate',
      valueType: 'date',
      hideInSearch: true
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'updDate',
      valueType: 'date',
      hideInSearch: true
    }
  ];
  return (
    <>
      <Stack width="100%">
        <ResoTable
          pagination
          getData={(params: any) => membershipsApi.getTransactionByMembershipId(id, params)}
          // onEdit={() => console.log('edit')}
          // onEdit={(params: any) =>
          //   navigate(`${PATH_PROMOTION_APP.membership.root}/${params.membershipId}`)
          // }
          onDelete={() => console.log('delete')}
          columns={membershipsColumns}
          rowKey="membership_id"
        />
      </Stack>
    </>
  );
}

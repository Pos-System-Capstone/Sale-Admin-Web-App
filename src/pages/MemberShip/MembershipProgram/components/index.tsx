import Page from 'components/Page';
import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import { PATH_PROMOTION_APP } from 'routes/promotionAppPaths';
import { TabContext } from '@mui/lab';
import ResoTable from 'components/ResoTable/ResoTable';
import { getUserInfo } from 'utils/utils';
import membershipsApi from 'api/promotion/membership';
import { TMembershipProgram } from 'types/promotion/membership';
import { TTableColumn } from 'types/table';
import Label from 'components/Label';

export default function MemberShipProgramsList() {
  const [activeTab, setActiveTab] = useState('1');
  const ref = useRef<any>();
  const navigate = useNavigate();
  const userRaw = getUserInfo();
  const user: any = JSON.parse(userRaw ?? '{}');
  const { id } = useParams();

  const membershipProgramColumns: TTableColumn<any>[] = [
    {
      title: 'STT',
      dataIndex: 'index',
      hideInSearch: true
    },
    {
      title: 'Tên chương trình',
      dataIndex: 'nameOfProgram',
      hideInSearch: true
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'startDay',
      valueType: 'datetime',
      hideInSearch: true
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'endDay',
      valueType: 'datetime',
      hideInSearch: true
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      hideInSearch: true,
      render: (value: any, transaction: TMembershipProgram) => (
        <Label color={transaction.status == 'ACTIVE' ? 'success' : 'default'}>
          {transaction.status == 'ACTIVE' ? 'Hoạt động' : 'Dừng hoạt động'}
        </Label>
      )
    }
  ];

  useEffect(() => {
    if (ref.current) {
      ref.current.formControl.setValue('apiKey', user.brandId);
    }
  }, [user]);

  return (
    <Page title="Danh sách chương trình thành viên" actions={() => []}>
      <Card>
        <TabContext value={activeTab}>
          <ResoTable
            ref={ref}
            pagination
            getData={(params: any) => membershipsApi.getMembershipPrograms(params)}
            // onEdit={() => console.log('edit')}
            onEdit={(params: any) =>
              navigate(`${PATH_PROMOTION_APP.membershipProgram.root}/${params.id}`)
            }
            onDelete={() => console.log('delete')}
            columns={membershipProgramColumns}
            rowKey="membership_id"
          />
        </TabContext>
      </Card>
    </Page>
  );
}

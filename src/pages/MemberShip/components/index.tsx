import Page from 'components/Page';
import React, { useEffect, useRef, useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Button, Card } from '@mui/material';
import { useNavigate } from 'react-router';
import { PATH_PROMOTION_APP } from 'routes/promotionAppPaths';
import { Icon } from '@iconify/react';
import { TabContext } from '@mui/lab';
import ResoTable from 'components/ResoTable/ResoTable';
import { getUserInfo } from 'utils/utils';
import membershipsApi from 'api/promotion/membership';
import { TMembership } from 'types/promotion/membership';
import { TTableColumn } from 'types/table';

export default function MemberShipList() {
  const [activeTab, setActiveTab] = useState('1');
  const ref = useRef<any>();
  const navigate = useNavigate();
  const userRaw = getUserInfo();
  const user: any = JSON.parse(userRaw ?? '{}');

  const membershipsColumns: TTableColumn<TMembership>[] = [
    {
      title: 'Tên thành viên',
      dataIndex: 'fullname',
      hideInSearch: true
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber'
    },
    {
      title: 'Ngày đăng ký',
      dataIndex: 'insDate',
      valueType: 'date',
      hideInSearch: true
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'updDate',
      valueType: 'date',
      hideInSearch: true
    }
  ];

  useEffect(() => {
    if (ref.current) {
      ref.current.formControl.setValue('apiKey', user.brandId);
    }
  }, [user]);

  return (
    <Page
      title="Danh sách thành viên"
      actions={() => [
        <Button
          key="add-product"
          onClick={() => {
            navigate(PATH_PROMOTION_APP.membership.new);
          }}
          variant="contained"
          startIcon={<Icon icon={plusFill} />}
        >
          Thêm thành viên
        </Button>
      ]}
      width="100%"
    >
      <Card>
        <TabContext value={activeTab}>
          <ResoTable
            ref={ref}
            pagination
            getData={(params: any) => membershipsApi.getMemberships(params)}
            // onEdit={() => console.log('edit')}
            onEdit={(params: any) =>
              navigate(`${PATH_PROMOTION_APP.membership.root}/${params.membershipId}`)
            }
            onDelete={() => console.log('delete')}
            columns={membershipsColumns}
            rowKey="membership_id"
          />
        </TabContext>
      </Card>
    </Page>
  );
}

/* eslint-disable camelcase */
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import { Button, Card, Stack } from '@mui/material';
import giftApi from 'api/promotion/gift';
// components
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
// material
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH_PROMOTION_APP } from 'routes/promotionAppPaths';
import { TCollection } from 'types/collection';
import { GIFT_TYPE_DATA, TGiftBase } from 'types/promotion/gift';
import { TTableColumn } from 'types/table';
import { getUserInfo } from 'utils/utils';

const GiftPage = () => {
  const navigate = useNavigate();
  const { translate } = useLocales();
  const tableRef = useRef<any>();
  const userRaw = getUserInfo();
  const user: any = JSON.parse(userRaw ?? '{}');
  const [currentDeleteItem, setCurrentDeleteItem] = useState<TCollection | null>(null);
  const GIFT_TYPE_ENUM = GIFT_TYPE_DATA();
  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.formControl.setValue('brandId', user.brandId);
      tableRef.current.formControl.setValue('status', 0);
    }
  }, [user]);
  const columns: TTableColumn<TGiftBase>[] = [
    {
      title: 'STT',
      dataIndex: 'index',
      hideInSearch: true
    },
    {
      title: 'Name',
      dataIndex: 'name',
      hideInSearch: true
    },
    {
      title: 'Type',
      dataIndex: 'postActionType',
      valueEnum: GIFT_TYPE_ENUM
    },
    {
      title: 'Created Date',
      dataIndex: 'insDate',
      hideInSearch: true
    },
    {
      title: 'Updated Date',
      dataIndex: 'updDate',
      hideInSearch: true
    }
  ];

  return (
    <Page
      title={translate('collections.list')}
      actions={() => [
        <Button
          key="add-collection"
          onClick={() => {
            navigate(PATH_PROMOTION_APP.gift.new);
          }}
          variant="contained"
          startIcon={<Icon icon={plusFill} />}
        >
          {translate('menu.promotion.giftBtn')}
        </Button>
      ]}
    >
      <Card>
        <Stack spacing={2}>
          <ResoTable
            ref={tableRef}
            onEdit={(collecton: TCollection) =>
              navigate(`${PATH_PROMOTION_APP.gift.root}/${collecton.id}`, {
                state: collecton
              })
            }
            onDelete={setCurrentDeleteItem}
            rowKey="id"
            getData={(params: any) => giftApi.get(params)}
            columns={columns}
          />
        </Stack>
      </Card>
    </Page>
  );
};

export default GiftPage;

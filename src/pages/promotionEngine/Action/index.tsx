/* eslint-disable camelcase */
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
// material
import { Button, Card, Stack } from '@mui/material';
import actionApi from 'api/promotion/action';

// import storeApi from 'api/store';
import { DeleteConfirmDialog } from 'components/DeleteConfirmDialog';

import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import { get } from 'lodash';
import { useSnackbar } from 'notistack';
import { useEffect, useRef, useState } from 'react';
// components
import { useNavigate } from 'react-router-dom';
import { PATH_PROMOTION_APP } from 'routes/promotionAppPaths';
import { ACTION_TYPE_DATA } from 'types/promotion/action';
// import { TStore } from 'types/store';
import { TActionBase } from 'types/promotion/action';
import { fDateTime } from 'utils/formatTime';
import { getUserInfo } from 'utils/utils';
const ActionPage = () => {
  const ACTION_TYPE_ENUM = ACTION_TYPE_DATA();

  const navigate = useNavigate();
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const [currentDeleteItem, setCurrentDeleteItem] = useState<TActionBase | null>(null);
  const tableRef = useRef<any>();
  // const brandId = useSelector((state: RootState) => state.brand);

  const userRaw = getUserInfo();
  const user: any = JSON.parse(userRaw ?? '{}');

  const deleteStoreHandler = () =>
    actionApi
      .deleteAction(currentDeleteItem?.actionId)
      .then(() => setCurrentDeleteItem(null))
      .then(tableRef.current?.reload)
      .then(() =>
        enqueueSnackbar(`Xóa thành công`, {
          variant: 'success'
        })
      )
      .catch((err: any) => {
        const errMsg = get(err.response, ['data', 'message'], `Có lỗi xảy ra. Vui lòng thử lại`);
        enqueueSnackbar(errMsg, {
          variant: 'error'
        });
      });
  const columns = [
    {
      title: 'No',
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
      dataIndex: 'actionType',
      hideInSearch: true,
      valueEnum: ACTION_TYPE_ENUM
    },
    {
      title: 'Created date',
      dataIndex: 'insDate',
      render: (values: any) => fDateTime(values),
      hideInSearch: true
    },
    {
      title: 'Updated date',
      dataIndex: 'updDate',
      render: (values: any) => fDateTime(values),
      hideInSearch: true
    }
  ];

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.formControl.setValue('brandId', user.brandId!);
      tableRef.current.formControl.setValue('ActionType', 0);
    }
  }, [user]);

  return (
    <Page
      // title={`${translate('pages.stores.listTitle')}`}
      title="Danh sách Action"
      actions={() => [
        <Button
          key="create-store"
          onClick={() => {
            navigate(PATH_PROMOTION_APP.action.new);
          }}
          variant="contained"
          startIcon={<Icon icon={plusFill} />}
        >
          {translate('menu.promotion.actionBtn')}
        </Button>
      ]}
    >
      <DeleteConfirmDialog
        open={Boolean(currentDeleteItem)}
        onClose={() => setCurrentDeleteItem(null)}
        onDelete={deleteStoreHandler}
        title={
          <>
            {translate('common.confirmDeleteTitle')} <strong>{currentDeleteItem?.name}</strong>
          </>
        }
      />
      <Card>
        <Stack spacing={2}>
          <ResoTable
            rowKey="id"
            ref={tableRef}
            onEdit={(stores: any) =>
              navigate(`${PATH_PROMOTION_APP.action.root}/${stores.actionId}`)
            }
            getData={(params: any) => actionApi.get(params)}
            onDelete={setCurrentDeleteItem}
            columns={columns}
          />
        </Stack>
      </Card>
    </Page>
  );
};

export default ActionPage;

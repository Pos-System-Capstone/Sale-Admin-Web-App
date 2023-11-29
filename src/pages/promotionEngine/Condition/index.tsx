/* eslint-disable camelcase */
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
// material
import { Button, Card, Stack } from '@mui/material';
import conditionApi from 'api/promotion/condition';
import CategoryModal from 'components/CategoryModal';
import { DeleteConfirmDialog } from 'components/DeleteConfirmDialog';
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import { get } from 'lodash';
import { useSnackbar } from 'notistack';
import { useEffect, useRef, useState } from 'react';
// components
import { useNavigate } from 'react-router-dom';
import { addCategoy, deleteCategoyById, editCategory } from 'redux/category/api';
import { PATH_PROMOTION_APP } from 'routes/promotionAppPaths';
import { TCategory } from 'types/category';
import { TConditionBase } from 'types/promotion/condition';
import { TTableColumn } from 'types/table';
import { fDateTime } from 'utils/formatTime';
import { getUserInfo } from 'utils/utils';

const ConditionPage = ({ isExtra = false }: { isExtra?: boolean }) => {
  const navigate = useNavigate();
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();

  const tableRef = useRef<any>();
  const [formModal, setFormModal] = useState(false);
  const [updateCateId, setUpdateCateId] = useState<number | null>(null);
  const [currentDeleteItem, setCurrentDeleteItem] = useState<TCategory | null>(null);
  // const brandId = useSelector((state: RootState) => state.brand);
  const userRaw = getUserInfo();
  const user: any = JSON.parse(userRaw ?? '{}');
  const columns: TTableColumn<TConditionBase>[] = [
    {
      title: 'STT',
      dataIndex: 'index',
      hideInSearch: true
    },
    {
      title: 'TÊN',
      dataIndex: 'ruleName',
      hideInSearch: true
    },
    {
      title: 'Ngày chỉnh sửa',
      dataIndex: 'updDate',
      render: (value) => fDateTime(value),
      hideInSearch: true
    }
  ];

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.formControl.setValue('BrandId', user.brandId!);
    }
  }, [user]);

  const addCategoryHander = (values: TCategory) =>
    addCategoy(values)
      .then(() =>
        enqueueSnackbar(`Tạo thành công`, {
          variant: 'success'
        })
      )
      .then(() => setUpdateCateId(null))
      .then(tableRef.current?.reload)
      .catch((err) => {
        const errMsg = get(err.response, ['data', 'message'], `Có lỗi xảy ra. Vui lòng thử lại`);
        enqueueSnackbar(errMsg, {
          variant: 'error'
        });
      });

  const editCategoryHander = (values: TCategory) =>
    editCategory(updateCateId!, values)
      .then(tableRef.current?.reload)
      .then(() =>
        enqueueSnackbar(`Cập nhật thành công`, {
          variant: 'success'
        })
      )
      .catch((err) => {
        const errMsg = get(err.response, ['data', 'message'], `Có lỗi xảy ra. Vui lòng thử lại`);
        enqueueSnackbar(errMsg, {
          variant: 'error'
        });
      });

  const deleteCategoryHander = () =>
    deleteCategoyById(currentDeleteItem?.name!)
      .then(() => setCurrentDeleteItem(null))
      .then(tableRef.current?.reload)
      .then(() =>
        enqueueSnackbar(`Xóa thành công`, {
          variant: 'success'
        })
      )
      .then(() => tableRef.current?.reload())
      .catch((err) => {
        const errMsg = get(err.response, ['data', 'message'], `Có lỗi xảy ra. Vui lòng thử lại`);
        enqueueSnackbar(errMsg, {
          variant: 'error'
        });
      });

  return (
    <Page
      title={isExtra ? 'Manage Action' : 'Quản lý Điều Kiện'}
      actions={() => [
        <Button
          key="add-category"
          onClick={() => {
            navigate(`${PATH_PROMOTION_APP.condition.new}?isExtra=${isExtra}`);
          }}
          variant="contained"
          startIcon={<Icon icon={plusFill} />}
        >
          Thêm Điều Kiện Mới
        </Button>
      ]}
    >
      <CategoryModal
        open={formModal}
        cate_id={updateCateId}
        onClose={() => setFormModal(false)}
        onAdd={addCategoryHander}
        onEdit={editCategoryHander}
      />
      <DeleteConfirmDialog
        open={Boolean(currentDeleteItem)}
        onClose={() => setCurrentDeleteItem(null)}
        onDelete={deleteCategoryHander}
        title={
          <>
            {translate('common.confirmDeleteTitle')} <strong>{currentDeleteItem?.name}</strong>
          </>
        }
      />
      <Card>
        <Stack spacing={2}>
          <ResoTable
            ref={tableRef}
            onEdit={(stores: any) =>
              navigate(`${PATH_PROMOTION_APP.condition.root}/${stores.conditionRuleId}`)
            }
            onDelete={() => {
              console.log('delete');
            }}
            rowKey="condition_id"
            getData={(params: any) => conditionApi.getConditionRules(params)}
            columns={columns}
          />
        </Stack>
      </Card>
    </Page>
  );
};

export default ConditionPage;

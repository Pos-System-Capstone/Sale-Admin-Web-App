/* eslint-disable camelcase */
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
// material
import { Button, Card, Stack } from '@mui/material';
import conditionApi from 'api/promotion/condition';
import CategoryModal from 'components/CategoryModal';
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import { get } from 'lodash';
import { useSnackbar } from 'notistack';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
// components
import { useNavigate } from 'react-router-dom';
import { addCategoy, deleteCategoyById, editCategory } from 'redux/category/api';
import { RootState } from 'redux/store';
import { PATH_PROMOTION_APP } from 'routes/promotionAppPaths';
import { TCategory } from 'types/category';
import { TConditionBase } from 'types/promotion/condition';
import { TTableColumn } from 'types/table';
import { fDateTime } from 'utils/formatTime';

const ConditionPage = ({ isExtra = false }: { isExtra?: boolean }) => {
  const navigate = useNavigate();
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();

  const tableRef = useRef<any>();
  const [formModal, setFormModal] = useState(false);
  const [updateCateId, setUpdateCateId] = useState<number | null>(null);
  const [currentDeleteItem, setCurrentDeleteItem] = useState<TCategory | null>(null);
  const brandId = useSelector((state: RootState) => state.brand);
  const columns: TTableColumn<TConditionBase>[] = [
    {
      title: 'NO',
      dataIndex: 'index',
      hideInSearch: true
    },
    {
      title: 'NAME',
      dataIndex: 'ruleName',
      hideInSearch: true
    },
    {
      title: 'DESCRIDTION',
      dataIndex: 'description',
      hideInSearch: true
    },
    {
      title: 'Updated date',
      dataIndex: 'updDate',
      render: (value) => fDateTime(value),
      hideInSearch: true
    }
  ];

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.formControl.setValue('BrandId', brandId!);
    }
  }, [brandId]);

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
    deleteCategoyById(currentDeleteItem?.id!)
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
      title={isExtra ? 'Manage Action' : 'Manage Condition'}
      actions={() => [
        <Button
          key="add-category"
          onClick={() => {
            navigate(`${PATH_PROMOTION_APP.condition.new}?isExtra=${isExtra}`);
          }}
          variant="contained"
          startIcon={<Icon icon={plusFill} />}
        >
          New Condition
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
      {/* <DeleteConfirmDialog
        open={Boolean(currentDeleteItem)}
        onClose={() => setCurrentDeleteItem(null)}
        onDelete={deleteCategoryHander}
        title={
          <>
            {translate('common.confirmDeleteTitle')} <strong>{currentDeleteItem?.name}</strong>
          </>
        }
      /> */}
      <Card>
        <Stack spacing={2}>
          <ResoTable
            ref={tableRef}
            onEdit={() => {
              console.log('edit');
            }}
            onDelete={() => {
              console.log('delete');
            }}
            rowKey="condition_id"
            getData={() => conditionApi.getConditionRules({ BrandId: brandId })}
            columns={columns}
          />
        </Stack>
      </Card>
    </Page>
  );
};

export default ConditionPage;

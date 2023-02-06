/* eslint-disable camelcase */
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
// material
import { Button, Card } from '@mui/material';
import confirm from 'components/Modal/confirm';
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import { useSnackbar } from 'notistack';
import React, { useEffect, useRef, useState } from 'react';
// components
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from 'routes/paths';
import { TProductBase } from 'types/product';
import { deleteProdById } from '../../redux/product/api';
//
import storeApi from 'api/store';
import { useParams } from 'react-router';
import { accountColumns } from './config';

// ----------------------------------------------------------------------

export default function AccountListPage() {
  const [activeTab, setActiveTab] = useState('1');
  const ref = useRef<any>();
  const { storeId } = useParams();

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { t } = useLocales();

  const editProuct = (data: TProductBase) => {
    if (data.product_type === 1) {
      navigate(`${PATH_DASHBOARD.combos.editById(data.product_id)}`);
    } else {
      navigate(`${PATH_DASHBOARD.products.root}/${data.product_id}`);
    }
  };

  const onDelete = (currentDeleteItem: TProductBase) => {
    confirm({
      title: (
        <>
          Xác nhận xóa <strong>{currentDeleteItem?.product_name}</strong>
        </>
      ),
      content: 'Sản phẩm này sẽ bị xoá khỏi hệ thống',
      onOk: () => {
        return deleteProdById(currentDeleteItem.product_id!)
          .then((res) => {
            enqueueSnackbar(t('common.deleteSuccess'), {
              variant: 'success'
            });
          })
          .then(() => ref.current?.reload())
          .catch((err) => {
            enqueueSnackbar(t('common.error'), {
              variant: 'error'
            });
          });
      }
    });
  };

  useEffect(() => {
    const form = ref.current?.formControl;
    if (!form) return;
  }, [activeTab, ref]);

  return (
    <Page
      title="Quản lý tài khoản"
      actions={() => [
        <Button
          key="add-account"
          onClick={() => {
            navigate(PATH_DASHBOARD.accounts.new);
          }}
          variant="contained"
          startIcon={<Icon icon={plusFill} />}
        >
          Tạo mới tài khoản
        </Button>
      ]}
    >
      <Card>
        <ResoTable
          ref={ref}
          pagination
          getData={(params: any) => storeApi.getStoreEmployees(storeId ?? '', params)}
          onEdit={editProuct}
          onDelete={onDelete}
          columns={accountColumns}
          rowKey="product_id"
        />
      </Card>
    </Page>
  );
}

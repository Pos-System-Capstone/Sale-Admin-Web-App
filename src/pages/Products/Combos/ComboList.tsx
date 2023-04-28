import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import { Button, Card, Stack } from '@mui/material';
import confirm from 'components/Modal/confirm';
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import { useSnackbar } from 'notistack';
import { useRef } from 'react';
import { useNavigate } from 'react-router';
import { deleteProdById } from 'redux/product/api';
import { PATH_DASHBOARD } from 'routes/paths';
import { CollectionTypeEnum } from 'types/collection';
import { ProductTypeEnum, TProduct, TProductBase } from 'types/product';

import productApi from 'api/product';
import { productColumns } from '../config';

interface Props {}

const ComboList = (props: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useLocales();
  const navigate = useNavigate();
  const ref = useRef<any>();

  const editProuct = ({ product_id }: any) =>
    navigate(`${PATH_DASHBOARD.products.root}/${product_id}`);

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

  return (
    <Page
      title="Quản lý Combo"
      actions={() => [
        <Button
          key="add-combo-group"
          onClick={() => {
            navigate(
              `${PATH_DASHBOARD.collections.new}?type=${CollectionTypeEnum.GroupCollection}`
            );
          }}
          variant="outlined"
        >
          Tạo nhóm sản phẩm
        </Button>,
        <Button
          key="add-combo"
          onClick={() => {
            navigate(`${PATH_DASHBOARD.combos.new}`);
          }}
          variant="contained"
          startIcon={<Icon icon={plusFill} />}
        >
          Tạo combo
        </Button>
      ]}
    >
      <Card>
        <Stack spacing={2}>
          <ResoTable
            pagination
            ref={ref}
            defaultFilters={{
              type: ProductTypeEnum.COMBO
            }}
            getData={(params: any) => productApi.get(params)}
            onEdit={(data: TProduct) => navigate(`${PATH_DASHBOARD.combos.editById(data.id)}`)}
            onDelete={onDelete}
            columns={productColumns}
            rowKey="product_id"
          />
        </Stack>
      </Card>
    </Page>
  );
};

export default ComboList;

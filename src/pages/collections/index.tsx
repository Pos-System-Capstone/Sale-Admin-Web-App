/* eslint-disable camelcase */
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import { Box, Button, Card, Stack } from '@mui/material';
import collectionApi from 'api/collection';
import { DeleteConfirmDialog } from 'components/DeleteConfirmDialog';
// components
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import { get } from 'lodash';
import { useSnackbar } from 'notistack';
// material
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteCollection } from 'redux/collections/api';
import { PATH_DASHBOARD } from 'routes/paths';
import { CollectionStatus, TCollection } from 'types/collection';
import { TTableColumn } from 'types/table';

const CollectionListPage = () => {
  const navigate = useNavigate();
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const tableRef = useRef<any>();

  const [currentDeleteItem, setCurrentDeleteItem] = useState<TCollection | null>(null);

  const columns: TTableColumn<TCollection>[] = [
    {
      title: 'Tên',
      dataIndex: 'name',
      fixed: 'left'
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'picUrl',
      hideInSearch: true,
      render: (src, { product_name }: any) => (
        <Box
          component="img"
          alt={product_name}
          src={
            src ??
            'https://firebasestorage.googleapis.com/v0/b/pos-system-47f93.appspot.com/o/files%2Fproduct.png?alt=media&token=8eb70c21-2c0e-4d5c-b92a-0b93c3020c9b'
          }
          sx={{ width: 48, height: 48, borderRadius: 1.5 }}
        />
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: [
        {
          label: 'Hoạt động',
          value: CollectionStatus.ACTIVE
        },
        {
          label: 'Không hoạt động',
          value: CollectionStatus.DEACTIVATE
        }
      ]
    },
    {
      title: 'Mã',
      dataIndex: 'code',
      hideInSearch: true
    }
  ];

  const deleteCategoryHander = () =>
    deleteCollection(currentDeleteItem?.id!)
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
      title={translate('collections.list')}
      actions={() => [
        // <Button
        //   key="add-group-combo"
        //   onClick={() => {
        //     navigate(
        //       `${PATH_DASHBOARD.collections.new}?type=${CollectionTypeEnum.GroupCollection}`
        //     );
        //   }}
        //   variant="outlined"
        // >
        //   Tạo nhóm combo
        // </Button>,
        <Button
          key="add-collection"
          onClick={() => {
            navigate(PATH_DASHBOARD.collections.new);
          }}
          variant="contained"
          startIcon={<Icon icon={plusFill} />}
        >
          {translate('collections.addBtn')}
        </Button>
      ]}
    >
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
            onEdit={(collecton: TCollection) =>
              navigate(`${PATH_DASHBOARD.collections.root}/${collecton.id}`, {
                state: collecton
              })
            }
            onDelete={setCurrentDeleteItem}
            rowKey="id"
            getData={collectionApi.get}
            columns={columns}
          />
        </Stack>
      </Card>
    </Page>
  );
};

export default CollectionListPage;

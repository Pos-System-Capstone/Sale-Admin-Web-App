/* eslint-disable camelcase */
import Label from 'components/Label';

// material
import { Box, Stack } from '@mui/material';
import brandApi from 'api/brand';
import ResoTable from 'components/ResoTable/ResoTable';
// components
import storeApi from 'api/store';
import { DeleteConfirmDialog } from 'components/DeleteConfirmDialog';
import { ResoDescriptionColumnType } from 'components/ResoDescriptions';
import useAuth from 'hooks/useAuth';
import { useSnackbar } from 'notistack';
import { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH_DASHBOARD } from 'routes/paths';
import { StoreStatus, TStore } from 'types/store';
import { Role } from 'utils/role';

const StoresList = () => {
  const navigate = useNavigate();
  const { brandId } = useParams();
  const { user } = useAuth();
  const [isOpenDeleteConfirmDialog, setIsOpenDeleteConfirmDialog] = useState(false);
  const [deleteStore, setDeleteStore] = useState<TStore>();
  const { enqueueSnackbar } = useSnackbar();
  const tableRef = useRef<any>();

  const storeDetailColumns: ResoDescriptionColumnType<TStore>[] = [
    {
      title: 'STT',
      dataIndex: 'index',
      hideInSearch: true
    },
    {
      title: 'Tên đầy đủ',
      dataIndex: 'name',
      hideInSearch: true
    },
    {
      title: 'Tên rút gọn',
      dataIndex: 'shortName'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      hideInSearch: true
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      hideInSearch: true
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      hideInSearch: true,
      render: (status) => {
        return status === StoreStatus.ACTIVE ? (
          <Label color="primary">Hoạt động </Label>
        ) : (
          <Label color="warning"> Không hoạt động </Label>
        );
      }
    }
    // {
    //   title: 'Chi tiết',
    //   fixed: 'right',
    //   hideInSearch: true,
    //   render: (_: any, store: TStore) => (
    //     <Tooltip title="Chi tiết">
    //       <IconButton
    //         onClick={() => navigate(PATH_DASHBOARD.stores.storeById(store.id))}
    //         size="large"
    //       >
    //         <Visibility />
    //       </IconButton>
    //     </Tooltip>
    //   )
    // }
  ];

  const handleGetStoreOfBrand = (params: any) => {
    if (brandId) {
      return brandApi.getStoreOfBrand(brandId, params);
    }
    return brandApi.getStoreOfBrand(user?.brandId, params);
  };

  const onDelete = async () => {
    await storeApi
      .updateStoreStatus(deleteStore?.id ?? '', StoreStatus.DEACTIVE)
      .then(() => {
        enqueueSnackbar('Thay đổi trạng thái thành công', { variant: 'success' });
        tableRef.current?.reload();
        setIsOpenDeleteConfirmDialog(!isOpenDeleteConfirmDialog);
      })
      .catch(() => {
        enqueueSnackbar('Có lỗi xảy ra. Vui lòng thử lại!', {
          variant: 'error'
        });
      });
  };

  return (
    <Stack spacing={2}>
      {user?.role.includes(Role.BrandManager) ? (
        <>
          <Box>
            <ResoTable
              rowKey="id"
              pagination
              ref={tableRef}
              onEdit={(store: TStore) => {
                navigate(`${PATH_DASHBOARD.stores.storeById(store.id)}`);
              }}
              onDelete={(store: TStore) => (
                setIsOpenDeleteConfirmDialog(!isOpenDeleteConfirmDialog), setDeleteStore(store)
              )}
              getData={(params: any) => handleGetStoreOfBrand(params)}
              columns={storeDetailColumns}
            />
          </Box>
          <DeleteConfirmDialog
            open={isOpenDeleteConfirmDialog}
            onClose={() => setIsOpenDeleteConfirmDialog(!isOpenDeleteConfirmDialog)}
            onDelete={() => onDelete()}
            title={'Xác nhận cập nhật trạng thái cửa hàng'}
            description={'Cửa hàng này sẽ thay đổi trạng thái hoạt động'}
          />
        </>
      ) : (
        <Box>
          <ResoTable
            pagination
            showAction={false}
            rowKey="store_id"
            getData={(params: any) => handleGetStoreOfBrand(params)}
            columns={storeDetailColumns}
          />
        </Box>
      )}
    </Stack>
  );
};

export default StoresList;

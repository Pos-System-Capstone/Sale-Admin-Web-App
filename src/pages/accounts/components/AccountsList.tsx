// material
import ResoTable from 'components/ResoTable/ResoTable';
import { useSnackbar } from 'notistack';
import { useEffect, useRef, useState } from 'react';
// components
import { Box, Stack } from '@mui/material';
import brandApi from 'api/brand';
import storeApi from 'api/store';
import userApi from 'api/user';
import { UpdateConfirmDialog } from 'components/DeleteConfirmDialog';
import useAuth from 'hooks/useAuth';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from 'routes/paths';
import { TUser, UserRole, UserStatus } from 'types/user';
import { accountColumns } from '../config';

export default function AccountsList() {
  const ref = useRef<any>();
  const { storeId, brandId } = useParams();
  const [deleteUser, setDeleteUser] = useState<TUser>({
    id: '',
    name: '',
    username: '',
    role: UserRole.StoreStaff,
    status: UserStatus.ACTIVE
  });

  const [isOpenDeleteConfirmDialog, setIsOpenDeleteConfirmDialog] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { user } = useAuth();

  const onDelete = (currentDeleteAccount?: TUser) => {
    // console.log('user to delete ne: ', currentDeleteAccount);
    if (currentDeleteAccount?.status === UserStatus.ACTIVE) {
      return userApi
        .updateUserStatus(deleteUser.id, UserStatus.DEACTIVATE)
        .then(() => {
          enqueueSnackbar('Xoá thành công', { variant: 'success' });
        })
        .catch(() => {
          enqueueSnackbar('Có lỗi xảy ra. Vui lòng thử lại!', {
            variant: 'error'
          });
        });
    } else if (currentDeleteAccount?.status === UserStatus.DEACTIVATE) {
      return userApi
        .updateUserStatus(deleteUser.id, UserStatus.ACTIVE)
        .then(() => {
          enqueueSnackbar('Thay đổi trạng thái thành công', { variant: 'success' });
        })
        .catch(() => {
          enqueueSnackbar('Có lỗi xảy ra. Vui lòng thử lại!', {
            variant: 'error'
          });
        });
    }
  };

  const handleCallListDataBaseOnRole = (params: any) => {
    if (storeId) {
      return storeApi.getStoreEmployees(storeId, params);
    } else if (brandId) {
      return brandApi.getListUserOfBrand(brandId, params);
    } else return;
  };

  // confirm({
  //   title: (
  //     <>
  //       Xác nhận xóa <strong>{currentDeleteAccount?.name}</strong>
  //     </>
  //   ),
  //   content: 'Người dùng sẽ bị xoá khỏi hệ thống',
  //   onOk: () => {
  //     return userApi
  //       .updateUserStatus(currentDeleteAccount.id, UserStatus.DEACTIVATE)
  //       .then((res) => {
  //         enqueueSnackbar('Xoá thành công', {
  //           variant: 'success'
  //         });
  //       })
  //       .then(() => ref.current?.reload())
  //       .catch((err) => {
  //         enqueueSnackbar('Có lỗi xảy ra, vui lòng thử lại!', {
  //           variant: 'error'
  //         });
  //       });
  //   }
  // });
  useEffect(() => {
    const form = ref.current?.formControl;
    if (!form) return;
  }, [ref]);

  return (
    <Stack spacing={2}>
      <Box>
        <ResoTable
          ref={ref}
          pagination
          getData={(params: any) => handleCallListDataBaseOnRole(params)}
          onEdit={(user: TUser) => {
            navigate(`${PATH_DASHBOARD.user.profileById(user.id)}`);
          }}
          onDelete={(user: TUser) => (setIsOpenDeleteConfirmDialog(true), setDeleteUser(user))}
          columns={accountColumns}
          rowKey="id"
        />

        <UpdateConfirmDialog
          open={isOpenDeleteConfirmDialog}
          onClose={() => setIsOpenDeleteConfirmDialog(false)}
          onDelete={() => onDelete(deleteUser)}
          title={'Xác nhận cập nhật trạng thái người dùng'}
          description={'Người dùng này sẽ thay đổi trạng thái hoạt động'}
        />
      </Box>
    </Stack>
  );
}

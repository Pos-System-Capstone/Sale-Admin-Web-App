/* eslint-disable camelcase */
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
// material
import { Button, Card } from '@mui/material';
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import { useSnackbar } from 'notistack';
import { useEffect, useRef, useState } from 'react';
// components
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from 'routes/paths';
import { TProductBase } from 'types/product';
//
import storeApi from 'api/store';
import userApi from 'api/user';
import { DeleteConfirmDialog } from 'components/DeleteConfirmDialog';
import { useParams } from 'react-router';
import { TUser, UserRole, UserStatus } from 'types/user';
import { accountColumns } from './config';

// ----------------------------------------------------------------------

export default function AccountListPage() {
  const ref = useRef<any>();
  const { storeId } = useParams();
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

  const editProuct = (data: TProductBase) => {
    if (data.product_type === 1) {
      navigate(`${PATH_DASHBOARD.combos.editById(data.product_id)}`);
    } else {
      navigate(`${PATH_DASHBOARD.products.root}/${data.product_id}`);
    }
  };

  const onDelete = (currentDeleteAccount?: TUser) => {
    console.log('user to delete ne: ', currentDeleteAccount);
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
          onEdit={(user: TUser) => {
            navigate(`${PATH_DASHBOARD.user.profileById(user.id)}`);
          }}
          onDelete={(user: TUser) => (setIsOpenDeleteConfirmDialog(true), setDeleteUser(user))}
          columns={accountColumns}
          rowKey="id"
        />
      </Card>

      <DeleteConfirmDialog
        open={isOpenDeleteConfirmDialog}
        onClose={() => setIsOpenDeleteConfirmDialog(false)}
        onDelete={() => onDelete(deleteUser)}
        title={'Xác nhận xoá người dùng'}
        description={'Người dùng này sẽ bị xoá khỏi hệ thống'}
      />
    </Page>
  );
}

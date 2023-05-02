// material
import ResoTable from 'components/ResoTable/ResoTable';
import { useSnackbar } from 'notistack';
import { useEffect, useRef, useState } from 'react';
// components
import { Box, Stack } from '@mui/material';
import brandApi from 'api/brand';
import storeApi from 'api/store';
import userApi from 'api/user';
import { DeleteConfirmDialog } from 'components/DeleteConfirmDialog';
import Label from 'components/Label';
import useAuth from 'hooks/useAuth';
import { useLocation, useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from 'routes/paths';
import { EmployeeStatus } from 'types/employee';
import { TTableColumn } from 'types/table';
import { TUser, UserRole, UserStatus } from 'types/user';
import { Role } from 'utils/role';
import { roleEnumArray } from '../config';

type Props = {
  isUpdate?: boolean;
};

export default function AccountsList(props: Props) {
  const { isUpdate } = props;
  const tableRef = useRef<any>();
  const { storeId, brandId } = useParams();
  const location = useLocation();
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

  const accountColumns: TTableColumn<TUser>[] = [
    {
      title: 'STT',
      dataIndex: 'index',
      hideInSearch: true
    },
    {
      title: 'Tên nhân viên',
      dataIndex: 'name',
      hideInSearch: true
    },
    {
      title: 'Tên tài khoản',
      dataIndex: 'username'
    },
    {
      title: 'Chức vụ',
      dataIndex: 'role',
      valueType: 'select',
      valueEnum: roleEnumArray,
      hideInSearch:
        location.pathname.includes('brands') &&
        (user?.role.includes(Role.SystemAdmin) || user?.role.includes(Role.BrandManager))
          ? false
          : true
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      hideInSearch: true,
      render: (status: EmployeeStatus) => {
        return status === EmployeeStatus.ACTIVE ? (
          <Label color="primary">Hoạt động </Label>
        ) : (
          <Label color="warning"> Không hoạt động </Label>
        );
      }
    }
  ];

  const onDelete = async () => {
    await userApi
      .updateUserStatus(deleteUser.id, UserStatus.DEACTIVATE)
      .then(() => {
        enqueueSnackbar('Xoá thành công', { variant: 'success' });
        tableRef.current?.reload();
        setIsOpenDeleteConfirmDialog(!isOpenDeleteConfirmDialog);
      })
      .catch(() => {
        enqueueSnackbar('Có lỗi xảy ra. Vui lòng thử lại!', {
          variant: 'error'
        });
      });
  };

  const handleCallListDataBaseOnRole = (params: any) => {
    let newParam = { ...params };
    // System Admin get list user of brand by brandId
    if (brandId && user?.role.includes(Role.SystemAdmin)) {
      return brandApi.getListUserOfBrand(brandId, newParam);
    }
    // Brand Manager get list store manager of store detail
    else if (storeId && user?.role.includes(Role.BrandManager)) {
      return storeApi.getStoreEmployees(storeId, newParam);
    }
    // Brand Manager get list user of all stores in brand
    else if (user?.brandId && user?.role.includes(Role.BrandManager)) {
      newParam = {
        role: Role.StoreManager,
        ...newParam
      };
      return brandApi.getListUserOfBrand(user.brandId, newParam);
    }
    // Store Manager get list staff of store
    else if (user?.storeId && user?.role.includes(Role.StoreManager)) {
      return storeApi.getStoreEmployees(user?.storeId, newParam);
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
    const form = tableRef.current?.formControl;
    if (!form) return;
  }, [tableRef]);

  useEffect(() => {
    tableRef.current?.reload();
  }, [isUpdate]);

  return (
    <Stack spacing={2}>
      <Box>
        <ResoTable
          ref={tableRef}
          pagination
          getData={(params: any) => handleCallListDataBaseOnRole(params)}
          onEdit={(user: TUser) => {
            navigate(`${PATH_DASHBOARD.user.profileById(user.id)}`);
          }}
          onDelete={(user: TUser) => (
            setIsOpenDeleteConfirmDialog(!isOpenDeleteConfirmDialog), setDeleteUser(user)
          )}
          columns={accountColumns}
          rowKey="id"
          key={'accountList'}
        />

        <DeleteConfirmDialog
          open={isOpenDeleteConfirmDialog}
          onClose={() => setIsOpenDeleteConfirmDialog(!isOpenDeleteConfirmDialog)}
          onDelete={() => onDelete()}
          title={'Xác nhận cập nhật trạng thái người dùng'}
          description={'Người dùng này sẽ thay đổi trạng thái hoạt động'}
        />
      </Box>
    </Stack>
  );
}

// import AutocompleteCategory from 'components/form/common/Category/AutocompleteCategory';
import Label from 'components/Label';
import { EmployeeStatus } from 'types/employee';

import { TTableColumn } from 'types/table';
import { TUser } from 'types/user';
import { Role } from 'utils/role';

const roleEnumArray = [
  {
    label: 'Brand Admin',
    value: Role.BrandAdmin
  },
  {
    label: 'Brand Manager',
    value: Role.BrandManager
  },
  {
    label: 'Store Manager',
    value: Role.StoreManager
  },
  {
    label: 'Staff',
    value: Role.StoreStaff
  }
];

export const accountColumns: TTableColumn<TUser>[] = [
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
    valueEnum: roleEnumArray
    // hideInSearch: true
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    hideInSearch: true,
    render: (status) => {
      return status === EmployeeStatus.ACTIVE ? (
        <Label color="primary">Hoạt động </Label>
      ) : (
        <Label color="warning"> Không hoạt động </Label>
      );
    }
  }
];

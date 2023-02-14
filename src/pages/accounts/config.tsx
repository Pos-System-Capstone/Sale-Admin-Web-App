import { Role } from 'utils/role';

export const roleEnumArray = [
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

// export const accountColumns: TTableColumn<TUser>[] = [
//   {
//     title: 'STT',
//     dataIndex: 'index',
//     hideInSearch: true
//   },
//   {
//     title: 'Tên nhân viên',
//     dataIndex: 'name',
//     hideInSearch: true
//   },
//   {
//     title: 'Tên tài khoản',
//     dataIndex: 'username'
//   },
//   {
//     title: 'Chức vụ',
//     dataIndex: 'role',
//     valueType: 'select',
//     valueEnum: roleEnumArray,
//     hideInSearch: user?.role.includes(Role.SystemAdmin) ? true : false
//   },
//   {
//     title: 'Trạng thái',
//     dataIndex: 'status',
//     hideInSearch: true,
//     render: (status) => {
//       return status === EmployeeStatus.ACTIVE ? (
//         <Label color="primary">Hoạt động </Label>
//       ) : (
//         <Label color="warning"> Không hoạt động </Label>
//       );
//     }
//   }
// ];

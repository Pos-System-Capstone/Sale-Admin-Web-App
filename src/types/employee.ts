export enum EmployeeStatus {
  ACTIVE = 'Active',
  DEACTIVATED = 'Deactivated'
}

export type TEmployeeCreate = {
  name: string;
  username: string;
  password: string;
};

export type TEmployee = {
  id: string;
  name: string;
  username: string;
  status: EmployeeStatus;
  role: string;
  code: string;
};

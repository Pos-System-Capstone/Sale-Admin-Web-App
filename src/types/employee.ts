export enum EmployeeStatus {
  ACTIVE = 'Active',
  DEACTIVATED = 'Deactivated'
}

export type TEmployee = {
  id: string;
  name: string;
  username: string;
  status: EmployeeStatus;
  role: string;
  code: string;
};
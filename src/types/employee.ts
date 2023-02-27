export enum EmployeeStatus {
  ACTIVE = 'Active',
  DEACTIVATED = 'Deactivated'
}

// System Admin need BrandId and Role when create brand admin and brand manager
export type TEmployeeCreate = {
  name: string;
  username: string;
  password: string;
  brandId?: string;
  role?: string;
};

export type TEmployee = {
  id: string;
  name: string;
  username: string;
  status: EmployeeStatus;
  role: string;
  code: string;
};

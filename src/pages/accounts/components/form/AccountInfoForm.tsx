import { Box, Grid, TextField } from '@mui/material';
import { InputField, SelectField } from 'components/form';
import useAuth from 'hooks/useAuth';
import { Role } from 'utils/role';

interface Props {}

const AccountInfoForm = (props: Props) => {
  const { user } = useAuth();

  return (
    <>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <InputField fullWidth name="name" label="Tên người dùng" required size="small" />
          </Grid>
          <Grid item xs={6}>
            <InputField fullWidth name="username" label="Tên đăng nhập" required size="small" />
          </Grid>
          <Grid item xs={6}>
            <InputField
              fullWidth
              type={'password'}
              name="password"
              label="Mật khẩu"
              required
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            {user?.role.includes(Role.SystemAdmin) && (
              <SelectField
                options={[
                  {
                    label: 'Brand Admin',
                    value: Role.BrandAdmin
                  },
                  {
                    label: 'Brand Manager',
                    value: Role.BrandManager
                  }
                ]}
                // name={`modifiers.${optIndex}.selectType`}
                size="small"
                name="role"
                fullWidth
                label="Quyền"
              />
            )}
            {user?.role.includes(Role.BrandManager) && (
              <TextField
                fullWidth
                label="Quyền"
                disabled
                defaultValue={Role.StoreManager}
                placeholder={Role.StoreManager}
                size="small"
              />
            )}
            {user?.role.includes(Role.StoreManager) && (
              <TextField
                fullWidth
                label="Quyền"
                disabled
                defaultValue={Role.StoreStaff}
                placeholder={Role.StoreStaff}
                size="small"
              />
            )}
          </Grid>
          {/* {user?.role.includes(Role.BrandAdmin) || user?.role.includes(Role.BrandManager) && (
            <Grid item xs={6}>
              <SelectField
                options={[
                  {
                    label: 'Hoạt động',
                    value: 'Active'
                  },
                  {
                    label: 'Ngừng hoạt động',
                    value: 'Deactivate '
                  }
                ]}
                // name={`modifiers.${optIndex}.selectType`}
                size="small"
                label="Trạng thái"
                sx={{ width: '150px' }}
                name="status"
              />
            </Grid>
          )} */}
        </Grid>
      </Box>
    </>
  );
};

export default AccountInfoForm;

import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { Icon } from '@iconify/react';
import { Box, Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import { InputField, SelectField } from 'components/form';
import useAuth from 'hooks/useAuth';
import { useState } from 'react';
import { Role } from 'utils/role';

interface Props {}

const AccountInfoForm = (props: Props) => {
  const { user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

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
              type={showPassword ? 'text' : 'password'}
              name="password"
              label="Mật khẩu"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end" size="large">
                      <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
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
        </Grid>
      </Box>
    </>
  );
};

export default AccountInfoForm;

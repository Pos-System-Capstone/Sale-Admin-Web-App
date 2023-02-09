import { Box, Grid, TextField } from '@mui/material';
import { InputField, SelectField } from 'components/form';
import useAuth from 'hooks/useAuth';
import { Role } from 'utils/role';

interface Props {}

const AccountInfoForm = (props: Props) => {
  const { user } = useAuth();

  return (
    <>
      {user?.role.includes(Role.BrandManager) && (
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
              <SelectField
                options={[
                  {
                    label: 'Store Manager',
                    value: 'StoreManager'
                  },
                  {
                    label: 'Store Staff',
                    value: 'Staff'
                  }
                ]}
                // name={`modifiers.${optIndex}.selectType`}
                size="small"
                label="Quyền"
                sx={{ width: '150px' }}
                name="role"
              />
            </Grid>
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
          </Grid>
        </Box>
      )}
      {user?.role.includes(Role.StoreManager) && (
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
              <TextField
                fullWidth
                label="Quyền"
                placeholder="Store Staff"
                defaultValue="Staff"
                disabled={true}
                size="small"
              />
            </Grid>
          </Grid>
        </Box>
      )}
      {/* <Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <InputField fullWidth name="code" label="Tên tài khoản" required size="small" />
          </Grid>
          <Grid item xs={6}>
            <InputField fullWidth name="product_name" label="Mật khẩu" required size="small" />
          </Grid>
          <Grid item xs={6}>
            <InputField
              fullWidth
              type="number"
              name="price"
              label="Tên chủ tài khoản"
              required
              size="small"
              // helperText="Giá áp dụng khi không được cấu hình trong menu"
            />
          </Grid>
          <Grid item xs={6}>
            <SelectField
              options={[
                {
                  label: 'Brand Admin',
                  value: 'single-choice'
                },
                {
                  label: 'Store Manager',
                  value: 'multiple'
                },
                {
                  label: 'Store Staff',
                  value: 'multiple'
                }
              ]}
              // name={`modifiers.${optIndex}.selectType`}
              size="small"
              label="Quyền"
              sx={{ width: '150px' }}
              name="Phân quyền"
            />
          </Grid>
        </Grid>
      </Box> */}
    </>
  );
};

export default AccountInfoForm;

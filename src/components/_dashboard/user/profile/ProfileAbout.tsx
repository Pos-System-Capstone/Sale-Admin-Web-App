import { Grid, TextField } from '@mui/material';
import { InputField } from 'components/form';
import useAuth from 'hooks/useAuth';
import { TUser } from 'types/user';
import { Role } from 'utils/role';

interface Props {
  updateMode?: boolean;
  userInfo: TUser | undefined;
}

export default function ProfileAbout({ updateMode, userInfo }: Props) {
  // Get current logged in user
  const { user } = useAuth();

  // return view of Store Manager, Brand Manager, Brand Admin
  if (
    user?.id == userInfo?.id ||
    (user?.role.includes(Role.SystemAdmin) &&
      (userInfo?.role.includes(Role.BrandAdmin) || userInfo?.role.includes(Role.BrandManager))) ||
    (user?.role.includes(Role.BrandManager) && userInfo?.role.includes(Role.StoreManager)) ||
    (user?.role.includes(Role.StoreManager) && userInfo?.role.includes(Role.StoreStaff))
  ) {
    return (
      <Grid container spacing={2}>
        {/* <Grid item xs={12} sm={12} sx={{ textAlign: 'center' }}>
          <Box>
            <UploadImageField.Avatar name="pic_url" label={'Avatar'} />
          </Box>
        </Grid> */}
        <Grid item xs={12} sm={4}>
          <InputField fullWidth name="name" label="Tên nhân viên" defaultValue={userInfo?.name} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            disabled
            fullWidth
            size="small"
            name="username"
            label="Tên đăng nhập"
            defaultValue={userInfo?.username}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            disabled
            size="small"
            fullWidth
            name="role"
            label="Vị trí"
            defaultValue={userInfo?.role}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            fullWidth
            size="small"
            name="status"
            label="Trạng thái"
            defaultValue={userInfo?.status}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            fullWidth
            type={'password'}
            name="password"
            label="Mật khẩu mới"
            placeholder="Nhập để cập nhật mật khẩu mới"
          />
        </Grid>
      </Grid>
    );
  }
  // return view of Staff
  return (
    <Grid container spacing={2}>
      {/* <Grid item xs={12} sm={12} sx={{ textAlign: 'center' }}>
          <Box>
            <UploadImageField.Avatar name="pic_url" label={'Avatar'} />
          </Box>
        </Grid> */}
      <Grid item xs={12} sm={6}>
        <TextField
          disabled
          fullWidth
          name="name"
          label="Tên nhân viên"
          defaultValue={userInfo?.name}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          disabled
          fullWidth
          name="username"
          label="Tên đăng nhập"
          defaultValue={userInfo?.username}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField disabled fullWidth name="role" label="Vị trí" defaultValue={userInfo?.role} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          disabled
          fullWidth
          name="status"
          label="Trạng thái"
          defaultValue={userInfo?.status}
        />
      </Grid>
    </Grid>
  );
}

import { Grid } from '@mui/material';
import { InputField } from 'components/form';
import useAuth from 'hooks/useAuth';
import { TUser } from 'types/user';

interface Props {
  updateMode?: boolean;
  userInfo: TUser | undefined;
}

export default function ProfileAbout({ updateMode, userInfo }: Props) {
  const { user } = useAuth();
  // console.log('user ne: ', user);
  return (
    <Grid container spacing={2}>
      {/* <Grid item xs={12} sm={12} sx={{ textAlign: 'center' }}>
        <Box>
          <UploadImageField.Avatar name="pic_url" label={'Avatar'} />
        </Box>
      </Grid> */}
      <Grid item xs={12} sm={6}>
        <InputField fullWidth name="name" label="Tên nhân viên" defaultValue={userInfo?.name} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputField fullWidth name="username" label="Tên " defaultValue={userInfo?.username} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputField fullWidth name="role" label="Vị trí" defaultValue={userInfo?.role} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputField fullWidth name="status" label="Trạng thái" defaultValue={userInfo?.status} />
      </Grid>
      {/* <Grid item xs={12}>
        <Controller
          name="description"
          render={({ field }) => {
            return (
              <DraftEditorField
                ariaLabel="Mô tả chi tiếtÏ"
                value={field.value}
                onChange={field.onChange}
              />
            );
          }}
        />
      </Grid> */}
      {/* {!isExtra && (
        <Grid item xs={12}>
          <CheckBoxField name="is_root" label="Đây là Danh mục gốc" />
        </Grid>
      )}
      */}
    </Grid>
  );
}

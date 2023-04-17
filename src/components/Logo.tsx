// material
import { Box, BoxProps } from '@mui/material';
import { getUserInfo } from 'utils/utils';

// ----------------------------------------------------------------------

export default function Logo({ sx }: BoxProps) {
  // return <Box component="img" src="/static/reso_logo.png" sx={{ width: 40, height: 40, ...sx }} />;
  const userRaw = getUserInfo();
  const user: any = JSON.parse(userRaw ?? '{}');
  return (
    <Box
      component="img"
      src={
        user.brandPicUrl
          ? user.brandPicUrl
          : 'https://firebasestorage.googleapis.com/v0/b/pos-system-47f93.appspot.com/o/files%2Flogo.png?alt=media&token=423dceec-a73b-4313-83ed-9b56f8f3996c'
      }
      sx={{ width: 30, height: 30, ...sx }}
    />
  );
}

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
          : 'https://cdn.haitrieu.com/wp-content/uploads/2022/03/Icon-Passio-Coffee-Tra.png'
      }
      sx={{ width: 30, height: 30, ...sx }}
    />
  );
}

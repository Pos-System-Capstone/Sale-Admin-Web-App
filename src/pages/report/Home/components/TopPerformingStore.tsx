// material
import { Box, Card, Stack, Typography } from '@mui/material';
// utils

// ----------------------------------------------------------------------

export default function TopPerformingStore({ data }: any) {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3, height: '100%' }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="body2">Cửa hàng hoạt động tốt nhất</Typography>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 1 }}>
          <Typography component="span" variant="button">
            {data?.topPerformingStore}
          </Typography>
        </Stack>
      </Box>

      <Box
        component="img"
        src="https://www.iconpacks.net/icons/2/free-icon-store-2017.png"
        width={60}
        height={60}
      />
    </Card>
  );
}

// material
import { Box, Card, Stack, Typography } from '@mui/material';
// utils

// ----------------------------------------------------------------------

export default function TopSellingItem({ data }: any) {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3, height: '100%' }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="body2">Mặt hàng bán chạy nhất</Typography>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 1 }}>
          <Typography component="span" variant="button">
            {data?.topSellingItem ?? ''}
          </Typography>
        </Stack>
      </Box>

      <Box
        component="img"
        src="https://www.iconpacks.net/icons/2/free-icon-coffee-cup-2318.png"
        width={60}
        height={60}
      />
    </Card>
  );
}

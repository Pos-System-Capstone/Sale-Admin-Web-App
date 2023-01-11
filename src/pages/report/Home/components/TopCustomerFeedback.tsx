// material
import { Box, Card, Stack, Typography } from '@mui/material';
// utils

// ----------------------------------------------------------------------

const PERCENT = 'Taste';

export default function TopCustomerFeedback() {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3, height: '100%' }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="body2">Phản hồi hàng đầu của khách hàng</Typography>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 1 }}>
          <Typography component="span" variant="button">
            {PERCENT}
          </Typography>
        </Stack>
      </Box>

      <Box
        component="img"
        src="https://www.iconpacks.net/icons/2/free-icon-instagram-like-3507.png"
        width={60}
        height={60}
      />
    </Card>
  );
}

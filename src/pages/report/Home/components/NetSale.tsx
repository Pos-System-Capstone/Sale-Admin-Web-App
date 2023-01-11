import trendingDownFill from '@iconify/icons-eva/trending-down-fill';
import trendingUpFill from '@iconify/icons-eva/trending-up-fill';
import { Icon } from '@iconify/react';
// material
import { Box, Card, Stack, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
// utils
import { fPercent } from 'utils/formatNumber';
import { formatCurrency } from 'utils/utils';

//

// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 20,
  height: 20,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing(1),
  color: theme.palette.success.main,
  backgroundColor: alpha(theme.palette.success.main, 0.16)
}));

// ----------------------------------------------------------------------

// const data1 = data?.[trends] || [];
export default function NetSale({ data }: any) {
  const netSaleData = data?.netSales;
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2" paragraph>
          Doanh thu
        </Typography>
        <Typography variant="h3" gutterBottom>
          {formatCurrency(netSaleData?.value)}
        </Typography>

        <Stack direction="row" alignItems="center" flexWrap="wrap">
          <IconWrapperStyle
            sx={{
              ...(netSaleData < 0 && {
                color: 'error.main',
                bgcolor: (theme) => alpha(theme.palette.error.main, 0.16)
              })
            }}
          >
            <Icon
              width={16}
              height={16}
              icon={netSaleData >= 0 ? trendingUpFill : trendingDownFill}
            />
          </IconWrapperStyle>

          <Typography variant="subtitle2" component="span">
            {fPercent(netSaleData?.trend)}
          </Typography>
          <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
            &nbsp;hơn tuần trước
          </Typography>
        </Stack>
      </Box>
    </Card>
  );
}

// material
import { Card, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// material
import { Box } from '@mui/material';
// import Page from 'components/Page';
import { fNumber } from 'utils/formatNumber';
import { formatCurrency } from 'utils/utils';
// import { fToNowVN } from 'utils/formatTime';
import { TSummaryReportBase } from 'types/report/home';
import moment from 'moment';
import 'moment/locale/vi';
// import { TSummaryReportBase } from 'types/report/home';
// ----------------------------------------------------------------------
moment.locale('vi');
interface TotalSaleCardProps {
  data: TSummaryReportBase | undefined;
}

export const TotalSaleCard: React.FC<TotalSaleCardProps> = ({ data }) => {
  const RootStyle = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    textAlign: 'center',
    backgroundColor: '#28C76F',
    [theme.breakpoints.up('md')]: {
      height: '100%',
      textAlign: 'left',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }));
  console.log('data?.lastUpdatedTime', data?.lastUpdatedTime);

  return (
    <RootStyle>
      <Box>
        <Grid container spacing={2} sx={{ p: 2 }}>
          <Grid item md={4}>
            <Typography variant="h3" sx={{ color: '#FFFFFF' }}>
              Tổng quan
            </Typography>
            <Typography variant="subtitle2" sx={{ color: '#FFFFFF' }}>
              Lần cập nhật cuối:{' '}
              {data?.lastUpdatedTime
                ? moment(data?.lastUpdatedTime, 'YYYY-MM-DD[T]HH:mm:ss.SSSSSS[Z]', true).fromNow()
                : '--'}
            </Typography>
          </Grid>

          <Grid container item md={8} spacing={3} sx={{ display: 'flex' }} flexWrap="wrap">
            <Grid item md={6} sx={{ flexWrap: 'nowrap' }}>
              <Card>
                <Box>
                  <Typography variant="subtitle2" paragraph>
                    Doanh thu thuần hôm nay
                  </Typography>
                  <Typography variant="h3" gutterBottom>
                    {formatCurrency(data?.netSales)}
                  </Typography>
                </Box>
              </Card>
            </Grid>
            <Grid item md={6}>
              <Card>
                <Box>
                  <Typography variant="subtitle2" paragraph>
                    Số lượng giao dịch hôm nay
                  </Typography>
                  <Typography variant="h3" gutterBottom>
                    {fNumber(data?.totalOrders!)}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </RootStyle>
  );
};

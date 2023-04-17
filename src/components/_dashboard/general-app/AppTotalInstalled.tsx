import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Card, Typography } from '@mui/material';
// utils
import { fCurrencyVN } from '../../../utils/formatNumber';
import { OrderStatus, TOrder } from 'types/order';

// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 24,
  height: 24,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.success.main,
  backgroundColor: alpha(theme.palette.success.main, 0.16)
}));

// ----------------------------------------------------------------------

export interface Props {
  title: string;
  todayOrder: TOrder[];
}

export default function AppTotalInstalled(props: Props) {
  const theme = useTheme();

  const TOTAL_TODAY_ORDER: number = props.todayOrder.reduce(
    (acc: number, cur: TOrder) => (cur.status === OrderStatus.PAID ? acc + cur.finalAmount : acc),
    0
  );

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{props.title}</Typography>

        <Typography variant="h3">{fCurrencyVN(TOTAL_TODAY_ORDER)} đ</Typography>
      </Box>
    </Card>
  );
}

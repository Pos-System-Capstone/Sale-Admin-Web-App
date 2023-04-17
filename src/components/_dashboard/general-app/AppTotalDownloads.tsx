// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Card, Typography } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
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

export default function AppTotalDownloads(props: Props) {
  const theme = useTheme();

  const TOTAL_TODAY_ORDER = props.todayOrder.reduce(
    (acc: any, cur: TOrder) => (cur.status === OrderStatus.PAID ? (acc += 1) : (acc += 0)),
    0
  );

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{props.title}</Typography>

        <Typography variant="h3">{fNumber(TOTAL_TODAY_ORDER)}</Typography>
      </Box>
    </Card>
  );
}

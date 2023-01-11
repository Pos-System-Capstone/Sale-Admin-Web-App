// material
import { Box, Card, CardHeader, Stack, Typography } from '@mui/material';
import Scrollbar from 'components/Scrollbar';
import { fPercent } from 'utils/formatNumber';
import { fTime } from 'utils/formatTime';
import { formatCurrency } from 'utils/utils';
// utils

//

// ----------------------------------------------------------------------

function ProductItem({ column, data }: any) {
  return (
    <Stack direction="column" spacing={5}>
      {column.map((x: any) => (
        // eslint-disable-next-line react/jsx-key
        <Box sx={{ flexGrow: 1, minWidth: 200 }}>
          <Box>
            <Typography variant="body2" sx={{ color: 'text.primary' }}>
              {x.title}
            </Typography>
            <Stack direction="row">
              <Typography variant="h5">
                {data && data[x.dataIndex]?.value
                  ? x.valueType === 'time'
                    ? fTime(data[x.dataIndex]?.value)
                    : formatCurrency(data[x.dataIndex]?.value)
                  : 'N/a'}
              </Typography>
            </Stack>
          </Box>

          <Typography
            variant="body2"
            color={
              data && data[x.dataIndex]?.trend >= 0 ? 'reportPalette.green3' : 'reportPalette.red3'
            }
          >
            {data && data[x.dataIndex]?.trend
              ? fPercent(data[x.dataIndex]?.trend) + ' so với 7 ngày trước'
              : ''}
          </Typography>
        </Box>
      ))}
    </Stack>
  );
}

export default function KeyTrend({ column, data }: any) {
  return (
    <Card sx={{ height: 'auto' }}>
      <CardHeader title="Xu hướng chính" fontWeight="bold" sx={{ textDecoration: 'underline' }} />
      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3 }}>
          <ProductItem column={column} data={data} />
        </Stack>
      </Scrollbar>
    </Card>
  );
}

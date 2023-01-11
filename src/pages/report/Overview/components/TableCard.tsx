import { Box, Card, Typography } from '@mui/material';
import { ReactElement } from 'react';
import { fNumber, fShortenNumber } from 'utils/formatNumber';

type Size = 'small' | 'medium';

type TableCardProps = {
  title: string | ReactElement;
  unit?: string;
  dataIndex?: string;
  fontSize?: Size;
  highlight?: boolean;
};

type CardProps = {
  unit?: string;
  data?: any;
  column?: TableCardProps[];
  bc?: string;
  bch?: string;
  fontWeight?: string;
  title?: any;
  subtitle?: any;
  smallCard?: boolean;
};

export const MiniTableCard: React.FC<CardProps> = ({ data, column, title, subtitle, bc }) => {
  return (
    <Card sx={{ backgroundColor: bc, color: 'grey.0', height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%'
        }}
      >
        <Typography textAlign="left" variant="h6" pb={1}>
          {title}
        </Typography>

        <Box sx={{ marginTop: 'auto' }}>
          <Typography textAlign="right" variant="body2" pb={1}>
            {subtitle}
          </Typography>

          {column?.map((item: any) => (
            <Typography key={item.dataIndex} textAlign="right" variant="h5">
              {data
                ? data[item.dataIndex] < 100
                  ? fShortenNumber(data[item.dataIndex])
                  : fNumber(data[item.dataIndex])
                : 'N/a'}
            </Typography>
          ))}
        </Box>
      </Box>
    </Card>
  );
};

const TableCard: React.FC<CardProps> = ({
  column,
  data,
  bc,
  bch,
  fontWeight = '500',
  title = 'A default title',
  subtitle = 'A default subtitle',
  smallCard = false
}) => {
  return (
    <Card
      sx={{
        height: '100%',
        backgroundColor: bc,
        color: 'grey.0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        px: smallCard ? 1 : 2
      }}
    >
      <Box>
        <Typography variant="h4" align="center">
          {title}
        </Typography>
        <Typography variant="subtitle2" color="grey.300" align="center">
          {subtitle}
        </Typography>
      </Box>

      {column?.map((item: any) => {
        const hItem = item.highlight ? bch : bc;
        const fz = item.fontSize === 'small' ? 'h6' : 'h5';
        const fz2 = item.fontSize === 'small' ? 'caption' : 'body2';
        return (
          <Box
            key={item}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: smallCard ? 'flex-start' : 'center',
              borderRadius: 1,
              p: 1,
              backgroundColor: hItem
            }}
          >
            {smallCard ? (
              <>
                <Box>
                  <Typography sx={{ fontWeight }} variant="body2" component="div">
                    {item.title}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <Typography sx={{ fontWeight }} variant="body2" component="div">
                    {item.unit}
                  </Typography>

                  {item.dataIndex === 'null' ? (
                    ''
                  ) : (
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Typography sx={{ fontWeight }} variant={fz} component="div">
                        {data
                          ? data[item.dataIndex] < 100
                            ? fShortenNumber(data[item.dataIndex])
                            : fNumber(data[item.dataIndex])
                          : 'N/a'}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </>
            ) : (
              <>
                <Typography sx={{ fontWeight }} variant={fz2} component="div">
                  {item.title}
                </Typography>

                {item.dataIndex === 'null' ? (
                  ''
                ) : (
                  <Typography sx={{ fontWeight }} variant={fz} component="div">
                    {data
                      ? data[item.dataIndex] < 100
                        ? fShortenNumber(data[item.dataIndex])
                        : fNumber(data[item.dataIndex])
                      : 'N/a'}
                  </Typography>
                )}
              </>
            )}
          </Box>
        );
      })}
    </Card>
  );
};

export default TableCard;

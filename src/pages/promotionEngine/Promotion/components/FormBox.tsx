import { Box, Typography } from '@mui/material';
import React from 'react';

interface Props {
  title?: string;
  subtitle?: string;
  sizeGrid?: number;
  children?: React.ReactNode;
  minHeight?: string;
}

export default function FormBox(props: Props) {
  const { title, subtitle, sizeGrid = 12, children, minHeight } = props;
  return (
    <Box
      sx={{
        width: `${(sizeGrid / 12) * 100}%`,
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        gap: '8px 0'
      }}
    >
      {title && subtitle ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px 0',
            flexShrink: 0,
            minHeight: '82px'
          }}
        >
          <Box>{title && <Typography variant="h5">{title}</Typography>}</Box>

          <Box>
            {subtitle && (
              <Typography component="div" variant="subtitle2">
                {subtitle}
              </Typography>
            )}
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px 0',
            flexShrink: 0
          }}
        >
          <Box>{title && <Typography variant="h5">{title}</Typography>}</Box>

          <Box>
            {subtitle && (
              <Typography component="div" variant="subtitle2">
                {subtitle}
              </Typography>
            )}
          </Box>
        </Box>
      )}

      {children && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexShrink: 0,
            flex: 1,
            flexWrap: 'wrap'
          }}
          minHeight={'48px'}
          marginTop={'auto'}
        >
          {children}
        </Box>
      )}
    </Box>
  );
}

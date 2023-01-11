import { Icon } from '@iconify/react';
// material
import { Box, Card, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
// utils

// ----------------------------------------------------------------------
type PromotionWidgetsProp = {
  Widget: {
    title: string;
    icon: any;
    color: any;
    hoverColor: any;
    amount: number;
  };
};
const RootStyle = styled(Card)(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  padding: theme.spacing(3)
}));

const IconStyle = styled(Icon)(({ theme }) => ({
  width: 120,
  height: 120,
  opacity: 0.2,
  position: 'absolute',
  right: theme.spacing(-3),
  color: theme.palette.common.white
}));

// ----------------------------------------------------------------------

export default function PromotionWidgets({ Widget }: PromotionWidgetsProp) {
  const theme = useTheme();

  return (
    <RootStyle
      sx={{
        backgroundColor: `${Widget.color}`,
        cursor: 'pointer',
        '&:hover': { backgroundColor: `${Widget.hoverColor}` },
        padding: '48px'
      }}
    >
      <Box
        sx={{ ml: 3, color: 'common.white', cursor: 'pointer', height: '50px', display: 'flex' }}
        flexDirection="column"
        flex={1}
        flexWrap="wrap"
      >
        <Typography
          variant="h6"
          sx={{
            marginLeft: '-48px',
            marginTop: '-30px'
          }}
        >
          {Widget.title}
        </Typography>
        <Typography variant="h2" sx={{ marginLeft: '-180px', marginTop: '20px' }}>
          {Widget.amount}
        </Typography>
      </Box>
      <IconStyle icon={Widget.icon} />
    </RootStyle>
  );
}

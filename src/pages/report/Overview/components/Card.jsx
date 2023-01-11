import { Card as MuiCard, Stack, Typography } from '@mui/material';
import { styled } from '@mui/styles';

export const StickyCard = styled(MuiCard)({
  textAlign: 'left',
  padding: '1em',
  marginBottom: '1em',
  minHeight: '80px'
  // left: 0
});

export const Card = styled((props) => (
  <MuiCard {...props}>
    <Stack spacing={2}>{props.children}</Stack>
  </MuiCard>
))({
  textAlign: 'left',
  padding: '1em',
  marginBottom: '1em'
});

export const CardTitle = styled(Typography)({
  display: 'inline-block',
  textAlign: 'left',
  marginBottom: '0px',
  fontSize: '24px'
});

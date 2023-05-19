import { styled } from '@mui/material/styles';
import MuiToggleButton from '@mui/material/ToggleButton';

const ToggleButton = styled(MuiToggleButton)(() => ({
  border: 'solid 1px rgba(145, 158, 171, 0.32) !important',
  '&.Mui-selected, &.Mui-selected:hover': {
    color: 'white',
    backgroundColor: '#00AB55'
  }
}));

export default ToggleButton;

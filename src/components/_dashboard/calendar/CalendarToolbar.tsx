import roundViewAgenda from '@iconify/icons-ic/round-view-agenda';
import roundViewWeek from '@iconify/icons-ic/round-view-week';
import { Icon } from '@iconify/react';
import { Box, ToggleButton, Tooltip, Typography } from '@mui/material';
// material
import { styled } from '@mui/material/styles';
import useLocales from 'hooks/useLocales';
import { CalendarView } from '../../../@types/calendar';
// utils
import { fDateTime } from '../../../utils/formatTime';
//
import { MHidden } from '../../@material-extend';

const VIEW_OPTIONS = [
  { value: 'timeGridWeek', label: 'Week', icon: roundViewWeek },
  { value: 'listWeek', label: 'Agenda', icon: roundViewAgenda }
] as const;

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  padding: theme.spacing(3, 0),
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    padding: theme.spacing(1.75, 3),
    justifyContent: 'space-between'
  }
}));

// ----------------------------------------------------------------------

type CalendarToolbarProps = {
  date: Date;
  view: CalendarView;
  onChangeView: (view: CalendarView) => void;
  setOpenModel: VoidFunction;
};

export default function CalendarToolbar({
  date,
  view,
  onChangeView,
  setOpenModel
}: CalendarToolbarProps) {
  const { translate } = useLocales();

  return (
    <RootStyle>
      <MHidden width="smDown">
        <Box sx={{ '& > *:not(:last-of-type)': { mr: 1 } }}>
          {VIEW_OPTIONS.map((viewOption) => (
            <Tooltip key={viewOption.value} title={viewOption.label}>
              <ToggleButton
                value={view}
                selected={viewOption.value === view}
                onChange={() => onChangeView(viewOption.value)}
                sx={{ width: 32, height: 32, padding: 0 }}
              >
                <Icon icon={viewOption.icon} width={20} height={20} />
              </ToggleButton>
            </Tooltip>
          ))}
        </Box>
      </MHidden>

      <Typography variant="h5" sx={{ my: { xs: 1, sm: 0 } }}>
        {fDateTime(date)}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {/* <Button onClick={setOpenModel} size="small" startIcon={<Icon icon={plusFill} />}>
          {translate('pages.stores.applyMenuStore')}
        </Button> */}
      </Box>
    </RootStyle>
  );
}

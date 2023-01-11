// material
import { Grid } from '@mui/material';
// hooks
// components
import Page from '../../components/Page';
// icons
import archiveFill from '@iconify/icons-eva/archive-fill';
import calendarFill from '@iconify/icons-eva/calendar-fill';
import castFill from '@iconify/icons-eva/cast-fill';
import PromotionWidgets from 'components/_dashboard/general-app/PromotionWidgets';
import useLocales from 'hooks/useLocales';

// ----------------------------------------------------------------------

export default function PromotionDash() {
  const { translate } = useLocales();
  const PWidgets = [
    {
      title: `${translate('promotionSystem.dashboard.totalPromotion')}`,
      icon: calendarFill,
      color: '#aa0a0a',
      hoverColor: '#F51720',
      amount: 20
    },
    {
      title: `${translate('promotionSystem.dashboard.runningPromotion')}`,
      icon: castFill,
      color: '#E1C340',
      hoverColor: '#fbc02d',
      amount: 19
    },
    {
      title: `${translate('promotionSystem.dashboard.expiredPromotion')}`,
      icon: archiveFill,
      color: '#18A558',
      hoverColor: '#00c853',
      amount: 0
    },
    {
      title: `${translate('promotionSystem.dashboard.draftPromotion')}`,
      icon: castFill,
      color: '#00bcd4',
      hoverColor: '#4dd0e1',
      amount: 0
    }
  ];

  return (
    <Page title={`${translate('promotionSystem.dashboard.title')}`}>
      <Grid container spacing={3}>
        {PWidgets.map((item) => (
          <Grid key={item.title} item xs={12} md={6} lg={3}>
            <PromotionWidgets Widget={item} />
          </Grid>
        ))}
      </Grid>
    </Page>
  );
}

import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import useLocales from 'hooks/useLocales';
// import { fDateTime } from 'utils/formatTime';
import { Card } from 'pages/promotionEngine/Promotion/components/Card';
import { fDateTime } from 'utils/formatTime';
import { paymentMethodList } from '../components/config';

function StepThree({ watch }: any) {
  const { translate } = useLocales();
  const StyleWidthTypography = styled(Typography)((props) => ({
    marginTop: `${props.marginTop || '16px'}`,
    width: `${props.width || '50%'}`
  }));

  const paymentList = paymentMethodList();

  return (
    <Stack p={1} spacing={3} width={'100%'}>
      <Typography px={2} variant="h3" sx={{ textTransform: 'uppercase' }}>
        {translate('promotionSystem.promotion.preview.title')}
      </Typography>
      <Card>
        <Stack spacing={4} p={2} textAlign="left">
          <Box display="flex" alignItems="center">
            <StyleWidthTypography marginTop="0" width="40%" variant="h6">
              {translate('promotionSystem.promotion.preview.name')}
            </StyleWidthTypography>
            <StyleWidthTypography marginTop="0" variant="body1">
              {watch('promotionName')}
            </StyleWidthTypography>
          </Box>
          <Box>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Box display="flex" alignItems="center">
                  <StyleWidthTypography variant="h6">
                    {translate('promotionSystem.promotion.preview.startDate')}
                  </StyleWidthTypography>
                  <StyleWidthTypography variant="body1">
                    {watch('startDate') ? fDateTime(watch('startDate')) : '-'}
                  </StyleWidthTypography>
                </Box>
                <Box display="flex" alignItems="center">
                  <StyleWidthTypography variant="h6">
                    {translate('promotionSystem.promotion.preview.endDate')}
                  </StyleWidthTypography>
                  <StyleWidthTypography variant="body1">
                    {watch('endDate') ? fDateTime(watch('endDate')) : '-'}
                  </StyleWidthTypography>
                </Box>
                <Box display="flex" alignItems="center">
                  <StyleWidthTypography variant="h6">
                    {translate('promotionSystem.promotion.preview.exclusive')}
                  </StyleWidthTypography>
                  <StyleWidthTypography variant="body1"></StyleWidthTypography>
                </Box>
                <Box display="flex" alignItems="center">
                  <StyleWidthTypography variant="h6">
                    {translate('promotionSystem.promotion.preview.status')}
                  </StyleWidthTypography>
                  <StyleWidthTypography variant="body1"></StyleWidthTypography>
                </Box>
                <Box display="flex" alignItems="center">
                  <StyleWidthTypography variant="h6">
                    {translate('promotionSystem.promotion.preview.paymentMethod')}
                  </StyleWidthTypography>
                  <StyleWidthTypography variant="body1">
                    {watch('paymentMethod') !== undefined &&
                      watch('paymentMethod').map(
                        (e: any) => paymentList.find((p: any) => p.value === e)?.label + ', '
                      )}
                  </StyleWidthTypography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" alignItems="center">
                  <StyleWidthTypography variant="h6">
                    {translate('promotionSystem.promotion.preview.saleMode')}
                  </StyleWidthTypography>
                  <StyleWidthTypography variant="body1">saleMode</StyleWidthTypography>
                </Box>
                <Box display="flex" alignItems="center">
                  <StyleWidthTypography variant="h6">
                    {translate('promotionSystem.promotion.preview.applyBy')}
                  </StyleWidthTypography>
                  <StyleWidthTypography variant="body1">Online</StyleWidthTypography>
                </Box>
                <Box display="flex" alignItems="center">
                  <StyleWidthTypography variant="h6">
                    {translate('promotionSystem.promotion.preview.availableOnHoliday')}
                  </StyleWidthTypography>
                  <StyleWidthTypography variant="body1">Yes</StyleWidthTypography>
                </Box>
                <Box display="flex" alignItems="center">
                  <StyleWidthTypography variant="h6">
                    {translate('promotionSystem.promotion.preview.customerType')}
                  </StyleWidthTypography>
                  <StyleWidthTypography variant="body1">Guest</StyleWidthTypography>
                </Box>
                <Box display="flex" alignItems="center">
                  <StyleWidthTypography variant="h6">
                    {translate('promotionSystem.promotion.preview.customerGender')}
                  </StyleWidthTypography>
                  <StyleWidthTypography variant="body1">Male</StyleWidthTypography>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box mt={4.5}>
            <Button sx={{ p: '10px 16px' }} size="large" variant="contained" component="label">
              {translate('promotionSystem.promotion.preview.uploadFile')}
              <input type="file" hidden />
            </Button>
          </Box>
        </Stack>
      </Card>
    </Stack>
  );
}

export default StepThree;

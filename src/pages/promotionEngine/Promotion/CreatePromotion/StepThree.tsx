import {
  Avatar,
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Stack,
  Tab,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import useLocales from 'hooks/useLocales';
import { Card } from 'pages/promotionEngine/Promotion/components/Card';
import { fDateTime } from 'utils/formatTime';
import {
  applyList,
  forHolidayList,
  genderList,
  particularDayList,
  paymentMethodList,
  targetCustomerList,
  timeFrameList
} from '../components/config';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useState } from 'react';

function StepThree({ watch }: any) {
  const { translate } = useLocales();
  const StyleWidthTypography = styled(Typography)((props) => ({
    marginTop: `${props.marginTop || '16px'}`,
    width: `${props.width || '50%'}`
  }));

  function convertToCustomFormat(inputDate: string): string {
    // Convert the input date string to a Date object
    const dateObject: Date = new Date(inputDate);

    // Format the Date object to the desired output format
    const dateFormatOptions: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    };
    const timeFormatOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric' };

    const outputDate: string = dateObject.toLocaleDateString('en-GB', dateFormatOptions);
    const outputTime: string = dateObject.toLocaleTimeString('en-GB', timeFormatOptions);

    return `${outputDate} ${outputTime}`;
  }

  const statusMap: any = {
    1: 'Nháp',
    2: 'Công khai',
    3: 'Không công khai',
    4: 'Hết hiệu lực'
  };

  const statusLabel = statusMap[watch('status')] || '';

  const paymentList = paymentMethodList();
  const genders = genderList();
  const customerTypes = targetCustomerList();
  const applyByList = applyList();
  const forHolidayStatuss = forHolidayList();
  const dayList = particularDayList();
  const timeList = timeFrameList();

  const [value, setValue] = useState<string>('1'); // Initialize state with default value
  console.log(watch('dayFilter'));

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Stack p={1} spacing={3} width={'100%'}>
      <Typography px={2} variant="h3" sx={{ textTransform: 'uppercase' }}>
        {translate('promotionSystem.promotion.preview.title')}
      </Typography>
      <Card>
        <Stack spacing={2000} p={6} textAlign="left">
          <Box>
            <Grid container spacing={5}>
              <Grid display="flex" item xs={12}>
                <StyleWidthTypography
                  sx={{
                    color: 'rgb(110,110,140)'
                  }}
                  width={'100%'}
                  textAlign="left"
                  variant="h4"
                >
                  Thông tin tổng quát
                </StyleWidthTypography>
                <StyleWidthTypography width={'100%'} textAlign="right">
                  <Typography style={{ display: 'inline-block' }}>Cập nhật gần đây: </Typography>
                  <Typography style={{ display: 'inline-block', fontWeight: 'bold' }}>
                    {convertToCustomFormat(watch('updDate'))}
                  </Typography>
                </StyleWidthTypography>
              </Grid>
              <Grid item xs={4}>
                <Box textAlign="start" display="flex" alignItems="start">
                  <StyleWidthTypography variant="h6">
                    {translate('promotionSystem.promotion.preview.name')}：
                  </StyleWidthTypography>
                  <StyleWidthTypography variant="body1">
                    {watch('promotionName')}
                  </StyleWidthTypography>
                </Box>
                <Box display="flex" alignItems="center">
                  <StyleWidthTypography variant="h6">
                    {translate('promotionSystem.promotion.preview.startDate')}：
                  </StyleWidthTypography>
                  <StyleWidthTypography variant="body1">
                    {watch('startDate') ? fDateTime(watch('startDate')) : '-'}
                  </StyleWidthTypography>
                </Box>
                <Box display="flex" alignItems="center">
                  <StyleWidthTypography variant="h6">
                    {translate('promotionSystem.promotion.preview.endDate')}：
                  </StyleWidthTypography>
                  <StyleWidthTypography variant="body1">
                    {watch('endDate') ? fDateTime(watch('endDate')) : '-'}
                  </StyleWidthTypography>
                </Box>
                <Box display="flex" alignItems="center">
                  <StyleWidthTypography variant="h6">Có voucher: </StyleWidthTypography>
                  <StyleWidthTypography sx={{ marginTop: '16px' }} variant="body1">
                    {watch('hasVoucher') ? 'Có' : 'Không'}
                  </StyleWidthTypography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box display="flex" alignItems="center">
                  <StyleWidthTypography sx={{ marginTop: '16px' }} variant="h6">
                    {translate('promotionSystem.promotion.preview.status')}：
                  </StyleWidthTypography>
                  <StyleWidthTypography sx={{ marginTop: '16px' }} variant="body1">
                    {statusLabel}
                  </StyleWidthTypography>
                </Box>
                <Box display="flex" alignItems="center">
                  <StyleWidthTypography sx={{ marginTop: '32px' }} variant="h6">
                    Mã khuyến mãi：
                  </StyleWidthTypography>
                  <StyleWidthTypography sx={{ marginTop: '32px' }} variant="body1">
                    {watch('promotionCode')}
                  </StyleWidthTypography>
                </Box>
                <Box display="flex" alignItems="center">
                  <StyleWidthTypography variant="h6">Tự động: </StyleWidthTypography>
                  <StyleWidthTypography sx={{ marginTop: '16px' }} variant="body1">
                    {watch('isAuto') ? 'Có' : 'Không'}
                  </StyleWidthTypography>
                </Box>
                <Box display="flex" alignItems="center">
                  <StyleWidthTypography variant="h6">
                    {translate('promotionSystem.promotion.preview.exclusive')}：
                  </StyleWidthTypography>
                  <StyleWidthTypography variant="body1">{watch('exclusive')}</StyleWidthTypography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ marginTop: '0px' }} alignItems="center">
                  <StyleWidthTypography variant="h6">Hình ảnh:</StyleWidthTypography>
                  {watch('imgUrl') ? (
                    <Avatar sx={{ width: '60%', height: '60%' }} src={watch('imgUrl')} />
                  ) : (
                    <StyleWidthTypography variant="h6">No Data</StyleWidthTypography>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Card>

      <TabContext value={value}>
        <StyleWidthTypography
          sx={{
            color: 'rgb(110,110,140)'
          }}
          width={'100%'}
          textAlign="left"
          variant="h4"
        >
          THÔNG TIN CHI TIẾT
        </StyleWidthTypography>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Cấu hình" value="1" />
            <Tab label="Thời gian" value="2" />
            <Tab label="Distribution" value="3" />
          </TabList>
        </Box>
        {/* Cái này là chỗ để tab nè */}
        <TabPanel value="1">
          <Card spacing={6} p={6}>
            <Card>
              <Stack p={6} textAlign="left">
                <Box>
                  <Grid container spacing={2}>
                    <Grid display="flex" item xs={12}>
                      <StyleWidthTypography
                        sx={{
                          color: 'rgb(110,110,140)'
                        }}
                        width={'100%'}
                        textAlign="left"
                        variant="h4"
                      ></StyleWidthTypography>
                      <StyleWidthTypography width={'100%'} textAlign="end">
                        <Typography sx={{ display: 'inline-block' }}>Cập nhật gần đây:</Typography>{' '}
                        <Typography sx={{ display: 'inline-block', fontWeight: 'bold' }}>
                          {convertToCustomFormat(watch('updDate'))}
                        </Typography>
                      </StyleWidthTypography>
                    </Grid>
                    <Grid p={0} item xs={6}>
                      <Box display="flex" alignItems="center">
                        <StyleWidthTypography variant="h6">
                          {translate('promotionSystem.promotion.preview.saleMode')}：
                        </StyleWidthTypography>
                        <StyleWidthTypography variant="body1">saleMode</StyleWidthTypography>
                      </Box>

                      <Box display="flex" alignItems="center">
                        <StyleWidthTypography variant="h6">Member Levels:</StyleWidthTypography>
                        <StyleWidthTypography variant="body1"></StyleWidthTypography>
                      </Box>
                      <Box alignItems="center" display={'flex'}>
                        <StyleWidthTypography variant="h6" sx={{ width: '35%' }}>
                          {translate('promotionSystem.promotion.preview.customerType')}：
                        </StyleWidthTypography>
                        <StyleWidthTypography variant="body1" sx={{ width: '65%' }}>
                          <Grid container display="flex" flexDirection={'row-reverse'}>
                            {customerTypes.map((e: any, index: number) => (
                              <Grid item key={index} xs={12 / 3}>
                                <FormGroup>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        defaultChecked={Boolean(watch('forMembership') == e.value)}
                                      />
                                    }
                                    label={e.label}
                                  />
                                </FormGroup>
                              </Grid>
                            ))}
                          </Grid>
                        </StyleWidthTypography>
                      </Box>
                      <Box display="flex" alignItems="center">
                        <StyleWidthTypography variant="h6" sx={{ width: '35%' }}>
                          {translate('promotionSystem.promotion.preview.applyBy')}：
                        </StyleWidthTypography>
                        <StyleWidthTypography variant="body1" sx={{ width: '65%' }}>
                          <Grid container xs={12}>
                            {applyByList.map((e: any, index: number) => (
                              <Grid item key={index} xs={12 / 3}>
                                <FormGroup>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        defaultChecked={Boolean(watch('applyBy') == e.value)}
                                      />
                                    }
                                    label={e.label}
                                  />
                                </FormGroup>
                              </Grid>
                            ))}
                          </Grid>
                        </StyleWidthTypography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box display="flex" alignItems="center">
                        <StyleWidthTypography variant="h6">
                          {translate('promotionSystem.promotion.preview.availableOnHoliday')}：
                        </StyleWidthTypography>
                        <StyleWidthTypography variant="body1">
                          <Grid container xs={12}>
                            {forHolidayStatuss.map((e: any, index: number) => (
                              <Grid item key={index} xs={12 / 3}>
                                <FormGroup>
                                  <FormControlLabel
                                    sx={{ width: 'max-content' }}
                                    control={
                                      <Checkbox
                                        defaultChecked={Boolean(watch('forHoliday') == e.value)}
                                      />
                                    }
                                    label={e.label}
                                  />
                                </FormGroup>
                              </Grid>
                            ))}
                          </Grid>
                        </StyleWidthTypography>
                      </Box>
                      <Box display="flex" alignItems="center">
                        <StyleWidthTypography variant="h6">
                          {translate('promotionSystem.promotion.preview.customerGender')}：
                        </StyleWidthTypography>
                        <StyleWidthTypography variant="body1">
                          <Grid container xs={12}>
                            {genders.map((e: any, index: number) => (
                              <Grid item key={index} xs={12 / 3}>
                                <FormGroup>
                                  <FormControlLabel
                                    sx={{ width: 'max-content' }}
                                    control={
                                      <Checkbox
                                        defaultChecked={Boolean(watch('gender') == e.value)}
                                      />
                                    }
                                    label={e.label}
                                  />
                                </FormGroup>
                              </Grid>
                            ))}
                          </Grid>
                        </StyleWidthTypography>
                      </Box>
                      <Box alignItems="center">
                        <StyleWidthTypography variant="h6">
                          {translate('promotionSystem.promotion.preview.paymentMethod')}：
                        </StyleWidthTypography>
                        <Grid container xs={12} spacing={0}>
                          {watch('paymentMethod') !== undefined &&
                            paymentList.map((e: any, index: number) => (
                              <Grid item key={index} xs={12 / 3}>
                                <FormGroup>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        defaultChecked={watch('paymentMethod').some(
                                          (item: any) => item == e.value
                                        )}
                                      />
                                    }
                                    label={e.label}
                                  />
                                </FormGroup>
                              </Grid>
                            ))}
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Stack>
            </Card>
          </Card>
        </TabPanel>

        <TabPanel value="2">
          <Card>
            <Stack spacing={6} p={6} textAlign="left">
              <Box>
                <Grid container spacing={2}>
                  <Grid display="flex" item xs={12}>
                    <StyleWidthTypography
                      sx={{
                        color: 'rgb(110,110,140)'
                      }}
                      width={'100%'}
                      textAlign="left"
                      variant="h4"
                    ></StyleWidthTypography>
                  </Grid>
                  <Grid p={0} item xs={12}>
                    <Box alignItems="center">
                      <StyleWidthTypography variant="h6">Khung Ngày:</StyleWidthTypography>
                    </Box>
                    <Box>
                      {watch('dayFilter') !== undefined && (
                        <Grid container spacing={2} xs={12}>
                          {dayList.map((e: any, index: number) => (
                            <Grid item key={index} xs={12 / 7}>
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      defaultChecked={watch('dayFilter').some(
                                        (item: any) => (e.value = item)
                                      )}
                                    />
                                  }
                                  label={e.label}
                                />
                              </FormGroup>
                            </Grid>
                          ))}
                        </Grid>
                      )}
                    </Box>
                  </Grid>

                  <Grid p={0} item xs={12}>
                    <Box alignItems="center">
                      <StyleWidthTypography variant="h6">Khung Giờ:</StyleWidthTypography>
                    </Box>
                    <Box>
                      {watch('hourFilter') !== undefined && (
                        <Grid container spacing={2} xs={12}>
                          {timeList.map((e: any, index: number) => (
                            <Grid item key={index} xs={2}>
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      defaultChecked={watch('hourFilter').some(
                                        (item: any) => item == e.value
                                      )}
                                    />
                                  }
                                  label={e.label}
                                />
                              </FormGroup>
                            </Grid>
                          ))}
                        </Grid>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Stack>
          </Card>
        </TabPanel>
        <TabPanel value="3"></TabPanel>
      </TabContext>
    </Stack>
  );
}

export default StepThree;

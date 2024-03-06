import { Box, Grid, Stack, Tab, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import useLocales from 'hooks/useLocales';
import { Card } from 'pages/promotionEngine/Promotion/components/Card';
import {
  applyByList,
  forHolidayList,
  genderList,
  particularDayList,
  paymentMethodList,
  targetCustomerList,
  timeFrameList,
  saleModeList,
  actionType,
  hasVoucher,
  isAuto,
  statusMap,
  promotionTypeList
} from '../components/config';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useState } from 'react';
import { DashboardNavLayout } from 'layouts/dashboard/DashboardNavbar';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import { InputField, RadioGroupField, SelectField, UploadImageField } from 'components/form';
import DateTimePickerField from 'components/form/DateTimePickerField';
import useDashboard from 'hooks/useDashboard';
import { TPromotionBase } from 'types/promotion/promotion';
import { useNavigate } from 'react-router';
import CheckBoxGroupField from 'components/form/CheckBoxGroupField';

interface Props {
  watch: any;
  handleSubmit: any;
}

function StepOne({ watch, handleSubmit }: Props) {
  const { translate } = useLocales();
  const { setNavOpen } = useDashboard();
  const navigate = useNavigate();
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

  const isAutoList = isAuto();
  const promotionTier = watch('promotionTier');
  const saleTypes = saleModeList();
  const paymentList = paymentMethodList();
  const genders = genderList();
  const customerTypes = targetCustomerList();
  const applyList = applyByList();
  const forHolidayStatuss = forHolidayList();
  const dayList = particularDayList();
  const timeList = timeFrameList();
  const actionTypeList = actionType();
  const hasVoucherList = hasVoucher();
  const statusList = statusMap();
  const promotionTypes = promotionTypeList();
  const [value, setValue] = useState<string>('1');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  const onSubmit = (values: TPromotionBase) => {
    console.log(`data`, values);
  };

  return (
    <>
      <DashboardNavLayout onOpenSidebar={() => setNavOpen(true)}>
        <Stack direction="row" spacing={2}>
          <LoadingAsyncButton type="submit" variant="contained" onClick={handleSubmit(onSubmit)}>
            Lưu
          </LoadingAsyncButton>
        </Stack>
      </DashboardNavLayout>
      <Card>
        <Stack p={1} spacing={3} width={'100%'}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Tổng quan" value="1" />
                <Tab label="Cấu hình" value="2" />
                <Tab label="Thời gian" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Stack width="100%">
                <Box>
                  <Grid container spacing={3}>
                    <Grid display="flex" item xs={12}>
                      <StyleWidthTypography width={'100%'} textAlign="left" variant="h4">
                        Thông tin tổng quát
                      </StyleWidthTypography>
                    </Grid>
                    <Grid container item xs={4} spacing={2}>
                      <Grid item xs={12}>
                        <InputField
                          fullWidth
                          name="promotionName"
                          label={translate('promotionSystem.promotion.preview.name')}
                          required
                          defaultValue="promotionName"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <InputField fullWidth name="promotionCode" label="Mã khuyến mãi" required />
                      </Grid>
                      <Grid item xs={12}>
                        <DateTimePickerField
                          fullWidth
                          name="startDate"
                          label={translate('promotionSystem.promotion.preview.startDate')}
                          inputFormat="yyyy/MM/dd hh:mm a"
                          minDate={new Date()}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <DateTimePickerField
                          fullWidth
                          name="endDate"
                          label={translate('promotionSystem.promotion.preview.endDate')}
                          inputFormat="yyyy/MM/dd hh:mm a"
                          minDate={new Date()}
                        />
                      </Grid>
                    </Grid>
                    <Grid container item xs={4}>
                      <Grid item xs={12}>
                        <SelectField
                          fullWidth
                          options={statusList}
                          name="status"
                          label={translate('promotionSystem.promotion.preview.status')}
                        ></SelectField>
                      </Grid>

                      <Grid item xs={12}>
                        <InputField
                          fullWidth
                          name="exclusive"
                          label={translate('promotionSystem.promotion.preview.exclusive')}
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <InputField fullWidth name="description" label={'Tiêu đề'} required />
                      </Grid>
                      <Grid container item xs={12}>
                        <StyleWidthTypography variant="h6">Có Voucher</StyleWidthTypography>
                      </Grid>
                      <Grid item xs={12}>
                        <RadioGroupField
                          sx={{
                            display: 'flex',
                            flexDirection: 'row'
                          }}
                          fullWidth
                          options={hasVoucherList}
                          name="hasVoucher"
                          defaultValue={hasVoucherList}
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={4}>
                      <Box sx={{ marginTop: '0px' }} display={'flex'} justifyContent={'center'}>
                        <UploadImageField.Avatar label="Hình ảnh" name="imgUrl" />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Stack>
            </TabPanel>
            <TabPanel value="2">
              <Stack textAlign="left">
                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <StyleWidthTypography
                        sx={{
                          color: 'rgb(110,110,140)'
                        }}
                        width={'100%'}
                        textAlign="left"
                        variant="h4"
                      >
                        Cấu hình chi tiết
                      </StyleWidthTypography>
                    </Grid>
                    <Grid p={0} item xs={6}>
                      <Box display="flex" alignItems="center">
                        <StyleWidthTypography variant="h6">
                          {translate('promotionSystem.promotion.preview.saleMode')}：
                        </StyleWidthTypography>
                      </Box>

                      <Box alignItems="center">
                        <StyleWidthTypography variant="h6" width={'100%'}>
                          <RadioGroupField
                            fullWidth
                            options={saleTypes}
                            name="saleMode"
                            sx={{ display: 'flex', flexDirection: 'row' }}
                          />
                        </StyleWidthTypography>
                      </Box>
                      <Box alignItems="center" display={'flex'}>
                        <StyleWidthTypography variant="h6" sx={{ width: '35%' }}>
                          {translate('promotionSystem.promotion.preview.customerType')}：
                        </StyleWidthTypography>
                        <StyleWidthTypography variant="body1" sx={{ width: '65%' }}>
                          <RadioGroupField
                            sx={{
                              display: 'flex',
                              justifyContent: 'start',
                              flexDirection: 'row-reverse'
                            }}
                            fullWidth
                            options={customerTypes}
                            name="customerType"
                          />
                        </StyleWidthTypography>
                      </Box>

                      <Box display="flex" alignItems="center">
                        <StyleWidthTypography variant="h6" sx={{ width: '35%' }}>
                          {translate('promotionSystem.promotion.preview.applyBy')}：
                        </StyleWidthTypography>
                        <StyleWidthTypography variant="body1" sx={{ width: '65%' }}>
                          <RadioGroupField
                            sx={{ display: 'flex', flexDirection: 'row' }}
                            fullWidth
                            options={applyList}
                            name="applyBy"
                          />
                        </StyleWidthTypography>
                      </Box>
                      <Box display="flex" alignItems="center">
                        <StyleWidthTypography variant="h6" width={'50%'}>
                          Tự động:
                        </StyleWidthTypography>
                        <StyleWidthTypography variant="body1">
                          <RadioGroupField
                            sx={{
                              display: 'flex',
                              justifyContent: 'flex-start',
                              flexDirection: 'row'
                            }}
                            fullWidth
                            options={isAutoList}
                            name="isAuto"
                            defaultValue={isAutoList}
                          />
                        </StyleWidthTypography>
                      </Box>
                      <Box>
                        <StyleWidthTypography variant="h6" sx={{ width: '100%' }}>
                          Loại：
                        </StyleWidthTypography>
                        <StyleWidthTypography variant="body1" sx={{ width: '100%' }}>
                          <Grid container xs={12}>
                            <RadioGroupField
                              xs={12 / 3}
                              sx={{
                                flexDirection: 'row '
                              }}
                              options={actionTypeList}
                              name="actionType"
                            />
                          </Grid>
                        </StyleWidthTypography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box>
                        <StyleWidthTypography variant="h6">Loại khuyến mãi:</StyleWidthTypography>
                        <StyleWidthTypography variant="body1">
                          <Grid container xs={12}>
                            <RadioGroupField
                              xs={12}
                              fullWidth
                              options={promotionTypes}
                              name="promotionType"
                              defaultValue={promotionTypes}
                            />
                          </Grid>
                        </StyleWidthTypography>
                      </Box>

                      <Box display="flex" alignItems="center">
                        <StyleWidthTypography variant="h6">
                          {translate('promotionSystem.promotion.preview.availableOnHoliday')}：
                        </StyleWidthTypography>
                        <StyleWidthTypography variant="body1">
                          <RadioGroupField
                            sx={{ display: 'flex', flexDirection: 'row' }}
                            options={forHolidayStatuss}
                            name="forHoliday"
                          />
                        </StyleWidthTypography>
                      </Box>

                      <Box>
                        <StyleWidthTypography variant="h6" width={'100%'}>
                          {translate('promotionSystem.promotion.preview.paymentMethod')}：
                        </StyleWidthTypography>
                        <StyleWidthTypography variant="body1" width={'100%'}>
                          <Grid container xs={12}>
                            <CheckBoxGroupField
                              xs={4}
                              options={paymentList}
                              name={'paymentMethod'}
                            />
                          </Grid>
                        </StyleWidthTypography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Stack>
            </TabPanel>

            <TabPanel value="3">
              <Stack textAlign="left">
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
                      >
                        Khung thời gian
                      </StyleWidthTypography>
                    </Grid>
                    <Grid p={0} item xs={12}>
                      <Box>
                        <StyleWidthTypography variant="h6">Khung Ngày:</StyleWidthTypography>
                      </Box>
                      <Box>
                        <Grid container xs={12}>
                          <CheckBoxGroupField xs={1.5} options={dayList} name={'dayFilter'} />
                        </Grid>
                      </Box>
                    </Grid>
                    <Grid p={0} item xs={12}>
                      <Box alignItems="center" width="100%">
                        <StyleWidthTypography variant="h6">Khung Giờ:</StyleWidthTypography>
                      </Box>
                      <Box>
                        <Grid container xs={12}>
                          <CheckBoxGroupField xs={12 / 8} options={timeList} name={'hourFilter'} />
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Stack>
            </TabPanel>
          </TabContext>
        </Stack>
      </Card>
    </>
  );
}

export default StepOne;

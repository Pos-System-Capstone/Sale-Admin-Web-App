import {
  Avatar,
  Box,
  Button,
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
import {
  memberLevelList,
  applyByList,
  forHolidayList,
  genderList,
  particularDayList,
  paymentMethodList,
  targetCustomerList,
  timeFrameList,
  saleModeList
} from '../components/config';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useState } from 'react';
import { DashboardNavLayout } from 'layouts/dashboard/DashboardNavbar';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import { InputField, RadioGroupField, SelectField } from 'components/form';
import DateTimePickerField from 'components/form/DateTimePickerField';
import useDashboard from 'hooks/useDashboard';
import { TPromotionBase } from 'types/promotion/promotion';
import { useNavigate } from 'react-router';
import CreatePromotionTier from './CreatePromotionTier';

interface Props {
  watch: any;
  handleSubmit: any;
}

function StepThree({ watch, handleSubmit }: Props) {
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

  const statusMap: any = [
    {
      value: 1,
      label: 'Nháp'
    },
    {
      value: 2,
      label: 'Công khai'
    },
    {
      value: 3,
      label: 'Không công khai'
    },
    {
      value: 4,
      label: 'Hết hiệu lực'
    }
  ];

  const forHolidayMap: any = {
    1: 'Có',
    2: 'Không'
  };

  const isAuto: any = [
    {
      value: true,
      label: 'Có'
    },
    {
      value: false,
      label: 'Không'
    }
  ];

  const hasVoucher: any = [
    {
      value: true,
      label: 'Có'
    },
    {
      value: false,
      label: 'Không'
    }
  ];

  const promotionTier = watch('promotionTier');
  const memberList = memberLevelList();

  const forHolidayLabel = forHolidayMap[watch('forHoliday')] || '';

  const statusLabel = statusMap[watch('status')] || '';
  const saleTypes = saleModeList();
  const paymentList = paymentMethodList();
  const genders = genderList();
  const customerTypes = targetCustomerList();
  const applyList = applyByList();
  const forHolidayStatuss = forHolidayList();
  const dayList = particularDayList();
  const timeList = timeFrameList();

  const [value, setValue] = useState<string>('1');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  const onSubmit = (values: TPromotionBase) => {
    console.log(`data`, values);
  };

  const checkPromotionTier = Array.isArray(promotionTier)
    ? promotionTier.length > 0
      ? true
      : false
    : false;

  return (
    <>
      <DashboardNavLayout onOpenSidebar={() => setNavOpen(true)}>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Hủy
          </Button>
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
                <Tab label="Bậc" value="4" />
              </TabList>
            </Box>
            {/* Cái này là chỗ để tab nè */}
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
                          options={statusMap}
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
                          options={hasVoucher}
                          name="hasVoucher"
                          defaultValue={hasVoucher}
                        />
                      </Grid>
                      <Grid container item xs={12}>
                        <StyleWidthTypography variant="h6">Tự động</StyleWidthTypography>
                      </Grid>
                      <Grid item xs={12}>
                        <RadioGroupField
                          sx={{
                            display: 'flex',
                            flexDirection: 'row'
                          }}
                          fullWidth
                          options={isAuto}
                          name="isAuto"
                          defaultValue={isAuto}
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={4}>
                      <Box sx={{ marginTop: '0px' }} display={'flex'} justifyContent={'center'}>
                        {watch('imgUrl') ? (
                          <Avatar
                            variant="rounded"
                            sx={{ width: '80%', height: '80%' }}
                            src={watch('imgUrl')}
                          />
                        ) : (
                          <StyleWidthTypography variant="h6">No Data</StyleWidthTypography>
                        )}
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
                          <Grid container xs={12} spacing={0}>
                            {saleTypes.map((e: any, index: number) => (
                              <Grid item key={index} xs={12 / 4}>
                                <FormGroup>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        defaultChecked={Boolean(watch('saleMode') == e.value)}
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
                            {applyList.map((e: any, index: number) => (
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
                      <Box alignItems="center" width="100%">
                        <StyleWidthTypography variant="h6">Khung Giờ:</StyleWidthTypography>
                      </Box>
                      <Box>
                        <Card>
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
                        </Card>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Stack>
            </TabPanel>
            <TabPanel value="4">
              {checkPromotionTier ? (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box alignItems="center" width={'100%'}>
                      <StyleWidthTypography
                        sx={{
                          color: 'rgb(110,110,140)'
                        }}
                        width={'100%'}
                        textAlign="left"
                        variant="h4"
                      >
                        Bậc Khuyến Mãi
                      </StyleWidthTypography>
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    {promotionTier !== undefined && (
                      <Grid container spacing={2}>
                        <Grid item xs={8}>
                          <StyleWidthTypography width={'100%'}>
                            <Typography variant="h6" style={{ display: 'inline-block' }}>
                              Loại hành động :
                            </Typography>{' '}
                            <Typography style={{ display: 'inline-block' }} variant="body1">
                              {promotionTier[0].action.name}
                            </Typography>
                          </StyleWidthTypography>
                        </Grid>
                        <Grid item xs={4}>
                          <StyleWidthTypography width={'100%'}>
                            <Typography variant="h6" style={{ display: 'inline-block' }}>
                              Ưu tiên :
                            </Typography>{' '}
                            <Typography style={{ display: 'inline-block' }} variant="body1">
                              {promotionTier[0].priority}
                            </Typography>
                          </StyleWidthTypography>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <Box>
                      <Card>
                        {promotionTier !== undefined && (
                          <Grid container spacing={2}>
                            <Grid item xs={4}>
                              <Box alignItems="center">
                                <StyleWidthTypography style={{ marginTop: '0rem' }} variant="h6">
                                  Nhóm Voucher
                                </StyleWidthTypography>
                              </Box>

                              <Box alignItems="center">
                                {promotionTier[0].voucherGroup !== null ? (
                                  <StyleWidthTypography variant="caption" style={{ color: 'blue' }}>
                                    {promotionTier[0].voucherGroup.name}
                                  </StyleWidthTypography>
                                ) : (
                                  <StyleWidthTypography variant="caption">
                                    {' '}
                                    Không có Voucher{' '}
                                  </StyleWidthTypography>
                                )}
                              </Box>
                            </Grid>
                            <Grid item xs={4}>
                              <Box alignItems="center">
                                <StyleWidthTypography style={{ marginTop: '0rem' }} variant="h6">
                                  Điều kiện
                                </StyleWidthTypography>
                              </Box>
                              <Box alignItems="center">
                                {promotionTier[0].conditionRule !== null ? (
                                  <StyleWidthTypography variant="caption" style={{ color: 'blue' }}>
                                    {promotionTier[0].conditionRule.ruleName}
                                  </StyleWidthTypography>
                                ) : (
                                  <StyleWidthTypography variant="caption">
                                    {' '}
                                    Không có điều kiện{' '}
                                  </StyleWidthTypography>
                                )}
                              </Box>
                            </Grid>
                            <Grid item xs={4}>
                              <Box alignItems="center">
                                <StyleWidthTypography style={{ marginTop: '0rem' }} variant="h6">
                                  Hành động
                                </StyleWidthTypography>
                              </Box>
                              <Box alignItems="center">
                                {promotionTier[0].action !== null ? (
                                  <StyleWidthTypography
                                    variant="caption"
                                    style={{ color: 'blue', marginTop: '1rem' }}
                                  >
                                    {promotionTier[0].action.name}
                                  </StyleWidthTypography>
                                ) : (
                                  <StyleWidthTypography variant="caption">
                                    {' '}
                                    Không có hành động
                                  </StyleWidthTypography>
                                )}
                              </Box>
                            </Grid>
                          </Grid>
                        )}
                      </Card>
                    </Box>
                  </Grid>
                </Grid>
              ) : (
                <CreatePromotionTier watch={watch} />
              )}
            </TabPanel>
          </TabContext>
          <StyleWidthTypography width={'100%'} textAlign="right">
            <Typography style={{ display: 'inline-block' }}>Cập nhật gần đây: </Typography>{' '}
            <Typography style={{ display: 'inline-block', fontWeight: 'bold' }}>
              {convertToCustomFormat(watch('updDate'))}
            </Typography>{' '}
          </StyleWidthTypography>
        </Stack>
      </Card>
    </>
  );
}

export default StepThree;

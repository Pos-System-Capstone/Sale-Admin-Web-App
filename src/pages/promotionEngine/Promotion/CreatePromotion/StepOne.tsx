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
import { useRef, useState } from 'react';
import { DashboardNavLayout } from 'layouts/dashboard/DashboardNavbar';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import {
  InputField,
  RadioGroupField,
  SelectField,
  SwitchField,
  UploadImageField
} from 'components/form';
import useDashboard from 'hooks/useDashboard';
import { TPromotionCreate } from 'types/promotion/promotion';
import { useNavigate } from 'react-router';
import CheckBoxGroupField from 'components/form/CheckBoxGroupField';
// import promotionApi from 'api/promotion/promotion';
import DateTimePickerField from 'components/form/DateTimePickerField';
import { useSnackbar } from 'notistack';
import TabStore from './modalForm/TabStore';
import { useQuery } from 'react-query';
import membershipsApi from 'api/promotion/membership';
import { getUserInfo } from 'utils/utils';
import promotionApi from 'api/promotion/promotion';

interface Props {
  watch: any;
  handleSubmit: any;
}

function StepOne({ watch, handleSubmit }: Props) {
  const { translate } = useLocales();
  const { setNavOpen } = useDashboard();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [stores, setStores] = useState<string[]>([]);
  const [channels, setChannels] = useState<string[]>([]);
  const userRaw = getUserInfo();
  const user: any = JSON.parse(userRaw ?? '{}');
  const ref = useRef();
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
    const customerTypes = targetCustomerList();
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
  const isMember = (watch('forMembership') == 0 || watch('forMembership')) == 1 ? true : false;
  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };
  const { data: memberLevels } = useQuery(['memberLevel'], () =>
    membershipsApi
      .getMemberLever({ page: 1, size: 100, apiKey: user.brandId })
      .then((res) => res.data.items)
  );

  const memberLevelOptions = memberLevels
    ? memberLevels.map((c) => ({ label: c.name, value: c.memberLevelId }))
    : [];

  const onSubmit = async (values: TPromotionCreate) => {
    const body: TPromotionCreate = { ...values };
    body.postActionType = Number(values.postActionType);
    body.exclusive = Number(values.exclusive);
    body.applyBy = Number(values.applyBy);
    body.actionType = Number(values.actionType);
    body.forHoliday = Number(values.forHoliday);
    body.forMembership = Number(values.forMembership);
    body.gender = Number(values.gender);
    body.saleMode = Number(values.saleMode);
    body.isAuto = Boolean(values.isAuto);
    body.hasVoucher = Boolean(values.hasVoucher);
    body.paymentMethod = watch('allPayment')
      ? 127
      : (values.paymentMethod as number[]).reduce(
          (accumulator: number, currentValue: number) => accumulator + currentValue,
          0
        );
    body.dayFilter = watch('allDay')
      ? 127
      : (values.dayFilter as number[]).reduce(
          (accumulator: number, currentValue: number) => accumulator + currentValue,
          0
        );
    body.hourFilter = watch('allHour')
      ? 16777215
      : (values.hourFilter as number[]).reduce(
          (accumulator: number, currentValue: number) => accumulator + currentValue,
          0
        );
    body.storeIdMappings = stores;
    body.chanelIdMappings = channels;
    try {
      const res = await promotionApi.createPromotion(body);
      if (res.status == 200) {
        enqueueSnackbar('Tạo thành công', { variant: 'success' });
      } else {
        enqueueSnackbar('Có lỗi xảy ra', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error:', error);
      enqueueSnackbar('Có lỗi xảy ra', { variant: 'error' });
    }
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
                <Tab label="Cửa hàng" value="4" />
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
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <InputField fullWidth name="promotionCode" label="Mã khuyến mãi" required />
                      </Grid>
                      {/* <Grid item xs={12}>
                        <InputField fullWidth name="actionType" label="Loại hành động" required />
                      </Grid> */}

                      <Grid item xs={12}>
                        <InputField fullWidth name="description" label={'Tiêu đề'} required />
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
                        <DateTimePickerField
                          fullWidth
                          name="startDate"
                          label={translate('promotionSystem.promotion.preview.startDate')}
                          inputFormat="yyyy/MM/dd hh:mm a"
                          minDate={new Date()}
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <DateTimePickerField
                          fullWidth
                          name="endDate"
                          label={translate('promotionSystem.promotion.preview.endDate')}
                          inputFormat="yyyy/MM/dd hh:mm a"
                          minDate={new Date()}
                          required
                        />
                      </Grid>

                      {/* <Grid item xs={12}>
                        <InputField
                          fullWidth
                          name="postActionType"
                          label="Loại hành động post"
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <InputField
                          fullWidth
                          name="exclusive"
                          label={translate('promotionSystem.promotion.preview.exclusive')}
                          required
                        />
                      </Grid> */}
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
                          Giới tính：
                        </StyleWidthTypography>
                        <StyleWidthTypography variant="body1" sx={{ width: '65%' }}>
                          <RadioGroupField
                            sx={{
                              display: 'flex',
                              justifyContent: 'start',
                              flexDirection: 'row-reverse'
                            }}
                            fullWidth
                            options={genders}
                            name="gender"
                          />
                        </StyleWidthTypography>
                      </Box>

                      <Box alignItems="center" display={'flex'}>
                        <StyleWidthTypography variant="h6" sx={{ width: '35%' }}>
                          Loại khách hàng:
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
                            name="forMembership"
                          />
                        </StyleWidthTypography>
                      </Box>
                      {isMember ? (
                        <Box alignItems="center" display={'flex'}>
                          <StyleWidthTypography variant="h6" sx={{ width: '35%' }}>
                            Chọn level:
                          </StyleWidthTypography>
                          <StyleWidthTypography variant="body1" sx={{ width: '65%' }}>
                            <Grid container xs={12}>
                              <CheckBoxGroupField
                                xs={4}
                                options={memberLevelOptions}
                                name={'memberLevelIdMappings'}
                              />
                            </Grid>
                          </StyleWidthTypography>
                        </Box>
                      ) : (
                        ' '
                      )}

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
                        <Box display="flex" alignItems="center">
                          <SwitchField name="forHoliday" label={'Áp dụng ngày lễ'} />
                        </Box>
                        <Box display="flex" alignItems="center">
                          <SwitchField name="isAuto" label={'Tự động'} />
                        </Box>
                        <Box>
                          <SwitchField name="hasVoucher" label={'Có voucher'} />
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
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
                      <Box>
                        <StyleWidthTypography variant="h6" width={'100%'}>
                          {translate('promotionSystem.promotion.preview.paymentMethod')}{' '}
                          <SwitchField name={'allPayment'} label={'Tất cả'} />{' '}
                        </StyleWidthTypography>
                        <StyleWidthTypography variant="body1" width={'100%'}>
                          <Grid container xs={12}>
                            {!watch('allPayment') ? (
                              <CheckBoxGroupField
                                xs={4}
                                options={paymentList}
                                name={'paymentMethod'}
                              />
                            ) : (
                              ''
                            )}
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
                        <StyleWidthTypography variant="h6">
                          Khung Ngày <SwitchField name={'allDay'} label={'Tất cả'} />{' '}
                        </StyleWidthTypography>
                      </Box>
                      <Box>
                        <Grid container xs={12}>
                          {!watch('allDay') ? (
                            <CheckBoxGroupField xs={1.5} options={dayList} name={'dayFilter'} />
                          ) : (
                            ''
                          )}
                        </Grid>
                      </Box>
                    </Grid>
                    <Grid p={0} item xs={12}>
                      <Box alignItems="center" width="100%">
                        <StyleWidthTypography variant="h6">
                          Khung Giờ <SwitchField name={'allHour'} label={'Tất cả'} />{' '}
                        </StyleWidthTypography>
                      </Box>
                      <Box>
                        <Grid container xs={12}>
                          {!watch('allHour') ? (
                            <CheckBoxGroupField
                              xs={12 / 8}
                              options={timeList}
                              name={'hourFilter'}
                            />
                          ) : (
                            ''
                          )}
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Stack>
            </TabPanel>
            <TabPanel value="4">
              <TabStore
                stores={stores}
                setStores={setStores}
                channels={channels}
                setChannels={setChannels}
              />
            </TabPanel>
          </TabContext>
        </Stack>
      </Card>
    </>
  );
}

export default StepOne;

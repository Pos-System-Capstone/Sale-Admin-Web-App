import { Box, Grid, Stack, Switch, Typography } from '@mui/material';
import {
  CheckBoxField,
  DraftEditorField,
  InputField,
  RadioGroupField,
  SelectField,
  SwitchField
} from 'components/form';
import CheckBoxGroupField from 'components/form/CheckBoxGroupField';
import DateTimePickerField from 'components/form/DateTimePickerField';
import useLocales from 'hooks/useLocales';
import { Card, CardTitle } from 'pages/promotionEngine/Promotion/components/Card';
import { useState } from 'react';
import { Controller } from 'react-hook-form';

import {
  discountActionList,
  giftActionList,
  kindActionList,
  particularDayList,
  promotionTypeList,
  timeFrameList
} from 'pages/promotionEngine/Promotion/components/config';
import FormBox from 'pages/promotionEngine/Promotion/components/FormBox';

export default function StepOne({ watch }: any) {
  const { translate } = useLocales();
  const giftAction = giftActionList();
  const discountAction = discountActionList();
  const promotionType = promotionTypeList();
  const kindAction = kindActionList();

  // const [timeFrameChecked, setTimeFrameChecked] = useState(false);
  // const handleTimeFrameChecked = () => {
  //   setTimeFrameChecked((prev) => !prev);
  // };
  const timeFrameChecked = watch('timeframeCheck');
  const particularDays = particularDayList();

  const [particularDay, setParticularDay] = useState(false);
  const handleParticularDay = () => {
    setParticularDay((prev) => !prev);
  };

  const [promoType = 'usingCode', promoAction = 'discount', unlimitedDate, timeFrame] = watch([
    'promotionType',
    'promotion-action',
    'unlimited',
    'timeFrameChecked',
    'timeFrame'
  ]);

  return (
    <Stack p={1} spacing={3}>
      <Typography px={2} variant="h3" textAlign="left" sx={{ textTransform: 'uppercase' }}>
        {translate('promotionSystem.promotion.createPromotion.promotionType')}
      </Typography>
      <Card>
        <Stack spacing={4} px={2} py={1} textAlign="left" direction="row">
          <FormBox
            title={`${translate(
              'promotionSystem.promotion.createPromotion.questionPromotionType'
            )}`}
          >
            <Stack spacing={2} direction="column" width={'100%'}>
              <RadioGroupField
                sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                fullWidth
                options={promotionType}
                name="promotionType"
                defaultValue="usingVoucher"
              />
              <Grid container gap={2}>
                <Grid item xs={12}>
                  <InputField
                    fullWidth
                    size="small"
                    name="promotionName"
                    label={`${translate(
                      'promotionSystem.promotion.createPromotion.promotionName'
                    )}`}
                    color="primary"
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputField
                    fullWidth
                    size="small"
                    color="primary"
                    name="promotionCode"
                    label={`${translate(
                      'promotionSystem.promotion.createPromotion.promotionCode'
                    )}`}
                    disabled={promoType === 'automatic'}
                  />
                </Grid>
              </Grid>
            </Stack>
          </FormBox>
          <FormBox
            title={`${translate('promotionSystem.promotion.createPromotion.questionActionType')}`}
          >
            <Stack spacing={2} direction="column" width={'100%'}>
              <RadioGroupField
                sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}
                fullWidth
                options={kindAction}
                name="promotion-action"
                defaultValue="discount"
              />
              {promoAction === 'discount' && (
                <SelectField
                  fullWidth
                  label={`${translate('promotionSystem.promotion.createPromotion.discount')}`}
                  name="discountAction"
                  options={discountAction}
                />
              )}
              {promoAction === 'gift' && (
                <SelectField
                  fullWidth
                  label={`${translate('promotionSystem.promotion.createPromotion.gift')}`}
                  name="giftAction"
                  options={giftAction}
                />
              )}
            </Stack>
          </FormBox>
        </Stack>
      </Card>
      <Card>
        <Stack spacing={3} px={2} py={1}>
          <FormBox title={`${translate('promotionSystem.promotion.createPromotion.timeFrame')}`}>
            <Stack direction={'row'} spacing={2} alignItems={'center'}>
              <Stack direction={'row'} spacing={2}>
                <DateTimePickerField
                  fullWidth
                  name="startDate"
                  label={translate('promotionSystem.common.start')}
                  inputFormat="yyyy/MM/dd hh:mm a"
                  minDate={new Date()}
                />
                <DateTimePickerField
                  disabled={unlimitedDate}
                  fullWidth
                  name="endDate"
                  label={translate('promotionSystem.common.end')}
                  inputFormat="yyyy/MM/dd hh:mm a"
                  minDate={new Date()}
                />
              </Stack>

              <Stack direction={'row'} alignItems={'center'}>
                <CheckBoxField
                  name="unlimited"
                  label={`${translate('promotionSystem.promotion.createPromotion.unlimited')}`}
                />
              </Stack>
            </Stack>
          </FormBox>
          <Box>
            <Typography>
              {`${translate('promotionSystem.promotion.createPromotion.validInThisTimeFrameOnly')}`}
              <SwitchField name="timeframeCheck" label="" />
            </Typography>
            {/* {timeFrameChecked && (
              <Grid container spacing={2} width={'100%'} py={1}>
                {timeFrameList?.map((timeFrame, index) => (
                  <Grid xs={3} md={2} item key={index}>
                    <CheckBoxField name={'timeFrame'} label={timeFrame} />
                  </Grid>
                ))}
              </Grid>
            )} */}
            {timeFrameChecked && (
              <CheckBoxGroupField name={'timeFrameList'} options={timeFrameList} />
            )}
          </Box>

          <Box>
            <Typography>
              {`${translate('promotionSystem.promotion.createPromotion.validOnParticularDayOnly')}`}
              <Switch checked={particularDay} onChange={handleParticularDay} />
            </Typography>
            {/* {particularDay && (
              <Grid container spacing={2} columns={7} width={'100%'} py={1}>
                {particularDays?.map((item, index) => (
                  <Grid xs={3} md={1} item key={index}>
                    <CheckBoxField name={item} label={item} />
                  </Grid>
                ))}
              </Grid>
            )} */}
            {particularDay && (
              <CheckBoxGroupField name={'particularDays'} options={particularDays} />
            )}
          </Box>
        </Stack>
      </Card>

      <Card>
        <CardTitle mb={2} variant="subtitle1">
          {`${translate('promotionSystem.promotion.description')}`}
        </CardTitle>
        <Controller
          name="description"
          render={({ field }) => <DraftEditorField value={field.value} onChange={field.onChange} />}
        />
      </Card>
    </Stack>
  );
}

import { MenuItem, Stack, Typography } from '@mui/material';
import { RadioGroupField, SelectField } from 'components/form';
import CheckBoxGroupField from 'components/form/CheckBoxGroupField';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
// import CheckGroupBoxField from 'components/form/CheckGroupBoxField';
import useLocales from 'hooks/useLocales';
import { DashboardNavLayout } from 'layouts/dashboard/DashboardNavbar';
// import { Controller } from 'react-hook-form';
import { Card } from 'pages/promotionEngine/Promotion/components/Card';
import {
  applyByList,
  exclusiveList,
  genderList,
  memberLevelList,
  paymentMethodList,
  saleModeList,
  targetCustomerList
} from 'pages/promotionEngine/Promotion/components/config';
import FormBox from 'pages/promotionEngine/Promotion/components/FormBox';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { TPromotionBase } from 'types/promotion/promotion';
import { getUserInfo } from 'utils/utils';

export default function StepTwo({ watch }: any) {
  const { translate } = useLocales();
  const userRaw = getUserInfo();
  const user: any = JSON.parse(userRaw ?? '{}');

  const methods = useForm<TPromotionBase>({
    // resolver: yupResolver(storeSchemaBuilder(translate))
  });
  const onSubmit = (values: TPromotionBase) => {
    values.brandId = user.brandId;
    const body: TPromotionBase = { ...values };
    body.brandId = user.brandId;

    console.log(values);
  };
  const { handleSubmit, setValue, reset } = methods;

  const [particularDay, setParticularDay] = useState(false);

  const handleParticularDay = () => {
    setParticularDay((prev) => !prev);
  };
  const targetCustomer = targetCustomerList();
  const paymentMethod = paymentMethodList();
  const gender = genderList();
  const saleMode = saleModeList();
  const applyBy = applyByList();
  const memberLevel = memberLevelList();
  const exclusives = exclusiveList();

  const [isMember] = watch(['membership']);
  console.log(watch('paymentMethod'));
  function setNavOpen(arg0: boolean) {
    throw new Error('Function not implemented.');
  }

  return (
    <Stack p={1} spacing={3} width="100%">
      <FormProvider {...methods}>
        <DashboardNavLayout onOpenSidebar={() => setNavOpen(true)}>
          <Stack direction="row" spacing={2}>
            <LoadingAsyncButton onClick={handleSubmit(onSubmit)} type="submit" variant="contained">
              Tạo
            </LoadingAsyncButton>
          </Stack>
        </DashboardNavLayout>
        <Typography px={2} variant="h3" sx={{ textTransform: 'uppercase' }} textAlign={'left'}>
          {translate('promotionSystem.promotion.settings.constraint')}
        </Typography>
        <Card>
          <Stack spacing={4} p={2} textAlign="left">
            <FormBox
              title={`${translate('promotionSystem.promotion.settings.paymentMethod')}`}
              subtitle={`${translate('promotionSystem.promotion.settings.helperPaymentMethod')}`}
            >
              <CheckBoxGroupField name={'paymentMethod'} options={paymentMethod} />
            </FormBox>
          </Stack>
        </Card>
        <Card>
          <Stack
            spacing={4}
            px={2}
            textAlign="left"
            display={'flex'}
            direction="row"
            alignItems={'stretch'}
          >
            <FormBox
              title={`${translate('promotionSystem.promotion.settings.targetCustomer')}`}
              subtitle={`${translate('promotionSystem.promotion.settings.helperTargetCustomer')}`}
              sizeGrid={4}
              minHeight="44px"
            >
              <CheckBoxGroupField name={'targetCustomer'} options={targetCustomer} />
            </FormBox>
            <FormBox
              title={`${translate('promotionSystem.promotion.settings.memberShipLevel')}`}
              subtitle={`${translate('promotionSystem.promotion.settings.helperMemberShipLevel')}`}
              sizeGrid={4}
              minHeight="44px"
            >
              <SelectField
                disabled={!isMember}
                name="membership_level"
                label={`${translate('promotionSystem.promotion.select')}`}
                fullWidth
                multiple
              >
                {memberLevel?.map((item) => (
                  <MenuItem value={item.value} key={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </SelectField>
            </FormBox>
            <FormBox
              title={`${translate('promotionSystem.promotion.settings.customerGender')}`}
              subtitle={`${translate('promotionSystem.promotion.settings.helperCustomerGender')}`}
              sizeGrid={4}
              minHeight="44px"
            >
              <CheckBoxGroupField name={'gender'} options={gender} />
            </FormBox>
          </Stack>
        </Card>
        <Card>
          <Stack spacing={4} px={2} textAlign="left" direction="row">
            <FormBox
              title={`${translate('promotionSystem.promotion.settings.saleMode')}`}
              subtitle={`${translate('promotionSystem.promotion.settings.helperSaleMode')}`}
              sizeGrid={4}
              minHeight="44px"
            >
              <CheckBoxGroupField name={'saleMode'} options={saleMode} />
            </FormBox>
            <FormBox
              title={`${translate('promotionSystem.promotion.settings.applyBy')}`}
              subtitle={`${translate('promotionSystem.promotion.settings.helperApplyBy')}`}
              sizeGrid={4}
              minHeight="44px"
            >
              <CheckBoxGroupField name={'applyBy'} options={applyBy} />
            </FormBox>
            <FormBox
              title={`${translate('promotionSystem.promotion.settings.exclusive')}`}
              subtitle={`${translate('promotionSystem.promotion.settings.helperExclusive')}`}
              sizeGrid={4}
              minHeight="44px"
            >
              <RadioGroupField
                sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}
                fullWidth
                name="exclusive"
                defaultValue="none"
                options={exclusives}
              />
            </FormBox>
          </Stack>
        </Card>
        <Card>
          <Stack spacing={4} px={2} textAlign="left">
            <FormBox
              title={`${translate('promotionSystem.promotion.settings.storeConfig')}`}
              subtitle={`${translate('promotionSystem.promotion.settings.helperStoreConfig')}`}
            >
              <CheckBoxGroupField
                name={'storeConfig'}
                options={[
                  { label: 'Store 1', value: 'Store 1' },
                  { label: 'Store 2', value: 'Store 2' },
                  { label: 'Store 3', value: 'Store 3' },
                  { label: 'Store 4', value: 'Store 4' }
                ]}
              />
            </FormBox>
          </Stack>
        </Card>
      </FormProvider>
    </Stack>
  );
}

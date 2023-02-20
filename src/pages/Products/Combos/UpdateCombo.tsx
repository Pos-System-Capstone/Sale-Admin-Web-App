import { yupResolver } from '@hookform/resolvers/yup';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography
} from '@mui/material';
import { useRequest } from 'ahooks';
import { CheckBoxField, DraftEditorField, InputField, SelectField } from 'components/form';
import SeoForm from 'components/form/Seo/SeoForm';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import ModalForm from 'components/ModalForm/ModalForm';
import Page from 'components/Page';
import useLocales from 'hooks/useLocales';
import { DashboardNavLayout } from 'layouts/dashboard/DashboardNavbar';
import { get } from 'lodash';
import { useSnackbar } from 'notistack';
import React, { useEffect, useMemo } from 'react';
import { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router';
import { addProductInMenus, getMenus } from 'redux/menu/api';
import { getComboById, updateProdById } from 'redux/product/api';
import { PATH_DASHBOARD } from 'routes/paths';
import { CombinationModeEnum, CreateComboForm } from 'types/product';
import { CardTitle } from '../components/Card';
import BasicProductInfoForm from '../components/form/BasicProductInfoForm';
// import CategoryTreeForm from '../components/form/CategoryTreeForm';
import ProductImagesForm from '../components/form/ProductImagesForm';
import { validationSchema } from '../type';
import { normalizeProductCombo, transformComboForm, transformDraftToStr } from '../utils';
import ChoiceGroupComboForm from './components/form/ChoiceGroupComboForm';
import { useProduct } from 'hooks/products/useProduct';

interface Props {}
const STEPS = ['Thông tin', 'Nhóm sản phẩm'];

const UpdateCombo = (props: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { comboId } = useParams();

  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  const { data: combo } = useQuery(['combo', Number(comboId)], () =>
    getComboById(Number(comboId)).then((res) => res.data)
  );

  const createComboForm = useForm({
    defaultValues: {
      ...combo
    },
    resolver: activeStep === 0 ? yupResolver(validationSchema) : undefined
  });

  const { data: product, isLoading } = useProduct(Number(comboId), {
    select: (res) => normalizeProductCombo(res as any),
    onSuccess: (res) => {
      createComboForm.reset(res as CreateComboForm);
    },
    staleTime: Infinity
  });

  const { data: menus } = useRequest<any>(getMenus, { formatResult: (res) => res.data.data });
  const { translate } = useLocales();
  const menuForm = useForm({
    defaultValues: product
  });

  const ref = React.useRef<any>();
  const run = ref.current?.reload;

  const { reset: menuReset, handleSubmit: handleSubmitMenuForm } = menuForm;
  useEffect(() => {
    if (product) {
      const priceData = { ...product };
      for (let index = 0; index < 10; index++) {
        priceData[`price${index + 1}`] = product.price;
      }
      menuReset(priceData);
    }
  }, [menuReset, product]);

  const priceInputs = useMemo(() => {
    const inputs = [];

    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < 10; index++) {
      inputs.push(
        <Grid key={`price_${index}`} item xs={6}>
          <InputField
            autoFocus
            type="number"
            name={`price${index + 1}`}
            label={`Giá ${index + 1}`}
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>
      );
    }
    return inputs;
  }, []);

  const addProductToMenuHandler = (datas: any) => {
    addProductInMenus(+datas.id!, datas)
      .then(() => {
        enqueueSnackbar(`Thêm thành công`, {
          variant: 'success'
        });
        return true;
      })
      .catch((err: { response: any }) => {
        const errMsg = get(err.response, ['data', 'message'], `Có lỗi xảy ra. Vui lòng thử lại`);
        enqueueSnackbar(errMsg, {
          variant: 'error'
        });
      });
  };

  React.useEffect(() => {
    if (product) {
      createComboForm.reset(product as CreateComboForm);
    }
  }, [product]);
  const { handleSubmit } = createComboForm;

  const onSubmit = (values: any) => {
    const data = transformDraftToStr(values);
    return updateProdById(comboId!, transformComboForm(data, CombinationModeEnum.ChoiceCombo))
      .then((res) => {
        enqueueSnackbar(`Cập nhật thành công ${values.product_name}`, {
          variant: 'success'
        });
      })
      .catch((err) => {
        enqueueSnackbar(`Có lỗi xảy ra. Vui lòng thử lại`, {
          variant: 'error'
        });
      });
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <FormProvider {...createComboForm}>
      <DashboardNavLayout>
        <Stack direction="row" spacing={2}>
          <Button
            onClick={() => navigate(`${PATH_DASHBOARD.combos.new}?cloneProductId=${comboId}`)}
            variant="outlined"
          >
            Sao chép
          </Button>
          {activeStep !== 0 && (
            <Button onClick={() => setActiveStep(activeStep - 1)}>Quay lại</Button>
          )}
          {activeStep !== STEPS.length - 1 && (
            <Button
              variant="contained"
              onClick={async () => {
                const valid = await createComboForm.trigger();
                if (valid) setActiveStep((prev) => prev + 1);
              }}
            >
              Tiếp tục
            </Button>
          )}
          {activeStep === STEPS.length - 1 && (
            <LoadingAsyncButton onClick={handleSubmit(onSubmit)} type="submit" variant="contained">
              Lưu
            </LoadingAsyncButton>
          )}
        </Stack>
      </DashboardNavLayout>
      <Page
        title="Cập nhật combo"
        actions={() => [
          <ModalForm
            key="create-menu"
            title={<Typography variant="h3">Thêm Vào Menu</Typography>}
            trigger={
              <Button variant="contained" startIcon={<Icon icon={plusFill} />}>
                Thêm vào menu
              </Button>
            }
            onOk={async () => {
              try {
                await handleSubmitMenuForm(addProductToMenuHandler, (e) => {
                  throw e;
                })();
                return true;
              } catch (error) {
                return false;
              }
            }}
            maxWidth="lg"
          >
            <Stack spacing={4}>
              <FormProvider {...menuForm}>
                <SelectField
                  required
                  fullWidth
                  name="id"
                  label="Chọn menu"
                  defaultValue=""
                  size="small"
                >
                  {menus?.map(({ menu_id, menu_name }: any) => (
                    <MenuItem value={Number(menu_id)} key={`cate_select_${menu_id}`}>
                      {menu_name}
                    </MenuItem>
                  ))}
                </SelectField>
                <DialogTitle>
                  {translate('common.create')} {product?.product_name}{' '}
                  {translate('menu.store-menu')}
                </DialogTitle>
                <DialogContent>
                  <InputField name="product_id" sx={{ display: 'none' }} />
                  <CheckBoxField name="is_fixed_price" label="Giá cố định" />
                  <Grid container py={2} spacing={2}>
                    {priceInputs}
                  </Grid>
                </DialogContent>
              </FormProvider>
            </Stack>
          </ModalForm>
        ]}
      >
        <Container maxWidth="lg" sx={{ mx: 'auto' }}>
          <Box py={2}>
            <Stepper alternativeLabel activeStep={activeStep}>
              {STEPS.map((label) => (
                <Step key={label}>
                  <StepLabel
                    sx={{
                      '& .MuiStepLabel-label': {
                        typography: 'subtitle2',
                        color: 'text.disabled'
                      }
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          <Box display="flex">
            {activeStep === 0 && (
              <Stack p={1} spacing={3}>
                <Card id="product-detail">
                  <Stack spacing={2} textAlign="left">
                    <CardTitle mb={2} variant="subtitle1">
                      Thông tin sản phẩm
                    </CardTitle>
                    <BasicProductInfoForm />
                    <Box>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography my={2} variant="subtitle2">
                          Danh mục chứa sản phẩm
                        </Typography>
                      </Stack>
                    </Box>
                    {/* <CategoryTreeForm /> */}
                  </Stack>
                </Card>

                <Card>
                  <CardTitle mb={2} variant="subtitle1">
                    Mô tả
                  </CardTitle>
                  <Controller
                    name="description"
                    render={({ field }) => (
                      <DraftEditorField value={field.value} onChange={field.onChange} />
                    )}
                  />
                </Card>

                <Card>
                  <ProductImagesForm />
                </Card>

                <Card id="seo">
                  <CardTitle mb={2} variant="subtitle1">
                    SEO
                  </CardTitle>
                  <Box textAlign="left">
                    <SeoForm />
                  </Box>
                </Card>
              </Stack>
            )}
            {activeStep === 1 && (
              <Stack width="100%">
                <Card>
                  <ChoiceGroupComboForm />
                </Card>
              </Stack>
            )}
          </Box>
        </Container>
      </Page>
    </FormProvider>
  );
};

export default UpdateCombo;

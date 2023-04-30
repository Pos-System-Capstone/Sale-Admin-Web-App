/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
import { Box, Button, CircularProgress, Grid, Stack, Tab } from '@mui/material';
import EmptyContent from 'components/EmptyContent';
import { useSnackbar } from 'notistack';
import React, { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingAsyncButton from '../../components/LoadingAsyncButton/LoadingAsyncButton';
import Page from '../../components/Page';
import useDashboard from '../../hooks/useDashboard';
import { DashboardNavLayout } from '../../layouts/dashboard/DashboardNavbar';
import MiddleForm from './components/MiddleForm';
import { InputField } from 'components/form';
// import ProductInMenuDialog from '../Menus/components/EditProductDialog';
import { addOrRemoveProductsInMenu, updateProdInMenuInfo } from 'redux/menu/api';
import { get } from 'lodash';
import { ProductTypeEnum, TProduct, TProductBase } from 'types/product';
import useLocales from 'hooks/useLocales';
import { useProductDetail } from 'hooks/products/useProduct';
import productApi from 'api/product';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ChoiceGroupComboForm from './Combos/components/form/ChoiceGroupComboForm';

const UpdateProduct = () => {
  const [currentProduct, setCurrentProduct] = React.useState<TProductBase | null>(null);
  const [isAddProduct, setIsAddProduct] = React.useState(false);
  const ref = React.useRef<any>();

  const run = ref.current?.reload;
  const [activeTab, setActiveTab] = useState('1');

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const addProductToMenuHandler = (datas: any) => {
    addOrRemoveProductsInMenu(datas.id!, datas)
      .then(() =>
        enqueueSnackbar(`Thêm thành công`, {
          variant: 'success'
        })
      )
      .then(() => {
        setIsAddProduct(false);
        setCurrentProduct(null);
      })
      .then(run)
      .catch((err: { response: any }) => {
        const errMsg = get(err.response, ['data', 'message'], `Có lỗi xảy ra. Vui lòng thử lại`);
        enqueueSnackbar(errMsg, {
          variant: 'error'
        });
      });
  };

  const updateProdInMenu = (values: any) =>
    updateProdInMenuInfo(Number(id)!, currentProduct?.product_id!, values)
      .then(() =>
        enqueueSnackbar(`Cập nhật thành công`, {
          variant: 'success'
        })
      )
      .then(() => {
        setIsAddProduct(false);
        setCurrentProduct(null);
      })
      .then(run)
      .catch((err: { response: any }) => {
        const errMsg = get(err.response, ['data', 'message'], `Có lỗi xảy ra. Vui lòng thử lại`);
        enqueueSnackbar(errMsg, {
          variant: 'error'
        });
      });

  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const { setNavOpen } = useDashboard();
  const navigate = useNavigate();

  const { translate } = useLocales();

  const { data: productDetails, isLoading, error } = useProductDetail(id!);
  console.log('productDetails', productDetails);

  // const { reset: menuReset, handleSubmit: handleSubmitMenuForm } = menuForm;
  // useEffect(() => {
  //   if (data) {
  //     const priceData = { ...data };
  //     for (let index = 0; index < 10; index++) {
  //       priceData[`price${index + 1}`] = data.price;
  //     }
  //     menuReset(priceData);
  //   }
  // }, [menuReset, data]);

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

  const form = useForm<TProduct>({
    // resolver: yupResolver(validationSchema),
  });
  const { handleSubmit, reset } = form;

  useEffect(() => {
    if (!productDetails) return;
    form.reset({ ...productDetails });
  }, [productDetails, form]);

  const onSubmit = (values: TProduct) => {
    return productApi
      .update(id!, values)
      .then((res) => {
        enqueueSnackbar(`Cập nhật thành công ${values.name}`, {
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
    return (
      <Box
        sx={{
          width: '100%',
          height: '100%'
        }}
        minHeight="40vh"
        borderRadius="1px"
        flexDirection="column"
        zIndex={999}
        justifyContent="center"
        alignItems="center"
        display="flex"
      >
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '100%'
        }}
        minHeight="40vh"
        borderRadius="1px"
        flexDirection="column"
        zIndex={999}
        justifyContent="center"
        alignItems="center"
        display="flex"
      >
        <EmptyContent title="Không tìm thấy sản phẩm" />
      </Box>
    );
  }

  return (
    <FormProvider {...form}>
      <DashboardNavLayout onOpenSidebar={() => setNavOpen(true)}>
        <Stack direction="row" spacing={2}>
          <Button onClick={() => navigate(-1)} variant="outlined">
            Hủy
          </Button>
          {/* <Button
            onClick={() => navigate(`${PATH_DASHBOARD.products.newProduct}?cloneProductId=${id}`)}
            variant="outlined"
          >
            Sao chép
          </Button> */}
          <LoadingAsyncButton onClick={handleSubmit(onSubmit)} type="submit" variant="contained">
            Lưu
          </LoadingAsyncButton>
        </Stack>
      </DashboardNavLayout>
      <Page title="Cập nhật sản phẩm">
        <TabContext value={activeTab}>
          <Box>
            <TabList onChange={handleChangeTab}>
              <Tab label="Thông tin chung" value="1" />
              {productDetails?.type === ProductTypeEnum.COMBO && (
                <Tab label=" Cấu hình combo" value="2" />
              )}
            </TabList>
          </Box>
          <TabPanel value={'1'}>
            <Stack mb={2} spacing={2} width="100%">
              <MiddleForm updateMode={true} />
            </Stack>
          </TabPanel>
          {productDetails?.type === ProductTypeEnum.COMBO && (
            <TabPanel value={'2'}>
              <Stack mb={2} spacing={2} width="100%">
                <ChoiceGroupComboForm id={id ?? ''} />
              </Stack>
            </TabPanel>
          )}
        </TabContext>
      </Page>
    </FormProvider>
  );
};

export default UpdateProduct;

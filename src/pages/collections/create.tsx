// import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Card, Grid, Stack, Typography } from '@mui/material';
import collectionApi from 'api/collection';
import { InputField, UploadImageField } from 'components/form';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
// import ModalProductForm from 'components/ModalProductForm/ModalProductForm';
import Page from 'components/Page';
import useDashboard from 'hooks/useDashboard';
import useLocales from 'hooks/useLocales';
import { TFunction } from 'i18next';
import { DashboardNavLayout } from 'layouts/dashboard/DashboardNavbar';
import { get } from 'lodash';
import { useSnackbar } from 'notistack';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { PATH_DASHBOARD } from 'routes/paths';
import { CollectionTypeEnum, TCollection } from 'types/collection';
import * as yup from 'yup';
// import AddProductTable from './AddProductTable';

const marks = [
  {
    value: 0,
    label: 'Đầu tiền'
  },
  {
    value: 100,
    label: 'Cuối cùng'
  }
];

const CreateCollectionPage = () => {
  const { translate } = useLocales();
  const [searchParams] = useSearchParams();
  const type: any = Number(searchParams.get('type') ?? CollectionTypeEnum.MenuCollection);
  const isMenuCollection = type === CollectionTypeEnum.MenuCollection;

  const collectionSchema = (translate: TFunction) =>
    yup.object({
      name: yup.string().required(translate('common.required', { name: 'Bộ sưu tập' })),
      products: yup
        .array()
        .min(isMenuCollection ? 0 : 1, 'Vui lòng có ít nhất một sản phẩm')
        .of(
          yup.object().shape({
            position: yup.string().required('Vui lòng chọn giá trị')
          })
        )
    });

  const form = useForm<TCollection>({
    defaultValues: {
      name: '',
      picUrl: '',
      description: ''
      // products: [],
      // status: CollectionStatus.DEACTIVE
    }
    // resolver: yupResolver(collectionSchema(translate))
  });
  const { setNavOpen } = useDashboard();
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { isDirty },
    watch,
    setValue,
    control
  } = form;

  // const products = watch('products');
  // const setProducts = (products: any[]) => {
  //   setValue('products', products);
  // };

  const onSubmit = (values: TCollection) => {
    console.log('collecttionCreate ', values);
    collectionApi
      .create(values)
      .then((res) => {
        enqueueSnackbar(`Thêm thành công`, {
          variant: 'success'
        });
        navigate(`${PATH_DASHBOARD.collections.root}/${res.data.id}`);
      })
      .catch((err) => {
        const errMsg = get(err.response, ['data', 'message'], `Có lỗi xảy ra. Vui lòng thử lại`);
        enqueueSnackbar(errMsg, {
          variant: 'error'
        });
      });
  };

  // const handleAddProd = (ids: number[], selectedProds: any[]) => {
  //   const allSelectedProds = unionBy(products, selectedProds, 'product_id');
  //   const updateSelectedProds = allSelectedProds
  //     .filter(({ product_id }: { product_id: number }) => ids.includes(product_id))
  //     .map((p, idx) => ({ ...p, position: idx }));
  //   setProducts([...updateSelectedProds]);
  // };

  return (
    <Page
      title={
        isMenuCollection
          ? translate('collections.createInfo')
          : translate('collections.groupCollection')
      }
      content={
        !isMenuCollection && (
          <Typography color="GrayText">
            Nhóm combo được sử dụng để cấu hình các bước trong một combo
          </Typography>
        )
      }
    >
      <FormProvider {...form}>
        <DashboardNavLayout onOpenSidebar={() => setNavOpen(true)}>
          <Stack direction="row" spacing={2}>
            <Button onClick={() => navigate(-1)} variant="outlined">
              {translate('common.cancel')}
            </Button>
            <LoadingAsyncButton
              disabled={!isDirty}
              onClick={handleSubmit(onSubmit, console.log)}
              type="submit"
              variant="contained"
            >
              {translate('common.save')}
            </LoadingAsyncButton>
          </Stack>
        </DashboardNavLayout>
        <Stack spacing={2}>
          <Card>
            <Box>
              <Grid spacing={2} container>
                <Grid item xs={4}>
                  <UploadImageField.Avatar
                    label="Hình ảnh"
                    name="picUrl"
                    style={{ margin: '0 auto 40px' }}
                  />
                </Grid>
                <Grid item xs={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                      <InputField
                        fullWidth
                        name="name"
                        label={translate('collections.table.collectionName')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <InputField fullWidth name="code" label="Mã rút gọn" />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <InputField
                        size="small"
                        rows={4}
                        multiline
                        fullWidth
                        name="description"
                        label={translate('collections.table.description')}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Card>
          {/* <Card>
            <Stack spacing={1} direction="row" justifyContent="space-between" alignItems="center">
              <CardTitle mb={2} variant="subtitle1">
                {translate('collections.productInCollection')}
              </CardTitle>
              y
              <ModalProductForm
                selected={products?.map(({ product_id }) => product_id)}
                onSubmit={handleAddProd}
                trigger={<Button variant="outlined">Thêm sản phẩm</Button>}
              />
            </Stack>
            <Box mt={2}>
              <AddProductTable control={control} />
            </Box>
          </Card> */}
        </Stack>
      </FormProvider>
    </Page>
  );
};

export default CreateCollectionPage;

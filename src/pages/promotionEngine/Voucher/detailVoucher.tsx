import { Box, Stack } from '@mui/material';
// import productApi from 'api/product';
import Page from 'components/Page';
import { FormProvider, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import FormDetail from './components/FormDetail';
import { getUserInfo } from 'utils/utils';
import { TVoucherBase } from 'types/promotion/voucher';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import voucherApi from 'api/promotion/voucher';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router';
import { DashboardNavLayout } from 'layouts/dashboard/DashboardNavbar';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import useDashboard from 'hooks/useDashboard';
import { Button } from '@mui/material';

const DetailVoucher = () => {
  const userRaw = getUserInfo();
  const user: any = JSON.parse(userRaw ?? '{}');
  const { setNavOpen } = useDashboard();
  const navigate = useNavigate();
  const schema = yup.object({
    cate_name: yup.string().required('Please input name')
  });

  // const [searchParams] = useSearchParams();
  // const cloneProductId: any = searchParams.get('cloneProductId');
  // const productType: any = Number(searchParams.get('productType') ?? ProductTypeEnum.SINGLE);

  const { id } = useParams();
  const { data: voucherUpdate } = useQuery(
    ['voucher-groups', user.brandId],
    async () => {
      return voucherApi.getVoucherGroupId(id).then((res) => res.data);
    },
    {
      enabled: Boolean(id)
    }
  );

  const updateVoucherForm = useForm<TVoucherBase>({
    defaultValues: { ...voucherUpdate },
    resolver: yupResolver(schema)
    // defaultValues: {},
    // shouldUnregister: false
  });

  // const { handleSubmit, reset } = updateVoucherForm;

  useEffect(() => {
    if (voucherUpdate !== undefined) {
      reset({ ...voucherUpdate });
    }
  }, [voucherUpdate]);

  // const methods = useForm<any>({
  //   resolver: undefined,
  //   defaultValues: {
  //     tags: [],
  //     description: '',
  //     product_type: productType
  //   }
  // });
  const { watch, handleSubmit, reset } = updateVoucherForm;

  const onSubmit = (values: TVoucherBase) => {
    console.log(`data`, values);
  };

  return (
    <FormProvider {...updateVoucherForm}>
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
      <Page title="Chi tiết Voucher code">
        <Box display="flex">
          <FormDetail watch={watch} />
        </Box>
      </Page>
    </FormProvider>
  );
};

export default DetailVoucher;

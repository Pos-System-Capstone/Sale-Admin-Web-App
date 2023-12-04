import { Box } from '@mui/material';
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
import { useParams } from 'react-router';

const DetailVoucher = () => {
  const userRaw = getUserInfo();
  const user: any = JSON.parse(userRaw ?? '{}');

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
      return voucherApi.getVoucherId(id).then((res) => res.data);
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
  const { handleSubmit, reset } = updateVoucherForm;

  // const { data, isLoading } = useQuery(
  //   ['products', Number(cloneProductId)],
  //   () => productApi.getById(cloneProductId).then((res) => res.data),
  //   {
  //     enabled: Boolean(cloneProductId),
  //     staleTime: Infinity
  //   }
  // );

  // if (isLoading) {
  //   return (
  //     <Box
  //       sx={{
  //         width: '100%',
  //         height: '100%'
  //       }}
  //       minHeight="40vh"
  //       borderRadius="1px"
  //       flexDirection="column"
  //       zIndex={999}
  //       justifyContent="center"
  //       alignItems="center"
  //       display="flex"
  //     >
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  return (
    <FormProvider {...updateVoucherForm}>
      <Page title="Chi tiết Voucher code">
        <Box display="flex">
          <FormDetail />
        </Box>
      </Page>
    </FormProvider>
  );
};

export default DetailVoucher;

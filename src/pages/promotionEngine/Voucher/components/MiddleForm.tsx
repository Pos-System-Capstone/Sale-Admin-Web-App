// import { Info } from '@mui/icons-material';
import { Box, Stack } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
// import SeoForm from 'components/form/Seo/SeoForm';
// import Label from 'components/Label';
// import ModalForm from 'components/ModalForm/ModalForm';
// import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { CreateProductForm, ProductTypeEnum, TProductBase } from 'types/product';
import { TTableColumn } from 'types/table';
import { Card, CardTitle } from './Card';
import BasicProductInfoForm from './form/BasicProductInfoForm';
import SubMiddleForm from './form/SubMiddleForm';

type Props = {
  updateMode?: boolean;
};

// eslint-disable-next-line arrow-body-style
const MiddleForm: React.FC<Props> = ({ updateMode }) => {
  const { watch } = useFormContext<CreateProductForm>();
  const { t } = useLocales();
  const [hasExtra, hasVariant] = watch(['has_extra', 'hasVariant']);
  const cateId = watch('cat_id');
  const productType = watch('product_type');
  const isExtraProduct = productType === ProductTypeEnum.EXTRA;

  const productExtraColumns: TTableColumn<TProductBase>[] = [
    {
      title: 'Tên',
      dataIndex: 'product_name'
    },
    {
      title: 'Mã sản phẩm',
      dataIndex: 'code'
    },

    {
      title: 'Giá',
      dataIndex: 'price'
    }
  ];

  return (
    <Box>
      <Stack spacing={2}>
        <Card id="product-detail">
          <Stack spacing={2} textAlign="left">
            <CardTitle mb={2} variant="subtitle1">
              {`${t('promotionSystem.voucher.addVoucher.voucherGroupBuilder')}`}
            </CardTitle>
            <Stack sx={{ width: '100%', pb: '15px', pt: '20px' }} spacing={1}>
              <Alert severity="warning">
                <AlertTitle>{`${t('promotionSystem.voucher.addVoucher.warning')}`}</AlertTitle>
                {`${t('promotionSystem.voucher.addVoucher.helperWarning')}`}
              </Alert>
            </Stack>
            <BasicProductInfoForm />
          </Stack>
        </Card>
        {!isExtraProduct && <SubMiddleForm hasVariant={hasVariant} />}
      </Stack>
    </Box>
  );
};

export default MiddleForm;

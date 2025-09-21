// import { Info } from '@mui/icons-material';
import { Box, Stack } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import useLocales from 'hooks/useLocales';
// import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { CreateProductForm, ProductTypeEnum } from 'types/product';
import { TTableColumn } from 'types/table';
import { Card, CardTitle } from './Card';
import BasicProductInfoForm from './form/BasicProductInfoForm';
import SubMiddleForm from './form/SubMiddleForm';
import { TVoucherCreate } from 'types/promotion/voucher';

type Props = {
  updateMode?: boolean;
  onPrefixChange: (prefix: string) => void;
  onPostfixChange: (postfix: string) => void;
  onCustomCharsetChange: (customCharset: string) => void;
  onCharsetChange: (charset: string) => void;
};

// eslint-disable-next-line arrow-body-style
const MiddleForm: React.FC<Props> = ({
  updateMode,
  onPrefixChange,
  onPostfixChange,
  onCustomCharsetChange,
  onCharsetChange
}: Props) => {
  const { watch } = useFormContext<CreateProductForm | TVoucherCreate>();
  const { t } = useLocales();

  const [hasExtra, hasVariant] = watch(['has_extra', 'hasVariant']);
  const cateId = watch('cat_id');
  const productType = watch('product_type');
  const isExtraProduct = productType === ProductTypeEnum.EXTRA;

  // const { data: extras } = useExtraCategory(cateId);

  const productExtraColumns: TTableColumn<any>[] = [
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
          <Box sx={{ width: '100%' }}>
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
          </Box>
        </Card>
        {!isExtraProduct && (
          <SubMiddleForm
            onCharsetChange={onCharsetChange}
            onCustomCharsetChange={onCustomCharsetChange}
            onPrefixChange={onPrefixChange}
            onPostfixChange={onPostfixChange}
            hasVariant={hasVariant}
          />
        )}
      </Stack>
    </Box>
  );
};

export default MiddleForm;

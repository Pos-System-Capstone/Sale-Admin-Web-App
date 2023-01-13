import { Box, Stack } from '@mui/material';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { CreateProductForm } from 'types/product';

// import VariantForm from '../VariantForm';
import { Card, CardTitle } from './Card';
import BasicProductInfoForm from './form/AccountInfoForm';
import ProductImagesForm from './form/ProductImagesForm';

type Props = {
  updateMode?: boolean;
};

// eslint-disable-next-line arrow-body-style
const MiddleForm: React.FC<Props> = ({ updateMode }) => {
  const { watch } = useFormContext<CreateProductForm>();

  return (
    <Box>
      <Stack spacing={3}>
        <Card id="product-detail">
          <Stack spacing={2} textAlign="left">
            <CardTitle mb={2} variant="subtitle1">
              Thông tin tài khoản
            </CardTitle>
            <BasicProductInfoForm />
          </Stack>
        </Card>
        <Card>
          <ProductImagesForm />
        </Card>

        {/* <Card id="seo">
          <CardTitle mb={2} variant="subtitle1">
            SEO
          </CardTitle>
          <Box textAlign="left">
            <SeoForm />
          </Box>
        </Card> */}
      </Stack>
    </Box>
  );
};

export default MiddleForm;

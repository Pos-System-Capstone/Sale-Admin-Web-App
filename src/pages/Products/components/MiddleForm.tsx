import { Box, Grid, Stack, Typography } from '@mui/material';

import { SelectField } from 'components/form';

// import useExtraCategory from 'hooks/extra-categories/useExtraCategoy';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  PRODUCT_SIZE_OPTIONS,
  PRODUCT_TYPE_OPTIONS,
  ProductTypeEnum,
  TProduct
} from 'types/product';
import { Card, CardTitle } from './Card';
import BasicProductInfoForm from './form/BasicProductInfoForm';
import AutocompleteCategory from 'components/form/common/Category/AutocompleteCategory';

type Props = {
  updateMode?: boolean;
};

// eslint-disable-next-line arrow-body-style
const MiddleForm: React.FC<Props> = ({ updateMode }) => {
  const { watch } = useFormContext<TProduct>();

  // const cateId = watch('id');
  const productType = watch('type');
  const isExtraProduct = productType === ProductTypeEnum.EXTRA;

  return (
    <Box>
      <Stack spacing={3}>
        <Card id="product-detail">
          <Stack spacing={2} textAlign="left">
            <CardTitle mb={2} variant="subtitle1">
              Thông tin sản phẩm
            </CardTitle>
            <BasicProductInfoForm updateMode={updateMode} />
            <Box>
              <Stack>
                <Typography my={2} variant="subtitle1">
                  Loại sản phẩm
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <SelectField
                      fullWidth
                      disabled={updateMode}
                      options={PRODUCT_TYPE_OPTIONS}
                      name="type"
                      label="Loại sản phẩm"
                    ></SelectField>
                  </Grid>
                </Grid>
              </Stack>
            </Box>
          </Stack>
        </Card>
        {productType == ProductTypeEnum.SINGLE && (
          <Card id="variants">
            <CardTitle variant="subtitle1">Tuỳ chỉnh theo thể loại</CardTitle>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <AutocompleteCategory
                  isExtra={false}
                  name="categoryId"
                  label="Danh mục chứa sản phẩm"
                />
              </Grid>
              <Grid item xs={6}>
                <SelectField
                  fullWidth
                  disabled={updateMode}
                  options={PRODUCT_SIZE_OPTIONS}
                  name="size"
                  label="Kích cở sản phẩm"
                ></SelectField>
              </Grid>
            </Grid>
          </Card>
        )}
        {productType == ProductTypeEnum.PARENT && (
          <Card id="variants">
            <CardTitle variant="subtitle1">Tuỳ chỉnh theo thể loại</CardTitle>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <AutocompleteCategory
                  isExtra={false}
                  name="categoryId"
                  label="Danh mục chứa sản phẩm"
                />
              </Grid>
              <Grid item xs={6}></Grid>
            </Grid>
          </Card>
        )}

        {productType == ProductTypeEnum.EXTRA && (
          <Card id="variants">
            <CardTitle variant="subtitle1">Tuỳ chỉnh theo thể loại extra</CardTitle>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <AutocompleteCategory
                  isExtra={true}
                  name="categoryId"
                  label="Danh mục chứa sản phẩm extra"
                />
              </Grid>
              <Grid item xs={6}></Grid>
            </Grid>
          </Card>
        )}
      </Stack>
    </Box>
  );
};

export default MiddleForm;

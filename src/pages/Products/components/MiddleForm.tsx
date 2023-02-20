import { Box, Grid, Stack, Typography } from '@mui/material';

import { SelectField } from 'components/form';

// import useExtraCategory from 'hooks/extra-categories/useExtraCategoy';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { PRODUCT_TYPE_OPTIONS, ProductTypeEnum, TProduct } from 'types/product';
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
  const isExtraProduct = productType === ProductTypeEnum.Extra;

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

        {/* <Card>
          <Stack direction="row" spacing={1}>
            <CardTitle variant="subtitle1">Tuỳ chỉnh cho sản phẩm</CardTitle>
            <Tooltip
              title="Các tuỳ chỉnh cho sản phẩm phụ thuộc vào Danh mục chứa sản phẩm"
              placement="right"
              arrow
            >
              <Info />
            </Tooltip>
          </Stack>
          {modifiers.map((modifier, optIndex) => (
            <Box key={`variant-${modifier.id}`}>
              <Stack direction="row" spacing={2}>
                <InputField
                  name={`modifiers.${optIndex}.modifierName`}
                  size="small"
                  label="Tên tùy chỉnh"
                />
                <SelectField
                  options={[
                    {
                      label: 'Single choice',
                      value: 'single-choice'
                    },
                    {
                      label: 'Multiple',
                      value: 'multiple'
                    }
                  ]}
                  name={`modifiers.${optIndex}.selectType`}
                  size="small"
                  label="Kiểu"
                  sx={{ width: '150px' }}
                />
                <Box flex={1}>
                  <AutoCompleteField
                    name={`modifiers.${optIndex}.values`}
                    label="Giá trị"
                    multiple
                    freeSolo
                    size="small"
                    variant="outlined"
                    options={[]}
                    limitTags={2}
                    fullWidth
                  />
                </Box>
                <IconButton onClick={() => removeModifier(optIndex)} sx={{ color: 'red' }}>
                  <Icon icon={trashIcon} />
                </IconButton>
              </Stack>
            </Box>
          ))}
          <Divider />
          <span>
            <Button
              onClick={() =>
                appendModifier({
                  modifierName: '',
                  selectType: '',
                  values: []
                })
              }
              variant="outlined"
            >
              Thêm tùy chỉnh
            </Button>
          </span>
        </Card> */}
        {productType == ProductTypeEnum.Single && (
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
        {productType == ProductTypeEnum.Master && (
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

        {productType == ProductTypeEnum.Extra && (
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

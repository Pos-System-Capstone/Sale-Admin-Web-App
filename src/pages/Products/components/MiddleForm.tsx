import { Box, Grid, Stack } from '@mui/material';

import { InputField, SelectField, UploadImageField } from 'components/form';

// import useExtraCategory from 'hooks/extra-categories/useExtraCategoy';
import { useFormContext } from 'react-hook-form';
import {
  PRODUCT_SIZE_OPTIONS,
  PRODUCT_TYPE_OPTIONS,
  ProductTypeEnum,
  TProduct
} from 'types/product';
import { Card, CardTitle } from './Card';
import AutocompleteCategory from 'components/form/common/Category/AutocompleteCategory';
import AutocompleteProduct from './form/AutocompleteProduct';

type Props = {
  updateMode?: boolean;
  isCombo?: boolean;
};

// eslint-disable-next-line arrow-body-style
const MiddleForm: React.FC<Props> = ({ updateMode, isCombo = false }) => {
  const { watch } = useFormContext<TProduct>();
  const productType = watch('type');
  console.log('productType', productType);
  return (
    <Box>
      <Stack spacing={3}>
        <Card id="product-detail">
          <Stack spacing={2} textAlign="left">
            <CardTitle mb={2} variant="subtitle1">
              Thông tin sản phẩm
            </CardTitle>
            <Box>
              <SelectField
                fullWidth
                disabled={updateMode}
                options={PRODUCT_TYPE_OPTIONS}
                name="type"
                label="Loại sản phẩm"
              ></SelectField>

              <Box>
                <Grid container spacing={2}>
                  {' '}
                  <Grid
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    item
                    xs={12}
                    sm={12}
                  >
                    <UploadImageField.Avatar
                      label="Hình ảnh"
                      name="picUrl"
                      // style={{ margin: '0 auto 40px' }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputField
                      disabled={productType === ProductTypeEnum.CHILD}
                      fullWidth
                      name="name"
                      label="Tên sản phẩm"
                      required
                      size="small"
                      helperText={
                        productType === ProductTypeEnum.CHILD &&
                        'Tên của sản phẩm con: tên sản phẩm cha + size được chọn'
                      }
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <InputField
                      disabled={updateMode}
                      fullWidth
                      name="code"
                      label="Mã sản phẩm"
                      required
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <InputField
                      max={100}
                      min={0}
                      fullWidth
                      type="number"
                      name="displayOrder"
                      label="Thứ tự hiển thị"
                      required
                      size="small"
                    />
                  </Grid>
                  {(productType === ProductTypeEnum.CHILD ||
                    productType === ProductTypeEnum.SINGLE ||
                    productType === ProductTypeEnum.EXTRA ||
                    productType === ProductTypeEnum.COMBO) && (
                    <>
                      <Grid item xs={4}>
                        <InputField
                          fullWidth
                          type="number"
                          name="sellingPrice"
                          label="Giá bán"
                          required
                          size="small"
                          helperText="Giá bán của sản phẩm"
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <InputField
                          fullWidth
                          type="number"
                          name="discountPrice"
                          label="Giá giảm"
                          required
                          size="small"
                          helperText="Giá giảm của sản phẩm"
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <InputField
                          fullWidth
                          type="number"
                          name="historicalPrice"
                          label="Giá gốc"
                          required
                          size="small"
                          helperText="Chi phí sản xuất sản phẩm"
                        />
                      </Grid>
                    </>
                  )}
                  {(productType === ProductTypeEnum.SINGLE ||
                    productType === ProductTypeEnum.PARENT ||
                    productType === ProductTypeEnum.COMBO) && (
                    <Grid item xs={12}>
                      <AutocompleteCategory
                        isExtra={false}
                        name="categoryId"
                        label="Danh mục chứa sản phẩm"
                      />
                    </Grid>
                  )}
                  {productType === ProductTypeEnum.CHILD && (
                    <Grid item xs={6}>
                      <AutocompleteProduct
                        type={ProductTypeEnum.PARENT}
                        name="parentProductId"
                        label="Sản phẩm cha"
                      />
                    </Grid>
                  )}
                  {productType === ProductTypeEnum.CHILD && (
                    <Grid item xs={6}>
                      <SelectField
                        fullWidth
                        disabled={updateMode}
                        options={PRODUCT_SIZE_OPTIONS}
                        name="size"
                        label="Kích cở sản phẩm"
                      ></SelectField>
                    </Grid>
                  )}
                  {productType === ProductTypeEnum.EXTRA && (
                    <Grid item xs={6}>
                      <AutocompleteCategory
                        isExtra={true}
                        name="categoryId"
                        label="Danh mục chứa sản phẩm extra"
                      />
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <InputField fullWidth name="description" label="Mô tả" required size="small" />
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
};

export default MiddleForm;

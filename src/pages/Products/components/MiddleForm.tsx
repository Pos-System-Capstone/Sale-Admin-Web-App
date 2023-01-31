import { Info } from '@mui/icons-material';
import { Box, Button, Grid, Stack, Tooltip, Typography } from '@mui/material';

import { CheckBoxField, DraftEditorField } from 'components/form';
import SeoForm from 'components/form/Seo/SeoForm';

import ModalForm from 'components/ModalForm/ModalForm';

// import useExtraCategory from 'hooks/extra-categories/useExtraCategoy';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { CreateProductForm, ProductTypeEnum, TProductBase } from 'types/product';
import { TTableColumn } from 'types/table';
import VariantForm from '../VariantForm';
import { Card, CardTitle } from './Card';
import BasicProductInfoForm from './form/BasicProductInfoForm';
import CategoryTreeForm from './form/CategoryTreeForm';
import ProductImagesForm from './form/ProductImagesForm';

type Props = {
  updateMode?: boolean;
};

// eslint-disable-next-line arrow-body-style
const MiddleForm: React.FC<Props> = ({ updateMode }) => {
  const { watch } = useFormContext<CreateProductForm>();

  const [hasExtra, hasVariant] = watch(['has_extra', 'hasVariant']);
  // const cateId = watch('id');
  const productType = watch('product_type');
  const isExtraProduct = productType === ProductTypeEnum.Extra;

  // const { data: extras } = useExtraCategory(cateId.toString ?? '');

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
      <Stack spacing={3}>
        <Card id="product-detail">
          <Stack spacing={2} textAlign="left">
            <CardTitle mb={2} variant="subtitle1">
              Thông tin sản phẩm
            </CardTitle>
            <BasicProductInfoForm />
            <Box>
              <Stack direction="row" justifyContent="space-between">
                <Typography my={2} variant="subtitle2">
                  Danh mục chứa sản phẩm
                </Typography>
              </Stack>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <CategoryTreeForm isExtraCate={isExtraProduct} />
                </Grid>
                <Grid item xs={6}>
                  {!isExtraProduct && (
                    <Stack>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" spacing={1}>
                          <CardTitle variant="subtitle1">Extra</CardTitle>
                          <Tooltip
                            title="Các nhóm sản phẩm extra phụ thuộc vào Danh mục chứa sản phẩm"
                            placement="right"
                            arrow
                          >
                            <Info />
                          </Tooltip>
                        </Stack>
                      </Stack>
                      <CheckBoxField name="has_extra" label="Sản phẩm có extra" />
                      {hasExtra && (
                        <ModalForm
                          title="Sản phẩm extra đi kèm với danh mục đã chọn"
                          onOk={async () => true}
                          trigger={<Button variant="text">Xem các sản phẩm extra</Button>}
                        >
                          {/* {extras?.map((categoryExtra, idx) => (
                            <Box key={`extra-product-group-${categoryExtra.cate_id}`}>
                              <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                                <Label color="default">{idx + 1}</Label>
                                <Typography variant="h6">
                                  {categoryExtra.extra_cate.name}
                                </Typography>
                              </Stack>
                              <ResoTable
                                getData={(params: any) =>
                                  categoryApi.getProductsInCategory(
                                    categoryExtra.extra_cate.id,
                                    params
                                  )
                                }
                                showFilter={false}
                                pagination={false}
                                showSettings={false}
                                showAction={false}
                                columns={productExtraColumns}
                                rowKey="cate_id"
                                // dataSource={categoryExtra.products}
                              />
                            </Box>
                          )) ?? (
                            <EmptyContent title="Hiện tại chưa có nhóm extra nào được cấu hình để đi kèm với danh mục đã chọn" />
                          )} */}
                        </ModalForm>
                      )}
                    </Stack>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Card>

        <Card>
          <CardTitle mb={2} variant="subtitle1">
            Mô tả
          </CardTitle>
          <Controller
            name="description"
            render={({ field }) => (
              <DraftEditorField value={field.value} onChange={field.onChange} />
            )}
          />
        </Card>

        <Card>
          <ProductImagesForm />
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

        {!isExtraProduct && (
          <Card id="variants">
            <CardTitle variant="subtitle1">Mẫu mã</CardTitle>
            <CheckBoxField name="hasVariant" label="Sản phẩm này có các mẫu mã" />
            {hasVariant && (
              <Box textAlign="left">
                <Stack direction="column">
                  <Stack direction="column" justifyContent="start" spacing={2}>
                    <Typography variant="subtitle2">Tùy chọn</Typography>
                    <VariantForm name="variants" updateMode={updateMode} />
                  </Stack>
                </Stack>
              </Box>
            )}
          </Card>
        )}

        <Card id="seo">
          <CardTitle mb={2} variant="subtitle1">
            SEO
          </CardTitle>
          <Box textAlign="left">
            <SeoForm />
          </Box>
        </Card>
      </Stack>
    </Box>
  );
};

export default MiddleForm;

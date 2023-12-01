// import { Info } from '@mui/icons-material';
import { Box, Stack } from '@mui/material';
// import SeoForm from 'components/form/Seo/SeoForm';
// import Label from 'components/Label';
// import ModalForm from 'components/ModalForm/ModalForm';
// import ResoTable from 'components/ResoTable/ResoTable';
// import useExtraCategory from 'hooks/extra-categories/useExtraCategoy';
import useLocales from 'hooks/useLocales';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { CreateProductForm, ProductTypeEnum, TProductBase } from 'types/product';
import { TTableColumn } from 'types/table';
import { Card } from './Card';
import BasicProductInfoForm2 from './form/FormDetailVoucher';
import BasicProductInfoForm3 from './form/FormDetailInformation';

type Props = {
  updateMode?: boolean;
};

// eslint-disable-next-line arrow-body-style
const FormDetail: React.FC<Props> = ({ updateMode }) => {
  const { watch } = useFormContext<CreateProductForm>();
  const { t } = useLocales();
  const [hasExtra, hasVariant] = watch(['has_extra', 'hasVariant']);
  const cateId = watch('cat_id');
  const productType = watch('product_type');
  const isExtraProduct = productType === ProductTypeEnum.EXTRA;

  // const { data: extras } = useExtraCategory(cateId);

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
      <Card id="product-detail">
        <Box sx={{ width: '100%' }}>
          <Stack sx={{ pb: '15px' }} spacing={1}>
            <BasicProductInfoForm2 />
          </Stack>
        </Box>
      </Card>
      <Card id="product-detail">
        <Box sx={{ width: '100%' }}>
          <Stack sx={{ pt: '20px' }} spacing={1}>
            <BasicProductInfoForm3 />
          </Stack>
        </Box>
      </Card>
    </Box>
  );
};

export default FormDetail;

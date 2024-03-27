import { Box, Grid, Stack } from '@mui/material';

import { InputField } from 'components/form';

// import useExtraCategory from 'hooks/extra-categories/useExtraCategoy';
// import { useFormContext } from 'react-hook-form';
// import { TProduct } from 'types/product';

// import { CardTitle } from 'pages/Products/components/Card';
import { useFormContext } from 'react-hook-form';
import { TProductPromotionAPI } from 'types/promotion/productPromotion';

type Props = {
  updateMode?: boolean;
  isCombo?: boolean;
};

// eslint-disable-next-line arrow-body-style
const ProductInfoForm: React.FC<Props> = ({ updateMode, isCombo = false }) => {
  const { watch } = useFormContext<TProductPromotionAPI>();
  return (
    <Box>
      <Stack spacing={3}>
        <Stack spacing={2} textAlign="left">
          <Box>
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <InputField fullWidth name="name" label="Tên sản phẩm" required size="small" />
                </Grid>
                <Grid item xs={6}>
                  <InputField
                    disabled={updateMode}
                    fullWidth
                    name="code"
                    label="Mã sản phẩm"
                    required
                    size="small"
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ProductInfoForm;

import { Box, Card, Grid, Stack } from '@mui/material';

import { InputField } from 'components/form';

import { useFormContext } from 'react-hook-form';

import { CardTitle } from 'pages/Products/components/Card';

import { TProductCategory } from 'types/promotion/productCategory';

type Props = {
  updateMode?: boolean;
  isCombo?: boolean;
};

// eslint-disable-next-line arrow-body-style
const MiddleForm: React.FC<Props> = ({ updateMode, isCombo = false }) => {
  const { watch } = useFormContext<TProductCategory>();

  return (
    <Box>
      <Stack spacing={3}>
        <Card id="product-detail">
          <Stack spacing={2} textAlign="left">
            <CardTitle mb={2} variant="subtitle1">
              Thông tin danh mục
            </CardTitle>
            <Box>
              <Box>
                <Grid container xs={12} spacing={2}>
                  <Grid item xs={6}>
                    <InputField fullWidth name="name" label="Tên danh mục" required size="small" />
                  </Grid>
                  <Grid item xs={6}>
                    <InputField
                      disabled={updateMode}
                      fullWidth
                      name="cateId"
                      label="Mã danh mục"
                      required
                      size="small"
                    />
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

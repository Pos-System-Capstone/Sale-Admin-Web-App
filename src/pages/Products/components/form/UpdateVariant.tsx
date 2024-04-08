import { Button, Card, Paper, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { CardTitle } from '../Card';
import ResoTable from 'components/ResoTable/ResoTable';
import { variantColumn } from 'pages/Products/Variants/config';
import variantApi from 'api/variant';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import productApi from 'api/product';
import { useNavigate, useParams } from 'react-router';
import { useSnackbar } from 'notistack';

export default function UpdateVariant() {
  const [open, setOpen] = useState(false);
  const [selectedVariantIds, setSelectedVariantIds] = useState<string[]>([]);
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  // const variants = useQuery(
  //     ['variants', collectionId],
  //     () =>
  //         collectionApi.getProductsInCollection(collectionId, params)
  //             .then((res) => res.data.items),
  //     {
  //         enabled: Boolean(collectionId)
  //     }
  // );

  //   useEffect(() => {
  //     if (products !== undefined) {
  //       const selectedIds: string[] = products?.map((e) => e.id);
  //       setSelectedProductIds(selectedIds);
  //     }
  //   }, [products]);

  const handleChangeSelection = React.useCallback((ids) => {
    setSelectedVariantIds(ids);
  }, []);

  const handleSubmit = () =>
    Promise.resolve(productApi.addVariantsToProduct(id!, selectedVariantIds))
      .then((res) => {
        enqueueSnackbar('Them thanh cong', {
          variant: 'success'
        });
        setOpen(false);
        navigate(-1);
      })
      .catch((err) => {
        enqueueSnackbar(`Có lỗi xảy ra. Vui lòng thử lại`, {
          variant: 'error'
        });
      });

  return (
    <Box>
      <Stack spacing={3}>
        <Card>
          <Stack spacing={2} textAlign="left">
            <CardTitle mb={2} variant="subtitle1">
              Thêm biến thể
            </CardTitle>
            <Box p={1} sx={{ flex: 1, overflowY: 'auto' }}>
              <Stack spacing={2}>
                <ResoTable
                  checkboxSelection={{
                    selection: selectedVariantIds,
                    type: 'checkbox'
                  }}
                  showAction={false}
                  scroll={{ y: '50%', x: '100%' }}
                  rowKey="id"
                  getData={variantApi.getVariants}
                  onChangeSelection={handleChangeSelection}
                  columns={variantColumn}
                />
              </Stack>
            </Box>
            <Box
              p={2}
              borderTop={1}
              borderColor="grey.300"
              component={Paper}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body1">
                Đã chọn <strong>{selectedVariantIds.length}</strong> biến thể
              </Typography>
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button variant="outlined" onClick={() => setOpen(false)}>
                  Hủy
                </Button>
                <LoadingAsyncButton onClick={handleSubmit} variant="contained">
                  Thêm
                </LoadingAsyncButton>
              </Stack>
            </Box>
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
}

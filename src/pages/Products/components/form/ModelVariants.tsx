import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
import { Box, Button, Dialog, IconButton, Paper, Stack, Typography } from '@mui/material';
import productApi from 'api/product';
import variantApi from 'api/variant';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import ResoTable from 'components/ResoTable/ResoTable';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useParams } from 'react-router';
interface Props {
  variantsColunm: any;
  ProductId?: string;
  trigger?: any;
  update: any;
  onReload: Function;
  selectedVariants: string[] | undefined;
  selected?: string[] | undefined;
  type?: 'checkbox' | 'radio' | undefined;
}
const ModalVariants = ({
  ProductId,
  trigger,
  onReload,
  variantsColunm,
  selectedVariants,
  update,
  selected = [],
  type = 'checkbox'
}: Props) => {
  const [open, setOpen] = useState(false);
  const selectedVariantIds = selectedVariants;
  const { id } = useParams();
  const handleClick = () => {
    setOpen((o) => !o);
  };
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = () =>
    Promise.resolve(productApi.addVariantsToProduct(ProductId!, selectedVariantIds!))
      .then((res) => {
        enqueueSnackbar('Them thanh cong', {
          variant: 'success'
        });
        setOpen(false);
        onReload();
      })
      .catch((err) => {
        enqueueSnackbar(`Có lỗi xảy ra. Vui lòng thử lại`, {
          variant: 'error'
        });
      });

  const handleChangeSelection = React.useCallback((ids) => {
    update(ids);
  }, []);
  console.log('selectedExtraCategoryIds', selectedVariantIds);
  return (
    <>
      {React.cloneElement(trigger, { onClick: handleClick })}
      <Dialog maxWidth="md" open={open} onClose={() => setOpen(false)}>
        <Box display="flex" flexDirection="column" maxHeight="80vh">
          <Paper>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={2}
              pt={0}
              borderBottom={1}
              borderColor="grey.300"
              textAlign="right"
            >
              <Typography variant="h6">Thêm biến thể vào sản phẩm</Typography>
              <IconButton aria-label="close" onClick={() => setOpen(false)} size="large">
                <Icon icon={closeFill} />
              </IconButton>
            </Box>
          </Paper>
          <Box p={1} sx={{ flex: 1, overflowY: 'auto' }}>
            <Stack spacing={2}>
              <ResoTable
                checkboxSelection={{
                  selection: selectedVariantIds,
                  type: type
                }}
                showAction={false}
                scroll={{ y: '50%', x: '100%' }}
                rowKey="id"
                getData={variantApi.getVariants}
                onChangeSelection={handleChangeSelection}
                columns={variantsColunm}
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
              Đã chọn <strong>{selectedVariantIds?.length}</strong> sản phẩm
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
        </Box>
      </Dialog>
    </>
  );
};

export default ModalVariants;

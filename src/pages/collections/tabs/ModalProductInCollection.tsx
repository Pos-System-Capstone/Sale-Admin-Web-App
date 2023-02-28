import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
import { Box, Button, Dialog, IconButton, Paper, Stack, Typography } from '@mui/material';
import collectionApi from 'api/collection';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import ResoTable from 'components/ResoTable/ResoTable';
import { useProductsInCollection } from 'hooks/useCollections';
import { useSnackbar } from 'notistack';
import { productColumns } from 'pages/Products/config';
import React, { useEffect, useState } from 'react';
import { getAllProduct } from 'redux/product/api';
interface Props {
  collectionId?: string;
  trigger?: any;
  onReload: Function;
  selected?: string[] | undefined;
  type?: string | undefined;
}
const ModalProductsInCollection = ({
  collectionId,
  trigger,
  onReload,
  selected = [],
  type = 'checkbox'
}: Props) => {
  const [open, setOpen] = useState(false);

  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const { data: products } = useProductsInCollection(collectionId!, { page: 1, size: 1000 });
  const handleClick = () => {
    setOpen((o) => !o);
  };
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (products !== undefined) {
      const selectedIds: string[] = products?.map((e) => e.id);
      setSelectedProductIds(selectedIds);
    }
  }, [products]);
  console.log('selectedExtraCategoryIds', selectedProductIds);

  const handleSubmit = () =>
    Promise.resolve(collectionApi.addProductsToCollection(collectionId!, selectedProductIds))
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
    setSelectedProductIds(ids);
  }, []);

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
              <Typography variant="h6">Thêm sản phẩm vào thực đơn</Typography>
              <IconButton aria-label="close" onClick={() => setOpen(false)} size="large">
                <Icon icon={closeFill} />
              </IconButton>
            </Box>
          </Paper>
          <Box p={1} sx={{ flex: 1, overflowY: 'auto' }}>
            <Stack spacing={2}>
              <ResoTable
                checkboxSelection={{
                  selection: selectedProductIds,
                  type: type
                }}
                showAction={false}
                scroll={{ y: '50%', x: '100%' }}
                rowKey="id"
                getData={getAllProduct}
                onChangeSelection={handleChangeSelection}
                columns={productColumns}
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
              Đã chọn <strong>{selectedProductIds.length}</strong> sản phẩm
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

export default ModalProductsInCollection;

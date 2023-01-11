import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
import { Box, Button, Drawer, IconButton, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { productColumns } from 'pages/Products/config';
import { getAllProduct } from 'redux/product/api';
import LoadingAsyncButton from '../LoadingAsyncButton/LoadingAsyncButton';
import ResoTable from '../ResoTable/ResoTable';

const DrawerProductForm = ({ trigger, onSubmit, disabledSelections = [] }) => {
  const [open, setOpen] = React.useState(false);

  const [selectedProductIds, setSelectedProductIds] = React.useState([]);
  const [selectedProducts, setSelectedProduct] = React.useState([]);

  const handleClick = () => {
    setOpen((o) => !o);
  };

  const handleSubmit = () =>
    Promise.resolve(onSubmit && onSubmit(selectedProductIds, selectedProducts)).then(() =>
      setOpen(false)
    );

  const handleChangeSelection = React.useCallback((ids, data) => {
    setSelectedProductIds(ids);
    setSelectedProduct(data);
  }, []);

  return (
    <>
      {React.cloneElement(trigger, { onClick: handleClick })}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box display="flex" flexDirection="column" height="100vh" maxHeight="100vh">
          <Paper>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={2}
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
          <Box sx={{ padding: '1em', width: '740px', flex: 1, overflowY: 'auto' }}>
            <Stack spacing={2}>
              <ResoTable
                checkboxSelection={{
                  type: 'radio'
                }}
                disabledSelections={disabledSelections}
                showAction={false}
                scroll={{ y: '100%' }}
                rowKey="product_id"
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
      </Drawer>
    </>
  );
};

export default DrawerProductForm;

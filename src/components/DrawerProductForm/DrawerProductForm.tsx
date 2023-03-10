import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
import { Box, Button, Drawer, IconButton, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { productColumns } from 'pages/Products/config';
import { getAllProduct } from 'redux/product/api';
import LoadingAsyncButton from '../LoadingAsyncButton/LoadingAsyncButton';
import ResoTable from '../ResoTable/ResoTable';
import { useState } from 'react';

interface Props {
  menuId?: string;
  trigger?: any;
  onReload: Function;
  onSubmit: Function;
  disabledSelections: string[] | undefined;
  selected?: string[] | undefined;
  type?: string | undefined;
}
const DrawerProductForm = ({
  menuId,
  trigger,
  onReload,
  onSubmit,
  selected = [],
  type = 'checkbox',
  disabledSelections
}: Props) => {
  const [open, setOpen] = useState(false);

  const [selectedProductIds, setSelectedProductIds] = useState<string>();

  const handleClick = () => {
    setOpen((o) => !o);
  };

  const handleSubmit = () =>
    Promise.resolve(onSubmit && onSubmit(selectedProductIds)).then(() => setOpen(false));

  const handleChangeSelection = React.useCallback((ids, data) => {
    setSelectedProductIds(ids);
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
                  type: 'checkbox',
                  selection: selected
                }}
                disabledSelections={disabledSelections}
                showAction={false}
                scroll={{ y: '100%' }}
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
              Đã chọn <strong>{selectedProductIds?.length}</strong> sản phẩm
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button variant="outlined" onClick={() => setOpen(false)}>
                Hủy
              </Button>
              <LoadingAsyncButton onClick={handleSubmit} variant="contained">
                Điều chỉnh
              </LoadingAsyncButton>
            </Stack>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default DrawerProductForm;

import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
import { Box, Button, Dialog, IconButton, Paper, Stack, Typography } from '@mui/material';
import menuApi from 'api/menu';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import ResoTable from 'components/ResoTable/ResoTable';
import { useSnackbar } from 'notistack';
import { productColumns } from 'pages/Products/config';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { getProductInMenus } from 'redux/menu/api';
import { getAllProduct } from 'redux/product/api';
import { ProductFormatTypeToUpdate } from 'types/menu';
import { TProductInMenuDetail } from 'types/product';

interface Props {
  menuId?: string;
  trigger?: any;
  onReload: Function;
  selected?: string[] | undefined;
  type?: string | undefined;
}
const ModalAddOrRemoveProductInMenu = ({
  menuId,
  trigger,
  onReload,
  selected = [],
  type = 'checkbox'
}: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>();
  const { id } = useParams();
  const { data: productsInMenu } = useQuery(
    ['product', menuId ?? id],
    () => getProductInMenus(id!, { page: 1, size: 200 }),
    {
      enabled: Boolean(id)
    }
  );
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (productsInMenu !== undefined) {
      const selectedIds: string[] = productsInMenu?.data.items.map(
        (e: TProductInMenuDetail) => e.id
      );
      setSelectedProductIds(selectedIds);
    }
  }, [productsInMenu]);
  const handleClick = () => {
    setOpen((o) => !o);
  };

  const handleChangeSelection = React.useCallback((ids) => {
    setSelectedProductIds(ids);
  }, []);

  const handleAddOrRemoveProductsInMenu = async (ids: string[]) => {
    const newProductIdsToAddOrRemove: ProductFormatTypeToUpdate[] = [];
    ids.map((id) => {
      newProductIdsToAddOrRemove.push({
        productId: id
      });
    });
    try {
      menuApi.updateMenuInProduct(id ?? '', newProductIdsToAddOrRemove);
      return true;
    } catch (error) {
      return false;
    }
  };
  const handleSubmit = () =>
    Promise.resolve(handleAddOrRemoveProductsInMenu(selectedProductIds!))
      .then((res) => {
        enqueueSnackbar('Điều chỉnh thành công', {
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
              <Typography variant="h6">Thêm/Xoá sản phẩm trong menu</Typography>
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
              Đã chọn{' '}
              <strong>{selectedProductIds === undefined ? 0 : selectedProductIds.length}</strong>{' '}
              sản phẩm
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

export default ModalAddOrRemoveProductInMenu;

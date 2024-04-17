import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
import { Box, Dialog, IconButton, Paper, Stack, Typography } from '@mui/material';
import productApi from 'api/product';
import channelPromotionApi from 'api/promotion/channel';
import ResoTable from 'components/ResoTable/ResoTable';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { TPChannelBase } from 'types/promotion/channelPromotions';
import { TTableColumn } from 'types/table';
interface Props {
  brandId: string;
  trigger?: any;
  update: any;
  onReload: Function;
  selectedChannelIds: string[] | undefined;
  selected?: string[] | undefined;
  type?: string | undefined;
}
const ModalChanel = ({
  brandId,
  trigger,
  onReload,
  selectedChannelIds,
  update,
  selected = [],
  type = 'checkbox'
}: Props) => {
  const [open, setOpen] = useState(false);
  const selectedIds = selectedChannelIds;
  const handleClick = () => {
    setOpen((o) => !o);
  };
  const { enqueueSnackbar } = useSnackbar();

  const channelColunm: TTableColumn<TPChannelBase>[] = [
    { title: 'Mã cửa hàng', dataIndex: 'channelName' }
  ];

  const handleSubmit = () =>
    Promise.resolve(productApi.addVariantsToProduct(brandId!, selectedIds!))
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
                  selection: selectedIds,
                  type: type
                }}
                showAction={false}
                scroll={{ y: '50%', x: '100%' }}
                rowKey="channelId"
                getData={() => channelPromotionApi.getChannels({ page: 1, size: 1000, brandId })}
                onChangeSelection={handleChangeSelection}
                columns={channelColunm}
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
              Đã chọn <strong>{selectedIds?.length}</strong> sản phẩm
            </Typography>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default ModalChanel;

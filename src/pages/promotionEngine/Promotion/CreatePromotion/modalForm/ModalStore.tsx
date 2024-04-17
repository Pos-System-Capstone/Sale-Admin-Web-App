import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
import { Box, Dialog, IconButton, Paper, Stack, Typography } from '@mui/material';
import storePromotionApi from 'api/promotion/store';
import ResoTable from 'components/ResoTable/ResoTable';
import React, { useState } from 'react';
import { TPStore } from 'types/promotion/store';
import { TTableColumn } from 'types/table';
interface Props {
  brandId?: string;
  trigger?: any;
  update: any;
  onReload: Function;
  selectedStoreIds: string[] | undefined;
  selected?: string[] | undefined;
  type?: string | undefined;
}
const ModalStore = ({
  brandId,
  trigger,
  onReload,
  selectedStoreIds,
  update,
  selected = [],
  type = 'checkbox'
}: Props) => {
  const [open, setOpen] = useState(false);
  const selectedIds = selectedStoreIds;
  const handleClick = () => {
    setOpen((o) => !o);
  };

  console.log('selectedExtraCategoryIds', selectedIds);
  const storeColunm: TTableColumn<TPStore>[] = [{ title: 'Mã cửa hàng', dataIndex: 'storeCode' }];

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
              <Typography variant="h6">Thêm cửa hàng</Typography>
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
                rowKey="storeId"
                getData={(params: any) =>
                  storePromotionApi.getStores({ page: 1, size: 10, brandId })
                }
                onChangeSelection={handleChangeSelection}
                columns={storeColunm}
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
            <Stack direction="row" spacing={2} justifyContent="flex-end"></Stack>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default ModalStore;

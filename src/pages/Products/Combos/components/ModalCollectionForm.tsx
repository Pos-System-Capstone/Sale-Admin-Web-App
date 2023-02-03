import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
import { Button, Dialog, IconButton, Paper, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { getCollections } from 'redux/collections/api';
import { CollectionTypeEnum, TCollection } from 'types/collection';
import { TTableColumn } from 'types/table';

type Props = {
  trigger: ReactNode;
  selected: number[];
  onSubmit: (ids: number[], selectedProds: any[]) => any;
};

const ModalCollectionForm = ({ trigger, onSubmit, selected = [] }: Props) => {
  const { translate } = useLocales();

  const [open, setOpen] = useState(false);

  const [selectedProductIds, setSelectedProductIds] = useState(selected);
  const [selectedProducts, setSelectedProduct] = useState([]);

  useEffect(() => {
    setSelectedProductIds(selected);
  }, [selected]);

  const handleClick = () => {
    setOpen((o) => !o);
  };

  const handleSubmit = () =>
    Promise.resolve(onSubmit && onSubmit(selectedProductIds, selectedProducts)).then(() =>
      setOpen(false)
    );

  const handleChangeSelection = useCallback((ids, data) => {
    setSelectedProductIds(ids);
    setSelectedProduct(data);
  }, []);

  const columns: TTableColumn<TCollection>[] = [
    {
      title: translate('combos.table.comboName'),
      dataIndex: 'name',
      fixed: 'left'
    },
    {
      title: 'Mã Code',
      dataIndex: 'code',
      fixed: 'left',
      hideInSearch: true
    }
    // {
    //   title: translate('combos.table.position'),
    //   dataIndex: 'position',
    //   hideInSearch: true
    // }
  ];

  return (
    <>
      <span onClick={handleClick}>{trigger}</span>
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
              <Typography variant="h6">Thêm nhóm sản phẩm</Typography>
              <IconButton aria-label="close" onClick={() => setOpen(false)} size="large">
                <Icon icon={closeFill} />
              </IconButton>
            </Box>
          </Paper>
          <Box p={1} sx={{ padding: '1em', width: '740px', flex: 1, overflowY: 'auto' }}>
            <Stack spacing={2}>
              <ResoTable
                defaultFilters={{
                  type: CollectionTypeEnum.GroupCollection
                }}
                checkboxSelection={{
                  selection: selectedProductIds,
                  type: 'radio'
                }}
                showAction={false}
                scroll={{ y: '50%', x: '100%' }}
                rowKey="id"
                onChangeSelection={handleChangeSelection}
                getData={getCollections}
                columns={columns}
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

export default ModalCollectionForm;

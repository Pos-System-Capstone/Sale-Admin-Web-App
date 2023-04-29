import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
import { Box, Button, Dialog, IconButton, Paper, Stack, Typography } from '@mui/material';
import brandApi from 'api/brand';
import Label from 'components/Label';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import { ResoDescriptionColumnType } from 'components/ResoDescriptions';
import ResoTable from 'components/ResoTable/ResoTable';
import useAuth from 'hooks/useAuth';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { addOrRemoveStoresApplyMenu, getStoreApplyMenus } from 'redux/menu/api';
import { StoreStatus, TStoreDetail } from 'types/store';

interface Props {
  menuId?: string;
  trigger?: any;
  onReload: Function;
  selected?: string[] | undefined;
  type?: string | undefined;
}
const ModalStoresApplyMenuForm = ({
  menuId,
  trigger,
  onReload,
  selected = [],
  type = 'checkbox'
}: Props) => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const [selectedStoreIds, setSelectedStoreIds] = useState<string[]>();
  const { data: storesInMenu } = useQuery(
    ['store', menuId],
    () => getStoreApplyMenus(menuId ?? '', { page: 1, size: 200 }),
    {
      enabled: Boolean(menuId)
    }
  );
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (storesInMenu !== undefined) {
      const selectedIds: string[] = storesInMenu?.data.items.map((e: TStoreDetail) => e.id);
      setSelectedStoreIds(selectedIds);
    }
  }, [storesInMenu]);
  const handleClick = () => {
    setOpen((o) => !o);
  };

  const handleChangeSelection = React.useCallback((ids) => {
    setSelectedStoreIds(ids);
  }, []);

  const handleAddOrRemoveStoresApplyMenu = async (ids: string[]) => {
    try {
      await addOrRemoveStoresApplyMenu(menuId ?? '', ids);
      return true;
    } catch (error) {
      return false;
    }
  };
  const handleSubmit = () =>
    Promise.resolve(handleAddOrRemoveStoresApplyMenu(selectedStoreIds!))
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

  const menuInStoreColumns: ResoDescriptionColumnType<TStoreDetail>[] = [
    {
      title: 'STT',
      dataIndex: 'index',
      hideInSearch: true
    },
    {
      title: 'Tên đầy đủ',
      dataIndex: 'name',
      hideInSearch: true
    },
    {
      title: 'Tên rút gọn',
      dataIndex: 'shortName'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      hideInSearch: true
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      hideInSearch: true
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      hideInSearch: true,
      render: (status) => {
        return status === StoreStatus.ACTIVE ? (
          <Label color="primary">Hoạt động </Label>
        ) : (
          <Label color="warning"> Không hoạt động </Label>
        );
      }
    }
  ];
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
              <Typography variant="h6">Thêm/Xoá cửa hàng áp dụng menu</Typography>
              <IconButton aria-label="close" onClick={() => setOpen(false)} size="large">
                <Icon icon={closeFill} />
              </IconButton>
            </Box>
          </Paper>
          <Box p={1} sx={{ flex: 1, overflowY: 'auto' }}>
            <Stack spacing={2}>
              <ResoTable
                checkboxSelection={{
                  selection: selectedStoreIds,
                  type: type
                }}
                showAction={false}
                scroll={{ y: '50%', x: '100%' }}
                rowKey="id"
                getData={(params: any) => brandApi.getStoreOfBrand(user?.brandId, params)}
                onChangeSelection={handleChangeSelection}
                columns={menuInStoreColumns}
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
              <strong>{selectedStoreIds === undefined ? 0 : selectedStoreIds.length}</strong> sản
              phẩm
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

export default ModalStoresApplyMenuForm;

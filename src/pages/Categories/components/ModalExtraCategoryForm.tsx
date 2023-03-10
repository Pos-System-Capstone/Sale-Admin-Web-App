import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
import { Avatar, Box, Button, Dialog, IconButton, Paper, Stack, Typography } from '@mui/material';
import categoryApi from 'api/category';
import Label from 'components/Label';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import ResoTable from 'components/ResoTable/ResoTable';
import useExtraCategoriesInProductCategory from 'hooks/categories/useCategoryChild';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { CategoryStatus, CategoryType, TCategory } from 'types/category';
import { TTableColumn } from 'types/table';

interface Props {
  cateId?: string;
  trigger?: any;
  onReload: Function;
  selected?: string[] | undefined;
  type?: string | undefined;
}
const ModalExtraCategoryForm = ({
  cateId,
  trigger,
  onReload,
  selected = [],
  type = 'checkbox'
}: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedExtraCategoryIds, setSelectedExtraCategoryIds] = useState<string[]>();
  const { data: extras } = useExtraCategoriesInProductCategory(cateId, { page: 1, size: 100 });
  //   const selectedIds: string[] = extras !== undefined ? extras?.map((e) => e.id) : [];
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (extras !== undefined) {
      const selectedIds: string[] = extras?.map((e) => e.id);
      setSelectedExtraCategoryIds(selectedIds);
    }
  }, [extras]);
  console.log('selectedExtraCategoryIds', selectedExtraCategoryIds);
  const handleClick = () => {
    setOpen((o) => !o);
  };

  const addExtratCategoriesToProductCategories = async (ids: string[]) => {
    await categoryApi.addExtraCategoriesToProductCategory(cateId!, ids);
  };
  const handleSubmit = () =>
    Promise.resolve(addExtratCategoriesToProductCategories(selectedExtraCategoryIds!))
      .then((res) => {
        enqueueSnackbar('Them thanh cong', {
          variant: 'success'
        });
        setOpen(false);
        onReload();
      })
      .catch((err) => {
        enqueueSnackbar(`C?? l???i x???y ra. Vui l??ng th??? l???i`, {
          variant: 'error'
        });
      });

  const handleChangeSelection = React.useCallback((ids, data) => {
    setSelectedExtraCategoryIds(ids);
  }, []);
  const categoryColumns: TTableColumn<TCategory>[] = [
    {
      title: 'STT',
      dataIndex: 'index',
      hideInSearch: true
    },
    {
      title: 'H??nh ???nh',
      dataIndex: 'picUrl',
      hideInSearch: true,
      render: (src, { product_name }: any) => (
        <Avatar
          alt={product_name}
          src={src}
          variant="square"
          style={{ width: '54px', height: '54px' }}
        />
      )
    },
    {
      title: 'T??n danh m???c',
      dataIndex: 'name'
    },
    {
      title: 'M?? danh m???c',
      dataIndex: 'code',
      hideInSearch: true
    },
    {
      title: 'Tr???ng th??i',
      dataIndex: 'status',
      hideInSearch: true,
      render: (status) => {
        return status === CategoryStatus.ACTIVE ? (
          <Label color="primary">Ho???t ?????ng </Label>
        ) : (
          <Label color="warning"> Kh??ng ho???t ?????ng </Label>
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
              <Typography variant="h6">Th??m danh m???c extra v??o danh m???c s???n ph???m</Typography>
              <IconButton aria-label="close" onClick={() => setOpen(false)} size="large">
                <Icon icon={closeFill} />
              </IconButton>
            </Box>
          </Paper>
          <Box p={1} sx={{ flex: 1, overflowY: 'auto' }}>
            <Stack spacing={2}>
              <ResoTable
                defaultFilters={{
                  type: CategoryType.EXTRA
                }}
                checkboxSelection={{
                  selection: selectedExtraCategoryIds,
                  type: type
                }}
                showAction={false}
                scroll={{ y: '50%', x: '100%' }}
                rowKey="id"
                getData={categoryApi.get}
                onChangeSelection={handleChangeSelection}
                columns={categoryColumns}
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
              ???? ch???n{' '}
              <strong>
                {selectedExtraCategoryIds === undefined ? 0 : selectedExtraCategoryIds.length}
              </strong>{' '}
              s???n ph???m
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button variant="outlined" onClick={() => setOpen(false)}>
                H???y
              </Button>
              <LoadingAsyncButton onClick={handleSubmit} variant="contained">
                Th??m
              </LoadingAsyncButton>
            </Stack>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default ModalExtraCategoryForm;

import { yupResolver } from '@hookform/resolvers/yup';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import { Visibility } from '@mui/icons-material';
import { Box, Button, Card, IconButton, Tooltip } from '@mui/material';
import { menuInStoreSchema, transformMenuForm } from 'components/form/Menu/helper';
import MenuInStoreForm from 'components/form/Menu/MenuInStoreForm';
import Label from 'components/Label';
import confirm from 'components/Modal/confirm';
import ModalForm from 'components/ModalForm/ModalForm';
import { ResoDescriptionColumnType } from 'components/ResoDescriptions';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import { useSnackbar } from 'notistack';
import { CardTitle } from 'pages/Products/components/Card';
import { ReactNode, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { deleteStoreApplyMenus, getStoreApplyMenus, updateStoreApplyMenus } from 'redux/menu/api';
import { PATH_DASHBOARD } from 'routes/paths';
import { StoreStatus, TStoreDetail } from 'types/store';
import ModalStoresApplyMenuForm from '../components/CreateNewMenu/ShowAndEditStoreInMenu/ModalAddAndRemoveStoreApplyMenu';

// export const menuInStoreColumns: TTableColumn<Menu>[] = [
//   {
//     title: 'Cửa hàng',
//     dataIndex: ['store', 'store_name'],
//     hideInSearch: true
//   },
//   {
//     title: 'Thời gian hiệu lực',
//     hideInSearch: true,
//     render: (_, data: Menu) =>
//       data.start_time && data.end_time ? (
//         <Typography>
//           {fDate(data.start_time)} - {fDate(data.end_time)}
//         </Typography>
//       ) : (
//         '-'
//       )
//   },
//   {
//     title: 'Khung giờ',
//     dataIndex: 'time_ranges',
//     hideInSearch: true,
//     render: (_: any, { time_ranges }: Menu) => (
//       <Stack direction="row" spacing={1}>
//         {time_ranges?.map(([from, to]) => (
//           <Chip size="small" key={`${from}-${to}`} label={`${from}-${to}`} />
//         ))}
//       </Stack>
//     )
//   },
//   {
//     title: 'Ngày hoạt động',
//     dataIndex: 'day_filters',
//     valueType: 'select',
//     valueEnum: DAY_OF_WEEK,
//     render: (_: any, { day_filters: dayFilters, id }: Menu) =>
//       dayFilters.length === 7 ? (
//         <Chip label="Cả tuần" color="info" />
//       ) : (
//         <Stack direction="row" spacing={1}>
//           {dayFilters?.map((day) => (
//             <Chip
//               size="small"
//               key={`${id}-${day}`}
//               label={DAY_OF_WEEK.find(({ value }) => value === day)?.label}
//             />
//           ))}
//         </Stack>
//       )
//   },
//   {
//     title: 'Độ ưu tiên',
//     dataIndex: 'priority',
//     hideInSearch: true
//   }
// ];

const StoreApplyTab = () => {
  const { id }: any = useParams();
  const navigate = useNavigate();
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const tableRef = useRef<any>();
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
    },
    {
      title: 'Chi tiết',
      fixed: 'right',
      hideInSearch: true,
      render: (_: any, store: TStoreDetail) => (
        <Tooltip title="Chi tiết">
          <IconButton
            onClick={() => navigate(PATH_DASHBOARD.stores.storeById(store.id))}
            size="large"
          >
            <Visibility />
          </IconButton>
        </Tooltip>
      )
    }
  ];

  const createMenuForm = useForm({
    resolver: yupResolver(menuInStoreSchema),
    shouldUnregister: true,
    defaultValues: {
      time_ranges: [{ from: null, to: null }],
      allDay: false,
      priority: 0
    }
  });
  const updateForm = useForm({
    resolver: yupResolver(menuInStoreSchema),
    shouldUnregister: true
  });

  // const handleAddStoreApply = async (values: any) => {
  //   try {
  //     await addStoreApplyMenus(id, transformMenuForm(values));
  //     enqueueSnackbar('Tạp bảng giá thành công', {
  //       variant: 'success'
  //     });
  //     tableRef.current?.reload();
  //     return true;
  //   } catch (error) {
  //     console.log(`error`, error);
  //     enqueueSnackbar((error as any).message, {
  //       variant: 'error'
  //     });
  //     return false;
  //   }
  // };

  const handleUpdate = async (values: any) => {
    try {
      await updateStoreApplyMenus(+id, values.store_id, transformMenuForm(values));
      enqueueSnackbar(translate('common.success'), {
        variant: 'success'
      });
      tableRef.current?.reload();
    } catch (error) {
      enqueueSnackbar((error as any).message, {
        variant: 'error'
      });
    }
  };

  const onConfirmDelete = async (data: any) => {
    confirm({
      title: `Xác nhận huỷ áp dụng bảng giá `,
      content: `Bạn đồng ý huỷ áp dụng bang giá cho cửa hàng ${data.store?.store_name}?`,
      onOk: async () => {
        try {
          await deleteStoreApplyMenus(+id, data?.store.id);
          enqueueSnackbar(translate('common.deleteSuccess'), {
            variant: 'success'
          });
          tableRef.current?.reload();
        } catch (error) {
          enqueueSnackbar((error as any).message, {
            variant: 'error'
          });
        }
      },
      onCancle: () => {}
    });
  };

  return (
    <Box>
      <Card>
        <Box display="flex" justifyContent="space-between">
          <CardTitle>{translate('pages.menus.storeApplyTab.title')}</CardTitle>

          <ModalStoresApplyMenuForm
            menuId={id}
            trigger={
              <Button size="small" startIcon={<Icon icon={plusFill} />}>
                Thêm/xoá cửa hàng
              </Button>
            }
            onReload={() => tableRef.current?.reload()}
          />

          {/* <ModalForm
            key="create-menu"
            onOk={async () => {
              try {
                await createMenuForm.handleSubmit(
                  (data: any) => {
                    return handleAddStoreApply(data);
                  },
                  (e) => {
                    // throw e;
                  }
                )();
                return true;
              } catch (error) {
                return false;
              }
            }}
            title={translate('pages.menus.storeApplyTab.addStoreInMenu')}
            trigger={
              <Button size="small" startIcon={<Icon icon={plusFill} />}>
                {translate('pages.menus.storeApplyTab.addStoreInMenu')}
              </Button>
            }
          >
            <FormProvider {...createMenuForm}>
              <MenuInStoreForm />
            </FormProvider>
          </ModalForm> */}
        </Box>
        <Box mt={2}>
          <ResoTable
            ref={tableRef}
            pagination={false}
            getData={(params: any) => getStoreApplyMenus(id, params)}
            columns={menuInStoreColumns}
            rowKey="menu_in_store_id"
            showAction={false}
            renderEdit={(dom: ReactNode, data: any) => (
              <ModalForm
                onOk={async () => {
                  try {
                    await updateForm.handleSubmit(
                      (data) => {
                        return handleUpdate(data);
                      },
                      (e) => {
                        console.log(`e`, e);
                        throw e;
                      }
                    )();
                    return true;
                  } catch (error) {
                    return false;
                  }
                }}
                title="Cập nhật bảng giá ở cửa hàng"
                trigger={dom}
              >
                <FormProvider {...updateForm}>
                  <MenuInStoreForm />
                </FormProvider>
              </ModalForm>
            )}
          />
        </Box>
      </Card>
    </Box>
  );
};

export default StoreApplyTab;

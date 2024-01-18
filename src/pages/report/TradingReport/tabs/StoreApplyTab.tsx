import { yupResolver } from '@hookform/resolvers/yup';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import { Box, Button, Card, Chip, Stack, Typography } from '@mui/material';
import {
  menuInStoreSchema,
  normalizeMenuData,
  transformMenuForm
} from 'components/form/Menu/helper';
import MenuInStoreForm from 'components/form/Menu/MenuInStoreForm';
import confirm from 'components/Modal/confirm';
import ModalForm from 'components/ModalForm/ModalForm';
import ResoTable from 'components/ResoTable/ResoTable';
import { DAY_OF_WEEK } from 'constraints';
import useLocales from 'hooks/useLocales';
import { useSnackbar } from 'notistack';
import { CardTitle } from 'pages/Products/components/Card';
import React, { ReactNode, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { deleteStoreApplyMenus, getStoreApplyMenus, updateStoreApplyMenus } from 'redux/menu/api';
import { Menu } from 'types/menu';
import { TTableColumn } from 'types/table';
import { fDate } from 'utils/formatTime';

export const menuInStoreColumns: TTableColumn<Menu>[] = [
  {
    title: 'Cửa hàng',
    dataIndex: ['store', 'store_name'],
    hideInSearch: true
  },
  {
    title: 'Thời gian hiệu lực',
    hideInSearch: true,
    render: (_, data: Menu) =>
      data.start_time && data.end_time ? (
        <Typography>
          {fDate(data.start_time)} - {fDate(data.end_time)}
        </Typography>
      ) : (
        '-'
      )
  },
  {
    title: 'Khung giờ',
    dataIndex: 'time_ranges',
    hideInSearch: true,
    render: (_: any, { time_ranges }: Menu) => (
      <Stack direction="row" spacing={1}>
        {time_ranges?.map(([from, to]) => (
          <Chip size="small" key={`${from}-${to}`} label={`${from}-${to}`} />
        ))}
      </Stack>
    )
  },
  {
    title: 'Ngày hoạt động',
    dataIndex: 'day_filters',
    valueType: 'select',
    valueEnum: DAY_OF_WEEK,
    render: (_: any, { day_filters: dayFilters, id }: Menu) =>
      dayFilters.length === 7 ? (
        <Chip label="Cả tuần" color="info" />
      ) : (
        <Stack direction="row" spacing={1}>
          {dayFilters?.map((day) => (
            <Chip
              size="small"
              key={`${id}-${day}`}
              label={DAY_OF_WEEK.find(({ value }) => value === day)?.label}
            />
          ))}
        </Stack>
      )
  },
  {
    title: 'Độ ưu tiên',
    dataIndex: 'priority',
    hideInSearch: true
  }
];

const StoreApplyTab = () => {
  const { id }: any = useParams();
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const tableRef = useRef<any>();

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

  const handleAddStoreApply = async (values: any) => {
    try {
      await getStoreApplyMenus(id, transformMenuForm(values));
      enqueueSnackbar('Tạp bảng giá thành công', {
        variant: 'success'
      });
      tableRef.current?.reload();
      return true;
    } catch (error) {
      enqueueSnackbar((error as any).message, {
        variant: 'error'
      });
      return false;
    }
  };

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

          <ModalForm
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
          </ModalForm>
        </Box>
        <Box mt={2}>
          <ResoTable
            ref={tableRef}
            pagination={false}
            getData={(params: any) => getStoreApplyMenus(id, params)}
            columns={menuInStoreColumns}
            rowKey="menu_in_store_id"
            onEdit={(values: any) => {
              updateForm.reset(normalizeMenuData({ ...values, store_id: values.store?.id }));
            }}
            onDelete={onConfirmDelete}
            renderEdit={(dom: ReactNode, data: any) => (
              <ModalForm
                onOk={async () => {
                  try {
                    await updateForm.handleSubmit(
                      (data) => {
                        return handleUpdate(data);
                      },
                      (e) => {
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

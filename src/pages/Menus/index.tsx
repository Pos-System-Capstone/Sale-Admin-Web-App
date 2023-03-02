/* eslint-disable camelcase */
import { yupResolver } from '@hookform/resolvers/yup';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
// material
import { Button, Card, Chip, Stack, Typography } from '@mui/material';
import menuApi from 'api/menu';
import { menuSchema } from 'components/form/Menu/helper';
import MenuForm from 'components/form/Menu/MenuForm';
import confirm from 'components/Modal/confirm';
import ModalForm from 'components/ModalForm/ModalForm';
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import useAuth from 'hooks/useAuth';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
// components
import { useNavigate } from 'react-router-dom';
import { getMenusOfBrand } from 'redux/menu/api';
import { PATH_DASHBOARD } from 'routes/paths';
import { Menu, PosMenu, TCreateMenuInformation } from 'types/menu';
import { TTableColumn } from 'types/table';

export const menuColumns: TTableColumn<PosMenu>[] = [
  {
    title: 'Code',
    dataIndex: 'code'
  },
  {
    title: 'Thời gian hiệu lực',
    hideInSearch: true,
    render: (_, data: PosMenu) =>
      data.startTime && data.endTime ? (
        <Typography>
          <Chip
            size="small"
            key={data.code}
            label={moment(data.startTime, 'HH:mm:ss').format('HH:mm')}
          />{' '}
          -{' '}
          <Chip
            size="small"
            key={data.code}
            label={moment(data.endTime, 'HH:mm:ss').format('HH:mm')}
          />
        </Typography>
      ) : (
        '-'
      )
  },
  {
    title: 'Ngày áp dụng',
    dataIndex: 'dateFilter',
    hideInSearch: true,
    render: (_: any, { dateFilter }: PosMenu) => (
      <Stack direction="row" spacing={1}>
        {dateFilter?.map((date) => (
          <Chip size="small" key={date} label={date} />
        ))}
      </Stack>
    )
  },
  {
    title: 'Độ ưu tiên',
    dataIndex: 'priority',
    hideInSearch: true
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createdAt',
    hideInSearch: true,
    render: (_: any, { createdAt }: PosMenu) => (
      <Stack direction="row" spacing={1}>
        <Chip size="small" key={createdAt} label={moment(createdAt).format('DD/MM/YYYY')} />
      </Stack>
    )
  }
  // {
  //   title: 'Áp dụng',
  //   dataIndex: 'is_brand_mode',
  //   valueType: 'select',
  //   valueEnum: [
  //     {
  //       label: 'Toàn hệ thống',
  //       value: true
  //     },
  //     {
  //       label: 'Theo cửa hàng',
  //       value: false
  //     }
  //   ]
  // },
  // {
  //   title: 'Ngày hoạt động',
  //   dataIndex: 'day_filters',
  //   valueType: 'select',
  //   valueEnum: DAY_OF_WEEK_CONFIG_VALUE_BY_BIT,
  //   render: (_: any, { day_filters: dayFilters, menu_id }: Menu) => (
  //     <Stack direction="row" spacing={1}>
  //       {dayFilters?.map((day) => (
  //         <Chip
  //           size="small"
  //           key={`${menu_id}-${day}`}
  //           label={DAY_OF_WEEK_CONFIG_VALUE_BY_BIT.find(({ value }) => value === day)?.label}
  //         />
  //       ))}
  //     </Stack>
  //   )
  // },
];

const MenusPage = () => {
  const navigate = useNavigate();
  const tableRef = useRef<any>();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();

  const createMenuForm = useForm({
    resolver: yupResolver(menuSchema),
    shouldUnregister: true,
    defaultValues: {
      time_ranges: [{ from: null, to: null }],
      allDay: false,
      isBaseMenu: false
    }
  });

  const onDeleteMenu = async (menuId: string) => {
    try {
      await menuApi.delete(menuId);
      enqueueSnackbar('Xoá thành công', {
        variant: 'success'
      });
      console.log(`tableRef.current`, tableRef.current);
      tableRef.current?.reload();
    } catch (error) {
      console.log(`error`, error);
      enqueueSnackbar((error as any).message, {
        variant: 'error'
      });
    }
  };

  const onConfirmDelete = async (menu: Menu) => {
    confirm({
      title: 'Xác nhận xoá',
      content: `Bạn đồng ý xóa menu "${menu.code}"?`,
      onOk: async () => {
        await onDeleteMenu(menu.id);
      },
      onCancle: () => {}
    });
  };

  const convertTimeToInteger = (time: string) => {
    const array = time.split(':');
    return parseInt(array[0], 10) * 60 + parseInt(array[1], 10);
  };

  const processDayFiter = (dayOfWeek: number[]) => {
    let totalDay = 0;
    dayOfWeek.map((number) => {
      totalDay += number;
    });
    return totalDay;
  };

  const handleProcessCreateNewMenuRequest = (data: any) => {
    const { code, startTime, endTime, dayFilter, priority, allDay, isBaseMenu } = data;
    let startTimeToInt = 0;
    let endTimeToInt = 0;

    if (allDay) {
      startTimeToInt = 0;
      endTimeToInt = 1439;
    } else {
      // convert all data to int to send request
      startTimeToInt = convertTimeToInteger(moment(startTime).format('HH:mm'));
      endTimeToInt = convertTimeToInteger(moment(endTime).format('HH:mm'));
    }

    const dayFilterTotal = processDayFiter(dayFilter);
    const processedData: TCreateMenuInformation = {
      isBaseMenu: isBaseMenu,
      code: code,
      priority: parseInt(priority),
      dateFilter: dayFilterTotal,
      startTime: startTimeToInt,
      endTime: endTimeToInt
    };

    return processedData;
  };

  return (
    <Page
      title="Danh sách menu"
      actions={() => [
        <ModalForm
          key="create-menu"
          onOk={async () => {
            try {
              await createMenuForm.handleSubmit(
                (data: any) => {
                  const requestOfCreateNewMenu = handleProcessCreateNewMenuRequest(data);
                  return menuApi
                    .create(requestOfCreateNewMenu)
                    .then((res) => {
                      enqueueSnackbar('Tạo menu thành công', {
                        variant: 'success'
                      });
                      tableRef.current?.reload();
                      return true;
                    })
                    .catch((err) => {
                      enqueueSnackbar('Có lỗi xảy ra. Vui lòng thử lại!', {
                        variant: 'error'
                      });
                      return false;
                    });
                },
                (e) => {
                  throw e;
                }
              )();
              return true;
            } catch (error) {
              console.log(`error`, error);
              enqueueSnackbar('Có lỗi xảy ra. Vui lòng thử lại!', {
                variant: 'error'
              });
              return false;
            }
          }}
          title={<Typography variant="h4">Thêm menu mới</Typography>}
          trigger={
            <Button variant="contained" startIcon={<Icon icon={plusFill} />}>
              Tạo menu mới
            </Button>
          }
        >
          <FormProvider {...createMenuForm}>
            <MenuForm />
          </FormProvider>
        </ModalForm>
      ]}
    >
      <Card>
        <Stack spacing={2}>
          <ResoTable
            ref={tableRef}
            onDelete={onConfirmDelete}
            rowKey="menu_id"
            onEdit={(menu: PosMenu) => navigate(`${PATH_DASHBOARD.menus.root}/${menu.id}`)}
            getData={(params: any) => getMenusOfBrand(user?.brandId, params)}
            columns={menuColumns}
          />
        </Stack>
      </Card>
    </Page>
  );
};

export default MenusPage;

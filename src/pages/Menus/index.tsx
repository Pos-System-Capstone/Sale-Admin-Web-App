/* eslint-disable camelcase */
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
// material
import { Button, Card, Chip, Stack, Typography } from '@mui/material';
import menuApi from 'api/menu';
import MenuForm from 'components/form/Menu/MenuForm';
import confirm from 'components/Modal/confirm';
import ModalForm from 'components/ModalForm/ModalForm';
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import { DAY_OF_WEEK_CONFIG_VALUE_BY_BIT } from 'constraints';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
// components
import { useNavigate } from 'react-router-dom';
import { getMenus } from 'redux/menu/api';
import { PATH_DASHBOARD } from 'routes/paths';
import { Menu, TCreateMenuInformation } from 'types/menu';
import { TTableColumn } from 'types/table';
import { fDate } from 'utils/formatTime';

export const menuColumns: TTableColumn<Menu>[] = [
  {
    title: 'Tên bảng giá',
    dataIndex: 'menu_name'
  },
  {
    title: 'Áp dụng',
    dataIndex: 'is_brand_mode',
    valueType: 'select',
    valueEnum: [
      {
        label: 'Toàn hệ thống',
        value: true
      },
      {
        label: 'Theo cửa hàng',
        value: false
      }
    ]
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
    valueEnum: DAY_OF_WEEK_CONFIG_VALUE_BY_BIT,
    render: (_: any, { day_filters: dayFilters, menu_id }: Menu) => (
      <Stack direction="row" spacing={1}>
        {dayFilters?.map((day) => (
          <Chip
            size="small"
            key={`${menu_id}-${day}`}
            label={DAY_OF_WEEK_CONFIG_VALUE_BY_BIT.find(({ value }) => value === day)?.label}
          />
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
    dataIndex: 'create_at',
    hideInSearch: true
  }
];

const MenusPage = () => {
  const navigate = useNavigate();
  const tableRef = useRef<any>();
  const { enqueueSnackbar } = useSnackbar();

  const createMenuForm = useForm({
    // resolver: yupResolver(menuSchema),
    shouldUnregister: true,
    defaultValues: {
      time_ranges: [{ from: null, to: null }],
      allDay: false,
      priority: 0
    }
  });

  const onDeleteMenu = async (menuId: number) => {
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
      content: `Bạn đồng ý xóa menu "${menu.menu_name}"?`,
      onOk: async () => {
        await onDeleteMenu(menu.menu_id);
      },
      onCancle: () => {}
    });
  };

  // const handleGetListMenu = (param? : any) => {
  //   return
  // }

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
    const { code, statTime, endTime, dayFilter, priority, allDay, isBaseMenu } = data;
    let startTimeToInt = 0;
    let endTimeToInt = 0;

    if (allDay) {
      startTimeToInt = 0;
      endTimeToInt = 1439;
    } else {
      // convert all data to int to send request
      startTimeToInt = convertTimeToInteger(moment(statTime).format('hh:mm'));
      endTimeToInt = convertTimeToInteger(moment(endTime).format('hh:mm'));
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
                  console.log('data ne: ', requestOfCreateNewMenu);
                  // return menuApi.create(transformMenuForm(data));
                },
                (e) => {
                  throw e;
                }
              )();
              // enqueueSnackbar('Tạp bảng giá thành công', {
              //   variant: 'success'
              // });
              // tableRef.current?.reload();
              // return true;
            } catch (error) {
              console.log(`error`, error);
              enqueueSnackbar((error as any).message, {
                variant: 'error'
              });
              return false;
            }
          }}
          title={<Typography variant="h3">Thêm Bảng giá</Typography>}
          trigger={
            <Button variant="contained" startIcon={<Icon icon={plusFill} />}>
              Thêm Bảng giá
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
            onEdit={(menu: Menu) =>
              navigate(`${PATH_DASHBOARD.tradingReport.root}/${menu.menu_id}`, { state: menu })
            }
            getData={getMenus}
            columns={menuColumns}
          />
        </Stack>
      </Card>
    </Page>
  );
};

export default MenusPage;

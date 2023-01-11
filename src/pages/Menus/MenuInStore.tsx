import { EventClickArg, EventHoveringArg, EventInput } from '@fullcalendar/react'; // => request placed at the top
import { Edit } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  DialogActions,
  DialogTitle,
  Grid,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';
import { DialogAnimate } from 'components/animate';
import AutoCompleteStoreSelect from 'components/form/common/AutocompleteStoreSelect/AutocompleteStoreSelect';
import Label from 'components/Label';
// components
import Page from 'components/Page';
import ResoDescriptions, { ResoDescriptionColumnType } from 'components/ResoDescriptions';
import { CalendarToolbar } from 'components/_dashboard/calendar';
import { DAY_OF_WEEK } from 'constraints';
import useLocales from 'hooks/useLocales';
import { get } from 'lodash';
import moment from 'moment';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import { getCurrentMenuByStoreId } from 'redux/menu/api';
import { COLOR_OPTIONS } from 'redux/slices/calendar';
import { PATH_DASHBOARD } from 'routes/paths';
import { StoreInMenu } from 'types/store';
import { fDate, fDateTime } from 'utils/formatTime';
import { CalendarView } from '../../@types/calendar';
import MenuInStoreCalendar from './components/MenuInStoreCalendar';

// ----------------------------------------------------------------------

const transformSIMtoEvent = (storeInMenus: StoreInMenu[] = []): EventInput[] => {
  let eventInputs: EventInput[] = [];
  storeInMenus.forEach((sInMenu) => {
    const eventInput = {
      title: sInMenu.menu_name ?? `Thực đơn ${sInMenu.menu_id}`,
      // start: moment(sInMenu.time_range[0], 'HH:mm').toDate(),
      // end: moment(sInMenu.time_range[1], 'HH:mm').toDate(),
      textColor: COLOR_OPTIONS[(sInMenu.store?.id ?? 0) % COLOR_OPTIONS.length]
      // groupId: `menu_${sInMenu.menu_in_store_id}`
    };
    sInMenu.time_ranges.forEach((range) => {
      const allDay = get(range, [0]) === '00:00' && get(range, [1]) === '00:00';

      eventInputs.push({
        ...eventInput,
        id: `${sInMenu.menu_in_store_id}-${range[0]}-${range[1]}`, // event id
        allDay,
        startTime: !allDay && moment(range[0], 'HH:mm').format('HH:mm:ss'),
        endTime: !allDay && moment(range[1], 'HH:mm').format('HH:mm:ss'),
        daysOfWeek: sInMenu.day_filters
      });
    });
  });
  return eventInputs;
};

const columns: ResoDescriptionColumnType<StoreInMenu>[] = [
  {
    title: 'Tên',
    dataIndex: 'menu_name'
  },
  {
    title: 'Áp dụng',
    dataIndex: 'menu_in_store_id',
    render: (isStoreMode) => (
      <Label color={!isStoreMode ? 'success' : 'default'}>
        {isStoreMode ? 'Theo cửa hàng' : 'Toàn hệ thống'}
      </Label>
    )
  },
  {
    title: 'Thời gian hiệu lực',
    span: 2,
    hideInSearch: true,
    render: (_, data: StoreInMenu) =>
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
    render: (_: any, { time_ranges = [] }: StoreInMenu) => {
      const isAllDay =
        get(time_ranges, [0, 0]) === get(time_ranges, [0, 1]) &&
        get(time_ranges, [0, 1]) === '00:00';

      if (isAllDay) {
        return <Chip label="Cả ngày" size="small" color="success" />;
      }
      return (
        <Stack direction="row" spacing={1}>
          {time_ranges?.map(([from, to]) => (
            <Chip size="small" key={`${from}-${to}`} label={`${from}-${to}`} />
          ))}
        </Stack>
      );
    }
  },
  {
    title: 'Ngày hoạt động',
    dataIndex: 'day_filters',
    valueType: 'select',
    valueEnum: DAY_OF_WEEK,
    span: 2,
    render: (_: any, { day_filters: dayFilters, menu_id }: StoreInMenu) => (
      <Stack direction="row" spacing={1}>
        {dayFilters?.length === 7 ? (
          <Chip size="small" color="success" label="Cả tuần" />
        ) : (
          dayFilters?.map((day) => (
            <Chip
              size="small"
              key={`${menu_id}-${day}`}
              label={DAY_OF_WEEK.find(({ value }) => value === day)?.label}
            />
          ))
        )}
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
    span: 3,
    hideInSearch: true,
    render: (value) => fDateTime(value)
  }
];

export default function MenuInStorePage() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('lg'));
  const { translate } = useLocales();

  const [view, setView] = useState<CalendarView>(isMobile ? 'listWeek' : 'timeGridWeek');
  const [date] = useState(new Date());

  const filterForm = useForm();

  const filteredStore = filterForm.watch();
  const selectedStoreId = filteredStore.store_id;
  console.log(`selectedStoreId`, selectedStoreId);
  const { data } = useQuery(
    ['stores', selectedStoreId, 'currentMenu'],
    () => getCurrentMenuByStoreId(selectedStoreId).then((res) => res.data),
    {
      enabled: Boolean(selectedStoreId)
    }
  );

  console.log(`data`, data);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedStoreInMenu, setselectedStoreInMenu] = useState<StoreInMenu | null | undefined>(
    null
  );
  const [selectedRange, setSelectedRange] = useState<any>(null);
  const [popoverStoreInMenu, setPopoverStoreInMenu] = useState<(StoreInMenu & EventInput) | null>(
    null
  );

  const handleMouseEnter = (info: EventHoveringArg) => {
    console.log(`info.event`, info.event);
    setPopoverStoreInMenu(data!);
  };

  const handleSelectEvent = (arg: EventClickArg) => {
    const sInMenuId = arg.event.id;

    if (sInMenuId) {
      setselectedStoreInMenu(data);
      setIsOpenModal(true);
    }
  };

  const handleChangeView = (newView: CalendarView) => {
    setView(newView);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setselectedStoreInMenu(null);
  };

  const filteredEvents = data && transformSIMtoEvent([data]);

  const popoverContent = popoverStoreInMenu && (
    <>
      <CardContent>
        <Stack spacing={2}>
          <Box>
            <Typography variant="h5" component="div">
              {popoverStoreInMenu.menu_name}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Box
                component="span"
                sx={{
                  width: 14,
                  height: 14,
                  flexShrink: 0,
                  borderRadius: '3px',
                  mr: 1,
                  mt: '2px'
                }}
                style={{
                  backgroundColor:
                    COLOR_OPTIONS[(popoverStoreInMenu.store?.id ?? 0) % COLOR_OPTIONS.length]
                }}
              />
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {popoverStoreInMenu.store?.store_name}
              </Typography>
            </Stack>
          </Box>
          <Box>
            <Typography variant="subtitle1">{translate('pages.menus.table.timeRange')}</Typography>
            {popoverStoreInMenu.time_ranges.map((range, idx) => (
              <Box key={`${range[0]}-${range[1]}`}>
                {translate('pages.menus.table.fromTime')} <Label color="success">{range[0]}</Label>{' '}
                {translate('pages.menus.table.toTime')} <Label color="success">{range[1]}</Label>
              </Box>
            ))}
          </Box>
          <Box>
            <Typography variant="subtitle1">{translate('pages.menus.table.dayFilter')}</Typography>
            <Stack direction="row" spacing={1}>
              {popoverStoreInMenu.day_filters?.map((day) => (
                <Chip
                  size="small"
                  key={`${popoverStoreInMenu.menu_in_store_id}-${day}`}
                  label={DAY_OF_WEEK.find(({ value }) => value === day)?.label}
                />
              ))}
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </>
  );

  return (
    <Page title="Xem bảng giá theo cửa hàng">
      <Card>
        <CalendarToolbar
          setOpenModel={() => setIsOpenModal(true)}
          date={date}
          view={view}
          onChangeView={handleChangeView}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={9}>
            <Box>
              <MenuInStoreCalendar
                popoverContent={popoverContent}
                events={filteredEvents}
                onMouseEnter={handleMouseEnter}
                initialDate={date}
                initialView={view}
                view={view}
                onSelectRange={(start, end) => {
                  setIsOpenModal(true);
                  setSelectedRange({ start, end });
                }}
                onClick={handleSelectEvent}
              />
              <DialogAnimate maxWidth="sm" open={isOpenModal} onClose={handleCloseModal}>
                <DialogTitle sx={{ px: 0 }}>Chi tiết</DialogTitle>
                <ResoDescriptions layout="row" datasource={data} columns={columns as any} />
                <DialogActions>
                  <Button
                    onClick={() => {
                      navigate(PATH_DASHBOARD.tradingReport.editById(data?.menu_id));
                    }}
                    startIcon={<Edit />}
                    size="small"
                    variant="contained"
                  >
                    Điều chỉnh
                  </Button>
                </DialogActions>
              </DialogAnimate>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormProvider {...filterForm}>
              <AutoCompleteStoreSelect name="store_id" label="Cửa hàng" />
            </FormProvider>
          </Grid>
        </Grid>
      </Card>
    </Page>
  );
}

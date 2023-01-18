import { EventClickArg, EventDropArg, EventHoveringArg, EventInput } from '@fullcalendar/react'; // => request placed at the top
import { EventResizeDoneArg } from '@fullcalendar/interaction';
import {
  Box,
  Card,
  CardContent,
  Chip,
  DialogTitle,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';
import { DialogAnimate } from 'components/animate';
// components
import Page from 'components/Page';
import { CalendarToolbar } from 'components/_dashboard/calendar';
import MappingStoreMenuForm from 'components/_dashboard/calendar/MappingStoreMenuForm';
import moment from 'moment';
import useLocales from 'hooks/useLocales';
import { useSnackbar } from 'notistack';
import { useMemo, useState } from 'react';
import { COLOR_OPTIONS } from 'redux/slices/calendar';
import { RootState, useSelector } from 'redux/store';
import Label from 'components/Label';
import { DAY_OF_WEEK } from 'constraints';
// @types
import MenuInStoreCalendar from 'components/MenuInStoreCalendar';
import { TStore, StoreInMenu } from 'types/store';
import { convertDateToStr } from 'utils/utils';
import { CalendarView } from '../../@types/calendar';
import { get } from 'lodash';

// ----------------------------------------------------------------------

const transformSIMtoEvent = (storeInMenus: StoreInMenu[] = []): EventInput[] =>
  storeInMenus.map((sInMenu) => ({
    id: sInMenu.menu_in_store_id.toString(),
    title: sInMenu.menu_name ?? `Thực đơn ${sInMenu.menu_id}`,
    // start: moment(sInMenu.time_range[0], 'HH:mm').toDate(),
    // end: moment(sInMenu.time_range[1], 'HH:mm').toDate(),
    startTime: moment(sInMenu.time_ranges[0], 'HH:mm').format('HH:mm:ss'),
    endTime: moment(sInMenu.time_ranges[1], 'HH:mm').format('HH:mm:ss'),
    daysOfWeek: sInMenu.day_filters,
    allDay:
      get(sInMenu.time_ranges, [0, 0]) === '00:00' && get(sInMenu.time_ranges, [0, 1]) === '24:00',
    textColor: COLOR_OPTIONS[(sInMenu.store?.id ?? 0) % COLOR_OPTIONS.length],
    groupId: `menu_${sInMenu.menu_in_store_id}`,
    ...sInMenu
  }));

export default function MenuOfStorePage() {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('lg'));
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();
  const { stores }: any = useSelector((state: RootState) => state.admin);

  const [view, setView] = useState<CalendarView>(isMobile ? 'listWeek' : 'timeGridWeek');
  const [date, setDate] = useState(new Date());

  const [appliedStores, setappliedStores] = useState<StoreInMenu[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedStoreInMenu, setselectedStoreInMenu] = useState<StoreInMenu | null>(null);
  const [filteredStores, setFilteredStores] = useState<TStore[]>(stores ?? []);
  const [selectedRange, setSelectedRange] = useState<any>(null);
  const [popoverStoreInMenu, setPopoverStoreInMenu] = useState<StoreInMenu | null>(null);

  const handleAddEvent = (storeData: Omit<StoreInMenu, 'menu_in_store_id'>) =>
    new Promise((res) => {
      setTimeout(() => {
        setappliedStores([
          ...appliedStores,
          { ...storeData, menu_in_store_id: appliedStores.length }
        ]);
        res([]);
      }, 1000);
    });

  const handleUpdateEvent = (updateData: StoreInMenu) =>
    new Promise((res) => {
      setTimeout(() => {
        const updateStores = [...appliedStores];

        const updateIdx = updateStores.findIndex(
          (s) => s.menu_in_store_id === updateData.menu_in_store_id
        );
        if (updateIdx !== -1) {
          updateStores[updateIdx] = updateData;
          setappliedStores(updateStores);
          setselectedStoreInMenu(null);
        }
        res(updateStores);
      }, 1000);
    });

  const handleResizeEvent = async ({ event }: EventResizeDoneArg) => {
    try {
      const mInStoreIdx = appliedStores.findIndex(
        ({ menu_in_store_id }) => menu_in_store_id === Number(event.id)
      );
      if (mInStoreIdx !== -1) {
        // update startTime, endTime, allDay, dayOfWeek
        const startTime = convertDateToStr(event.start, 'HH:mm');
        const endTime = convertDateToStr(event.end, 'HH:mm');

        const updateSInMens = [...appliedStores];
        updateSInMens[mInStoreIdx] = {
          ...updateSInMens[mInStoreIdx]
          // time_ranges: [startTime, endTime]
        };
        setappliedStores(updateSInMens);
        enqueueSnackbar('Update event success', {
          variant: 'success'
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDropEvent = async ({ event, ...args }: EventDropArg) => {
    try {
      const mInStoreIdx = appliedStores.findIndex(
        ({ menu_in_store_id }) => menu_in_store_id === Number(event.id)
      );
      if (mInStoreIdx !== -1) {
        // update startTime, endTime, allDay, dayOfWeek
        const startTime = convertDateToStr(event.start, 'HH:mm');
        const endTime = convertDateToStr(event.end, 'HH:mm');
        const daysOfWeek = [
          ...args.relatedEvents.map((eventApi) => eventApi.start?.getDay() ?? -1)
        ];
        if (event?.start) {
          daysOfWeek.push(event?.start?.getDay());
        }

        const updateSInMens = [...appliedStores];
        updateSInMens[mInStoreIdx] = {
          ...updateSInMens[mInStoreIdx],
          // time_ranges: [startTime, endTime],
          day_filters: daysOfWeek
        };
        setappliedStores(updateSInMens);
        enqueueSnackbar('Update event success', {
          variant: 'success'
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleMouseEnter = (info: EventHoveringArg) => {
    const mInStoreIdx = appliedStores.findIndex(
      ({ menu_in_store_id }) => menu_in_store_id === Number(info.event.id)
    );
    if (mInStoreIdx !== -1) {
      setPopoverStoreInMenu(appliedStores[mInStoreIdx]);
    }
  };

  const handleSelectEvent = (arg: EventClickArg) => {
    const sInMenuId = arg.event.id;

    const storeInMenuIdx = appliedStores.findIndex(
      ({ menu_in_store_id: id }) => id === Number(sInMenuId)
    );

    if (storeInMenuIdx !== -1) {
      setselectedStoreInMenu(appliedStores[storeInMenuIdx]);
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

  const filteredEvents = useMemo(() => {
    const viewMenuOfStores = appliedStores.filter(({ store }) =>
      filteredStores.some(({ id }) => id === store?.id.toString())
    );
    return transformSIMtoEvent(viewMenuOfStores);
  }, [appliedStores, filteredStores]);

  const handleDelete = (data: StoreInMenu) =>
    new Promise((res) => {
      setTimeout(() => {
        const updateData = appliedStores.filter(
          ({ menu_in_store_id }: StoreInMenu) => menu_in_store_id !== data.menu_in_store_id
        );
        setappliedStores(updateData);
        res(updateData);
      }, 1000);
    });

  const popoverContent = popoverStoreInMenu && (
    <>
      <CardContent>
        <Stack spacing={2}>
          <Box>
            <Typography variant="h5" component="div">
              {popoverStoreInMenu.menu_name}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1">{translate('pages.menus.table.timeRange')}</Typography>
            <Box>
              {translate('pages.menus.table.fromTime')}{' '}
              <Label color="success">{popoverStoreInMenu.time_ranges[0]}</Label>{' '}
              {translate('pages.menus.table.toTime')}{' '}
              <Label color="success">{popoverStoreInMenu.time_ranges[1]}</Label>
            </Box>
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
    <Page title="Calendar | Minimal-UI">
      <Card>
        <CalendarToolbar
          setOpenModel={() => setIsOpenModal(true)}
          date={date}
          view={view}
          onChangeView={handleChangeView}
        />
        <Box>
          <MenuInStoreCalendar
            popoverContent={popoverContent}
            events={filteredEvents}
            onMouseEnter={handleMouseEnter}
            initialDate={date}
            initialView={view}
            view={view}
            onSelectRange={(start: Date, end: Date) => {
              setIsOpenModal(true);
              setSelectedRange({ start, end });
            }}
            onDrop={handleDropEvent}
            onClick={handleSelectEvent}
            onEventResize={handleResizeEvent}
          />
          <DialogAnimate open={isOpenModal} onClose={handleCloseModal}>
            <DialogTitle>
              {selectedStoreInMenu
                ? translate('pages.stores.editMenuStore')
                : translate('pages.stores.applyMenuStore')}
            </DialogTitle>

            <MappingStoreMenuForm
              range={selectedRange}
              storeInMenu={selectedStoreInMenu}
              onCancel={handleCloseModal}
              onAddEvent={handleAddEvent}
              onUpdateEvent={handleUpdateEvent}
              onDelete={handleDelete}
              hideStoreField
            />
          </DialogAnimate>
        </Box>
      </Card>
    </Page>
  );
}

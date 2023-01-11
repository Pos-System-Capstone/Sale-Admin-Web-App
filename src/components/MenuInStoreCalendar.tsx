import FullCalendar, {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventDropArg,
  EventHoveringArg
} from '@fullcalendar/react'; // => request placed at the top
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { EventResizeDoneArg } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import { Popover, useMediaQuery } from '@mui/material';
import { CalendarStyle } from 'components/_dashboard/calendar';
import useLocales from 'hooks/useLocales';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { CalendarView } from '../@types/calendar';

const callback = (cb: any, ...args: object[]) => {
  if (typeof cb === 'function') {
    cb(...args);
  }
};

type Props = {
  onMouseEnter?: (event: EventHoveringArg) => void;
  onMouseLeave?: () => void;
  onDrop: (event: EventDropArg) => void;
  onClick: (event: EventClickArg) => void;
  onEventResize: (event: EventResizeDoneArg) => void;
  onSelectRange?: (start: Date, end: Date) => void;
  popoverContent?: React.ReactElement | null;
  view?: CalendarView;
};

const MenuInStoreCalendar: React.FC<Props & CalendarOptions> = ({
  events,
  onMouseEnter,
  onMouseLeave,
  onDrop,
  onClick,
  onEventResize,
  onSelectRange,
  popoverContent,
  view,
  ...props
}) => {
  const { translate } = useLocales();
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('lg'));
  const calendarRef = useRef<FullCalendar>(null);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const calendarApi = calendarRef.current;
    if (calendarApi) {
      const api = calendarApi.getApi();
      const newView = isMobile ? 'listWeek' : 'timeGridWeek';

      api.changeView(newView);
    }
  }, [isMobile]);
  useEffect(() => {
    const calendarApi = calendarRef.current;
    if (calendarApi && view) {
      const api = calendarApi.getApi();
      api.changeView(view);
    }
  }, [view]);

  const handlePopoverOpen = (event: EventHoveringArg) => {
    setAnchorEl(event.el);
    callback(onMouseEnter, event);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    callback(onMouseLeave);
  };

  const handleSelectRange = (arg: DateSelectArg) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.unselect();
    }
    callback(onSelectRange, arg.start, arg.end);
  };

  const settings: Partial<CalendarOptions> = {
    weekends: true,
    editable: true,
    droppable: true,
    selectable: true,
    rerenderDelay: 10,
    dayMaxEventRows: 3,
    eventDisplay: 'block',
    headerToolbar: false,
    allDayMaintainDuration: false,
    eventResizableFromStart: false,
    firstDay: 1,
    eventMaxStack: 2,
    height: isMobile ? 'auto' : 720,
    plugins: [listPlugin, dayGridPlugin, timelinePlugin, timeGridPlugin, interactionPlugin]
  };

  return (
    <CalendarStyle>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none'
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        {popoverContent}
      </Popover>
      <FullCalendar
        {...settings}
        eventMouseEnter={handlePopoverOpen}
        eventMouseLeave={handlePopoverClose}
        events={events}
        dayHeaderContent={(args) => moment(args.date).format('dddd')}
        ref={calendarRef}
        views={{
          timeGrid: {
            eventLimit: 2 // adjust to 6 only for timeGridWeek/timeGridDay
          }
        }}
        moreLinkContent={(args) => <>+{args.num} bảng giá</>}
        select={handleSelectRange}
        eventDrop={onDrop}
        eventClick={onClick}
        eventResize={onEventResize}
        {...props}
      />
    </CalendarStyle>
  );
};

export default MenuInStoreCalendar;

import { EventInput } from '@fullcalendar/common';
import { createSlice } from '@reduxjs/toolkit';
import { add, set, sub } from 'date-fns';
import faker from 'faker';
import { filter, map } from 'lodash';
//
import { CalendarState } from '../../@types/calendar';
// utils
import axios from '../../utils/axios';
import { dispatch } from '../store';

// ----------------------------------------------------------------------

export const COLOR_OPTIONS = [
  '#00AB55', // theme.palette.primary.main,
  '#1890FF', // theme.palette.info.main,
  '#94D82D', // theme.palette.success.main,
  '#FFC107', // theme.palette.warning.main,
  '#FF4842', // theme.palette.error.main
  '#04297A', // theme.palette.info.darker
  '#7A0C2E' // theme.palette.error.darker
];

const setColorAndTime = (index: number) => {
  if (index === 0)
    return {
      textColor: COLOR_OPTIONS[0],
      start: sub(new Date(), { days: 6, hours: 6, minutes: 30 }),
      end: sub(new Date(), { days: 6, hours: 4, minutes: 30 })
    };
  if (index === 1)
    return {
      textColor: COLOR_OPTIONS[1],
      start: add(new Date(), { days: 2, hours: 0, minutes: 0 }),
      end: add(new Date(), { days: 2, hours: 1, minutes: 0 })
    };
  if (index === 2)
    return {
      textColor: COLOR_OPTIONS[2],
      start: add(new Date(), { days: 6, hours: 0, minutes: 15 }),
      end: add(new Date(), { days: 6, hours: 0, minutes: 20 })
    };
  if (index === 3)
    return {
      textColor: COLOR_OPTIONS[5],
      start: sub(new Date(), { days: 12, hours: 0, minutes: 45 }),
      end: sub(new Date(), { days: 12, hours: 0, minutes: 30 })
    };
  if (index === 4)
    return {
      textColor: COLOR_OPTIONS[5],
      start: add(new Date(), { days: 2, hours: 2, minutes: 30 }),
      end: add(new Date(), { days: 2, hours: 3, minutes: 30 })
    };
  if (index === 5)
    return {
      textColor: COLOR_OPTIONS[4],
      start: sub(new Date(), { days: 3, hours: 3, minutes: 30 }),
      end: sub(new Date(), { days: 3, hours: 3, minutes: 20 })
    };
  if (index === 6)
    return {
      textColor: COLOR_OPTIONS[0],
      start: set(new Date(), { hours: 10, minutes: 30 }),
      end: set(new Date(), { hours: 13, minutes: 30 })
    };
  if (index === 7)
    return {
      textColor: COLOR_OPTIONS[3],
      start: add(new Date(), { days: 2, hours: 3, minutes: 30 }),
      end: add(new Date(), { days: 2, hours: 4, minutes: 30 })
    };
  return {
    textColor: COLOR_OPTIONS[2],
    start: add(new Date(), { days: 2, hours: 3, minutes: 45 }),
    end: add(new Date(), { days: 2, hours: 4, minutes: 50 })
  };
};

const events: EventInput[] = [...Array(9)].map((_, index) => ({
  id: faker.datatype.uuid(),
  title: faker.name.title(),
  description: faker.lorem.sentences(),
  allDay: faker.datatype.boolean(),
  ...setColorAndTime(index)
}));

const initialState: CalendarState = {
  isLoading: false,
  error: false,
  events,
  isOpenModal: false,
  selectedEventId: null,
  selectedRange: null
};

const slice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET EVENTS
    getEventsSuccess(state, action) {
      state.isLoading = false;
      state.events = action.payload;
    },

    // CREATE EVENT
    createEventSuccess(state, action) {
      const newEvent = action.payload;
      state.isLoading = false;
      state.events = [...state.events, newEvent];
    },

    // UPDATE EVENT
    updateEventSuccess(state, action) {
      const event = action.payload;
      const updateEvent = map(state.events, (_event) => {
        if (_event.id === event.id) {
          return event;
        }
        return _event;
      });

      state.isLoading = false;
      state.events = updateEvent;
    },

    // DELETE EVENT
    deleteEventSuccess(state, action) {
      const { eventId } = action.payload;
      const deleteEvent = filter(state.events, (user) => user.id !== eventId);
      state.events = deleteEvent;
    },

    // SELECT EVENT
    selectEvent(state, action) {
      const eventId = action.payload;
      state.isOpenModal = true;
      state.selectedEventId = eventId;
    },

    // SELECT RANGE
    selectRange(state, action) {
      const { start, end } = action.payload;
      state.isOpenModal = true;
      state.selectedRange = { start, end };
    },

    // OPEN MODAL
    openModal(state) {
      state.isOpenModal = true;
    },

    // CLOSE MODAL
    closeModal(state) {
      state.isOpenModal = false;
      state.selectedEventId = null;
      state.selectedRange = null;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { openModal, closeModal, selectEvent } = slice.actions;

// ----------------------------------------------------------------------

export function getEvents() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/calendar/events');
      dispatch(slice.actions.getEventsSuccess(response.data.events));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function createEvent(newEvent: Omit<EventInput, 'id'>) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      // const response = await axios.post('/api/calendar/events/new', newEvent);
      const { title, description, textColor, allDay, end, start } = newEvent;
      const event = {
        id: faker.datatype.uuid(),
        title,
        description,
        textColor,
        allDay,
        end,
        start
      };
      dispatch(slice.actions.createEventSuccess(event));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updateEvent(
  eventId: string,
  updateEvent: Partial<{
    allDay: boolean;
    start: Date | null;
    end: Date | null;
  }>
) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/calendar/events/update', {
        eventId,
        updateEvent
      });
      dispatch(slice.actions.updateEventSuccess(response.data.event));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function deleteEvent(eventId: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.post('/api/calendar/events/delete', { eventId });
      dispatch(slice.actions.deleteEventSuccess({ eventId }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function selectRange(start: Date, end: Date) {
  return async () => {
    dispatch(
      slice.actions.selectRange({
        start: start.getTime(),
        end: end.getTime()
      })
    );
  };
}

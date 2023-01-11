import { format, formatDistanceToNow } from 'date-fns';
import viLocale from 'date-fns/locale/vi';

// ----------------------------------------------------------------------

export function fDate(date: string | number | Date, formatStr: string = 'dd/MM/yyy') {
  return format(new Date(date), formatStr);
}

/**
 *
 * @param date
 * @returns yyyy/mm/dd
 */
export function formatDate(date: string | number | Date, formatStr: string = 'yyyy/MM/dd') {
  return format(new Date(date), formatStr);
}

export function fDateTime(date: string | number | Date) {
  return format(new Date(date), 'dd/MM/yyyy HH:mm');
}

export function fDateTimeSuffix(date: string | number | Date) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function fToNow(date: string | number | Date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true
  });
}
export function fToNowVN(date: string | number | Date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: viLocale
  });
}
export function fTime(date: string | number | Date) {
  return format(new Date(date), 'hh:mm:ss');
}
export function fmdatetime(date: string | number | Date) {
  return format(new Date(date), 'yyyy/mm/dd hh:mm:ss');
}

import { TTableColumn } from 'types/table';
import { fNumber } from 'utils/formatNumber';
import { fDate, fDateTime } from 'utils/formatTime';
import { formatCurrency } from 'utils/utils';

export const getCellValue = (cell: any, ...args: any[]) => {
  switch (typeof cell) {
    case 'string':
      return cell;
    case 'function':
      return cell(...args);
    default:
      return '-';
  }
};

export const removeEmptyField = (obj: any) =>
  Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null && v !== ''));

export const transformParamToHyphen = (params: any) => {
  const transformParams: any = {};

  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      const value = params[key];
      const transformKey = key.replaceAll('_', '-');
      transformParams[transformKey] = value;
    }
  }

  return removeEmptyField(transformParams);
};

export const renderText = (
  valueType: TTableColumn['valueType'],
  data: any,
  formatProps: any = {}
) => {
  switch (valueType) {
    case 'date':
      return fDate(data);
    case 'time':
      return fDate(data, 'HH:mm');
    case 'datetime':
      return fDateTime(data);
    case 'digit':
      return fNumber(data);
    case 'money':
      return formatCurrency(data);
    default:
      return data;
  }
};

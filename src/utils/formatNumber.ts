import { replace } from 'lodash';
import numeral from 'numeral';

// ----------------------------------------------------------------------

export function fCurrency(number: string | number) {
  return numeral(number).format(Number.isInteger(number) ? '$0,0' : '$0,0.00');
}

export function fCurrencyVN(number: string | number) {
  return numeral(number).format(Number.isInteger(number) ? '0,0đ' : '0,0.00đ');
}

export function fPercent(number: number) {
  let str = String(number);
  let rs = parseFloat(str.replace('e-11', ''));
  var s = Number(rs / 100).toLocaleString(undefined, {
    style: 'percent',
    minimumFractionDigits: 2
  });
  return s;
}

export function fNumber(number: string | number) {
  return numeral(number).format();
}

export function fShortenNumber(number: string | number) {
  return replace(numeral(number).format('0.00a'), '.00', '');
}

export function fData(number: string | number) {
  return numeral(number).format('0.0 b');
}

import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TextField } from '@mui/material';

type ReportDatePickerProps = {
  onChange: (date: Date | null) => void;
  value: Date | null;
  label?: string;
  disabled?: boolean;
};

const ReportDatePicker = ({ value, onChange, ...props }: ReportDatePickerProps) => {
  const { disabled, label } = props;
  return (
    <LocalizationProvider key="choose-day" dateAdapter={AdapterDateFns}>
      <DatePicker
        value={value}
        onChange={onChange}
        disableFuture
        inputFormat="dd/MM/yyyy"
        renderInput={(params) => <TextField {...params} />}
        label={label}
        disabled={disabled}
      />
    </LocalizationProvider>
  );
};

export default ReportDatePicker;

export const ReportMonthPicker = ({ value, onChange, ...props }: ReportDatePickerProps) => {
  const { disabled, label } = props;
  return (
    <LocalizationProvider key="choose-month" dateAdapter={AdapterDateFns}>
      <DatePicker
        disabled={disabled}
        views={['year', 'month']}
        label={label}
        value={value}
        disableFuture
        maxDate={new Date()}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} helperText={null} />}
      />
    </LocalizationProvider>
  );
};

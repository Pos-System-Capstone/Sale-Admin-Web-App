/* eslint-disable react/prop-types */
import { DatePicker } from '@mui/lab';
import { TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

const DatePickerField = ({ name, label, defaultValue = '', transform, ...props }: any) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <DatePicker
          label={label}
          renderInput={(params) => <TextField {...params} {...props} error={false} />}
          {...field}
          onChange={(e) => field.onChange(transform ? transform.output(e) : e)}
        />
      )}
      name={name}
    />
  );
};

export default DatePickerField;

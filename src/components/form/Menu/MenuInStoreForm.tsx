import { MobileTimePicker } from '@mui/lab';
import {
  Box,
  Button,
  Divider,
  FormLabel,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { DAY_OF_WEEK } from 'constraints';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { InputField, SelectField, SwitchField } from '..';
import DateRangePickerField from '../DateRangePickerField';
import { ErrorMessage } from '@hookform/error-message';
import AutoCompleteStoreSelect from '../common/AutocompleteStoreSelect/AutocompleteStoreSelect';

interface Props {}

const MenuInStoreForm = (props: Props) => {
  const {
    control,
    watch,
    formState: { errors }
  } = useFormContext();
  const isAllDay = watch('allDay');

  const { fields, append, remove } = useFieldArray({
    name: 'time_ranges',
    control
  });

  const renderTimeRangeForm = () => (
    <Grid item xs={12}>
      {fields.map(({ id }, optIndex) => (
        <>
          <Box key={`variant-${id}`}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Controller
                control={control}
                name={`time_ranges[${optIndex}].from`}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState,
                  formState
                }) => (
                  <MobileTimePicker
                    label="Bắt đầu"
                    ampm={false}
                    inputFormat="HH:mm"
                    minutesStep={30}
                    renderInput={(params) => (
                      <TextField
                        size="small"
                        {...params}
                        error={Boolean(fieldState.error)}
                        helperText={fieldState.error && fieldState.error.message}
                        fullWidth
                      />
                    )}
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
              <Controller
                control={control}
                name={`time_ranges[${optIndex}].to`}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState,
                  formState
                }) => (
                  <MobileTimePicker
                    label="Kết thúc"
                    ampm={false}
                    inputFormat="HH:mm"
                    minutesStep={30}
                    renderInput={(params) => (
                      <TextField
                        error={Boolean(fieldState.error)}
                        helperText={fieldState.error && fieldState.error.message}
                        size="small"
                        {...params}
                        fullWidth
                      />
                    )}
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
              <IconButton
                onClick={() => remove(optIndex)}
                size="small"
                aria-label="delete"
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          </Box>
          <Divider sx={{ my: 1 }} />
        </>
      ))}
      <span>
        <Button onClick={() => append({ from: null, to: null })} variant="outlined">
          Thêm khung giờ
        </Button>
      </span>
    </Grid>
  );

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <AutoCompleteStoreSelect name="store_id" label="Cửa hàng" />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField type="number" size="small" fullWidth name="priority" label="Cấp độ ưu tiên" />
        </Grid>

        <Grid item xs={12} md={12}>
          <DateRangePickerField name="start_end_time" label="Thời gian hiệu lực" />
        </Grid>
        <Grid item xs={12}>
          <SelectField
            fullWidth
            options={DAY_OF_WEEK}
            name="day_filters"
            multiple
            label="Ngày hiệu lực"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <FormLabel>Khung giờ</FormLabel>
          </Box>
          <SwitchField name="allDay" label="Cả ngày" fullWidth />
          <Box>
            <ErrorMessage
              errors={errors}
              name="time_ranges"
              render={({ message }) => (
                <Typography color="red" variant="caption">
                  {message}
                </Typography>
              )}
            />
          </Box>
        </Grid>
        {!isAllDay && renderTimeRangeForm()}
      </Grid>
    </div>
  );
};

export default MenuInStoreForm;

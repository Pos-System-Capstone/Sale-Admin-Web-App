import { MobileTimePicker } from '@mui/lab';
import { Box, FormLabel, Grid, Stack, TextField, Typography } from '@mui/material';
import { DatePickerField, InputField } from 'components/form';
import { Controller, useFormContext } from 'react-hook-form';

interface Props {
  isUpdateMenu?: boolean;
}

const SessionForm = ({ isUpdateMenu }: Props) => {
  const { control, watch } = useFormContext();

  const renderTimeRangeForm = () => (
    <Grid item xs={12}>
      <FormLabel component="p" title="Khung giờ" />
      <>
        <Box key={'time-ranges'}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Controller
              control={control}
              name={'startTime'}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState,
                formState
              }) => (
                <MobileTimePicker
                  label="Bắt đầu"
                  ampm={false}
                  inputFormat="HH:mm"
                  // minutesStep={30}
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
              name={'endTime'}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState,
                formState
              }) => (
                <MobileTimePicker
                  label="Kết thúc"
                  ampm={false}
                  inputFormat="HH:mm"
                  // minutesStep={30}
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
          </Stack>
        </Box>
      </>
    </Grid>
  );

  return (
    <div>
      <Grid container spacing={2}>
        {/* {!hasBaseMenu?.hasBaseMenu && (
          <Grid item xs={12}>
            <CheckBoxField
              size="small"
              fullWidth
              name="isBaseMenu"
              label="Áp dụng toàn hệ thống"
              value="true"
            />
          </Grid>
        )} */}
        <Grid item xs={12} md={12}>
          <InputField size="small" fullWidth name="name" label="Tên Ca" />
          <Typography color="red" variant="caption">
            Nếu để trống, tên ca sẽ là Ca:(Thời gian bắt đầu)-(Thời gian kết thúc)
          </Typography>
        </Grid>
        {renderTimeRangeForm()}
        <Grid item xs={12}>
          <Stack direction="row" spacing={1}>
            <DatePickerField name="dateFrom" label="Từ ngày" />
            <DatePickerField name="dateTo" label="Đến ngày" />
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};

export default SessionForm;

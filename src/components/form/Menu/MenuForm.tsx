import { ErrorMessage } from '@hookform/error-message';
import { MobileTimePicker } from '@mui/lab';
import { Box, Divider, FormLabel, Grid, Stack, TextField, Typography } from '@mui/material';
import { DAY_OF_WEEK_CONFIG_VALUE_BY_BIT } from 'constraints';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { CheckBoxField, InputField, SelectField, SwitchField } from '..';

interface Props {}

const MenuForm = (props: Props) => {
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

  const isBaseMenu = watch('isBaseMenu');

  // const renderTimeRangeForm = () => (
  //   <Grid item xs={12}>
  //     <FormLabel component="p" title="Khung giờ" />
  //     {fields.map(({ id }, optIndex) => (
  //       <>
  //         <Box key={`variant-${id}`}>
  //           <Stack direction="row" spacing={1} alignItems="center">
  //             <Controller
  //               control={control}
  //               name={`time_ranges[${optIndex}].from`}
  //               render={({
  //                 field: { onChange, onBlur, value, name, ref },
  //                 fieldState,
  //                 formState
  //               }) => (
  //                 <MobileTimePicker
  //                   label="Bắt đầu"
  //                   ampm={false}
  //                   inputFormat="HH:mm"
  //                   minutesStep={30}
  //                   renderInput={(params) => (
  //                     <TextField
  //                       size="small"
  //                       {...params}
  //                       error={Boolean(fieldState.error)}
  //                       helperText={fieldState.error && fieldState.error.message}
  //                       fullWidth
  //                     />
  //                   )}
  //                   onChange={onChange}
  //                   value={value}
  //                 />
  //               )}
  //             />
  //             <Controller
  //               control={control}
  //               name={`time_ranges[${optIndex}].to`}
  //               render={({
  //                 field: { onChange, onBlur, value, name, ref },
  //                 fieldState,
  //                 formState
  //               }) => (
  //                 <MobileTimePicker
  //                   label="Kết thúc"
  //                   ampm={false}
  //                   inputFormat="HH:mm"
  //                   minutesStep={30}
  //                   renderInput={(params) => (
  //                     <TextField
  //                       error={Boolean(fieldState.error)}
  //                       helperText={fieldState.error && fieldState.error.message}
  //                       size="small"
  //                       {...params}
  //                       fullWidth
  //                     />
  //                   )}
  //                   onChange={onChange}
  //                   value={value}
  //                 />
  //               )}
  //             />
  //             <IconButton
  //               onClick={() => remove(optIndex)}
  //               size="small"
  //               aria-label="delete"
  //               color="error"
  //             >
  //               <DeleteIcon />
  //             </IconButton>
  //           </Stack>
  //         </Box>
  //         <Divider sx={{ my: 1 }} />
  //       </>
  //     ))}
  //     <span>
  //       <Button onClick={() => append({ from: null, to: null })} variant="outlined">
  //         Thêm khung giờ
  //       </Button>
  //     </span>
  //   </Grid>
  // );

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
        <Divider sx={{ my: 1 }} />
      </>
    </Grid>
  );

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CheckBoxField
            size="small"
            fullWidth
            name="isBaseMenu"
            label="Áp dụng toàn hệ thống"
            value="true"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField size="small" fullWidth name="code" label="Mã menu" />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            size="small"
            type="number"
            fullWidth
            name="priority"
            disabled={isBaseMenu}
            defaultValue="0"
            label="Cấp độ ưu tiên"
          />
          <Typography color="red" variant="caption">
            {isBaseMenu
              ? 'Menu toàn hệ thống có ưu tiên là 0'
              : 'Ưu tiên rất quan trọng, chú ý nhập đúng!'}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <SelectField
            fullWidth
            options={DAY_OF_WEEK_CONFIG_VALUE_BY_BIT}
            name="dayFilter"
            multiple
            label="Ngày áp dụng menu"
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

        {/* <Grid item xs={12} md={12}>
          <DateRangePickerField name="start_end_time" label="Thời gian hiệu lực" />
        </Grid> */}
      </Grid>
    </div>
  );
};

export default MenuForm;

import { ErrorMessage } from '@hookform/error-message';
import { HelpOutline } from '@mui/icons-material';
import { MobileTimePicker } from '@mui/lab';
import {
  Box,
  FormLabel,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import brandApi from 'api/brand';
import { DAY_OF_WEEK_CONFIG_VALUE_BY_BIT } from 'constraints';
import useAuth from 'hooks/useAuth';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useQuery } from 'react-query';
import { CheckBoxField, InputField, SelectField, SwitchField } from '..';

interface Props {
  isUpdateMenu?: boolean;
}

const MenuForm = ({ isUpdateMenu }: Props) => {
  const { user } = useAuth();
  const {
    control,
    watch,
    formState: { errors }
  } = useFormContext();
  const isAllDay = watch('allDay');
  const baseMenu = watch('isBaseMenu');

  const [isBaseMenu, setIsBaseMenu] = useState(baseMenu);

  const { data: hasBaseMenu } = useQuery(
    ['hasBaseMenu'],
    () => brandApi.checkBrandHasBaseMenu(user?.brandId).then((res) => res.data),
    {
      enabled: Boolean(user?.brandId)
    }
  );
  // const { fields, append, remove } = useFieldArray({
  //   name: 'time_ranges',
  //   control
  // });

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
        {!hasBaseMenu?.hasBaseMenu && (
          <Grid item xs={12}>
            <CheckBoxField
              size="small"
              fullWidth
              name="isBaseMenu"
              label="Áp dụng toàn hệ thống"
              value="true"
            />
          </Grid>
        )}
        {!isUpdateMenu && hasBaseMenu?.hasBaseMenu && (
          <Grid item xs={12}>
            <CheckBoxField
              size="small"
              fullWidth
              name="isUseBaseMenu"
              label="Sử dụng các phẩm có sẵn trong menu của nhãn hàng"
              value="true"
            />
            <Tooltip title="Áp dụng danh sách những sản phẩm trong menu của toàn hệ thống khi tạo mới menu">
              <IconButton size="small" color="inherit">
                <HelpOutline fontSize="small" />
              </IconButton>
            </Tooltip>
          </Grid>
        )}
        {!isUpdateMenu && (
          <Grid item xs={12} md={6}>
            <InputField size="small" fullWidth name="code" label="Mã menu" />
          </Grid>
        )}
        <Grid item xs={12} md={isUpdateMenu ? 12 : 6}>
          <InputField
            size="small"
            fullWidth
            name="priority"
            disabled={watch('isBaseMenu')}
            label="Cấp độ ưu tiên"
          />
          <Typography color="red" variant="caption">
            {watch('isBaseMenu')
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

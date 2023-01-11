import trash2Fill from '@iconify/icons-eva/trash-2-fill';
import { Icon } from '@iconify/react';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip
} from '@mui/material';
import { MobileTimePicker } from '@mui/lab';
import { InputField, SelectField, SwitchField } from 'components/form';
import { DAY_OF_WEEK } from 'constraints';
import useLocales from 'hooks/useLocales';
import { get } from 'lodash';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { convertDateToStr, convertStrToDate } from 'utils/utils';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// redux
import { RootState, useDispatch } from 'redux/store';
import { StoreInMenu } from 'types/store';
import { TStoreApplyMenuRequest } from 'types/menu';

// ----------------------------------------------------------------------

const getInitialValues = (
  data: StoreInMenu | null,
  range?: {
    start: Date;
    end: Date;
  } | null
): any => {
  // eslint-disable-next-line no-underscore-dangle
  const initState = {
    id: get(data, ['store', 'id'], ''),
    start: range
      ? new Date(range.start)
      : convertStrToDate(get(data, ['time_range', 0], moment().format('HH:mm')), 'HH:mm'),
    end: range
      ? new Date(range.end)
      : convertStrToDate(get(data, ['time_range', 1], moment().format('HH:mm')), 'HH:mm'),
    day_filters: get(data, ['day_filters'], []),
    // allDay: data?.time_ranges[0] === '00:00' && data?.time_ranges[1] === '24:00',
    menu_id: get(data, ['menu_id'])
  };

  return initState;
};

// ----------------------------------------------------------------------

type StoreInMenuFormProps = {
  onCancel: VoidFunction;
  range?: {
    start: Date;
    end: Date;
  } | null;
  storeInMenu: StoreInMenu | null;
  onAddEvent?: (data: any) => Promise<any>;
  onUpdateEvent?: (data: any) => Promise<any>;
  onDelete?: (data: any) => Promise<any>;
};

const schema = (translate: any) =>
  yup.object({
    // menu_id: yup
    //   .number()
    //   .typeError(translate('common.required', { name: translate('pages.stores.storeMenu') }))
    //   .required(translate('common.required', { name: translate('pages.stores.storeMenu') })),
    dayFilters: yup.array().min(1, translate('common.atLeast', { number: 1 })),
    start: yup
      .date()
      .required(translate('common.required', { name: translate('pages.menus.table.timeRange') })),
    end: yup
      .date()
      .required(translate('common.required', { name: translate('pages.menus.table.timeRange') }))
  });

export default function StoreInMenuForm({
  onCancel,
  onAddEvent,
  onUpdateEvent,
  onDelete,
  storeInMenu,
  range
}: StoreInMenuFormProps) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { translate } = useLocales();
  const { stores }: any = useSelector((state: RootState) => state.admin);

  const isCreating = !storeInMenu;

  const form = useForm({
    defaultValues: getInitialValues(storeInMenu, range),
    resolver: yupResolver(schema(translate))
  });

  const onSubmit = async (values: any) => {
    try {
      if (!isCreating) {
        const _storeInMenuData: Partial<TStoreApplyMenuRequest> = {
          day_filters: values.day_filters,
          store_id: values.id,
          time_range: [
            values.allDay ? '00:00' : convertDateToStr(values.start, 'HH:mm'),
            values.allDay ? '24:00' : convertDateToStr(values.end, 'HH:mm')
          ]
        };
        if (onUpdateEvent) {
          await onUpdateEvent(_storeInMenuData);
          enqueueSnackbar('Updated menu success', { variant: 'success' });
        }
      } else {
        const _storeInMenuData: Partial<TStoreApplyMenuRequest> = {
          day_filters: values.day_filters,
          store_id: values.id,
          time_range: [
            values.allDay ? '00:00' : convertDateToStr(values.start, 'HH:mm'),
            values.allDay ? '24:00' : convertDateToStr(values.end, 'HH:mm')
          ]
        };
        if (onAddEvent) {
          await onAddEvent(_storeInMenuData);
          enqueueSnackbar('Applied store to menu', { variant: 'success' });
        }
      }
      onCancel();
    } catch (error) {
      console.log(error);
      enqueueSnackbar(get(error, 'message', 'Some thing wrong'), {
        variant: 'error'
      });
    }
  };

  const { control, handleSubmit, setValue } = form;

  const handleDelete = async () => {
    if (!storeInMenu?.menu_in_store_id) return;
    try {
      if (!onDelete) return;
      await onDelete(storeInMenu);
      onCancel();
      enqueueSnackbar('Delete event success', { variant: 'success' });
    } catch (error) {
      console.error(error);
    }
  };

  // const isDateError = isBefore(new Date(values.end), new Date(values.start));

  return (
    <FormProvider {...form}>
      <DialogContent sx={{ pb: 0, mt: 2, overflowY: 'unset' }}>
        <Stack spacing={2}>
          <SelectField
            onChange={(e: any) => {
              setValue('id', e.target.value);
            }}
            fullWidth
            name="id"
            label="Chọn cửa hàng"
            defaultValue=""
            size="small"
          >
            {stores?.map(({ id, name }: any) => (
              <MenuItem value={Number(id)} key={`cate_select_${id}`}>
                {name}
              </MenuItem>
            ))}
          </SelectField>

          <InputField hidden name="store_name" sx={{ display: 'none' }} />
          <SwitchField name="allDay" label="Cả ngày" fullWidth />

          <Controller
            control={control}
            name="start"
            render={({ field: { onChange, onBlur, value, name, ref }, fieldState, formState }) => (
              <MobileTimePicker
                label="Bắt đầu"
                ampm={false}
                inputFormat="HH:mm"
                renderInput={(params) => <TextField {...params} fullWidth sx={{ mb: 3 }} />}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="end"
            render={({ field: { onChange, onBlur, value, name, ref }, fieldState, formState }) => (
              <MobileTimePicker
                label="Kết thúc"
                ampm={false}
                inputFormat="HH:mm"
                renderInput={(params) => <TextField {...params} fullWidth sx={{ mb: 3 }} />}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <SelectField
            options={DAY_OF_WEEK}
            fullWidth
            name="day_filters"
            multiple
            label="Ngày hiệu lực"
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        {!isCreating && (
          <Tooltip title="Delete Event">
            <IconButton onClick={handleDelete} size="large">
              <Icon icon={trash2Fill} width={20} height={20} />
            </IconButton>
          </Tooltip>
        )}
        <Box sx={{ flexGrow: 1 }} />
        <Button type="button" variant="outlined" color="inherit" onClick={onCancel}>
          {translate('common.cancel')}
        </Button>
        <Button
          onClick={() => handleSubmit(onSubmit, console.log)()}
          type="submit"
          variant="contained"
        >
          {isCreating ? translate('common.create') : translate('common.update')}
        </Button>
      </DialogActions>
    </FormProvider>
  );
}

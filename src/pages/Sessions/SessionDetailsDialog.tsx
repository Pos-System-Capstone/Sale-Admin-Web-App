import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
import { MobileTimePicker } from '@mui/lab';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormLabel,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import storeApi from 'api/store';
import EmptyContent from 'components/EmptyContent';

import { DatePickerField, InputField } from 'components/form';
import useAuth from 'hooks/useAuth';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { TSessionDetailUpdate } from 'types/store';

type Props = {
  open: boolean;
  onClose: VoidFunction;
  sessionId?: string | null;
};

const SessionDetailDialog: React.FC<Props> = ({ open, onClose, sessionId }) => {
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { data: session, isLoading } = useQuery(
    ['orders', sessionId],
    () => storeApi.getStoreSessionDetail(user?.storeId, sessionId!).then((res) => res.data),
    {
      enabled: Boolean(sessionId)
    }
  );
  const updateSessionForm = useForm({
    shouldUnregister: true,
    defaultValues: {
      name: session?.name,
      startTime: session?.startDateTime,
      endTime: session?.endDateTime,
      date: moment(session?.endDateTime).format('YYYY-MM-DD'),
      initCashInVault: session?.initCashInVault
    }
  });
  useEffect(() => {
    updateSessionForm.reset({
      name: session?.name,
      startTime: session?.startDateTime,
      endTime: session?.endDateTime,
      date: moment(session?.endDateTime).format('YYYY-MM-DD'),
      initCashInVault: session?.initCashInVault
    });
    console.log('session', updateSessionForm.getValues());
  }, [session, updateSessionForm]);

  const handleProcessUpdateSessionsRequest = (data: any) => {
    const { name, startTime, endTime, date, initCashInVault } = data;

    console.log('name', name);
    console.log('startTime', moment(startTime).format('HH:mm:ss'));
    console.log('endTime', moment(endTime).format('HH:mm:ss'));

    const request: TSessionDetailUpdate = {
      name: name,
      startTime: `${moment(date).format('YYYY-MM-DD')}T${moment(startTime).format('HH:mm:ss')}`,
      endTime: `${moment(date).format('YYYY-MM-DD')}T${moment(endTime).format('HH:mm:ss')}`,
      initCashInVault: initCashInVault
    };
    console.log('request', request);
    return request;
  };

  return (
    <Dialog maxWidth="sm" scroll="paper" open={open} onClose={onClose}>
      {isLoading ? (
        <CircularProgress />
      ) : !session ? (
        <EmptyContent title="Không tìm thấy đơn hàng" />
      ) : (
        <>
          <DialogTitle
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Typography variant="h4">Chi tiết ca làm việc</Typography>
            <IconButton aria-label="close" onClick={onClose} size="large">
              <Icon icon={closeFill} />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <FormProvider {...updateSessionForm}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  <InputField size="small" fullWidth name="name" label="Tên Ca" />
                  <Typography color="red" variant="caption">
                    Nếu để trống, tên ca sẽ là Ca:(Thời gian bắt đầu)-(Thời gian kết thúc)
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <InputField
                    size="small"
                    fullWidth
                    name="initCashInVault"
                    label="Số tiền đầu ca(VND)"
                    type="number"
                    inputProps={{ min: 0, type: 'number' }}
                  />
                  <Typography color="red" variant="caption">
                    Số tiền có sẵn trong két lúc bắt đầu ca
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <FormLabel component="p" title="Khung giờ" />

                  <Box key={'time-ranges'}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Controller
                        control={updateSessionForm.control}
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
                              />
                            )}
                            onChange={onChange}
                            value={value}
                          />
                        )}
                      />
                      <Controller
                        control={updateSessionForm.control}
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
                              />
                            )}
                            onChange={onChange}
                            value={value}
                          />
                        )}
                      />
                      <DatePickerField size="small" name="date" label="Ngày" fullWidth />
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </FormProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Đóng</Button>
            <Button
              color="primary"
              variant="contained"
              onClick={async () => {
                return storeApi
                  .updateStoreSessionDetail(
                    user!.storeId,
                    sessionId!,
                    handleProcessUpdateSessionsRequest(updateSessionForm.getValues())
                  )
                  .then((res) => {
                    enqueueSnackbar('Cập nhật thành công', {
                      variant: 'success'
                    });
                    onClose();
                    return true;
                  })
                  .catch((err) => {
                    enqueueSnackbar('Cập nhật thất bại', {
                      variant: 'error'
                    });
                    return false;
                  });
              }}
            >
              Cập nhật
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default SessionDetailDialog;

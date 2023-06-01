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
import ResoDescriptions, { ResoDescriptionColumnType } from 'components/ResoDescriptions';

import { DatePickerField, InputField } from 'components/form';
import useAuth from 'hooks/useAuth';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { SessionReport, TSession, TSessionDetailUpdate } from 'types/store';

type Props = {
  open: boolean;
  onClose: VoidFunction;
  session?: TSession;
};

const SessionDetailDialog: React.FC<Props> = ({ open, onClose, session }) => {
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { data: sessionReport, isLoading } = useQuery(
    ['orders', session?.id],
    () => storeApi.getStoreSessionReport(session?.id!).then((res) => res.data),
    {
      enabled: Boolean(session?.id)
    }
  );
  const updateSessionForm = useForm({
    shouldUnregister: true,
    defaultValues: {
      name: session?.name,
      startTime: session?.startDateTime,
      endTime: session?.endDateTime,
      date: moment(session?.endDateTime).format('YYYY-MM-DD')
    }
  });
  useEffect(() => {
    updateSessionForm.reset({
      name: session?.name,
      startTime: session?.startDateTime,
      endTime: session?.endDateTime
    });
  }, [session, updateSessionForm]);
  const brandDetailColumns: ResoDescriptionColumnType<SessionReport>[] = [
    {
      title: 'Doanh thu trước khuyến mãi',
      dataIndex: 'totalAmount'
    },
    {
      title: 'Khuyến mãi',
      dataIndex: 'totalDiscount'
    },
    {
      title: 'Doanh thu sau khuyến mãi',
      dataIndex: 'finalAmount'
    },
    {
      title: 'Tổng đơn hàng',
      dataIndex: 'totalOrder'
    },
    {
      title: 'Tổng đơn tiền mặt',
      dataIndex: 'totalCash'
    },
    {
      title: 'Doanh thu tiền mặt',
      dataIndex: 'cashAmount'
    },
    {
      title: 'Tổng đơn chuyển khoản',
      dataIndex: 'totalBanking'
    },
    {
      title: 'Doanh thu chuyển khoản',
      dataIndex: 'bankingAmount'
    },
    {
      title: 'Tổng đơn Momo',
      dataIndex: 'totalMomo'
    },
    {
      title: 'Doanh thu Momo',
      dataIndex: 'momoAmount'
    },
    {
      title: 'Tổng đơn Visa',
      dataIndex: 'totalVisa'
    },
    {
      title: 'Doanh thu Visa',
      dataIndex: 'visaAmount'
    }
  ];
  const handleProcessUpdateSessionsRequest = (data: any) => {
    const { name, startTime, endTime, date, initCashInVault } = data;

    const request: TSessionDetailUpdate = {
      name: name,
      startTime: `${moment(date).format('YYYY-MM-DD')}T${moment(startTime).format('HH:mm:ss')}`,
      endTime: `${moment(date).format('YYYY-MM-DD')}T${moment(endTime).format('HH:mm:ss')}`
    };
    return request;
  };

  return (
    <Dialog maxWidth="md" scroll="paper" open={open} onClose={onClose}>
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
            <ResoDescriptions
              labelProps={{ fontWeight: 'bold' }}
              columns={brandDetailColumns as any}
              datasource={sessionReport}
              column={2}
            />
            <Box sx={{ mt: 2 }} />
            <FormProvider {...updateSessionForm}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <InputField size="small" fullWidth name="name" label="Tên Ca" />
                  <Typography color="red" variant="caption">
                    Nếu để trống, tên ca sẽ là Ca:(Thời gian bắt đầu)-(Thời gian kết thúc)
                  </Typography>
                </Grid>
                {/* <Grid item xs={12} md={4}>
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
                </Grid> */}
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
                    session.id!,
                    handleProcessUpdateSessionsRequest(updateSessionForm.getValues())
                  )
                  .then((res) => {
                    onClose();
                    enqueueSnackbar('Cập nhật thành công', {
                      variant: 'success'
                    });
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

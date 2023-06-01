/* eslint-disable camelcase */
import plusFill from '@iconify/icons-eva/plus-fill';
// material
import { Button, Card, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import storeApi from 'api/store';
import ModalForm from 'components/ModalForm/ModalForm';
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import useAuth from 'hooks/useAuth';

import { useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
// components
import { useNavigate } from 'react-router-dom';
import { TSession, TSessionCreate } from 'types/store';
import { TTableColumn } from 'types/table';
import SessionForm from './CreateNewSessions';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import moment from 'moment';
import { Visibility } from '@mui/icons-material';
import SessionDetailDialog from './SessionDetailsDialog';

const SessionListPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const tableRef = useRef<any>();
  const { enqueueSnackbar } = useSnackbar();

  const [selectSession, setSelectSession] = useState<TSession | null>(null);

  const orderColumns: TTableColumn<TSession>[] = [
    {
      title: 'STT',
      dataIndex: 'index',
      hideInSearch: true
    },
    {
      title: 'Tên ca',
      dataIndex: 'name',
      hideInSearch: true
    },
    {
      title: 'Bắt đầu',
      dataIndex: 'startDateTime',
      valueType: 'datetime',
      hideInSearch: true
    },
    {
      title: 'Kết thúc',
      dataIndex: 'endDateTime',
      valueType: 'datetime',
      hideInSearch: true
    },
    // {
    //   title: 'Số đơn',
    //   dataIndex: 'numberOfOrders',
    //   hideInSearch: true
    // },
    // {
    //   title: 'Tổng tiền',
    //   dataIndex: 'totalFinalAmount',
    //   hideInSearch: true,
    //   valueType: 'money'
    // },
    // {
    //   title: 'Tổng tiền trong két',
    //   dataIndex: 'currentCashInVault',
    //   valueType: 'money',
    //   hideInSearch: true
    // },
    {
      title: 'Chi tiết',
      fixed: 'right',
      hideInSearch: true,
      render: (_: any, session: TSession) => (
        <Tooltip title="Chi tiết">
          <IconButton onClick={() => setSelectSession(session)} size="large">
            <Visibility />
          </IconButton>
        </Tooltip>
      )
    }
  ];
  const createSessionsForm = useForm({
    // resolver: yupResolver(menuSchema),
    shouldUnregister: true
  });
  var getDaysArray = function (s: any, e: any) {
    for (var a = [], d = new Date(s); d <= new Date(e); d.setDate(d.getDate() + 1)) {
      a.push(moment(d).format('YYYY-MM-DD'));
    }
    return a;
  };
  const handleProcessCreateSessionsRequest = (data: any) => {
    const { name, startTime, endTime, dateFrom, dateTo } = data;
    moment(dateFrom).format('YYYY-MM-DD');
    moment(dateTo).format('YYYY-MM-DD');
    var daylist = getDaysArray(dateFrom, dateTo);

    const request: TSessionCreate[] = [];
    daylist.forEach((day) => {
      return request.push({
        name,
        startTime: `${day}T${moment(startTime).format('HH:mm:ss')}`,
        endTime: `${day}T${moment(endTime).format('HH:mm:ss')}`
      });
    });
    const createSessionsRequest: any = {
      sessions: request
    };
    return createSessionsRequest;
  };

  return (
    <Page
      title="Danh sách ca làm việc"
      actions={() => [
        <ModalForm
          key="create-session"
          onOk={async () => {
            return storeApi
              .createStoreSessions(
                user!.storeId,
                handleProcessCreateSessionsRequest(createSessionsForm.getValues())
              )
              .then((res) => {
                tableRef.current?.reload();
                enqueueSnackbar('Tạo ca thành công', {
                  variant: 'success'
                });

                return true;
              })
              .catch((err) => {
                enqueueSnackbar('Lỗi tạo ca thất bại', {
                  variant: 'error'
                });
                return false;
              });
          }}
          title={<Typography variant="h4">Thêm ca làm việc</Typography>}
          trigger={
            <Button variant="contained" startIcon={<Icon icon={plusFill} />}>
              Tạo ca làm việc mới
            </Button>
          }
        >
          <FormProvider {...createSessionsForm}>
            <SessionForm />
          </FormProvider>
        </ModalForm>
      ]}
    >
      <SessionDetailDialog
        session={selectSession!}
        open={Boolean(selectSession)}
        onClose={() => {
          tableRef.current?.reload();
          setSelectSession(null);
        }}
      />
      <Card>
        <Stack spacing={2}>
          <ResoTable
            ref={tableRef}
            showAction={false}
            rowKey="id"
            getData={(params: any) => {
              return storeApi.getStoreSessions(user?.storeId || '', params);
            }}
            columns={orderColumns}
          />
        </Stack>
      </Card>
    </Page>
  );
};

export default SessionListPage;

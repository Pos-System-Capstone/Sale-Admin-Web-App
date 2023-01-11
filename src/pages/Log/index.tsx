/* eslint-disable camelcase */
// material
import { Visibility } from '@mui/icons-material';
import { DateRangePicker } from '@mui/lab';
import { IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
//
import useLocales from 'hooks/useLocales';
import moment from 'moment';
import ReportPage from 'pages/report/components/ReportPage';
import { useEffect, useRef, useState } from 'react';
import { TLog } from 'types/log';
import { TTableColumn } from 'types/table';
import { fDateTime, formatDate } from 'utils/formatTime';
import LogDetailDialog from './components/LogDetailDialog';
const LogSale = () => {
  const [detailLog, setDetailLog] = useState<any>(null);
  const ref = useRef<any>();
  const today = new Date();
  const [dateRange, setDateRange] = useState<any>([null, today]);
  const { translate } = useLocales();

  useEffect(() => {
    if (ref.current) {
      ref.current.formControl.setValue('FromDate', formatDate(dateRange[0]!));
      ref.current.formControl.setValue('ToDate', formatDate(dateRange[1]!));
    }
  }, [dateRange]);

  const logColumns: TTableColumn<TLog>[] = [
    {
      title: 'STT',
      dataIndex: 'index',
      hideInSearch: true,
      sortable: false
    },
    {
      title: 'Content',
      dataIndex: 'content',
      render: (value: any) => {
        return (
          <Typography
            height={'70px'}
            variant={'body1'}
            sx={{
              overflowY: 'auto',
              wordBreak: 'break-all'
            }}
          >
            {value}
          </Typography>
        );
      },
      sortable: false
    },
    {
      title: 'Content',
      dataIndex: 'content',
      hideInTable: true,
      valueType: 'select',
      valueEnum: [
        {
          label: 'Tạo đơn từ Momo',
          value: 'POST https api-product.reso.vn/api/v1/partners/orders'
        },
        {
          label: 'Update Payment Status từ Momo',
          value: 'PUT https api-product.reso.vn/api/v1/partners/MOMO/payments'
        },
        {
          label: 'Update Momo order status (POS)',
          value: 'https://business.momo.vn/api/order-and-delivery/hooks/orders/v1/status'
        },
        {
          label: 'Update MOmo orderstatus (Admin)',
          value: '[UpdateMomoStatus]'
        }
      ],
      sortable: false
    },
    {
      title: 'StoreId',
      dataIndex: 'store_id',
      hideInSearch: true,
      sortable: false
    },
    {
      title: 'CreatedDate',
      dataIndex: 'created_date',
      hideInSearch: true,
      render: (value) => fDateTime(value),
      sortable: false
    },
    {
      title: 'Detail',
      fixed: 'right',
      hideInSearch: true,
      render: (_: any, content: TLog) => (
        <Tooltip title="Chi tiết">
          <IconButton
            onClick={() =>
              setDetailLog({
                content: content.content,
                created_date: content.created_date,
                store_id: content.store_id
              })
            }
            size="large"
          >
            <Visibility />
          </IconButton>
        </Tooltip>
      ),
      sortable: false
    },
    {
      title: 'Từ',
      dataIndex: 'fromdate',
      hideInTable: true,
      valueType: 'dateRange',
      renderFormItem: () => (
        <DateRangePicker
          inputFormat="dd/MM/yyyy"
          minDate={moment(`${today.getFullYear()}/${today.getMonth()}/01`).toDate()}
          value={dateRange}
          calendars={2}
          renderInput={(startProps, endProps) => (
            <>
              <Stack width="100%" spacing={2} direction="row">
                <Box flex={1}>
                  <TextField
                    size="small"
                    fullWidth
                    {...startProps}
                    label={translate('common.fromTime')}
                    placeholder={translate('common.fromTime')}
                  />
                </Box>
                <Box flex={1}>
                  <TextField
                    size="small"
                    fullWidth
                    {...endProps}
                    label={translate('common.toTime')}
                    placeholder={translate('common.toTime')}
                  />
                </Box>
              </Stack>
            </>
          )}
          onChange={(e) => {
            if (e[0] && e[1]) {
              setDateRange(e);
            }
          }}
          key="date-range"
        />
      ),
      sortable: false
    }
  ];

  return (
    <ReportPage title="Log">
      <LogDetailDialog
        selectedValue={detailLog}
        open={Boolean(detailLog)}
        onClose={() => setDetailLog(null)}
      />

      {/* <Card>
        <Stack spacing={2}>
          <ResoTable
            ref={ref}
            sx={{ textOverflow: 'ellipsis' }}
            showAction={false}
            rowKey="menu_id"
            getData={logApi.getLog}
            columns={logColumns}
            scroll={{ y: '500px' }}
            pagination
          />
        </Stack>
      </Card> */}
    </ReportPage>
  );
};

export default LogSale;

/* eslint-disable camelcase */
import { DateRangePicker } from '@mui/lab';
import { Box, Card, Stack, TextField } from '@mui/material';
import paymentApi from 'api/report/payment';
// components
import moment from 'moment';
// material
import { useEffect, useRef, useState } from 'react';
import { formatDate } from 'utils/formatTime';
import ReportBtn from '../components/ReportBtn';
import ReportPage from '../components/ReportPage';
import { paymentColumns, storePaymentColumns } from './column';
import { useParams } from 'react-router';
import { parseParams } from '../../../utils/axios';
import ResoReportTable from 'components/ResoReportTable/ResoReportTable';

const CollectionListPage = () => {
  const ref = useRef<any>();
  const today = new Date();
  const yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24);

  const [dateRange, setDateRange] = useState<any>([yesterday, today]);
  const { storeId } = useParams();
  const isSystemRole = storeId == '0';

  useEffect(() => {
    if (ref.current) {
      ref.current.formControl.setValue('FromDate', formatDate(dateRange[0]!));
      ref.current.formControl.setValue('ToDate', formatDate(dateRange[1]!));
    }
  }, [dateRange]);

  return (
    <ReportPage
      title="Báo cáo theo hình thức thanh toán"
      actions={[
        <DateRangePicker
          inputFormat="dd/MM/yyyy"
          minDate={moment(`${today.getFullYear()}/${today.getMonth()}/01`).toDate()}
          disableFuture
          disableCloseOnSelect
          value={dateRange}
          renderInput={(startProps, endProps) => (
            <>
              <TextField {...startProps} label="Từ" />
              <Box sx={{ mx: 2 }}> - </Box>
              <TextField {...endProps} label="Đến" />
            </>
          )}
          onChange={(e) => {
            if (e[0] && e[1]) {
              setDateRange(e);
            }
          }}
          key="date-range"
        />
      ]}
    >
      <Card>
        <Stack spacing={2}>
          <ResoReportTable
            showAction={false}
            columns={isSystemRole ? paymentColumns : storePaymentColumns}
            getData={paymentApi.get}
            toolBarRender={() => [
              <ReportBtn
                key="export-excel"
                onClick={() =>
                  window.open(
                    `${process.env.REACT_APP_REPORT_BASE_URL}/payment-report/export?${parseParams(
                      ref.current.formControl.getValues()
                    )}`
                  )
                }
              />
            ]}
            scroll={{ y: '500px' }}
            ref={ref}
            pagination
            defaultFilters={{
              storeId: storeId == '0' ? null : storeId,
              FromDate: formatDate(dateRange[0]!),
              ToDate: formatDate(dateRange[1]!)
            }}
          />
        </Stack>
      </Card>
    </ReportPage>
  );
};

export default CollectionListPage;

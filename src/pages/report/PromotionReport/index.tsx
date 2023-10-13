/* eslint-disable camelcase */
// material
import { Card, Stack } from '@mui/material';
import ResoReportTable from 'components/ResoReportTable/ResoReportTable';
import useLocales from 'hooks/useLocales';
import { useEffect, useRef, useState } from 'react';
// components
import { Box } from '@mui/system';
import promotionApi from 'api/report/promotion';
import { SelectField } from 'components/form';
import AutocompleteStore from 'components/form/common/report/AutocompleteStore';
import Label from 'components/Label';
import { useParams } from 'react-router';
import { PromotionBase } from 'types/report/promotion';
import { TTableColumn } from 'types/table';
import { formatDate } from 'utils/formatTime';
import ReportBtn from '../components/ReportBtn';
import ReportPage from '../components/ReportPage';
import { DateRange } from '@mui/lab';
import SelectDateRange from 'pages/report/components/SelectDateRange';
import moment from 'moment';
interface FetchParams {
  storeId: string | null | undefined;
  FromDate?: string;
  ToDate?: string;
  duration?: string;
}
const PromotionReport = () => {
  const defaultFilters = {
    fetchParams: {} as FetchParams
  };
  const { translate } = useLocales();
  const tableRef = useRef<any>();
  const ref = useRef<any>();
  const { storeId } = useParams();

  const columns: TTableColumn<PromotionBase>[] = [
    {
      title: 'Tên khách hàng',
      dataIndex: 'storeId',
      hideInTable: true,
      hideInSearch: storeId != '0',
      valueType: 'select',
      renderFormItem: () => <AutocompleteStore name="storeId" label="Cửa hàng" />
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'customerName'
      // hideInSearch: true
    },
    {
      title: 'Số lần sử dụng thẻ',
      // dataIndex: 'OrderQty',
      hideInSearch: true
    },
    {
      title: 'Số tiền',
      dataIndex: 'sumAmount',
      hideInSearch: true
    },
    {
      title: 'Số tiền giảm giá',
      // dataIndex: 'SumDiscount',
      hideInSearch: true
    },
    {
      title: 'Thanh toán',
      // dataIndex: 'SumFinal',
      hideInSearch: true
    },
    {
      title: 'Xem các hóa đơn',
      // dataIndex: 'PromoID',
      hideInSearch: true,
      render: (isAvai: any) => (
        <Label color={isAvai ? 'success' : 'default'}>
          {isAvai ? translate('common.available') : translate('common.notAvailable')}
        </Label>
      ),
      renderFormItem: () => (
        <SelectField
          fullWidth
          sx={{ minWidth: '150px' }}
          options={[
            {
              label: translate('Hôm nay'),
              value: ''
            },
            {
              label: translate('Tuần này'),
              value: ''
            },
            {
              label: translate('Tuần trước'),
              value: ''
            },
            {
              label: translate('Tháng này'),
              value: ''
            },
            {
              label: translate('Tháng trước'),
              value: ''
            },
            {
              label: translate('Tuỳ chọn'),
              value: ''
            }
          ]}
          name="is-available"
          size="small"
          label={translate('pages.stores.table.isAvailable')}
        />
      )
    },
    {
      title: 'Phiên bản (Version)',
      hideInSearch: true
      // dataIndex: 'saleRevenue',
    },
    {
      title: 'Ngày cập nhật (Updated at)',
      hideInSearch: true
      // dataIndex: 'saleRevenue',
    }
  ];

  const today = new Date();
  const yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24);
  const [dateRange, setDateRange] = useState<DateRange<Date>>([
    moment(`${today.getFullYear()}/${today.getMonth() + 1}/01`).toDate(),
    today
  ]);
  const [options, setOptions] = useState('PREV_WEEK');
  const { FromDate, ToDate, duration } = defaultFilters.fetchParams;
  // State lưu giá trị hiện tại
  const [fromDate, setFromDate] = useState(FromDate);
  const [toDate, setToDate] = useState(ToDate);
  const [toDuration, setToDuration] = useState(duration);
  // console.log(toDuration);

  if (Array.isArray(options) && options.length === 2) {
    defaultFilters.fetchParams.FromDate = formatDate(options[0]);
    defaultFilters.fetchParams.ToDate = formatDate(options[1]);
  } else {
    defaultFilters.fetchParams.duration = options;
  }
  // Xử lý ref
  useEffect(() => {
    if (ref.current) {
      if (ref.current.formControl.setValue) {
        if (toDuration) {
          ref.current.formControl.setValue('duration', toDuration);
          ref.current.formControl.setValue('fromDate', null);
          ref.current.formControl.setValue('toDate', null);
        } else {
          ref.current.formControl.setValue('fromDate', fromDate);
          ref.current.formControl.setValue('toDate', toDate);
          ref.current.formControl.setValue('duration', null);
        }
      }
    }
  }, [toDuration, fromDate, toDate]);

  useEffect(() => {
    setToDuration(defaultFilters.fetchParams.duration);
  }, [defaultFilters]);
  // Xử lý khi defaultFilters thay đổi
  useEffect(() => {
    setFromDate(defaultFilters.fetchParams.FromDate);
    setToDate(defaultFilters.fetchParams.ToDate);
  }, [defaultFilters]);

  // Xử lý khi dateRange thay đổi
  useEffect(() => {
    if (dateRange && dateRange[0]) {
      setFromDate(dateRange[0].toString()); // Assuming dateRange[0] is a Date object
    }
    if (dateRange && dateRange[1]) {
      setToDate(dateRange[1].toString()); // Assuming dateRange[1] is a Date object
    }
  }, [dateRange]);

  const isSystemRole = storeId == '0';
  return (
    <ReportPage
      title="Báo cáo theo khuyến mãi"
      actions={[
        <>
          <Box>
            <SelectDateRange
              key="day-range"
              value={options}
              onChange={setOptions}
              showOptionDateRange={true}
            />
          </Box>
        </>,
        <ReportBtn
          key="export-excel"
          onClick={() => {
            return console.log('Export excel');
          }}
        />
      ]}
    >
      <Card>
        <Stack spacing={2}>
          <ResoReportTable
            showAction={false}
            rowKey="promotion-id"
            ref={ref}
            getData={({ storeId, ...params }: any) =>
              promotionApi.getPromotion(storeId | 13, params)
            }
            defaultFilters={defaultFilters}
            columns={columns}
          />
        </Stack>
      </Card>
    </ReportPage>
  );
};

export default PromotionReport;

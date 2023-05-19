/* eslint-disable camelcase */
// material
import { TextField } from '@mui/material';
import useLocales from 'hooks/useLocales';
import { useEffect, useRef, useState } from 'react';
// components
import { DateRangePicker } from '@mui/lab';
import { Box } from '@mui/system';
// import promotionApi from 'api/report/promotion';
import { SelectField } from 'components/form';
// import AutocompleteStore from 'components/form/common/report/AutocompleteStore';
import Label from 'components/Label';
import { useParams } from 'react-router';
import { PromotionBase } from 'types/report/promotion';
import { TTableColumn } from 'types/table';
import { formatDate } from 'utils/formatTime';
import ReportBtn from '../components/ReportBtn';
import ReportPage from '../components/ReportPage';
const PromotionReport = () => {
  const { translate } = useLocales();
  const tableRef = useRef<any>();
  const { storeId } = useParams();

  const columns: TTableColumn<PromotionBase>[] = [
    // {
    //   title: 'Tên khách hàng',
    //   dataIndex: 'storeId',
    //   hideInTable: true,
    //   hideInSearch: storeId === '0' ? false : true,
    //   valueType: 'select',
    //   renderFormItem: () => <AutocompleteStore name="storeId" label="Cửa hàng" />
    // },
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

  const ref = useRef<any>();
  const today = new Date();
  const yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24);
  const [dateRange, setDateRange] = useState<any>([yesterday, yesterday]);

  useEffect(() => {
    if (ref.current) {
      ref.current.formControl.setValue('FromDate', formatDate(dateRange[0]!));
      ref.current.formControl.setValue('ToDate', formatDate(dateRange[1]!));
    }
  }, [dateRange]);

  return (
    <ReportPage
      title="Báo cáo theo khuyến mãi"
      actions={[
        <DateRangePicker
          inputFormat="dd/MM/yyyy"
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
        />,
        <ReportBtn key="export-excel" onClick={() => console.log('Export excel')} />
      ]}
    >
      {/* <Card>
        <Stack spacing={2}>
          <ResoTable
            showAction={false}
            rowKey="promotion-id"
            ref={tableRef}
            getData={({ storeId, ...params }: any) => promotionApi.getPromotion(storeId, params)}
            defaultFilters={{
              storeId: storeId === '0' ? 13 : storeId
            }}
            columns={columns}
          />
        </Stack>
      </Card> */}
    </ReportPage>
  );
};

export default PromotionReport;

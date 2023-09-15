/* eslint-disable camelcase */
// material
import { DateRangePicker, TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Card, Tab, TextField } from '@mui/material';
import productApi from 'api/report/products';
import ResoTable from 'components/ResoTable/ResoTable';
import AutocompleteStore from 'components/form/common/report/AutocompleteStore';
import moment from 'moment';
import ReportBtn from 'pages/report/components/ReportBtn';
import ReportPage from 'pages/report/components/ReportPage';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { TProductSaleReportBase } from 'types/report/product';
import { TTableColumn } from 'types/table';
import { parseParams } from 'utils/axios';
import { formatDate } from 'utils/formatTime';
const ProductSaleReport = () => {
  const { storeId } = useParams();

  const ref = useRef<any>();

  const [activeTab, setActiveTab] = useState('1');
  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const productSaleColumn: TTableColumn<TProductSaleReportBase>[] = [
    {
      title: 'Cửa hàng',
      hideInTable: true,
      valueType: 'select',
      dataIndex: 'storeId',
      hideInSearch: storeId != '0',
      renderFormItem: () => <AutocompleteStore name="storeId" label="Cửa hàng" />
    },
    {
      title: 'STT',
      hideInSearch: true,
      dataIndex: 'index'
    },
    {
      title: 'Mã sản phẩm',
      hideInSearch: true,
      dataIndex: 'productCode'
    },
    {
      title: 'Tên sản phẩm',
      hideInSearch: true,
      dataIndex: 'productName'
    },
    {
      title: 'Danh mục',
      hideInSearch: true,
      dataIndex: 'cateName'
    },
    {
      title: 'Đơn vị tính',
      hideInSearch: true,
      dataIndex: 'unit'
    },
    {
      title: 'Số lượng bán ra',
      hideInSearch: true,
      dataIndex: 'quantity',
      valueType: 'digit'
    },
    {
      title: 'Đơn giá (Chưa VAT)',
      hideInSearch: true,
      dataIndex: 'unitPriceNoVat',
      valueType: 'money'
    },
    {
      title: 'Đơn giá (Đã VAT)',
      hideInSearch: true,
      dataIndex: 'unitPrice',
      valueType: 'money'
    },
    {
      title: 'Doanh thu (Chưa VAT)',
      hideInSearch: true,
      dataIndex: 'totalBeforeDiscount',
      valueType: 'money'
    },
    {
      title: 'Doanh thu (Đã VAT)',
      hideInSearch: true,
      valueType: 'money',
      dataIndex: 'totalAfterDiscount'
    },
    {
      title: 'Phiên bản (Version)',
      hideInSearch: true,
      dataIndex: 'version',
      hideInTable: true
    },
    {
      title: 'Ngày cập nhật (Updated at)',
      hideInSearch: true,
      dataIndex: 'updatedAt',
      hideInTable: true
    }
  ];

  const today = new Date();
  const yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24);
  const [dateRange, setDateRange] = useState<any>([yesterday, yesterday]);

  useEffect(() => {
    if (ref.current) {
      ref.current.formControl.setValue('FromDate', formatDate(dateRange[0]!));
      ref.current.formControl.setValue('ToDate', formatDate(dateRange[1]!));
    }
  }, [dateRange]);

  //chart
  const chartFill = {
    series: [44, 55, 13, 43, 22],
    options: {
      title: {
        text: 'Doanh thu sản phẩm',
        align: 'center'
      },
      chart: {
        width: 380,
        type: 'pie'
      },
      labels: [
        'Iced Espresso (M)',
        'Iced Espresso With Milk (M)',
        'Card 200K',
        'Iced Espresso With Milk (L)',
        'Phần còn lại'
      ],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    }
  };

  return (
    <ReportPage
      title="Báo cáo doanh thu sản phẩm"
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
        <TabContext value={activeTab}>
          <Box mb={2}>
            <TabList onChange={handleChangeTab}>
              <Tab label="Báo cáo doanh thu" value="1" />
              <Tab label="Sơ đồ doanh thu" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <ResoTable
              ref={ref}
              columns={productSaleColumn}
              getData={productApi.getProductSale}
              showAction={false}
              pagination={true}
              defaultFilters={{
                storeId: storeId == '0' ? null : storeId,
                FromDate: formatDate(dateRange[0]!),
                ToDate: formatDate(dateRange[1]!)
              }}
              toolBarRender={() => [
                <ReportBtn
                  key="export-excel"
                  onClick={() =>
                    window.open(
                      `${process.env.REACT_APP_REPORT_BASE_URL}/product-report/export?${parseParams(
                        ref.current.formControl.getValues()
                      )}`
                    )
                  }
                />
              ]}
              scroll={{ y: '500px' }}
            />
          </TabPanel>
          <TabPanel value="2"></TabPanel>
        </TabContext>
      </Card>
    </ReportPage>
  );
};

export default ProductSaleReport;

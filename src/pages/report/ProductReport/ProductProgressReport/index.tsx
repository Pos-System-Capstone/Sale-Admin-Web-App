/* eslint-disable camelcase */
// material
import { DateRangePicker, TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Card, Tab, TextField } from '@mui/material';
import productApi from 'api/report/products';
import ResoTable from 'components/ResoTable/ResoTable';
import ReportBtn from 'pages/report/components/ReportBtn';
import ReportPage from 'pages/report/components/ReportPage';
import { useEffect, useRef, useState } from 'react';
import { formatDate } from 'utils/formatTime';
import productProgressColumns from './column';

const ProductProgressReport = () => {
  const [activeTab, setActiveTab] = useState('1');
  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };
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

  //charts
  const chartFill = {
    series: [
      {
        name: 'Passiopuccino',
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
      }
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'BIỂU ĐỒ DOANH THU',
        align: 'center'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
      }
    }
  };

  return (
    <ReportPage
      title="Báo cáo diễn tiến sản phẩm"
      actions={[
        <DateRangePicker
          disableFuture
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
        <ReportBtn key="export-excel" onClick={() => {}} />
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
              showAction={false}
              columns={productProgressColumns}
              scroll={{ y: '320px' }}
              getData={productApi.getProductLine}
              defaultFilters={{
                brandId: 1,
                productId: 1,
                FromDate: formatDate(dateRange[0]!),
                ToDate: formatDate(dateRange[1]!)
              }}
            />
          </TabPanel>
          <TabPanel value="2">
            {/* <ReactApexChart
              option={chartFill.options}
              series={chartFill.series}
              type="line"
              height={350}
            /> */}
          </TabPanel>
        </TabContext>
      </Card>
    </ReportPage>
  );
};

export default ProductProgressReport;

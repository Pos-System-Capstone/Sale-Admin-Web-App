/* eslint-disable camelcase */
import { Card, Stack } from '@mui/material';
// import storeApi from 'api/report/store';
// components
import ResoTable from 'components/ResoTable/ResoTable';
// material
import { useEffect, useRef, useState } from 'react';
import { TTableColumn } from 'types/table';
import { formatDate } from 'utils/formatTime';
import ReportBtn from '../components/ReportBtn';
import ReportPage from '../components/ReportPage';
// import { storeColumns } from './column';

const StoreReport = () => {
  const ref = useRef<any>();
  const today = new Date();
  const yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24);
  const [dateRange, setDateRange] = useState<any>([yesterday, today]);

  useEffect(() => {
    if (ref.current) {
      ref.current.formControl.setValue('FromDate', formatDate(dateRange[0]!));
      ref.current.formControl.setValue('ToDate', formatDate(dateRange[1]!));
    }
  }, [dateRange]);

  const data = [
    {
      index: 1,
      id: 13,
      name: 'HCM.PA.SH.15FNTMK\r\n',
      date: '2022-07-19 14:24'
    },
    {
      index: 2,
      id: 15,
      name: 'HCM.PA.SH.53CND\r\n',
      date: '2022-07-19 14:24'
    },
    {
      index: 3,
      id: 28,
      name: 'HCM.GF.SH.102HVB\r\n',
      date: '2022-07-19 14:24'
    },
    {
      index: 4,
      id: 34,
      name: 'HCM.PA.SH.47TCV\r\n',
      date: '2022-07-19 14:24'
    },
    {
      index: 5,
      id: 35,
      name: 'HCM.PA.SH.97LVD\r\n',
      date: '2022-07-19 14:24'
    },
    {
      index: 6,
      id: 36,
      name: 'HCM.PA.SH.213NVC\r\n',
      date: '2022-07-19 14:24'
    },
    {
      index: 7,
      id: 37,
      name: 'HCM.GF.SH.91ND\r\n',
      date: '2022-07-19 14:24'
    },
    {
      index: 8,
      id: 38,
      name: 'HCM.GF.SH.227AXVNT',
      date: '2022-07-19 14:24'
    }
  ];

  type StoreDetails = {
    index?: any;
    id?: any;
    name?: any;
    date?: any;
  };

  const testColumns: TTableColumn<StoreDetails>[] = [
    {
      title: 'STT',
      dataIndex: 'index',
      hideInSearch: true
    },
    {
      title: 'Tên cửa hàng',
      dataIndex: 'name',
      hideInSearch: true
    },
    {
      title: 'Loại cửa hàng',
      // dataIndex: 'cash',
      hideInSearch: true
    },
    {
      title: 'Lần chạy báo cáo',
      dataIndex: 'date',
      hideInSearch: true,
      valueType: 'datetime'
    },
    {
      title: 'Chạy lại báo cáo',
      // dataIndex: '',
      hideInSearch: true
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

  return (
    <ReportPage
      title="Thống kê báo cáo cửa hàng"
      actions={[<ReportBtn key="export-excel" onClick={() => console.log('Export excel')} />]}
    >
      <Card>
        <Stack spacing={2}>
          <ResoTable
            showAction={false}
            // columns={storeColumns}
            // getData={storeApi.get}
            pagination
            dataSource={data}
            columns={testColumns}
            // getData={data}
            ref={ref}
            scroll={{ y: '500px' }}
            defaultFilters={{
              FromDate: formatDate(dateRange[0]!),
              ToDate: formatDate(dateRange[1]!)
            }}
          />
        </Stack>
      </Card>
    </ReportPage>
  );
};

export default StoreReport;

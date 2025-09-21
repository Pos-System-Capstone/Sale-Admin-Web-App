import styled from '@emotion/styled';
import { Grid, TableBody, TableHead, TableRow, ToggleButton } from '@mui/material';
import useLocales from 'hooks/useLocales';
import React, { useState, useRef, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { TabContext } from '@mui/lab';
import ResoTable from 'components/ResoTable/ResoTable';
import voucherApi from 'api/promotion/voucher';
// components
import { useNavigate, useParams } from 'react-router-dom';
//
import { PATH_PROMOTION_APP } from 'routes/promotionAppPaths';

import { TTableColumn } from 'types/table';
import { Stack } from '@mui/material';
import { TableContainer } from '@mui/material';
import { Paper } from '@mui/material';
import { Table } from '@mui/material';
import { TableCell } from '@mui/material';
import EmptyContent from 'components/EmptyContent';
import { getUserInfo } from 'utils/utils';
import Label from 'components/Label';
//

interface Props {
  watch?: any;
}
interface PercentageChartProps {
  percentage: number;
}
const FormDetailInformation = ({ watch }: Props) => {
  const [value, setValue] = React.useState(0);
  const { t } = useLocales();
  const [activeTab, setActiveTab] = useState('1');
  const ref = useRef<any>();
  const navigate = useNavigate();
  const userRaw = getUserInfo();
  const user: any = JSON.parse(userRaw ?? '{}');

  const productColumns: TTableColumn<any>[] = [
    {
      title: `${t('promotionSystem.voucher.table.no')}`,
      dataIndex: 'index',
      hideInSearch: true
    },
    {
      title: 'Mã',
      dataIndex: 'voucherCode'
    },
    {
      title: `Ngày tạo`,
      dataIndex: 'insDate',
      hideInSearch: true
    },
    {
      title: `Đã sử dụng`,
      dataIndex: 'isUsed',
      hideInSearch: true,
      render: (value) => (
        <Label color={value === true ? 'success' : value === false ? 'error' : 'default'}>
          {value === true ? 'đã sử dụng' : value === false ? 'chưa sử dụng' : 'không rõ'}
        </Label>
      )
    },
    {
      title: `Thu thập`,
      dataIndex: 'isRedemped',
      hideInSearch: true,
      render: (value) => (
        <Label color={value === true ? 'success' : value === false ? 'error' : 'default'}>
          {value === true ? 'đã thu thập' : value === false ? 'chưa thu thập' : 'không rõ'}
        </Label>
      )
    }
  ];

  const promoList = watch('promoList') !== undefined && watch('promoList')[0];

  const promotionColumns = [
    {
      title: `Tên`,
      data: promoList !== undefined ? promoList.promoName : ''
    },
    {
      title: `Code`,
      data: promoList !== undefined ? promoList.promoCode : ''
    }
  ];

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const { id } = useParams();

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    if (newAlignment !== null) setAlignment(newAlignment);
  };
  const [alignment, setAlignment] = useState('discount');
  const StyledToggleButton = styled(ToggleButton)({
    width: '50%',
    height: '55.8px',
    paddingRight: '10px',
    fontSize: '16px',
    pb: '20px',
    '&.Mui-selected, &.Mui-selected:hover': {
      color: 'white',
      backgroundColor: '#00AB55'
    }
  });

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  useEffect(() => {
    if (ref.current) {
      ref.current.formControl.setValue('VoucherGroupId', id);
    }
  }, [user]);

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    };
  }

  return (
    <Grid container spacing={2} sx={{ ml: '20px' }}>
      <Typography variant="h4">THÔNG TIN CHI TIẾT</Typography>
      <hr style={{ border: '1px solid #000', margin: '20px 0' }} />
      <Stack sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChangeTab} aria-label="basic tabs example">
            <Tab label="Danh sách voucher" {...a11yProps(0)} />
            <Tab label="Khuyến mãi" {...a11yProps(1)} />
            <Tab label="Distribution" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Grid container spacing={2}>
            <Grid item xs={7}></Grid>
          </Grid>
          <Box sx={{ pt: '5px' }}>
            <TabContext value={activeTab}>
              <ResoTable
                ref={ref}
                pagination
                getData={(params: any) => voucherApi.getVouchers(params)}
                // onEdit={() => console.log('edit')}
                onEdit={(params: any) =>
                  navigate(`${PATH_PROMOTION_APP.voucher.root}/${params.voucherGroupId}`)
                }
                onDelete={() => console.log('delete')}
                columns={productColumns}
                rowKey="voucher_id"
              />
            </TabContext>
          </Box>
        </CustomTabPanel>
        {/* Promotion */}
        <CustomTabPanel value={value} index={1}>
          <Box height={'40vh'} display={'flex'} justifyContent={'center'}>
            <TabContext value={activeTab}>
              {promoList !== undefined ? (
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        {promotionColumns.map((e: any, index: any) => (
                          <TableCell key={index} align="left">
                            {e.title}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {promotionColumns.map((e: any, index: any) => (
                        <TableCell key={index} align="left">
                          {e.data}
                        </TableCell>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <TableBody>
                  <Box width="100%">
                    <EmptyContent
                      title="Trống"
                      sx={{
                        width: '100%'
                      }}
                    />
                  </Box>
                </TableBody>
              )}
            </TabContext>
          </Box>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>
      </Stack>
    </Grid>
  );
};

export default FormDetailInformation;

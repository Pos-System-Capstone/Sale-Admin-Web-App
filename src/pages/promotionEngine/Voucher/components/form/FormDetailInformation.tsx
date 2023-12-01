import styled from '@emotion/styled';
import { Button, Card, Grid, TextField, ToggleButton } from '@mui/material';
import useLocales from 'hooks/useLocales';
import React, { useState, useRef } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Add, Search } from '@mui/icons-material';
import { TabContext } from '@mui/lab';
import ResoTable from 'components/ResoTable/ResoTable';
import voucherApi from 'api/promotion/voucher';
// components
import { useNavigate } from 'react-router-dom';
//
import { PATH_PROMOTION_APP } from 'routes/promotionAppPaths';
import { TVoucherBase } from 'types/promotion/voucher';
import { TTableColumn } from 'types/table';
//

interface Props {}
interface PercentageChartProps {
  percentage: number;
}
const FormDetailInformation = (props: Props) => {
  const [value, setValue] = React.useState(0);
  const { t } = useLocales();
  const [activeTab, setActiveTab] = useState('1');
  const ref = useRef<any>();
  const navigate = useNavigate();

  const productColumns: TTableColumn<TVoucherBase>[] = [
    {
      title: `${t('promotionSystem.voucher.table.no')}`,
      dataIndex: 'index',
      hideInSearch: true
    },
    {
      title: `${t('promotionSystem.voucher.table.actionName')}`,
      dataIndex: ['action', 'name'],
      // renderFormItem: () => <AutocompleteCategory name="cat-id" label="Danh mục" />
      hideInSearch: true
    },
    {
      title: `${t('promotionSystem.voucher.table.total')}`,
      dataIndex: 'quantity',
      hideInSearch: true
    },
    {
      title: `${t('promotionSystem.voucher.table.redeemed')}`,
      dataIndex: 'redempedQuantity',
      hideInSearch: true
    },
    {
      title: `${t('promotionSystem.voucher.table.used')}`,
      dataIndex: 'usedQuantity',
      hideInSearch: true
    }
  ];

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChangeTab} aria-label="basic tabs example">
            <Tab label="Danh sách voucher" {...a11yProps(0)} />
            <Tab label="Promotions" {...a11yProps(1)} />
            <Tab label="Distribution" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Grid container spacing={2}>
            <Grid item xs={7}>
              <Card sx={{ height: '112.95px' }}>
                <TextField
                  label="Nhập mã voucher cần tìm"
                  variant="outlined"
                  sx={{ width: '500px', pb: '5px', borderRadius: '250px 0 0px 250px' }}
                />
                <Button
                  variant="outlined"
                  sx={{ height: '56px', width: '96px' }}
                  startIcon={<Search />}
                >
                  Tìm
                </Button>
              </Card>
            </Grid>
            <Grid item xs={4.5}>
              <Card>
                <TextField variant="outlined" sx={{ width: '180px', pb: '2px' }} />
                <Button variant="contained" sx={{ height: '53px', ml: '10px' }} startIcon={<Add />}>
                  Thêm voucher
                </Button>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  fontWeight="bold"
                  sx={{ pb: '1px' }}
                >
                  Số lượng tối đa của voucher là 999 voucher
                </Typography>
              </Card>
            </Grid>
          </Grid>
          <Box sx={{ pt: '5px' }}>
            <TabContext value={activeTab}>
              <ResoTable
                ref={ref}
                pagination
                getData={(params: any) => voucherApi.getVoucher(params)}
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
        <CustomTabPanel value={value} index={1}>
          Item Two
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>
      </Box>
    </Grid>
  );
};

export default FormDetailInformation;

import { Box, Card, Tab, Tabs } from '@mui/material';
import { Grid, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { TabContext } from '@mui/lab';
import variantApi from 'api/variant';
import { TVariant } from 'types/report/variant';
import { DashboardNavLayout } from 'layouts/dashboard/DashboardNavbar';
import { Button } from '@mui/material';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import { useSnackbar } from 'notistack';
import useDashboard from 'hooks/useDashboard';
import { useNavigate, useParams } from 'react-router';
import { PATH_DASHBOARD } from 'routes/paths';
import { InputField } from 'components/form';
import TagField from 'components/form/TagField';
type Props = {
  values?: any;
  handleSubmit?: any;
  //   handleStringChange?: any;
  //   valueArray?: any;
  //   setValueArray?: any;
};
export default function FormDetail({
  values,
  handleSubmit
}: //   handleStringChange,
//   valueArray,
//   setValueArray
Props) {
  const [value, setValue] = React.useState(0);
  const [activeTab, setActiveTab] = useState('1');
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const { setNavOpen } = useDashboard();
  const navigate = useNavigate();
  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  //   handleStringChange(watch('value'));

  const onSubmit = async (values: TVariant) => {
    const response = await variantApi.updateVariant(id, values);
    response.status == 200
      ? enqueueSnackbar(`Cập nhập thành công`, {
          variant: 'success'
        })
      : enqueueSnackbar(`Có lỗi xảy ra`, {
          variant: 'error'
        });
    navigate(PATH_DASHBOARD.variants.root + `/${id}`);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    };
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

  return (
    <Card sx={{ width: '100%' }}>
      <DashboardNavLayout onOpenSidebar={() => setNavOpen(true)}>
        <Stack direction="row" spacing={2}>
          <Button onClick={() => navigate(-1)} variant="outlined">
            Hủy
          </Button>
          <LoadingAsyncButton onClick={handleSubmit(onSubmit)} type="submit" variant="contained">
            Lưu
          </LoadingAsyncButton>
        </Stack>
      </DashboardNavLayout>
      <Grid container sx={{ ml: '20px' }}>
        <Stack sx={{ width: '100%' }}>
          <Tabs value={value} onChange={handleChangeTab} aria-label="basic tabs example">
            <Tab label="Thông tin biến thể" {...a11yProps(0)} />
          </Tabs>
          <CustomTabPanel value={value} index={0}>
            <TabContext value={activeTab}>
              {/* <Infomation values={values}></Infomation> */}
              <Stack width="100%">
                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <InputField fullWidth name="name" label="Tên biến thể sản phẩm" requird />
                    </Grid>
                    <Grid item xs={4}>
                      <InputField fullWidth name="displayOrder" label="Mức độ ưu tiên" requird />
                    </Grid>
                    <Grid item xs={4}>
                      <TagField fullWidth name="value" label="Giá trị" punctuation={'_'} isInput />
                    </Grid>
                  </Grid>
                </Box>
              </Stack>
            </TabContext>
          </CustomTabPanel>
        </Stack>
      </Grid>
    </Card>
  );
}

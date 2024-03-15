import { Box, Card, Tab, Tabs } from '@mui/material';
import { Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import TabOne from './TabOne';
import TabTwo from './TabTwo';
import { TabContext } from '@mui/lab';

type Props = {
  watch?: any;
};
export default function FormDetail({ watch }: Props) {
  const [value, setValue] = React.useState(0);
  const [activeTab, setActiveTab] = useState('1');

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
    <Card>
      <Box sx={{ width: '100%' }}>
        <Stack sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChangeTab} aria-label="basic tabs example">
              <Tab label="Thông tin chương trình thành viên" {...a11yProps(0)} />
              <Tab label="Lịch sử giao dịch" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <TabContext value={activeTab}>
              <TabOne watch={watch}></TabOne>
            </TabContext>
          </CustomTabPanel>

          <CustomTabPanel value={value} index={1}>
            <TabContext value={activeTab}>
              <TabTwo watch={watch}></TabTwo>
            </TabContext>
          </CustomTabPanel>
        </Stack>
      </Box>
    </Card>
  );
}

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Card, Tab } from '@mui/material';
import { useState } from 'react';
import ReportPage from '../components/ReportPage';
import Sales from './Sales';

const Insights = () => {
  const [activeTab, setActiveTab] = useState('1');
  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };
  return (
    <ReportPage title={`Insights`}>
      <Card sx={{ paddingBottom: 5 }}>
        <TabContext value={activeTab}>
          <Box mb={2}>
            <TabList onChange={handleChangeTab}>
              <Tab label="Sales" value="1" />
              <Tab label="Menu" value="2" />
              <Tab label="Feedback" value="3" />
              <Tab label="Customers" value="4" />
              <Tab label="Operations" value="5" />
              <Tab label="Offers" value="6" />
            </TabList>
          </Box>

          <TabPanel value="1">
            <Sales />
          </TabPanel>
          <TabPanel value="2">Hello 2</TabPanel>
          <TabPanel value="3">Hello 3</TabPanel>
          <TabPanel value="4">Hello 4</TabPanel>
          <TabPanel value="5">Hello 5</TabPanel>
          <TabPanel value="6">Hello 6</TabPanel>
        </TabContext>
      </Card>
    </ReportPage>
  );
};

export default Insights;

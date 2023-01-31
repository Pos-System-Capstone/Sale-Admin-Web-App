import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Stack, Tab } from '@mui/material';
import EmptyContent from 'components/EmptyContent';
import Page from 'components/Page';
import useCategory from 'hooks/categories/useCategory';
import { useState } from 'react';
import { useParams } from 'react-router';
import CategoryExtraTab from './components/CategoryExtraTab';
import CategoryInfoTab from './components/CategoryInfoTab';
import CategoryModifierTab from './components/CategoryModifierTab';
import { CategoryType } from 'types/category';

interface Props {}

const UpdateCategory = (props: Props) => {
  const [activeTab, setActiveTab] = useState('1');

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const { id } = useParams();

  const { data: category, error } = useCategory(Number(id));
  const isExtra = category?.categoryType === CategoryType.EXTRA;
  // const isContainer = category?.is_container;

  if (error) {
    return <EmptyContent title="Không tìm thấy danh mục này" />;
  }

  return (
    <>
      <Page title="Cập nhật Danh mục">
        <TabContext value={activeTab}>
          <Box>
            <TabList onChange={handleChangeTab}>
              <Tab label="Thông tin chung" value="1" />
              {!isExtra && <Tab label="Sản phẩm đi kèm" value="2" />}
              {!isExtra && <Tab label="Tuỳ chỉnh" value="3" />}
            </TabList>
          </Box>

          <Stack spacing={2}>
            <TabPanel value="1">
              <CategoryInfoTab updateMode />
            </TabPanel>
            <TabPanel value="2">
              <CategoryExtraTab />
            </TabPanel>
            <TabPanel value="3">
              <CategoryModifierTab />
            </TabPanel>
          </Stack>
        </TabContext>
      </Page>
    </>
  );
};

export default UpdateCategory;

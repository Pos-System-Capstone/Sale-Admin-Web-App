import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Stack, Tab } from '@mui/material';
import EmptyContent from 'components/EmptyContent';
import Page from 'components/Page';
import useCategory from 'hooks/categories/useCategory';
import { useState } from 'react';
import { useParams } from 'react-router';
import CategoryExtraTab from './components/CategoryExtraTab';
import CategoryInfoTab from './components/CategoryInfoTab';
import ExtraCategoriesInCategoryTab from './components/ExtraCategoriesInCategoryTab';
import { CategoryType } from 'types/category';
interface Props {}

const UpdateCategory = (props: Props) => {
  const [activeTab, setActiveTab] = useState('1');

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const { id } = useParams();

  const { data: category, error, isLoading } = useCategory(id!);
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
              <Tab label="Sản phẩm trong danh mục" value="2" />
              {category?.categoryType == CategoryType.NORMAL && (
                <Tab label="Danh sách Extra trong danh mục" value="3" />
              )}
            </TabList>
          </Box>

          <Stack spacing={2}>
            <TabPanel value="1">
              <Stack spacing={2}>
                <CategoryInfoTab category={category} isLoading={isLoading} updateMode />
              </Stack>
            </TabPanel>
            <TabPanel value="2">
              <Stack spacing={2}>
                <CategoryExtraTab />
              </Stack>
            </TabPanel>
            {category?.categoryType === CategoryType.NORMAL && (
              <TabPanel value="3">
                <Stack spacing={2}>
                  <ExtraCategoriesInCategoryTab />
                </Stack>
              </TabPanel>
            )}
          </Stack>
        </TabContext>
      </Page>
    </>
  );
};

export default UpdateCategory;

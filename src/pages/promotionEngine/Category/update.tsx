import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Stack, Tab } from '@mui/material';
import EmptyContent from 'components/EmptyContent';
import Page from 'components/Page';
import CategoryInfoTab from 'pages/promotionEngine/Category/components/CategoryInfoTab';
import ProductPromotion from '../Products';
import productCategory from 'api/promotion/category';
import ProductInfoTab from './components/ProductInfoTab';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
interface Props {}

const UpdateProductCategory = (props: Props) => {
  const [activeTab, setActiveTab] = useState('1');

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };
  const useCategory = (cateId?: string) => {
    return useQuery(
      ['categories', cateId],
      () => productCategory.getCategoryById(cateId).then((res) => res.data),
      {
        enabled: Boolean(cateId)
      }
    );
  };
  const { id } = useParams();
  const { data: category, error, isLoading } = useCategory(id!);
  // const isContainer = category?.is_container;
  if (error) {
    return <EmptyContent title="Không tìm thấy danh mục này" />;
  }

  return (
    <>
      <Page title="Cập nhật danh mục sản phẩm">
        <TabContext value={activeTab}>
          <Box>
            <TabList onChange={handleChangeTab}>
              <Tab label="Thông tin chung" value="1" />
              <Tab label="Sản phẩm trong danh mục" value="2" />
              <Tab label="Thêm mới sản phẩm" value="3" />
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
                <ProductPromotion />
              </Stack>
            </TabPanel>
            <TabPanel value="3">
              <Stack spacing={2}>
                <ProductInfoTab category={category} />
              </Stack>
            </TabPanel>
          </Stack>
        </TabContext>
      </Page>
    </>
  );
};

export default UpdateProductCategory;

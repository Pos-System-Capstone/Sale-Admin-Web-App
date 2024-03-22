import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Stack, Tab } from '@mui/material';
import EmptyContent from 'components/EmptyContent';
import Page from 'components/Page';
// import useCategory from 'hooks/categories/useCategory';
import { useState } from 'react';
import { useParams } from 'react-router';

// import CategoryExtraTab from 'pages/promotionEngine/Category/components/CategoryExtraTab';
import ProductInfoTab from './components/ProductInfoTab';
import { useQuery } from 'react-query';
import productApi from 'api/promotion/product_promotion';
// import ExtraCategoriesInCategoryTab from 'pages/Categories/components/ExtraCategoriesInCategoryTab';
// import { CategoryType } from 'types/category';
interface Props {}

const UpdateProductPromotion = (props: Props) => {
  const [activeTab, setActiveTab] = useState('1');

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };
  const useCategory = (ProductID?: string) => {
    return useQuery(
      ['categories', ProductID],
      () => productApi.getProductById(ProductID).then((res) => res.data),
      {
        enabled: Boolean(ProductID)
      }
    );
  };
  const { id } = useParams();

  const { data: product, error, isLoading } = useCategory(id!);
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
              <Tab label="Cập nhật sản phẩm" value="1" />
            </TabList>
          </Box>

          <Stack spacing={2}>
            <TabPanel value="1">
              <Stack spacing={2}>
                <ProductInfoTab product={product} isLoading={isLoading} updateMode />
              </Stack>
            </TabPanel>
          </Stack>
        </TabContext>
      </Page>
    </>
  );
};

export default UpdateProductPromotion;

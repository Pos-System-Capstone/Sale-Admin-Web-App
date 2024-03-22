import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Stack, Tab } from '@mui/material';
import EmptyContent from 'components/EmptyContent';
import Page from 'components/Page';
// import useCategory from 'hooks/categories/useCategory';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
// import CategoryExtraTab from 'pages/promotionEngine/Category/components/CategoryExtraTab';
import CategoryInfoTab from 'pages/promotionEngine/Category/components/CategoryInfoTab';
import ProductPromotion from '../Products';
import { useQuery } from 'react-query';
import productCategory from 'api/promotion/category';
// import plusFill from '@iconify/icons-eva/plus-fill';
// import { PATH_DASHBOARD } from 'routes/paths';
// import MediumForm from './components/MediumForm';
import ProductInfoTab from './components/ProductInfoTab';
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
  const navigate = useNavigate();
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
              {/* {category?.categoryType == CategoryType.NORMAL && (
                <Tab label="Danh sách Extra trong danh mục" value="3" />
              )} */}
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

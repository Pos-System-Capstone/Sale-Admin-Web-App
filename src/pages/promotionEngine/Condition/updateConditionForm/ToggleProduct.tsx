import { Typography } from '@mui/material';
import { Drawer } from '@mui/material';
import productPromotionApi from 'api/promotion/product';
import ResoTable from 'components/ResoTable/ResoTable';
import { productPromotionColumns } from 'pages/promotionEngine/Products/config';
import React, { useRef } from 'react';
import { getUserInfo } from 'utils/utils';
interface Props {
  toggleDrawer: any;
  selectedProductIds: any;
  handleChangeSelection: any;
  isDrawerOpen: boolean;
}
export default function ToggleProduct({
  toggleDrawer,
  selectedProductIds,
  handleChangeSelection,
  isDrawerOpen
}: Props) {
  const tableRef = useRef<any>();

  const userRaw = getUserInfo();
  const user: any = JSON.parse(userRaw ?? '{}');
  const brandId = user.brandId;
  return (
    <>
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
        <Typography variant="h3" component="h3" style={{ marginTop: '8px', marginBottom: '8px' }}>
          DANH SÁCH SẢN PHẨM
        </Typography>
        <ResoTable
          checkboxSelection={{
            selection: selectedProductIds,
            type: 'checkbox'
          }}
          showAction={false}
          scroll={{ y: '80%', x: '100%' }}
          rowKey="productId"
          pagination
          ref={tableRef}
          getData={(params: any) => productPromotionApi.getProduct(brandId, params)}
          onChangeSelection={handleChangeSelection}
          columns={productPromotionColumns}
        />
      </Drawer>
    </>
  );
}

import React, { ReactElement, useEffect, useRef, useState } from 'react';
// import { InputField } from 'components/form';
import { InputField, SelectField } from 'components/form';
import { List, ListItem, Typography } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import ResoTable from 'components/ResoTable/ResoTable';
import productPromotionApi from 'api/promotion/product';
import { productPromotionColumns } from '../Products/config';
interface TaskComponentProps {
  selectedText: string | null;
  type?: 'checkbox' | 'radio' | undefined;
  setListProduct: Function;
  listProduct: string[];
  isUpdate: boolean;
  brandId: string | undefined;
}

const options = [
  { label: 'DEFAULT', value: 1 },
  { label: 'CHEAPEST', value: 2 },
  { label: 'MOST EXPENSIVE', value: 3 }
];

const TaskComponent = ({
  selectedText,
  type = 'checkbox',
  setListProduct,
  listProduct,
  isUpdate,
  brandId
}: TaskComponentProps): ReactElement | null => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const tableRef = useRef<any>();
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const handleChangeSelection = React.useCallback(
    (productId) => {
      setSelectedProductIds(productId);
      setListProduct(productId);
    },
    [setListProduct]
  );
  let content = null;
  useEffect(() => {
    if (isUpdate) {
      setSelectedProductIds(listProduct);
    }
    console.log('brandID', brandId);
  }, [isUpdate, listProduct, brandId, tableRef]);

  switch (selectedText) {
    case '4':
      content = (
        <List>
          <ListItem sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography>Giảm </Typography>
            <InputField
              name="discountAmount"
              sx={{ width: '120px' }}
              type="number"
              InputProps={{
                style: { historyeight: '40px', margin: '0 5px' }
              }}
            />
            <Typography>VND cho sản phẩm</Typography>
          </ListItem>
          <ListItem sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography>Giá tối thiểu của sản phẩm sau khi giảm giá là</Typography>
            {/* <InputField name="minimumPrice" /> */}
            <InputField
              name="minPriceAfter"
              sx={{ width: '120px' }}
              type="number"
              InputProps={{
                style: { height: '40px', margin: '0 5px' }
              }}
            />
            <Typography>VND</Typography>
          </ListItem>
          <ListItem sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography>Cho mặt hàng trong </Typography>
            <a style={{ color: 'green', margin: '0 5px' }} onClick={toggleDrawer}>
              danh sách sản phẩm đã chọn(
              {selectedProductIds === undefined ? 0 : selectedProductIds.length})
            </a>
          </ListItem>
        </List>
      );
      break;

    case '5':
      content = (
        <List>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <p>Giảm giá</p>
            {/* <InputField name="discountPercent" /> */}
            <InputField
              sx={{ width: '120px' }}
              type="number"
              InputProps={{
                style: { height: '25px', margin: '0 5px' }
              }}
              name="discountPercentage"
            />
            <p>%</p>
          </ListItem>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <p>Giảm giá tối đa </p>
            {/* <InputField name="maximunDiscount" /> */}
            <InputField
              name="maxAmount"
              sx={{ width: '120px' }}
              type="number"
              InputProps={{
                style: { height: '25px', margin: '0 5px' }
              }}
            />
            <p>VND</p>
          </ListItem>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <Typography>Cho mặt hàng trong </Typography>
            <a style={{ color: 'green', margin: '0 5px' }} onClick={toggleDrawer}>
              danh sách mặt hàng đã chọn(
              {selectedProductIds === undefined ? 0 : selectedProductIds.length})
            </a>
          </ListItem>
        </List>
      );
      break;
    case '6':
      content = (
        <List>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <p>Giảm giá</p>
            <InputField
              name="discountAmount"
              sx={{ width: '120px' }}
              type="number"
              InputProps={{
                style: { height: '25px', margin: '0 5px' }
              }}
            />
            <p>cho đến sản phẩm trong giỏ hàng</p>
          </ListItem>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <Typography>Cho mặt hàng trong </Typography>
            <a style={{ color: 'green', margin: '0 5px' }} onClick={toggleDrawer}>
              danh sách mặt hàng đã chọn(
              {selectedProductIds === undefined ? 0 : selectedProductIds.length})
            </a>
          </ListItem>
        </List>
      );
      break;
    case '7':
      content = (
        <List>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <p>Giá cố định</p>
            <InputField
              name="fixedPrice"
              sx={{ width: '120px' }}
              type="number"
              InputProps={{
                style: { height: '25px', margin: '0 5px' }
              }}
            />
            <p>VND</p>
          </ListItem>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <Typography>Cho mặt hàng trong </Typography>
            <a style={{ color: 'green', margin: '0 5px' }} onClick={toggleDrawer}>
              danh sách mặt hàng đã chọn(
              {selectedProductIds === undefined ? 0 : selectedProductIds.length})
            </a>
          </ListItem>
        </List>
      );
      break;
    case '8':
      content = (
        <List>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <p>Mua sản phẩm với giá</p>
            <InputField
              name="fixedPrice"
              sx={{ width: '120px' }}
              type="number"
              InputProps={{
                style: { height: '25px', margin: '0 5px' }
              }}
            />
            <p>VND</p>
          </ListItem>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <p>Kể từ sản phẩm</p>
            <InputField
              name="discountQuantity"
              sx={{ width: '120px' }}
              type="number"
              InputProps={{
                style: { height: '25px', margin: '0 5px' }
              }}
            />
          </ListItem>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <Typography>Cho mặt hàng trong </Typography>
            <a style={{ color: 'green', margin: '0 5px' }} onClick={toggleDrawer}>
              danh sách mặt hàng đã chọn(
              {selectedProductIds === undefined ? 0 : selectedProductIds.length})
            </a>
          </ListItem>
        </List>
      );
      break;
    case '9':
      content = (
        <List>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <p>Mua</p>
            <InputField
              name="discountQuantity"
              sx={{ width: '120px' }}
              type="number"
              InputProps={{
                style: { height: '25px', margin: '0 5px' }
              }}
            />
            <p>(các) sản phẩm</p>
          </ListItem>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <p>Với giá tiền</p>
            <InputField
              name="fixedPrice"
              sx={{ width: '120px' }}
              type="number"
              InputProps={{
                style: { height: '25px', margin: '0 5px' }
              }}
            />
            <p>VND</p>
          </ListItem>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <p>áp dụng cho (các) sản phẩm theo sau </p>
            <SelectField
              name="bundleStrategy"
              label="Select an Option"
              fullWidth
              options={options}
              sx={{ width: '200px' }}
              InputProps={{
                style: { height: '25px', margin: '0 5px', font: '30px' }
              }}
            />
          </ListItem>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <Typography>Cho mặt hàng trong </Typography>
            <a style={{ color: 'green', margin: '0 5px' }} onClick={toggleDrawer}>
              danh sách mặt hàng đã chọn(
              {selectedProductIds === undefined ? 0 : selectedProductIds.length})
            </a>
          </ListItem>
        </List>
      );
      break;
    case '1':
      content = (
        <List>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <p>Giảm giá</p>
            <InputField
              name="discountAmount"
              sx={{ width: '120px' }}
              type="number"
              InputProps={{
                style: { height: '25px', margin: '0 5px' }
              }}
            />
            <p>VND cho giỏ hàng</p>
          </ListItem>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <p>Giá tối thiểu của giỏ hàng sau khi giảm giá là</p>
            <InputField
              name="minPriceAfter"
              sx={{ width: '120px' }}
              type="number"
              InputProps={{
                style: { height: '25px', margin: '0 5px' }
              }}
            />
            <p>VND</p>
          </ListItem>
        </List>
      );
      break;
    case '2':
      content = (
        <List>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <p>Giảm giá</p>
            <InputField
              name="discountPercentage"
              type="number"
              sx={{ width: '120px' }}
              InputProps={{
                style: { height: '25px', margin: '0 5px' }
              }}
            />
            <p>% cho giỏ hàng</p>
          </ListItem>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <p>giá giảm tối đa là</p>
            <InputField
              name="maxAmount"
              type="number"
              sx={{ width: '120px' }}
              InputProps={{
                style: { height: '25px', margin: '0 5px' }
              }}
            />
            <p>VND</p>
          </ListItem>
        </List>
      );
      break;
    case '3':
      content = (
        <List>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <p>Giảm giá</p>
            <InputField
              name="discountAmount"
              sx={{ width: '120px' }}
              type="number"
              InputProps={{
                style: { height: '25px', margin: '0 5px' }
              }}
            />
            <p>VND phí vận chuyển cho giỏ hàng</p>
          </ListItem>
        </List>
      );
      break;
    case '11':
      content = (
        <List>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <p>Giảm giá</p>
            <InputField
              name="discountPercentage"
              sx={{ width: '120px' }}
              type="number"
              InputProps={{
                style: { height: '25px', margin: '0 5px' }
              }}
            />
            <p>% tính phí cho giỏ hàng</p>
          </ListItem>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <p>giá giảm tối đa là</p>
            <InputField
              name="maxAmount"
              type="number"
              sx={{ width: '120px' }}
              InputProps={{
                style: { height: '25px', margin: '0 5px' }
              }}
            />
            <p>VND</p>
          </ListItem>
        </List>
      );
      break;
    case '10':
      content = (
        <List>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <p>Chuyển đổi từ tổng tiền đơn hàng thành điểm theo tỷ lệ</p>
            <InputField
              name="bonusPointRate"
              sx={{ width: '120px' }}
              type="number"
              InputProps={{
                style: { height: '25px', margin: '0 5px' }
              }}
            />
            <p>cho đơn hàng</p>
          </ListItem>
        </List>
      );
      break;
    default:
      content = null;
      break;
  }
  return (
    <div>
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
        <Typography variant="h3" component="h3" style={{ marginTop: '8px', marginBottom: '8px' }}>
          DANH SÁCH SẢN PHẨM
        </Typography>
        <ResoTable
          checkboxSelection={{
            selection: selectedProductIds,
            type: type
          }}
          key="brandId"
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
      {content}
    </div>
  );
};

export default TaskComponent;

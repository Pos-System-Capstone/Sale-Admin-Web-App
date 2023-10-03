import React, { ReactElement, useEffect, useRef, useState } from 'react';
// import { InputField } from 'components/form';
import { InputField, SelectField } from 'components/form';
import { List, ListItem, Typography } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import ResoTable from 'components/ResoTable/ResoTable';
import productPromotionApi from 'api/promotion/product';
import { getUserInfo } from 'utils/utils';
import { productPromotionColumns } from '../Products/config';

interface TaskComponentProps {
  selectedText: string | null;
  type?: string | undefined;
}

const options = [
  { label: 'DEFAULT', value: 'DEFAULT' },
  { label: 'CHEAPEST', value: 'CHEAPEST' },
  { label: 'MOST EXPENSIVE', value: 'MOST EXPENSIVE' }
];

const TaskComponent = ({
  selectedText,
  type = 'checkbox'
}: TaskComponentProps): ReactElement | null => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>();
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const handleChangeSelection = React.useCallback((ids) => {
    setSelectedProductIds(ids);
  }, []);
  let content = null;
  const tableRef = useRef<any>();

  const userRaw = getUserInfo();
  const user: any = JSON.parse(userRaw ?? '{}');
  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.formControl.setValue('brandId', user.brandId!);
    }
  }, [user]);

  switch (selectedText) {
    case '2':
      content = (
        <List>
          <ListItem sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography>discount</Typography>
            <InputField
              name="discountAmount"
              sx={{ width: '100px' }}
              type="number"
              InputProps={{
                style: { height: '25px', margin: '0 5px' }
              }}
            />
            <Typography>VND</Typography>
          </ListItem>
          <ListItem sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography>minimum price of product after discount is</Typography>
            {/* <InputField name="minimumPrice" /> */}
            <InputField
              name="minPriceAfter"
              sx={{ width: '100px' }}
              type="number"
              InputProps={{
                style: { height: '25px', margin: '0 5px' }
              }}
            />
            <Typography>VND</Typography>
          </ListItem>
          <ListItem sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography>for Products in </Typography>
            <a style={{ color: 'green', margin: '0 5px' }} onClick={toggleDrawer}>
              selection list(0)
            </a>
          </ListItem>
        </List>
      );
      break;

    case '3':
      content = (
        <List>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <p>discount</p>
            {/* <InputField name="discountPercent" /> */}
            <InputField
              sx={{ width: '100px' }}
              type="number"
              InputProps={{
                style: { height: '25px', margin: '0 5px' }
              }}
              name="discountPercentage"
            />
            <p>%</p>
          </ListItem>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <p>and maximum discount price is </p>
            {/* <InputField name="maximunDiscount" /> */}
            <InputField
              name="maxAmount"
              sx={{ width: '100px' }}
              type="number"
              InputProps={{
                style: { height: '25px', margin: '0 5px' }
              }}
            />
            <p>VND</p>
          </ListItem>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <p>for Products in </p>
            <a style={{ color: 'green', margin: '0 5px' }} onClick={toggleDrawer}>
              selection list(0)
            </a>
          </ListItem>
        </List>
      );
      break;
    case '4':
      content = (
        <List>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <p>discount</p>
            <InputField
              name="discountAmount"
              sx={{ width: '100px' }}
              type="number"
              InputProps={{
                style: { height: '25px', margin: '0 5px' }
              }}
            />
            <p>until of Products in cart</p>
          </ListItem>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <p>for Products in </p>
            <a style={{ color: 'green', margin: '0 5px' }} onClick={toggleDrawer}>
              selection list(0)
            </a>
          </ListItem>
        </List>
      );
      break;
    case '5':
      content = (
        <List>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <p>fixed price</p>
            <InputField
              name="fixedPrice"
              sx={{ width: '100px' }}
              type="number"
              InputProps={{
                style: { height: '25px', margin: '0 5px' }
              }}
            />
            <p>VND</p>
          </ListItem>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <p>for Products in </p>
            <a style={{ color: 'green', margin: '0 5px' }} onClick={toggleDrawer}>
              selection list(0)
            </a>
          </ListItem>
        </List>
      );
      break;
    case '6':
      content = (
        <List>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <p>buy product at the price</p>
            <InputField
              name="fixedPrice"
              sx={{ width: '100px' }}
              type="number"
              InputProps={{
                style: { height: '25px', margin: '0 5px' }
              }}
            />
            <p>VND</p>
          </ListItem>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <p>since the product</p>
            <InputField
              name="discountQuantity"
              sx={{ width: '100px' }}
              type="number"
              InputProps={{
                style: { height: '25px', margin: '0 5px' }
              }}
            />
          </ListItem>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <p>for Products in </p>
            <a style={{ color: 'green', margin: '0 5px' }} onClick={toggleDrawer}>
              selection list(0)
            </a>
          </ListItem>
        </List>
      );
      break;
    case '7':
      content = (
        <List>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <p>buy</p>
            <InputField
              name="discountQuantity"
              sx={{ width: '100px' }}
              type="number"
              InputProps={{
                style: { height: '25px', margin: '0 5px' }
              }}
            />
            <p>product(s)</p>
          </ListItem>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <p>with the price</p>
            <InputField
              name="fixedPrice"
              sx={{ width: '100px' }}
              type="number"
              InputProps={{
                style: { height: '25px', margin: '0 5px' }
              }}
            />
            <p>VND</p>
          </ListItem>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <p>apply fot product(s) that are follow by </p>
            <SelectField
              name="selectField"
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
            <p>for Products in </p>
            <a style={{ color: 'green', margin: '0 5px' }} onClick={toggleDrawer}>
              selection list(0)
            </a>
          </ListItem>
        </List>
      );
      break;
    case '9':
      content = (
        <List>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <p>discount</p>
            <InputField
              name="discountAmount"
              sx={{ width: '100px' }}
              type="number"
              InputProps={{
                style: { height: '25px', margin: '0 5px' }
              }}
            />
            <p>VND for Cart</p>
          </ListItem>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <p>minimum price of cart after discount is</p>
            <InputField
              name="minPriceAfter"
              sx={{ width: '100px' }}
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
    case '10':
      content = (
        <List>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <p>discount</p>
            <InputField
              name="discountPercentage"
              type="number"
              sx={{ width: '100px' }}
              InputProps={{
                style: { height: '25px', margin: '0 5px' }
              }}
            />
            <p>% for cart</p>
          </ListItem>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <p>maximun discount price is</p>
            <InputField
              name="minPriceAfter"
              type="number"
              sx={{ width: '100px' }}
              InputProps={{
                style: { height: '25px', margin: '0 5px' }
              }}
            />
            <p>VND</p>
          </ListItem>
        </List>
      );
      break;
    case '11':
      content = (
        <List>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <p>discount</p>
            <InputField
              name="discountAmount"
              sx={{ width: '100px' }}
              type="number"
              InputProps={{
                style: { height: '25px', margin: '0 5px' }
              }}
            />
            <p>VND for shipping fee for cart</p>
          </ListItem>
        </List>
      );
      break;
    case '12':
      content = (
        <List>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <p>discount</p>
            <InputField
              name="discountPercentage"
              sx={{ width: '100px' }}
              type="number"
              InputProps={{
                style: { height: '25px', margin: '0 5px' }
              }}
            />
            <p>% for fee for cart</p>
          </ListItem>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <p>maximum discount price is</p>
            <InputField
              name="maxAmount"
              type="number"
              sx={{ width: '100px' }}
              InputProps={{
                style: { height: '25px', margin: '0 5px' }
              }}
            />
            <p>VND</p>
          </ListItem>
        </List>
      );
      break;
    case '13':
      content = (
        <List>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <p>Chuyển đổi từ tổng tiền đơn hàng thành điểm theo tỷ lệ</p>
            <InputField
              name="bonusPointRate"
              sx={{ width: '100px' }}
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
  const drawer = isDrawerOpen && (
    <div>
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
        <ResoTable
          checkboxSelection={{
            selection: selectedProductIds,
            type: type
          }}
          showAction={false}
          scroll={{ y: '50%', x: '100%' }}
          rowKey="id"
          ref={tableRef}
          getData={(param: any) => productPromotionApi.getProduct(param)}
          onChangeSelection={handleChangeSelection}
          columns={productPromotionColumns}
        />
      </Drawer>
    </div>
  );

  return (
    <div>
      {content}
      {drawer}
    </div>
  );
};

export default TaskComponent;

import React, { ReactElement, useState } from 'react';
// import { InputField } from 'components/form';
import { SelectField } from 'components/form';
import { List, ListItem, TextField, Typography } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import ResoTable from 'components/ResoTable/ResoTable';
import { getAllProduct } from 'redux/product/api';
import { productColumns } from 'pages/Products/config';

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

  switch (selectedText) {
    case '2':
      content = (
        <List>
          <ListItem sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography>discount</Typography>
            <TextField
              sx={{ width: '100px' }}
              InputProps={{
                style: { height: '25px', margin: '0 5px' }
              }}
            />
            <Typography>VND</Typography>
          </ListItem>
          <ListItem sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography>minimum price of product after discount is</Typography>
            {/* <InputField name="minimumPrice" /> */}
            <TextField
              sx={{ width: '100px' }}
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
            <TextField
              sx={{ width: '100px' }}
              InputProps={{
                style: { height: '25px', margin: '0 5px' }
              }}
            />
            <p>%</p>
          </ListItem>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <p>and maximum discount price is </p>
            {/* <InputField name="maximunDiscount" /> */}
            <TextField
              sx={{ width: '100px' }}
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
            <TextField
              sx={{ width: '100px' }}
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
            <TextField
              sx={{ width: '100px' }}
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
            <TextField
              sx={{ width: '100px' }}
              InputProps={{
                style: { height: '25px', margin: '0 5px' }
              }}
            />
            <p>VND</p>
          </ListItem>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <p>since the product</p>
            <TextField
              sx={{ width: '100px' }}
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
            <TextField
              sx={{ width: '100px' }}
              InputProps={{
                style: { height: '25px', margin: '0 5px' }
              }}
            />
            <p>product(s)</p>
          </ListItem>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <p>with the price</p>
            <TextField
              sx={{ width: '100px' }}
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
            <TextField
              sx={{ width: '100px' }}
              InputProps={{
                style: { height: '25px', margin: '0 5px' }
              }}
            />
            <p>VND for Cart</p>
          </ListItem>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <p>minimum price of cart after discount is</p>
            <TextField
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
    case '10':
      content = (
        <List>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <p>discount</p>
            <TextField
              sx={{ width: '100px' }}
              InputProps={{
                style: { height: '25px', margin: '0 5px' }
              }}
            />
            <p>% for cart</p>
          </ListItem>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <p>maximun discount price is</p>
            <TextField
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
            <TextField
              sx={{ width: '100px' }}
              InputProps={{
                style: { height: '25px', margin: '0 5px' }
              }}
            />
            <p>VND for fee for cart</p>
          </ListItem>
        </List>
      );
      break;
    case '12':
      content = (
        <List>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <p>discount</p>
            <TextField
              sx={{ width: '100px' }}
              InputProps={{
                style: { height: '25px', margin: '0 5px' }
              }}
            />
            <p>% for fee for cart</p>
          </ListItem>
          <ListItem style={{ display: 'flex', alignItems: 'center' }}>
            <p>maximum discount price is</p>
            <TextField
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
          getData={getAllProduct}
          onChangeSelection={handleChangeSelection}
          columns={productColumns}
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

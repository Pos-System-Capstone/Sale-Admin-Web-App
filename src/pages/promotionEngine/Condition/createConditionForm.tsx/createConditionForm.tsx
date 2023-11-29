import React, { useEffect, useRef, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import { SelectChangeEvent, TextField, Typography } from '@mui/material';
import ResoTable from 'components/ResoTable/ResoTable';
import { getUserInfo } from 'utils/utils';
import { InputField } from 'components/form';
import productPromotionApi from 'api/promotion/product';
import { productPromotionColumns } from 'pages/promotionEngine/Products/config';

interface CreateConditionFormProps {
  nodeId: string;
  content: string | null;
  type?: string | undefined;
}

const CreateConditionForm: React.FC<CreateConditionFormProps> = ({ nodeId, type = 'checkbox' }) => {
  // Cart Item
  const [quantityOperatorCI, setQuantityOperatorCI] = useState<string>('1');
  const [nextOperatorCI, setNextOperatorCI] = useState<number>(2);
  const [productConditionTypeCI, setProductConditionTypeCI] = useState<number>(2);
  // Cart
  const [quantityOperator, setQuantityOperator] = useState<string>('1');
  const [nextOperator, setNextOperator] = useState<number>(2);
  const [amountOperator, setAmountOperator] = useState<string>('1');

  const [selectedProductIds, setSelectedProductIds] = useState<string[]>();
  const [selectedProductCount, setSelectedProductCount] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleChangeSelection = React.useCallback((ids) => {
    setSelectedProductIds(ids);
    setSelectedProductCount(ids.length);
  }, []);

  const tableRef = useRef<any>();

  const userRaw = getUserInfo();
  const user: any = JSON.parse(userRaw ?? '{}');
  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.formControl.setValue('brandId', user.brandId!);
    }
  }, [user]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Cart Item
  const hanldeQuantityOperatorCI = (event: SelectChangeEvent<string>) => {
    setQuantityOperatorCI(event.target.value);
  };

  const handleNextOperatorCI = (event: SelectChangeEvent<any>) => {
    setNextOperatorCI(event.target.value);
  };

  const handleProductConditionTypeCI = (event: SelectChangeEvent<any>) => {
    setProductConditionTypeCI(event.target.value);
  };

  // Cart
  const handleQuantity = (event: SelectChangeEvent<string>) => {
    setQuantityOperator(event.target.value);
  };

  const handleNextOperator = (event: SelectChangeEvent<any>) => {
    setNextOperator(event.target.value);
  };

  const handleAmountOperator = (event: SelectChangeEvent<string>) => {
    setAmountOperator(event.target.value);
  };

  let formContent = null;

  if (nodeId === '1') {
    // Cart Item
    formContent = (
      <div>
        <p style={{ position: 'relative' }}>
          <div>
            <span
              style={{
                marginRight: '8px',
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '4px',
                height: '24px',
                background: '#57d8a1'
              }}
            ></span>
          </div>
          <p style={{ marginLeft: '8px' }}>
            mỗi sản phẩm trong{' '}
            <a onClick={toggleDrawer} style={{ color: '#57d8a1' }}>
              danh sách lựa chọn({selectedProductCount})
            </a>{' '}
            đều có số lượng{' '}
            <FormControl>
              <Select
                style={{ height: '30px', width: '60px' }}
                value={quantityOperatorCI}
                onChange={hanldeQuantityOperatorCI}
              >
                <MenuItem value="1">
                  <span>&gt;</span>
                </MenuItem>
                <MenuItem value="2">
                  <span>&#8805;</span>
                </MenuItem>
                <MenuItem value="5"> = </MenuItem>
                <MenuItem value="3">
                  <span>&lt;</span>
                </MenuItem>
                <MenuItem value="4">
                  <span>&#8804;</span>
                </MenuItem>
              </Select>
            </FormControl>{' '}
            <InputField
              name="productQuantity"
              sx={{ width: '100px' }}
              InputProps={{
                style: { height: '30px' }
              }}
            />
          </p>
        </p>

        <div> </div>
        <Select
          style={{ height: '50px', width: '100px', marginTop: '14px', marginBottom: '12px' }}
          value={nextOperatorCI}
          onChange={handleNextOperatorCI}
        >
          <MenuItem value={2}> VÀ</MenuItem>
          <MenuItem value={1}>HOẶC</MenuItem>
        </Select>
        <div> </div>
        <div>
          <div style={{ position: 'relative', marginTop: '18px' }}>
            <span
              style={{
                marginRight: '8px',
                marginTop: '5px',
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '4px',
                height: '26px',
                background: '#57d8a1'
              }}
            ></span>
          </div>

          <p style={{ marginLeft: '8px' }}>
            đặt hàng{' '}
            <Select
              name="productConditionType"
              style={{ height: '35px', width: '120px' }}
              value={productConditionTypeCI}
              onChange={handleProductConditionTypeCI}
            >
              <MenuItem value={2}>Bao gồm</MenuItem>
              <MenuItem value={1}>Ngoại trừ</MenuItem>
            </Select>{' '}
            tất cả các sản phẩm trong{' '}
            <a onClick={toggleDrawer} style={{ color: '#57d8a1' }}>
              danh sách lựa chọn({selectedProductCount})
            </a>
          </p>
        </div>
      </div>
    );
  } else if (nodeId === '4') {
    // Cart
    formContent = (
      <div>
        <p style={{ position: 'relative' }}>
          <div>
            <span
              style={{
                marginRight: '8px',
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '4px',
                height: '24px',
                background: '#57d8a1'
              }}
            ></span>
          </div>
          <p style={{ marginLeft: '8px' }}>
            số lượng sản phẩm đặt hàng là{' '}
            <FormControl>
              <Select
                name="quantityOperator"
                style={{ height: '30px', width: '60px' }}
                value={quantityOperator}
                onChange={handleQuantity}
              >
                <MenuItem value="1">
                  <span>&gt;</span>
                </MenuItem>
                <MenuItem value="2">
                  <span>&#8805;</span>
                </MenuItem>
                <MenuItem value="5"> = </MenuItem>
                <MenuItem value="3">
                  <span>&lt;</span>
                </MenuItem>
                <MenuItem value="4">
                  <span>&#8804;</span>
                </MenuItem>
              </Select>
            </FormControl>{' '}
            <InputField
              name="quantity"
              sx={{ width: '100px' }}
              InputProps={{
                style: { height: '30px' }
              }}
            />
          </p>
        </p>
        <div />
        <Select
          name="nextOperator"
          style={{ height: '50px', width: '100px', marginTop: '14px', marginBottom: '12px' }}
          value={nextOperator}
          onChange={handleNextOperator}
        >
          <MenuItem value={2}>VÀ</MenuItem>
          <MenuItem value={1}>HOẶC</MenuItem>
        </Select>
        <div />
        <div>
          <div style={{ position: 'relative', marginTop: '8px' }}>
            <span
              style={{
                marginRight: '8px',
                marginTop: '1px',
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '4px',
                height: '26px',
                background: '#57d8a1'
              }}
            ></span>
          </div>
          <p style={{ marginLeft: '8px' }}>
            đơn hàng có tổng số tiền{' '}
            <FormControl>
              <Select
                name="amountOperator"
                style={{ height: '30px', width: '60px' }}
                value={amountOperator}
                onChange={handleAmountOperator}
              >
                <MenuItem value="1">
                  <span>&gt;</span>
                </MenuItem>
                <MenuItem value="2">
                  <span>&#8805;</span>
                </MenuItem>
                <MenuItem value="5"> = </MenuItem>
                <MenuItem value="3">
                  <span>&lt;</span>
                </MenuItem>
                <MenuItem value="4">
                  <span>&#8804;</span>
                </MenuItem>
              </Select>
            </FormControl>{' '}
            <InputField
              name="amount"
              sx={{ width: '100px' }}
              InputProps={{
                style: { height: '30px' }
              }}
            />
          </p>
        </div>
      </div>
    );
  } else if (nodeId === '2') {
    // Quantity (Cart Item)
    formContent = (
      <p style={{ position: 'relative' }}>
        <div>
          <span
            style={{
              marginRight: '8px',
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '4px',
              height: '24px',
              background: '#57d8a1'
            }}
          ></span>
        </div>
        <p style={{ marginLeft: '8px' }}>
          mỗi sản phẩm trong{' '}
          <a onClick={toggleDrawer} style={{ color: '#57d8a1' }}>
            danh sách lựa chọn({selectedProductCount})
          </a>{' '}
          đều có số lượng{' '}
          <FormControl>
            <Select
              style={{ height: '30px', width: '60px' }}
              value={quantityOperatorCI}
              onChange={hanldeQuantityOperatorCI}
            >
              <MenuItem value="1">
                <span>&gt;</span>
              </MenuItem>
              <MenuItem value="2">
                <span>&#8805;</span>
              </MenuItem>
              <MenuItem value="5"> = </MenuItem>
              <MenuItem value="3">
                <span>&lt;</span>
              </MenuItem>
              <MenuItem value="4">
                <span>&#8804;</span>
              </MenuItem>
            </Select>
          </FormControl>{' '}
          <TextField
            sx={{ width: '100px' }}
            InputProps={{
              style: { height: '30px' }
            }}
          />
        </p>
      </p>
    );
  } else if (nodeId === '3') {
    // Product Code (Cart Item)
    formContent = (
      <div>
        <div style={{ position: 'relative' }}>
          <span
            style={{
              marginRight: '8px',
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '4px',
              height: '26px',
              background: '#57d8a1'
            }}
          ></span>
        </div>

        <p style={{ marginLeft: '8px' }}>
          đặt hàng{' '}
          <Select
            name="productConditionType"
            style={{ height: '30px', width: '120px' }}
            value={productConditionTypeCI}
            onChange={handleProductConditionTypeCI}
          >
            <MenuItem value={2}>Bao gồm</MenuItem>
            <MenuItem value={1}>Ngoại trừ</MenuItem>
          </Select>{' '}
          tất cả các sản phẩm trong{' '}
          <a onClick={toggleDrawer} style={{ color: '#57d8a1' }}>
            danh sách lựa chọn({selectedProductCount})
          </a>
        </p>
      </div>
    );
  } else if (nodeId === '5') {
    // Quantity (Cart)
    formContent = (
      <p style={{ position: 'relative' }}>
        <div>
          <span
            style={{
              marginRight: '8px',
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '4px',
              height: '24px',
              background: '#57d8a1'
            }}
          ></span>
        </div>
        <p style={{ marginLeft: '8px' }}>
          số lượng sản phẩm đặt hàng là{' '}
          <FormControl>
            <Select
              style={{ height: '30px', width: '60px' }}
              value={quantityOperator}
              onChange={handleQuantity}
            >
              <MenuItem value="1">
                <span>&gt;</span>
              </MenuItem>
              <MenuItem value="2">
                <span>&#8805;</span>
              </MenuItem>
              <MenuItem value="5"> = </MenuItem>
              <MenuItem value="3">
                <span>&lt;</span>
              </MenuItem>
              <MenuItem value="4">
                <span>&#8804;</span>
              </MenuItem>
            </Select>
          </FormControl>{' '}
          <InputField
            name="quantity"
            sx={{ width: '100px' }}
            InputProps={{
              style: { height: '30px' }
            }}
          />
        </p>
      </p>
    );
  } else if (nodeId === '6') {
    // Amount (Cart)
    formContent = (
      <div>
        <div style={{ position: 'relative' }}>
          <span
            style={{
              marginRight: '8px',
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '4px',
              height: '24px',
              background: '#57d8a1'
            }}
          ></span>
        </div>
        <p style={{ marginLeft: '8px' }}>
          Đơn hàng có tổng số tiền{' '}
          <FormControl>
            <Select
              name="amountOperator"
              style={{ height: '30px', width: '60px' }}
              value={amountOperator}
              onChange={handleAmountOperator}
            >
              <MenuItem value="1">
                <span>&gt;</span>
              </MenuItem>
              <MenuItem value="2">
                <span>&#8805;</span>
              </MenuItem>
              <MenuItem value="5"> = </MenuItem>
              <MenuItem value="3">
                <span>&lt;</span>
              </MenuItem>
              <MenuItem value="4">
                <span>&#8804;</span>
              </MenuItem>
            </Select>
          </FormControl>{' '}
          <InputField
            name="amount"
            sx={{ width: '100px' }}
            InputProps={{
              style: { height: '30px' }
            }}
          />
        </p>
      </div>
    );
  }

  return (
    <div>
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
        <Typography variant="h3" component="h3" style={{ marginTop: '8px', marginBottom: '8px' }}>
          SELECTION LIST
        </Typography>
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
      {formContent}
    </div>
  );
};

export default CreateConditionForm;

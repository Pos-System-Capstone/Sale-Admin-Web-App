import React, { useState, useEffect, useRef } from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import { SelectChangeEvent, TextField, Typography } from '@mui/material';

import { getUserInfo } from 'utils/utils';
import productPromotionApi from 'api/promotion/product';
import ResoTable from 'components/ResoTable/ResoTable';
import { productPromotionColumns } from 'pages/promotionEngine/Products/config';

interface CreateConditionFormProps {
  nodeId: string;
  content: string | null;
  type?: string | undefined;
}

const CreateConditionForm: React.FC<CreateConditionFormProps> = ({ nodeId, type = 'checkbox' }) => {
  const [selectedOperator1, setSelectedOperator1] = useState<string>('>');
  const [selectedOperator2, setSelectedOperator2] = useState<string>('AND');
  const [selectedOperator3, setSelectedOperator3] = useState<string>('Include');
  const [selectedOperator4, setSelectedOperator4] = useState<string>('>');
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

  const handleOperatorChange1 = (event: SelectChangeEvent<string>) => {
    setSelectedOperator1(event.target.value);
  };

  const handleOperatorChange2 = (event: SelectChangeEvent<string>) => {
    setSelectedOperator2(event.target.value);
  };

  const handleOperatorChange3 = (event: SelectChangeEvent<string>) => {
    setSelectedOperator3(event.target.value);
  };

  const handleOperatorChange4 = (event: SelectChangeEvent<string>) => {
    setSelectedOperator4(event.target.value);
  };

  let formContent = null;

  if (nodeId === '1') {
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
            each product in the{' '}
            <a onClick={toggleDrawer} style={{ color: '#57d8a1' }}>
              selection list({selectedProductCount})
            </a>{' '}
            has quantity{' '}
            <FormControl>
              <Select
                style={{ height: '30px', width: '60px' }}
                value={selectedOperator1}
                onChange={handleOperatorChange1}
              >
                <MenuItem value=">">
                  <span>&gt;</span>
                </MenuItem>
                <MenuItem value=">=">
                  <span>&#8805;</span>
                </MenuItem>
                <MenuItem value="="> = </MenuItem>
                <MenuItem value="<">
                  <span>&lt;</span>
                </MenuItem>
                <MenuItem value="<=">
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

        <div> </div>
        <Select
          style={{ height: '50px', width: '90px', marginTop: '14px', marginBottom: '12px' }}
          value={selectedOperator2}
          onChange={handleOperatorChange2}
        >
          <MenuItem value="AND">AND</MenuItem>
          <MenuItem value="OR">OR</MenuItem>
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
            order{' '}
            <Select
              style={{ height: '35px', width: '120px' }}
              value={selectedOperator3}
              onChange={handleOperatorChange3}
            >
              <MenuItem value="Include">Include</MenuItem>
              <MenuItem value="Exclude">Exclude</MenuItem>
            </Select>{' '}
            all products in{' '}
            <a onClick={toggleDrawer} style={{ color: '#57d8a1' }}>
              selection list({selectedProductCount})
            </a>
          </p>
        </div>
      </div>
    );
  } else if (nodeId === '4') {
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
            quantity of product in order is{' '}
            <FormControl>
              <Select
                style={{ height: '30px', width: '60px' }}
                value={selectedOperator1}
                onChange={handleOperatorChange1}
              >
                <MenuItem value=">">
                  <span>&gt;</span>
                </MenuItem>
                <MenuItem value=">=">
                  <span>&#8805;</span>
                </MenuItem>
                <MenuItem value="="> = </MenuItem>
                <MenuItem value="<">
                  <span>&lt;</span>
                </MenuItem>
                <MenuItem value="<=">
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
        <div />
        <Select
          style={{ height: '50px', width: '90px', marginTop: '14px', marginBottom: '12px' }}
          value={selectedOperator2}
          onChange={handleOperatorChange2}
        >
          <MenuItem value="AND">AND</MenuItem>
          <MenuItem value="OR">OR</MenuItem>
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
            order has total amount{' '}
            <FormControl>
              <Select
                style={{ height: '30px', width: '60px' }}
                value={selectedOperator4}
                onChange={handleOperatorChange4}
              >
                <MenuItem value=">">
                  <span>&gt;</span>
                </MenuItem>
                <MenuItem value=">=">
                  <span>&#8805;</span>
                </MenuItem>
                <MenuItem value="="> = </MenuItem>
                <MenuItem value="<">
                  <span>&lt;</span>
                </MenuItem>
                <MenuItem value="<=">
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
        </div>
      </div>
    );
  } else if (nodeId === '2') {
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
          each product in the{' '}
          <a onClick={toggleDrawer} style={{ color: '#57d8a1' }}>
            selection list({selectedProductCount})
          </a>{' '}
          has quantity{' '}
          <FormControl>
            <Select
              style={{ height: '30px', width: '60px' }}
              value={selectedOperator1}
              onChange={handleOperatorChange1}
            >
              <MenuItem value=">">
                <span>&gt;</span>
              </MenuItem>
              <MenuItem value=">=">
                <span>&#8805;</span>
              </MenuItem>
              <MenuItem value="="> = </MenuItem>
              <MenuItem value="<">
                <span>&lt;</span>
              </MenuItem>
              <MenuItem value="<=">
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
          order has total amount{' '}
          <FormControl>
            <Select
              style={{ height: '30px', width: '60px' }}
              value={selectedOperator4}
              onChange={handleOperatorChange4}
            >
              <MenuItem value=">">
                <span>&gt;</span>
              </MenuItem>
              <MenuItem value=">=">
                <span>&#8805;</span>
              </MenuItem>
              <MenuItem value="="> = </MenuItem>
              <MenuItem value="<">
                <span>&lt;</span>
              </MenuItem>
              <MenuItem value="<=">
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
      </div>
    );
  } else if (nodeId === '5') {
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
          quantity of product in order is{' '}
          <FormControl>
            <Select
              style={{ height: '30px', width: '60px' }}
              value={selectedOperator1}
              onChange={handleOperatorChange1}
            >
              <MenuItem value=">">
                <span>&gt;</span>
              </MenuItem>
              <MenuItem value=">=">
                <span>&#8805;</span>
              </MenuItem>
              <MenuItem value="="> = </MenuItem>
              <MenuItem value="<">
                <span>&lt;</span>
              </MenuItem>
              <MenuItem value="<=">
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
  } else if (nodeId === '6') {
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
          order has total amount{' '}
          <FormControl>
            <Select
              style={{ height: '30px', width: '60px' }}
              value={selectedOperator4}
              onChange={handleOperatorChange4}
            >
              <MenuItem value=">">
                <span>&gt;</span>
              </MenuItem>
              <MenuItem value=">=">
                <span>&#8805;</span>
              </MenuItem>
              <MenuItem value="="> = </MenuItem>
              <MenuItem value="<">
                <span>&lt;</span>
              </MenuItem>
              <MenuItem value="<=">
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

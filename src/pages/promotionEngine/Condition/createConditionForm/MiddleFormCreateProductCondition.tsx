import { Grid } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { ConditionGroupsContext } from '../ConditionForm';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ToggleProduct from './ToggleProduct';
import { CreateConditionContext } from '../createCondition';
import { InputField, SelectField } from 'components/form';
import { listNextOperator, listProductType, listQuantityOperator } from './config';
import { TProductCondition } from 'types/promotion/condition';

interface Props {
  removeProductCondition: any;
}

export default function MiddleFormCreateCondition({ removeProductCondition }: Props) {
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>();
  const [selectedProductCount, setSelectedProductCount] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const context = useContext(CreateConditionContext);
  const { conditionGroupIndex, productIndex } = useContext(ConditionGroupsContext);
  const updateValue = context.setValue;
  const getValue = context.getValues;
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleChangeSelection = React.useCallback((ids) => {
    setSelectedProductIds(ids);
    setSelectedProductCount(ids.length);
  }, []);

  useEffect(() => {
    updateValue(
      `conditionGroups[${conditionGroupIndex}].productCondition[${productIndex}].productIdList`,
      selectedProductIds
    );
  }, [selectedProductIds]);

  const check = getValue(
    `conditionGroups[${conditionGroupIndex}].productCondition[${productIndex}].productConditionType`
  );
  const deleteHandler = () => {
    removeProductCondition(productIndex);

    const updatedProductConditions = getValue(
      `conditionGroups[${conditionGroupIndex}].productCondition`
    );
    updatedProductConditions.forEach((condition: TProductCondition, index: number) => {
      condition.index = index + 1;
    });
    updateValue(
      `conditionGroups[${conditionGroupIndex}].productCondition`,
      updatedProductConditions
    );
  };
  return (
    <>
      <ToggleProduct
        isDrawerOpen={isDrawerOpen}
        handleChangeSelection={handleChangeSelection}
        toggleDrawer={toggleDrawer}
        selectedProductIds={selectedProductIds}
      />
      {productIndex! >= 1 && (
        <Grid item xs={12}>
          <SelectField
            name={`conditionGroups[${conditionGroupIndex}].productCondition[${
              productIndex! - 1
            }].nextOperator`}
            label="So sánh kế tiếp"
            options={listNextOperator}
          />
        </Grid>
      )}
      {check < 3 ? (
        <Grid container spacing={2}>
          <Grid container item xs={11} spacing={0}>
            <Grid item xs={12}>
              <p>
                đơn hàng{' '}
                <SelectField
                  name={`conditionGroups[${conditionGroupIndex}].productCondition[${productIndex}].productConditionType`}
                  label=""
                  options={listProductType}
                />{' '}
                các sản phẩm trong{' '}
                <a onClick={toggleDrawer} style={{ color: '#57d8a1' }}>
                  danh sách lựa chọn({selectedProductCount})
                </a>
              </p>
            </Grid>
          </Grid>
          <Grid item xs={1}>
            <Button onClick={deleteHandler}>
              <DeleteIcon />
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2}>
          <Grid container item xs={11} spacing={2}>
            <Grid item xs={10}>
              <p style={{ marginLeft: '8px' }}>
                mỗi sản phẩm trong{' '}
                <a onClick={toggleDrawer} style={{ color: '#57d8a1' }}>
                  danh sách lựa chọn({selectedProductCount})
                </a>{' '}
                đều có số lượng{' '}
                <SelectField
                  name={`conditionGroups[${conditionGroupIndex}].productCondition[${productIndex}].quantityOperator`}
                  label=""
                  options={listQuantityOperator}
                />
              </p>
            </Grid>
            <Grid item xs={2}>
              <InputField
                name={`conditionGroups[${conditionGroupIndex}].productCondition[${productIndex}].productQuantity`}
                label="Số lượng"
              />
            </Grid>
          </Grid>
          <Grid item xs={1}>
            <Button onClick={deleteHandler}>
              <DeleteIcon />
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
}

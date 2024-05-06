import { Grid } from '@mui/material';
import React, { useContext, useState } from 'react';
import { ConditionContext, ConditionGroupsContext } from '../ConditionForm';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ToggleProduct from './ToggleProduct';
import { CreateConditionContext } from '../createCondition';
import { InputField, SelectField } from 'components/form';
import { amountOperator, listNextOperator, listQuantityOperator } from './config';
import { TOrderCondition } from 'types/promotion/condition';

interface Props {
  removeOrderCondition: any;
}

export default function MiddleFormUpdateOrderCondition({ removeOrderCondition }: Props) {
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>();
  const [selectedProductCount, setSelectedProductCount] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const context = useContext(CreateConditionContext);
  const { conditionGroupIndex, orderIndex } = useContext(ConditionGroupsContext);
  const updateValue = context.setValue;
  const getValue = context.getValues;
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleChangeSelection = React.useCallback((ids) => {
    setSelectedProductIds(ids);
    setSelectedProductCount(ids.length);
  }, []);

  const check = getValue(
    `conditionGroups[${conditionGroupIndex}].orderConditions[${orderIndex}].quantity`
  );
  const conditionCtx = useContext(ConditionContext);
  const deleteHandler = () => {
    removeOrderCondition(orderIndex);
    const updatedProductConditions = getValue(
      `conditionGroups[${conditionGroupIndex}].orderConditions`
    );
    updatedProductConditions.forEach((condition: TOrderCondition, index: number) => {
      condition.index = index + 1;
    });
    updateValue(
      `conditionGroups[${conditionGroupIndex}].orderConditions`,
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
      {orderIndex! >= 1 && (
        <Grid item xs={12}>
          <SelectField
            name={`conditionGroups[${conditionGroupIndex}].orderConditions[${
              orderIndex! - 1
            }].nextOperator`}
            label="So sánh kế tiếp"
            options={listNextOperator}
          />
        </Grid>
      )}
      {check > 0 ? (
        <Grid container spacing={2}>
          <Grid container item xs={11} spacing={2}>
            <Grid item xs={12}>
              <p>
                đơn hàng có tổng số lượng sản phẩm{' '}
                <SelectField
                  name={`conditionGroups[${conditionGroupIndex}].orderConditions[${orderIndex}].quantityOperator`}
                  label=""
                  options={listQuantityOperator}
                />{' '}
                <InputField
                  name={`conditionGroups[${conditionGroupIndex}].orderConditions[${orderIndex}].quantity`}
                  label="Số lượng"
                />
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
            <Grid item xs={12}>
              <p>
                đơn hàng có tổng giá trị{' '}
                <SelectField
                  name={`conditionGroups[${conditionGroupIndex}].orderConditions[${orderIndex}].amountOperator`}
                  label=""
                  options={amountOperator}
                />{' '}
                <InputField
                  name={`conditionGroups[${conditionGroupIndex}].orderConditions[${orderIndex}].amount`}
                  label="Giá trị"
                />
              </p>
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

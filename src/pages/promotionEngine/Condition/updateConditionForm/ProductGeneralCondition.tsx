import React, { useContext } from 'react';
import { TProductCondition, TProductConditionUpdate } from 'types/promotion/condition';
import { Grid } from '@mui/material';
import { ConditionGroupsContext } from '../ConditionForm';
import MiddleFormUpdateProductCondition from './MiddleFormUpdateProductCondition';

interface Props {
  appendProductCondition: (condition: Partial<TProductCondition>) => void;
  removeProductCondition: any;
  productConditionFields: any;
}

export default function ProductGeneralCondition({
  productConditionFields,
  removeProductCondition,
  appendProductCondition
}: Props) {
  const { conditionGroupIndex } = useContext(ConditionGroupsContext);
  const listProductIds = productConditionFields.map(
    (product: TProductConditionUpdate, index: number) => product.listProduct[index].productId
  );
  return (
    <>
      <Grid item container spacing={0}>
        {productConditionFields?.map((child: any, index: number) => (
          <Grid key={index} item xs={12}>
            <ConditionGroupsContext.Provider value={{ conditionGroupIndex, productIndex: index }}>
              <MiddleFormUpdateProductCondition
                removeProductCondition={removeProductCondition}
                listProductIds={listProductIds}
              />
            </ConditionGroupsContext.Provider>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

import { Card, Grid } from '@mui/material';
import React from 'react';
import ProductGeneralCondition from './ProductGeneralCondition';
import OrderGeneralCondition from './OrderGeneralCondition';
import { TOrderCondition, TProductCondition } from 'types/promotion/condition';

interface Props {
  appendProductCondition: (condition: Partial<TProductCondition>) => void;
  removeProductCondition: any;
  productConditionFields: any;
  appendOrderCondition: (condition: Partial<TOrderCondition>) => void;
  removeOrderCondition: any;
  orderConditionFields: any;
}
export default function GeneralCondition({
  appendOrderCondition,
  removeOrderCondition,
  orderConditionFields,
  productConditionFields,
  removeProductCondition,
  appendProductCondition
}: Props) {
  const existProduct = productConditionFields.length > 0;
  const existOrder = orderConditionFields.length > 0;
  return (
    <Grid container spacing={2}>
      {existProduct && (
        <Grid item xs={12}>
          <Card>
            <ProductGeneralCondition
              productConditionFields={productConditionFields}
              removeProductCondition={removeProductCondition}
              appendProductCondition={appendProductCondition}
            />
          </Card>
        </Grid>
      )}
      {existOrder && (
        <Grid item xs={12}>
          <Card>
            <OrderGeneralCondition
              orderConditionFields={orderConditionFields}
              removeOrderCondition={removeOrderCondition}
              appendOrderCondition={appendOrderCondition}
            />
          </Card>
        </Grid>
      )}
    </Grid>
  );
}

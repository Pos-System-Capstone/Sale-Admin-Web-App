import React, { useContext } from 'react';
import { TOrderCondition } from 'types/promotion/condition';
import { Grid } from '@mui/material';
import { ConditionGroupsContext } from '../ConditionForm';
import MiddleFormUpdateOrderCondition from './MiddleFormUpdateOrderCondition';

interface Props {
  appendOrderCondition: (condition: Partial<TOrderCondition>) => void;
  removeOrderCondition: any;
  orderConditionFields: any;
}

export default function OrderGeneralCondition({
  appendOrderCondition,
  removeOrderCondition,
  orderConditionFields
}: Props) {
  const { conditionGroupIndex } = useContext(ConditionGroupsContext);
  return (
    <>
      <Grid item container spacing={0}>
        {orderConditionFields?.map((child: any, index: number) => (
          <Grid key={index} item xs={12}>
            <ConditionGroupsContext.Provider value={{ conditionGroupIndex, orderIndex: index }}>
              <MiddleFormUpdateOrderCondition removeOrderCondition={removeOrderCondition} />
            </ConditionGroupsContext.Provider>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

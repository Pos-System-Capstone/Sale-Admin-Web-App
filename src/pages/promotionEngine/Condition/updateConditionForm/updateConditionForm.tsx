import React, { useContext, useEffect, useRef } from 'react';
// import Drawer from '@mui/material/Drawer';
// import { Typography } from '@mui/material';
// import ResoTable from 'components/ResoTable/ResoTable';
import { getUserInfo } from 'utils/utils';
// import productPromotionApi from 'api/promotion/product';
// import { productPromotionColumns } from 'pages/promotionEngine/Products/config';
import { ConditionGroupsContext } from '../ConditionForm';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { TConditionUpdate } from 'types/promotion/condition';
import GeneralCondition from './GeneralCondition';

interface UpdateConditionFormProps {
  flashing?: boolean;
  conditionFields: any;
  nodeId: string;
  content: string | null;
  type?: string | undefined;
}

const UpdateConditionForm: React.FC<UpdateConditionFormProps> = ({
  flashing,
  nodeId,
  type = 'checkbox',
  conditionFields
}) => {
  const { conditionGroupIndex } = useContext(ConditionGroupsContext);
  const tableRef = useRef<any>();
  const userRaw = getUserInfo();
  const user: any = JSON.parse(userRaw ?? '{}');
  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.formControl.setValue('brandId', user.brandId!);
    }
  }, [user]);

  const { control } = useFormContext<TConditionUpdate>();

  const {
    fields: productConditionFields,
    remove: removeProductCondition,
    append: appendProductCondition
  } = useFieldArray<TConditionUpdate>({
    control,
    name: `conditionGroups.${conditionGroupIndex}.productConditions`
  });

  const {
    fields: orderConditionFields,
    remove: removeOrderCondition,
    append: appendOrderCondition
  } = useFieldArray<TConditionUpdate>({
    control,
    name: `conditionGroups.${conditionGroupIndex}.orderConditions`
  });

  const addHandlerQuantity = () => {
    appendProductCondition({
      index: productConditionFields.length + 1,
      nextOperator: 2,
      productQuantity: 1,
      quantityOperator: '>=',
      productConditionType: 3,
      productIdList: []
    });
  };

  const addHandlerCode = () => {
    appendProductCondition({
      index: productConditionFields.length + 1,
      nextOperator: 2,
      productQuantity: 0,
      quantityOperator: '>=',
      productConditionType: 1,
      productIdList: []
    });
  };

  const addHandlerOrderQuantity = () => {
    appendOrderCondition({
      index: orderConditionFields.length + 1,
      nextOperator: 2,
      quantity: 1,
      quantityOperator: '>=',
      amount: 0,
      amountOperator: '>='
    });
  };
  const addHandlerOrderAmount = () => {
    appendOrderCondition({
      index: orderConditionFields.length + 1,
      nextOperator: 2,
      quantity: 0,
      quantityOperator: '>=',
      amount: 0,
      amountOperator: '>='
    });
  };

  console.log('test', conditionGroupIndex);
  // useEffect(() => {
  //   if (nodeId === '2') {
  //     addHandlerQuantity();
  //   }
  //   if (nodeId === '3') {
  //     addHandlerCode();
  //   }
  //   if (nodeId === '5') {
  //     addHandlerOrderQuantity();
  //   }
  //   if (nodeId === '6') {
  //     addHandlerOrderAmount();
  //   }
  // }, [flashing]);

  let formContent = null;

  if (nodeId === '1') {
    formContent = (
      <GeneralCondition
        productConditionFields={productConditionFields}
        removeProductCondition={removeProductCondition}
        appendProductCondition={appendProductCondition}
        orderConditionFields={orderConditionFields}
        removeOrderCondition={removeOrderCondition}
        appendOrderCondition={appendOrderCondition}
      />
    );
  } else if (nodeId === '4') {
    // Cart
    formContent = (
      <GeneralCondition
        productConditionFields={productConditionFields}
        removeProductCondition={removeProductCondition}
        appendProductCondition={appendProductCondition}
        orderConditionFields={orderConditionFields}
        removeOrderCondition={removeOrderCondition}
        appendOrderCondition={appendOrderCondition}
      />
    );
  } else if (nodeId === '2') {
    formContent = (
      <GeneralCondition
        productConditionFields={productConditionFields}
        removeProductCondition={removeProductCondition}
        appendProductCondition={appendProductCondition}
        orderConditionFields={orderConditionFields}
        removeOrderCondition={removeOrderCondition}
        appendOrderCondition={appendOrderCondition}
      />
    );
  } else if (nodeId === '3') {
    // Product Code (Cart Item)
    formContent = (
      <GeneralCondition
        productConditionFields={productConditionFields}
        removeProductCondition={removeProductCondition}
        appendProductCondition={appendProductCondition}
        orderConditionFields={orderConditionFields}
        removeOrderCondition={removeOrderCondition}
        appendOrderCondition={appendOrderCondition}
      />
    );
  } else if (nodeId === '5') {
    // Quantity (Cart)
    formContent = (
      <GeneralCondition
        productConditionFields={productConditionFields}
        removeProductCondition={removeProductCondition}
        appendProductCondition={appendProductCondition}
        orderConditionFields={orderConditionFields}
        removeOrderCondition={removeOrderCondition}
        appendOrderCondition={appendOrderCondition}
      />
    );
  } else if (nodeId === '6') {
    // Amount (Cart)
    formContent = (
      <GeneralCondition
        productConditionFields={productConditionFields}
        removeProductCondition={removeProductCondition}
        appendProductCondition={appendProductCondition}
        orderConditionFields={orderConditionFields}
        removeOrderCondition={removeOrderCondition}
        appendOrderCondition={appendOrderCondition}
      />
    );
  }

  return <>{formContent}</>;
};

export default UpdateConditionForm;

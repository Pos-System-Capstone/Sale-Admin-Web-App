export type TConditionBase = {
  conditionRuleId?: any;
  brandId?: any;
  ruleName?: any;
  description?: any;
  conditionGroups: [
    {
      conditionGroupId?: any;
      conditionRuleId?: any;
      groupNo?: any;
      nextOperator?: any;
      conditions: [
        {
          orderConditionId?: any;
          conditionGroupId?: any;
          nextOperator?: any;
          indexGroup?: any;
          quantity?: any;
          quantityOperator?: any;
          amount?: any;
          amountOperator?: any;
          delFlg?: any;
          insDate?: any;
          updDate?: any;
        }
      ];
      summary?: any;
    }
  ];
  promotionId?: any;
  promotionName?: any;
  insDate?: any;
  updDate?: any;
};

export interface TConditionCreate {
  brandId: string;
  ruleName: string;
  description: string;
  conditionGroups: ConditionGroup[];
}

export interface TConditionUpdate {
  conditionRuleId: string;
  brandId: string;
  ruleName: string;
  description: string;
  conditionGroups: ConditionGroup[];
}

export interface ConditionGroup {
  groupNo: number;
  nextOperator: number;
  orderConditions: TOrderCondition[];
  productConditions: TProductCondition[] | [];
}

export interface TOrderCondition {
  index: number;
  nextOperator: number;
  quantity: number;
  quantityOperator: string;
  amount: number;
  amountOperator: string;
}

export interface TProductCondition {
  index: number;
  nextOperator: number;
  productConditionType: number;
  productQuantity: number;
  quantityOperator: string;
  productIdList: string[];
}

export interface TProductConditionUpdate {
  index: number;
  nextOperator: number;
  productConditionType: number;
  productQuantity: number;
  quantityOperator: string;
  listProduct: TProduct[];
}
export interface TProduct {
  productId: string;
}
export const CONDITION_TYPE_DATA = () => {
  return [
    {
      value: 1,
      label: 'Cart item'
    },
    {
      value: 2,
      label: 'Quantity'
    },
    {
      value: 3,
      label: 'Product code'
    },
    {
      value: 4,
      label: 'Cart'
    },
    {
      value: 5,
      label: 'Quantity'
    },
    {
      value: 6,
      label: 'Amount'
    }
  ];
};

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

export type TConditionCreate = {
  brandId: string;
  ruleName: string;
  description: string;
  conditionGroup: ConditionGroup[];
}

export type ConditionGroup = {
  conditionGroupId: string;
  groupNo: number;
  nextOperator: number;
  orderCondition: OrderCondition[];
  productCondition: ProductCondition[];
}

export type OrderCondition = {
  nextOperator: number;
  indexGroup: number;
  quantity: number;
  quantityOperator: string;
  amount: number;
  amountOperator: string;
}

export type ProductCondition = {
  indexGroup: number;
  productConditionType: number;
  productQuantity: number;
  quantityOperator: string;
  nextOperator: number;
}

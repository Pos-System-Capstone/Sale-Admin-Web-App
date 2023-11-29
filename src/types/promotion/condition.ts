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
  conditionRuleId: string;
  brandId: string;
  ruleName: string;
  description: string;
  conditionGroups: ConditionGroup[];
  promotionId: any;
  promotionName: any;
  insDate: string;
  updDate: string;
};

export type ConditionGroup = {
  conditionGroupId: string;
  conditionRuleId: string;
  groupNo: number;
  nextOperator: number;
  conditions: Condition[];
  summary: string;
};

export type Condition = {
  orderConditionId: string;
  conditionGroupId: string;
  nextOperator: number;
  indexGroup: number;
  quantity: number;
  quantityOperator: string;
  amount: number;
  amountOperator: string;
  delFlg: boolean;
  insDate: string;
  updDate: string;
};

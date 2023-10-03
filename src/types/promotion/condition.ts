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

// export interface TConditionCreate {
//   brandId: string
//   ruleName: string
//   description: string
//   conditionGroup: ConditionGroup[]
// }

// export interface ConditionGroup {
//   delFlg: boolean
//   insDate: string
//   updDate: string
//   conditionGroupId: string
//   groupNo: number
//   nextOperator: number
//   summary: string
//   orderCondition: OrderCondition[]
//   productCondition: ProductCondition[]
// }

// export interface OrderCondition {
//   nextOperator: number
//   indexGroup: number
//   quantity: number
//   quantityOperator: string
//   amount: number
//   amountOperator: string
// }

// export interface ProductCondition {
//   indexGroup: number
//   productConditionType: number
//   productQuantity: number
//   quantityOperator: string
//   nextOperator: number
// }


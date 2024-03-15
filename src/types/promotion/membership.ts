export type TMembership = {
  phoneNumber?: any;
  email?: any;
  fullname?: any;
  insDate?: any;
  updDate?: any;
  memberLevelId?: any;
  gender?: any;
};


export type TTransactionByMemberShipId = {
  insDate?: any;
  updDate?: any;
  amount?: any;
  currency?: any;
  type?: any;
  description?: any;
  isIncrease?: any;
};

export type TMembershipProgram = {
  nameOfProgram?: any;
  startDay?: any;
  endDay?: any;
  status?: any;
  membership?: any[];
  membershipCardType?: any[];
  walletType?: any[];

};



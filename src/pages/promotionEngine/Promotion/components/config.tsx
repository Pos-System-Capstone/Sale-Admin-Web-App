// const promotionTypeList: string[] = ['Using voucher', 'Using code', 'Automatic'];

import useLocales from 'hooks/useLocales';

const promotionTypeList = () => {
  const { translate } = useLocales(); // eslint-disable-line
  return [
    {
      label: `${translate('promotionSystem.promotion.createPromotion.usingVoucher')}`,
      value: 'usingVoucher'
    },
    {
      label: `${translate('promotionSystem.promotion.createPromotion.usingCode')}`,
      value: 'usingCode'
    },
    {
      label: `${translate('promotionSystem.promotion.createPromotion.automatic')}`,
      value: 'automatic'
    }
  ];
};

const kindActionList = () => {
  const { translate } = useLocales(); // eslint-disable-line
  return [
    {
      label: `${translate('promotionSystem.promotion.createPromotion.discount')}`,
      value: 'discount'
    },
    { label: `${translate('promotionSystem.promotion.createPromotion.gift')}`, value: 'gift' }
  ];
};

const discountActionList = () => {
  const { translate } = useLocales(); // eslint-disable-line
  return [
    {
      label: `${translate(
        'promotionSystem.promotion.createPromotion.discountActionType.discountAmountOfOrder'
      )}`,
      value: 'discountAmountOfOrder'
    },
    {
      label: `${translate(
        'promotionSystem.promotion.createPromotion.discountActionType.discountPercentageOfOrder'
      )}`,
      value: 'discountPercentageOfOrder'
    },
    {
      label: `${translate(
        'promotionSystem.promotion.createPromotion.discountActionType.discountShippingFeeOfOrder'
      )}`,
      value: 'discountShippingFeeOfOrder'
    },
    {
      label: `${translate(
        'promotionSystem.promotion.createPromotion.discountActionType.discountAmountOfItem'
      )}`,
      value: 'discountAmountOfItem'
    },
    {
      label: `${translate(
        'promotionSystem.promotion.createPromotion.discountActionType.discountPercentOfItem'
      )}`,
      value: 'discountPercentOfItem'
    },
    {
      label: `${translate(
        'promotionSystem.promotion.createPromotion.discountActionType.discountUnitOfItem'
      )}`,
      value: 'discountUnitOfItem'
    },
    {
      label: `${translate(
        'promotionSystem.promotion.createPromotion.discountActionType.fixedPriceOfItem'
      )}`,
      value: 'fixedPriceOfItem'
    },
    {
      label: `${translate(
        'promotionSystem.promotion.createPromotion.discountActionType.ladderPriceOfItem'
      )}`,
      value: 'ladderPriceOfItem'
    },
    {
      label: `${translate(
        'promotionSystem.promotion.createPromotion.discountActionType.bundlePriceOfItem'
      )}`,
      value: 'bundlePriceOfItem'
    }
  ];
};

const giftActionList = () => {
  const { translate } = useLocales(); // eslint-disable-line
  return [
    {
      label: `${translate('promotionSystem.promotion.createPromotion.giftActionType.giftVoucher')}`,
      value: 'giftVoucher'
    },
    {
      label: `${translate('promotionSystem.promotion.createPromotion.giftActionType.giftProduct')}`,
      value: 'giftProduct'
    },
    {
      label: `${translate('promotionSystem.promotion.createPromotion.giftActionType.giftPoint')}`,
      value: 'giftPoint'
    },
    {
      label: `${translate(
        'promotionSystem.promotion.createPromotion.giftActionType.giftGameCode'
      )}`,
      value: 'giftGameCode'
    }
  ];
};

const timeFrameList: string[] = [
  '00:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00'
];

const particularDayList = () => {
  const { translate } = useLocales(); // eslint-disable-line
  return [
    `${translate('promotionSystem.dayInWeek.sunday')}`,
    `${translate('promotionSystem.dayInWeek.monday')}`,
    `${translate('promotionSystem.dayInWeek.tuesday')}`,
    `${translate('promotionSystem.dayInWeek.wednesday')}`,
    `${translate('promotionSystem.dayInWeek.thursday')}`,
    `${translate('promotionSystem.dayInWeek.friday')}`,
    `${translate('promotionSystem.dayInWeek.saturday')}`
  ];
};

const paymentMethodList = () => {
  const { translate } = useLocales(); // eslint-disable-line
  return [
    {
      label: `${translate('promotionSystem.promotion.settings.paymentMethodType.cash')}`,
      value: 'cash'
    },
    {
      label: `${translate('promotionSystem.promotion.settings.paymentMethodType.creditCard')}`,
      value: 'creditCard'
    },
    {
      label: `${translate('promotionSystem.promotion.settings.paymentMethodType.bankTransfer')}`,
      value: 'bankTransfer'
    },
    {
      label: `${translate('promotionSystem.promotion.settings.paymentMethodType.eWallet')}`,
      value: 'eWallet'
    },
    {
      label: `${translate('promotionSystem.promotion.settings.paymentMethodType.mobileBanking')}`,
      value: 'mobileBanking'
    },
    {
      label: `${translate('promotionSystem.promotion.settings.paymentMethodType.cod')}`,
      value: 'cod'
    }
  ];
};

const targetCustomerList = () => {
  const { translate } = useLocales(); // eslint-disable-line
  return [
    {
      label: translate('promotionSystem.promotion.settings.targetCustomerType.guest'),
      value: 'guest'
    },
    {
      label: translate('promotionSystem.promotion.settings.targetCustomerType.membership'),
      value: 'membership'
    }
  ];
};
const genderList = () => {
  const { translate } = useLocales(); // eslint-disable-line
  return [
    { label: translate('promotionSystem.promotion.settings.genderType.male'), value: 'male' },
    { label: translate('promotionSystem.promotion.settings.genderType.female'), value: 'female' }
  ];
};

const saleModeList = () => {
  const { translate } = useLocales(); // eslint-disable-line
  return [
    { label: translate('promotionSystem.promotion.settings.saleModeType.eatIn'), value: 'eatIn' },
    {
      label: translate('promotionSystem.promotion.settings.saleModeType.takeAway'),
      value: 'takeAway'
    },
    {
      label: translate('promotionSystem.promotion.settings.saleModeType.delivery'),
      value: 'delivery'
    }
  ];
};

const applyByList = () => {
  const { translate } = useLocales(); // eslint-disable-line
  return [
    {
      label: translate('promotionSystem.promotion.settings.applyByType.store'),
      value: 'store'
    },
    {
      label: translate('promotionSystem.promotion.settings.applyByType.online'),
      value: 'online'
    }
  ];
};
const exclusiveList = () => {
  const { translate } = useLocales(); // eslint-disable-line
  return [
    {
      label: translate('promotionSystem.promotion.settings.exclusiveType.none'),
      value: 'none'
    },
    {
      label: translate('promotionSystem.promotion.settings.exclusiveType.level'),
      value: 'level'
    },
    {
      label: translate('promotionSystem.promotion.settings.exclusiveType.global'),
      value: 'global'
    }
  ];
};
const memberLevelList = () => {
  const { translate } = useLocales(); // eslint-disable-line
  return [
    {
      label: translate('promotionSystem.promotion.settings.memberLevelType.level1'),
      value: 'level1'
    },
    {
      label: translate('promotionSystem.promotion.settings.memberLevelType.level2'),
      value: 'level2'
    }
  ];
};
export {
  promotionTypeList,
  particularDayList,
  paymentMethodList,
  kindActionList,
  discountActionList,
  giftActionList,
  targetCustomerList,
  timeFrameList,
  genderList,
  saleModeList,
  applyByList,
  exclusiveList,
  memberLevelList
};

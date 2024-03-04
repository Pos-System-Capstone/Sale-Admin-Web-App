// const promotionTypeList: string[] = ['Using voucher', 'Using code', 'Automatic'];

import useLocales from 'hooks/useLocales';

const promotionTypeList = () => {
  const { translate } = useLocales(); // eslint-disable-line
  return [
    {
      label: `${translate('promotionSystem.promotion.createPromotion.usingVoucher')}`,
      value: 2
    },
    {
      label: `${translate('promotionSystem.promotion.createPromotion.usingCode')}`,
      value: 1
    },
    {
      label: `${translate('promotionSystem.promotion.createPromotion.automatic')}`,
      value: 0
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
      value: 1
    },
    {
      label: `${translate(
        'promotionSystem.promotion.createPromotion.discountActionType.discountPercentageOfOrder'
      )}`,
      value: 2
    },
    {
      label: `${translate(
        'promotionSystem.promotion.createPromotion.discountActionType.discountShippingFeeOfOrder'
      )}`,
      value: 3
    },
    {
      label: `${translate(
        'promotionSystem.promotion.createPromotion.discountActionType.discountAmountOfItem'
      )}`,
      value: 4
    },
    {
      label: `${translate(
        'promotionSystem.promotion.createPromotion.discountActionType.discountPercentOfItem'
      )}`,
      value: 5
    },
    {
      label: `${translate(
        'promotionSystem.promotion.createPromotion.discountActionType.discountUnitOfItem'
      )}`,
      value: 6
    },
    {
      label: `${translate(
        'promotionSystem.promotion.createPromotion.discountActionType.fixedPriceOfItem'
      )}`,
      value: 7
    },
    {
      label: `${translate(
        'promotionSystem.promotion.createPromotion.discountActionType.ladderPriceOfItem'
      )}`,
      value: 8
    },
    {
      label: `${translate(
        'promotionSystem.promotion.createPromotion.discountActionType.bundlePriceOfItem'
      )}`,
      value: 9
    },
    {
      label: 'Tặng điểm',
      value: 10
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

// const timeFrameList: string[] = [
//   '00:00',
//   '01:00',
//   '02:00',
//   '03:00',
//   '04:00',
//   '05:00',
//   '06:00',
//   '07:00',
//   '08:00',
//   '09:00',
//   '10:00',
//   '11:00',
//   '12:00',
//   '13:00',
//   '14:00',
//   '15:00',
//   '16:00',
//   '17:00',
//   '18:00',
//   '19:00',
//   '20:00',
//   '21:00',
//   '22:00',
//   '23:00'
// ];

const timeFrameList = () => {
  const houserFilter = [];
  for (let index = 0; index < 24; index++) {
    if (index < 10) {
      houserFilter.push({
        value: Math.pow(2, index),
        label: '0' + index + ':00'
      });
    } else {
      houserFilter.push({
        value: Math.pow(2, index),
        label: index + ':00'
      });
    }
  }
  return houserFilter;
};

const forHolidayList = () => {
  return [
    {
      label: `Có`,
      value: 1
    },
    {
      label: `Không`,
      value: 2
    }
  ];
};

const particularDayList = () => {
  const { translate } = useLocales(); // eslint-disable-line
  return [
    {
      label: `${translate('promotionSystem.dayInWeek.sunday')}`,
      value: Math.pow(2, 0)
    },
    {
      label: `${translate('promotionSystem.dayInWeek.monday')}`,
      value: Math.pow(2, 1)
    },
    {
      label: `${translate('promotionSystem.dayInWeek.tuesday')}`,
      value: Math.pow(2, 2)
    },
    {
      label: `${translate('promotionSystem.dayInWeek.wednesday')}`,
      value: Math.pow(2, 3)
    },
    {
      label: `${translate('promotionSystem.dayInWeek.thursday')}`,
      value: Math.pow(2, 4)
    },
    {
      label: `${translate('promotionSystem.dayInWeek.friday')}`,
      value: Math.pow(2, 5)
    },
    {
      label: `${translate('promotionSystem.dayInWeek.saturday')}`,
      value: Math.pow(2, 6)
    }
  ];
};

const paymentMethodList = () => {
  const { translate } = useLocales(); // eslint-disable-line
  return [
    {
      label: `${translate('promotionSystem.promotion.settings.paymentMethodType.cash')}`,
      value: 1
    },
    {
      label: `${translate('promotionSystem.promotion.settings.paymentMethodType.creditCard')}`,
      value: 2
    },
    {
      label: `${translate('promotionSystem.promotion.settings.paymentMethodType.bankTransfer')}`,
      value: 4
    },
    {
      label: `${translate('promotionSystem.promotion.settings.paymentMethodType.eWallet')}`,
      value: 8
    },
    {
      label: `${translate('promotionSystem.promotion.settings.paymentMethodType.mobileBanking')}`,
      value: 16
    },
    {
      label: `${translate('promotionSystem.promotion.settings.paymentMethodType.cod')}`,
      value: 32
    },
    {
      label: `${translate('Thẻ thành viên')}`,
      value: 64
    }
  ];
};

const targetCustomerList = () => {
  const { translate } = useLocales(); // eslint-disable-line
  return [
    {
      label: translate('promotionSystem.promotion.settings.targetCustomerType.guest'),
      value: 2
    },
    {
      label: translate('promotionSystem.promotion.settings.targetCustomerType.membership'),
      value: 1
    },
    {
      label: translate('promotionSystem.promotion.settings.targetCustomerType.membership'),
      value: 0
    }
  ];
};
const genderList = () => {
  const { translate } = useLocales(); // eslint-disable-line
  return [
    { label: translate('promotionSystem.promotion.settings.genderType.male'), value: 1 },
    { label: translate('promotionSystem.promotion.settings.genderType.female'), value: 2 },
    { label: `Tất cả`, value: 3 }
  ];
};

const saleModeList = () => {
  const { translate } = useLocales(); // eslint-disable-line
  return [
    { label: translate('promotionSystem.promotion.settings.saleModeType.eatIn'), value: 1 },
    {
      label: translate('promotionSystem.promotion.settings.saleModeType.takeAway'),
      value: 2
    },
    {
      label: translate('promotionSystem.promotion.settings.saleModeType.delivery'),
      value: 4
    },
    {
      label: 'Tất cả',
      value: 7
    }
  ];
};

const applyByList = () => {
  const { translate } = useLocales(); // eslint-disable-line
  return [
    {
      label: translate('promotionSystem.promotion.settings.applyByType.store'),
      value: 1
    },
    {
      label: translate('promotionSystem.promotion.settings.applyByType.online'),
      value: 2
    },
    {
      label: `Tất cả`,
      value: 3
    }
  ];
};
const exclusiveList = () => {
  const { translate } = useLocales(); // eslint-disable-line
  return [
    {
      label: translate('promotionSystem.promotion.settings.exclusiveType.none'),
      value: 0
    },
    {
      label: translate('promotionSystem.promotion.settings.exclusiveType.level'),
      value: 2
    },
    {
      label: translate('promotionSystem.promotion.settings.exclusiveType.global'),
      value: 1
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
  forHolidayList,
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

/* eslint-disable prettier/prettier */
import useLocales from "hooks/useLocales";

/* eslint-disable prettier/prettier */
export type TGiftBase = {
    giftId: string;
    postActionType: number;
    bonusPoint: number;
    delFlg: boolean;
    insDate: string;
    updDate: string;
    giftVoucherGroupId: string;
    name: string;
    brandId: string;
    gameCampaignId: string;
    brand: any;
    gameCampaign: any;
    giftProductMapping: any[];
    promotionTier: any[];
    voucherGroup: any[];
}
export const GIFT_TYPE_DATA = () => {
    const { translate } = useLocales();
    return [
        {
            value: 1,
            label: `${translate('promotionSystem.promotion.createPromotion.giftActionType.giftVoucher')}`
        },
        {
            value: 2,
            label: `${translate('promotionSystem.promotion.createPromotion.giftActionType.giftProduct')}`
        },
        {
            value: 3,
            label: `${translate('promotionSystem.promotion.createPromotion.giftActionType.giftPoint')}`
        },
        {
            value: 4,
            label: `${translate('promotionSystem.promotion.createPromotion.giftActionType.giftGameCode')}`
        }
    ];
};

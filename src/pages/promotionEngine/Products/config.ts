/* eslint-disable prettier/prettier */
import { TProductPromotion } from "types/promotion/product";
import { TTableColumn } from "types/table";

export const productPromotionColumns: TTableColumn<TProductPromotion>[] = [
    {
        title: 'STT',
        dataIndex: 'index',
        hideInSearch: true
    },

    {
        title: 'Tên sản phẩm',
        dataIndex: 'productName',
        hideInSearch: true,
    },
    {
        title: 'Mã',
        dataIndex: 'code',
        hideInSearch: true,
    },
];
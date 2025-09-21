/* eslint-disable prettier/prettier */
import { TTableColumn } from "types/table";

export const productPromotionColumns: TTableColumn<any>[] = [
    {
        title: 'STT',
        dataIndex: 'index',
        hideInSearch: true
    },

    {
        title: 'Tên sản phẩm',
        dataIndex: 'productName',
    },
    {
        title: 'Danh mục',
        dataIndex: 'cateName',
        hideInSearch: true,
    },
    {
        title: 'Mã',
        dataIndex: 'code',
        hideInSearch: true,
    },
];
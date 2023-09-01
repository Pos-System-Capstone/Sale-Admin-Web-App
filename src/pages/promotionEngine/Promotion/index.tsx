import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import { Button, Card, Stack } from '@mui/material';
import promotionApi, {
  DISCOUNT_TYPE_DATA,
  GIFT_TYPE_DATA,
  PROMOTION_TYPE_DATA,
  STATUS_TYPE_DATA
} from 'api/promotion/promotion';
import Label from 'components/Label';
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import { useRef } from 'react';

import { useNavigate } from 'react-router';
import { PATH_DASHBOARD } from 'routes/paths';

import { PATH_PROMOTION_APP } from 'routes/promotionAppPaths';
import { TPromotion, PromotionType } from 'types/promotion/promotion';
import { TTableColumn } from 'types/table';

interface Props {}

const Promotion = (props: Props) => {
  const { translate } = useLocales();
  const navigate = useNavigate();
  const ref = useRef<any>();
  const editPromotion = (data: TPromotion) => {
    navigate(`${PATH_DASHBOARD.promotion.root}/${data.id}`);
  };

  const DISCOUNT_TYPE_ENUM = DISCOUNT_TYPE_DATA();
  const GIFT_TYPE_ENUM = GIFT_TYPE_DATA();
  const STATUS_TYPE_ENUM = STATUS_TYPE_DATA();
  const PROMOTION_TYPE_ENUM = PROMOTION_TYPE_DATA();

  const promotionColumn: TTableColumn<TPromotion>[] = [
    {
      title: 'STT',
      dataIndex: 'index',
      hideInSearch: true
    },
    {
      title: 'Tên khuyến mãi',
      dataIndex: 'name',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: 'Mã khuyến mãi',
      dataIndex: 'code',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: 'Loại khuyến mãi',
      dataIndex: 'type',
      valueEnum: PROMOTION_TYPE_ENUM,
      valueType: 'select',
      render: (value, label) => (
        <Label
          color={
            value === PromotionType.AMOUNT
              ? 'secondary'
              : value === PromotionType.PRODUCT
              ? 'warning'
              : value === PromotionType.PERCENT
              ? 'success'
              : 'default'
          }
        >
          {value === PromotionType.AMOUNT
            ? 'Giảm đơn hàng'
            : value === PromotionType.PRODUCT
            ? 'Giảm sản phẩm'
            : value === PromotionType.PERCENT
            ? 'Giảm phần trăm'
            : 'Tự động giảm'}
        </Label>
      )
    },
    // TODO: If actionType = 0 <=> use postActionType
    // {
    //   title: `${translate('promotionSystem.promotion.table.action')}`,
    //   hideInSearch: true,
    //   dataIndex: 'actionType',
    //   valueEnum: DISCOUNT_TYPE_ENUM,
    //   renderFormItem: (columnSetting, formProps): any => {
    //     // change dataIndex when actionType = 0
    //     const dataIndex =
    //       formProps.getFieldValue('actionType') === 0 ? 'postActionType' : 'actionType';
    //     columnSetting.dataIndex = dataIndex;
    //     columnSetting.valueEnum = dataIndex === 'actionType' ? DISCOUNT_TYPE_ENUM : GIFT_TYPE_ENUM;
    //   }
    //   // render: (value, row): any => {
    //   //   // change dataIndex when actionType = 0
    //   //   const dataIndex = row.actionType === 0 ? 'postActionType' : 'actionType';
    //   // }
    // },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      valueEnum: STATUS_TYPE_ENUM,
      valueType: 'select',
      hideInSearch: true,
      formProps: {
        fullWidth: true
      },
      render: (value) => (
        <Label color={value === 'Active' ? 'primary' : 'default'}>
          {value === 'Active' ? 'Hoạt động' : 'Ngưng hoạt động'}
        </Label>
      )
    }
  ];

  return (
    <Page
      // title="Manage Promotion"
      title={'Danh sách khuyến mãi'}
      actions={() => [
        <Button
          key="create-promotion"
          onClick={() => {
            navigate(`${PATH_PROMOTION_APP.promotion.new}`);
          }}
          variant="contained"
          startIcon={<Icon icon={plusFill} />}
        >
          {translate('promotionSystem.promotion.createPromotion.createPromotion')}
        </Button>
      ]}
    >
      <Card>
        <Stack spacing={2}>
          <ResoTable
            showAction={true}
            pagination
            ref={ref}
            getData={(params: any) => promotionApi.getPromotion(params)}
            columns={promotionColumn}
            onEdit={editPromotion}
            rowKey="Id"
          />
        </Stack>
      </Card>
    </Page>
  );
};

export default Promotion;

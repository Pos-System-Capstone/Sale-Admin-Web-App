import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import { Button, Card, Stack } from '@mui/material';
import promotionApi, {
  DISCOUNT_TYPE_DATA,
  PROMOTION_TYPE_DATA,
  STATUS_TYPE_DATA
} from 'api/promotion/promotion';
import Label from 'components/Label';
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import { useEffect, useRef } from 'react';

import { useNavigate } from 'react-router';

import { PATH_PROMOTION_APP } from 'routes/promotionAppPaths';
import { GIFT_TYPE_DATA } from 'types/promotion/gift';
import { TPromotionBase } from 'types/promotion/promotion';
import { TTableColumn } from 'types/table';
import { getUserInfo } from 'utils/utils';

interface Props {}

const Promotion = (props: Props) => {
  const { translate } = useLocales();
  const navigate = useNavigate();
  const ref = useRef<any>();

  const DISCOUNT_TYPE_ENUM = DISCOUNT_TYPE_DATA();
  const GIFT_TYPE_ENUM = GIFT_TYPE_DATA();
  const STATUS_TYPE_ENUM = STATUS_TYPE_DATA();
  const PROMOTION_TYPE_ENUM = PROMOTION_TYPE_DATA();
  const userRaw = getUserInfo();
  const user: any = JSON.parse(userRaw ?? '{}');
  console.log('user', user.brandId);
  const promotionColumn: TTableColumn<TPromotionBase>[] = [
    { title: 'brandId', dataIndex: 'brandId', hideInTable: true, hideInSearch: true },
    {
      title: `${translate('promotionSystem.promotion.table.no')}`,
      dataIndex: 'index',
      hideInSearch: true
    },
    {
      title: `${translate('promotionSystem.promotion.table.name')}`,
      dataIndex: 'promotionName',
      valueType: 'text'
    },
    {
      title: `${translate('promotionSystem.promotion.table.code')}`,
      dataIndex: 'promotionCode',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: `${translate('promotionSystem.promotion.table.type')}`,
      dataIndex: 'promotionType',
      valueEnum: PROMOTION_TYPE_ENUM,
      valueType: 'select',
      render: (value) => (
        <Label
          color={
            value === 1
              ? 'secondary'
              : value === 2
              ? 'warning'
              : value === 3
              ? 'success'
              : 'default'
          }
        >
          {value === 3
            ? translate('promotionSystem.promotion.createPromotion.usingVoucher')
            : value === 2
            ? translate('promotionSystem.promotion.createPromotion.usingCode')
            : value === 1
            ? translate('promotionSystem.promotion.createPromotion.automatic')
            : translate('promotionSystem.common.unknown')}
        </Label>
      )
    },
    // TODO: If actionType = 0 <=> use postActionType
    {
      title: `${translate('promotionSystem.promotion.table.action')}`,
      hideInSearch: true,
      dataIndex: 'actionType',
      valueEnum: DISCOUNT_TYPE_ENUM,
      renderFormItem: (columnSetting, formProps): any => {
        // change dataIndex when actionType = 0
        const dataIndex =
          formProps.getFieldValue('actionType') === 0 ? 'postActionType' : 'actionType';
        columnSetting.dataIndex = dataIndex;
        columnSetting.valueEnum = dataIndex === 'actionType' ? DISCOUNT_TYPE_ENUM : GIFT_TYPE_ENUM;
      }
      // render: (value, row): any => {
      //   // change dataIndex when actionType = 0
      //   const dataIndex = row.actionType === 0 ? 'postActionType' : 'actionType';
      // }
    },
    {
      title: `${translate('promotionSystem.promotion.table.status')}`,
      dataIndex: 'status',
      valueEnum: STATUS_TYPE_ENUM,
      valueType: 'select',
      formProps: {
        fullWidth: true
      },
      render: (value) => (
        <Label
          color={
            value === 1 ? 'default' : value === 2 ? 'primary' : value === 3 ? 'warning' : 'error'
          }
        >
          {value === 1
            ? translate('promotionSystem.promotion.table.statusType.draft')
            : value === 2
            ? translate('promotionSystem.promotion.table.statusType.published')
            : value === 3
            ? translate('promotionSystem.promotion.table.statusType.unPublished')
            : translate('promotionSystem.promotion.table.statusType.expired')}
        </Label>
      )
    }
  ];

  useEffect(() => {
    if (ref.current) {
      ref.current.formControl.setValue('BrandId', user.brandId);
      ref.current.formControl.setValue('status', 0);
    }
  }, [user]);

  return (
    <Page
      // title="Manage Promotion"
      title={`${translate('promotionSystem.promotion.title')}`}
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
            onEdit={(promotion: any) =>
              navigate(`${PATH_PROMOTION_APP.promotion.root}/${promotion.promotionId}`)
            }
            getData={(params: any) => promotionApi.getPromotion(params)}
            columns={promotionColumn}
            rowKey="promotionId"
          />
        </Stack>
      </Card>
    </Page>
  );
};

export default Promotion;

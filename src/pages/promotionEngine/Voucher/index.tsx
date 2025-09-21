/* eslint-disable camelcase */
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import { TabContext } from '@mui/lab';
// material
import { Button, Card } from '@mui/material';
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import { useSnackbar } from 'notistack';
import { useEffect, useRef, useState } from 'react';
// components
import { useNavigate } from 'react-router-dom';
//
import voucherApi from 'api/promotion/voucher';
import { PATH_PROMOTION_APP } from 'routes/promotionAppPaths';
import { TTableColumn } from 'types/table';
import { getUserInfo } from 'utils/utils';

// ----------------------------------------------------------------------

export default function Voucher() {
  const [activeTab, setActiveTab] = useState('1');
  const ref = useRef<any>();
  const userRaw = getUserInfo();
  const user: any = JSON.parse(userRaw ?? '{}');
  // const brandId = useSelector((state: RootState) => state.brand);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { t } = useLocales();

  const productColumns: TTableColumn<any>[] = [
    {
      title: `${t('promotionSystem.voucher.table.no')}`,
      dataIndex: 'index',
      hideInSearch: true
    },
    {
      title: `${t('promotionSystem.voucher.table.name')}`,
      dataIndex: 'voucherName'
    },
    // {
    //   title: `Voucher Group Id`,
    //   dataIndex: 'voucherGroupId'
    // },
    {
      title: `${t('promotionSystem.voucher.table.actionName')}`,
      dataIndex: ['action', 'name'],
      // renderFormItem: () => <AutocompleteCategory name="cat-id" label="Danh mục" />
      hideInSearch: true
    },
    {
      title: `${t('promotionSystem.voucher.table.total')}`,
      dataIndex: 'quantity',
      hideInSearch: true
    },
    {
      title: `${t('promotionSystem.voucher.table.redeemed')}`,
      dataIndex: 'redempedQuantity',
      hideInSearch: true
    },
    {
      title: `${t('promotionSystem.voucher.table.used')}`,
      dataIndex: 'usedQuantity',
      hideInSearch: true
    }
  ];

  useEffect(() => {
    if (ref.current) {
      ref.current.formControl.setValue('BrandId', user.brandId!);
    }
  }, [user]);
  return (
    <Page
      title={`${t('promotionSystem.voucher.title')}`}
      actions={() => [
        <Button
          key="add-product"
          onClick={() => {
            navigate(PATH_PROMOTION_APP.voucher.new);
          }}
          variant="contained"
          startIcon={<Icon icon={plusFill} />}
        >
          {`${t('promotionSystem.voucher.addVoucher.newVoucher')}`}
        </Button>
      ]}
    >
      {/* <Button
        key="add-product"
        onClick={() => {
          navigate(PATH_PROMOTION_APP.voucher.detail);
        }}
        variant="contained"
        startIcon={<Icon icon={plusFill} />}
      >
        Trang Detail Voucher
      </Button> */}
      <Card>
        <TabContext value={activeTab}>
          <ResoTable
            ref={ref}
            pagination
            getData={(params: any) => voucherApi.getVoucherGroup(params)}
            // onEdit={() => console.log('edit')}
            onEdit={(params: any) =>
              navigate(`${PATH_PROMOTION_APP.voucher.root}/${params.voucherGroupId}`)
            }
            onDelete={() => console.log('delete')}
            columns={productColumns}
            rowKey="voucher_id"
          />
        </TabContext>
      </Card>
    </Page>
  );
}

import Page from 'components/Page';
import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import { TabContext } from '@mui/lab';
import ResoTable from 'components/ResoTable/ResoTable';
import { getUserInfo } from 'utils/utils';
import { TTableColumn } from 'types/table';
import { TPStore } from 'types/promotion/store';
import storePromotionApi from 'api/promotion/store';
import { PATH_PROMOTION_APP } from 'routes/promotionAppPaths';

const StorePromotionList = () => {
  const [activeTab, setActiveTab] = useState('1');
  const ref = useRef<any>();
  const navigate = useNavigate();
  const userRaw = getUserInfo();
  const user: any = JSON.parse(userRaw ?? '{}');
  const { id } = useParams();
  const StorePromotion: TTableColumn<TPStore>[] = [
    {
      title: 'STT',
      dataIndex: 'index',
      hideInSearch: true
    },
    {
      title: 'Mã cửa hàng',
      dataIndex: 'storeCode',
      hideInSearch: true
    },
    {
      title: 'Tên cửa hàng',
      dataIndex: 'storeName',
      hideInSearch: true
    }
  ];
  useEffect(() => {
    if (ref.current) {
      ref.current.formControl.setValue('brandId', user.brandId);
    }
  }, [user]);

  return (
    <>
      <Page actions={() => []}>
        <Card>
          <TabContext value={activeTab}>
            <ResoTable
              ref={ref}
              pagination
              onEdit={(params: any) =>
                navigate(`${PATH_PROMOTION_APP.promotion_store.root}/${params.storeId}`)
              }
              getData={(params: any) => storePromotionApi.getStores(params)}
              onDelete={() => console.log('delete')}
              columns={StorePromotion}
            />
          </TabContext>
        </Card>
      </Page>
    </>
  );
};
export default StorePromotionList;

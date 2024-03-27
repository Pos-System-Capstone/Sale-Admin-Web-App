import Page from 'components/Page';

import { Button } from '@mui/material';
import { useNavigate } from 'react-router';

import StorePromotionList from './components/StorePromotionList';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { PATH_PROMOTION_APP } from 'routes/promotionAppPaths';

const StorePromotion = () => {
  const navigate = useNavigate();

  return (
    <>
      <Page
        actions={() => [
          <Button
            key="add-store"
            onClick={() => navigate(PATH_PROMOTION_APP.promotion_store.new)}
            startIcon={<Icon icon={plusFill} />}
            variant="contained"
          >
            Tạo cửa hàng mới
          </Button>
        ]}
        title="Danh sách cửa hàng"
      >
        <StorePromotionList />
      </Page>
    </>
  );
};
export default StorePromotion;

import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import { Button, Card } from '@mui/material';
import Page from 'components/Page';
import { useNavigate } from 'react-router-dom';
import StoresList from './components/StoresList';

const StoreOfBrandList = () => {
  const navigate = useNavigate();
  return (
    <Page
      actions={() => [
        <Button
          key="add-store"
          onClick={() => navigate('new')}
          startIcon={<Icon icon={plusFill} />}
          variant="contained"
        >
          Tạo cửa hàng mới
        </Button>
      ]}
      title="Danh sách cửa hàng"
    >
      <Card>
        <StoresList />
      </Card>
    </Page>
  );
};

export default StoreOfBrandList;

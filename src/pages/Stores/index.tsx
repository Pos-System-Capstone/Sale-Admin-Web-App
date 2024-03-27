/* eslint-disable camelcase */
// import plusFill from '@iconify/icons-eva/plus-fill';
// import { Icon } from '@iconify/react';
// material
import { Card } from '@mui/material';
// import storeApi from 'api/promotion/store';
// import { SelectField } from 'components/form';
// import Label from 'components/Label';
import Page from 'components/Page';
import useLocales from 'hooks/useLocales';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
// components
import { useNavigate } from 'react-router-dom';

import StoreOfBrandList from './StoresOfBrandList';
import { TStore } from 'types/store';
export default function StoreListPage() {
  const navigate = useNavigate();
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const [currentDeleteItem, setCurrentDeleteItem] = useState<TStore | null>(null);

  return (
    <Page title={`${translate('pages.stores.listTitle')}`} actions={() => []}>
      <Card>
        <StoreOfBrandList />
      </Card>
    </Page>
  );
}

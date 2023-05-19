/* eslint-disable camelcase */

// material
import { Card, Stack } from '@mui/material';
// import Label from 'components/Label';
import Page from 'components/Page';
import useLocales from 'hooks/useLocales';
import BranchAccounts from './components/BranchAccounts';
import BranchProfile from './components/BranchProfile';

// components

const ProfilePage = () => {
  const { translate } = useLocales();

  return (
    <Page title={`${translate('productReport.table.productName')}`}>
      <Stack spacing={[2, 4]}>
        <Card>
          <BranchProfile />
        </Card>
        <Card>
          <BranchAccounts />
        </Card>
      </Stack>
    </Page>
  );
};

export default ProfilePage;

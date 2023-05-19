import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
// import bellFill from '@iconify/icons-eva/bell-fill';
// import shareFill from '@iconify/icons-eva/share-fill';
// import roundDescription from '@iconify/icons-ic/round-description';
// import roundReceipt from '@iconify/icons-ic/round-receipt';
import roundAccountBox from '@iconify/icons-ic/round-account-box';
// material
import { Container, Tab, Box, Tabs } from '@mui/material';
// redux
import { RootState, useDispatch, useSelector } from 'redux/store';
import {
  getAddressBook,
  getCards,
  getInvoices,
  getNotifications,
  getProfile
} from 'redux/slices/user';
// routes
// import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from 'hooks/useSettings';
// components
import Page from 'components/Page';
// import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import BranchInformation from './BranchInformation';
import useLocales from 'hooks/useLocales';

// ----------------------------------------------------------------------

export default function BranchProfile() {
  const { themeStretch } = useSettings();
  const { translate } = useLocales();
  const dispatch = useDispatch();
  const { cards, invoices, myProfile, addressBook, notifications } = useSelector(
    (state: RootState) => state.user
  );

  const [currentTab, setCurrentTab] = useState('Branch Infomation');

  useEffect(() => {
    dispatch(getCards());
    dispatch(getAddressBook());
    dispatch(getInvoices());
    dispatch(getNotifications());
    dispatch(getProfile());
  }, [dispatch]);

  const ACCOUNT_TABS = [
    {
      value: 'Branch Infomation',
      title: 'pages.configuration.profile.brandinfo',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <BranchInformation />
    }
    // {
    //   value: 'About Branch',
    //   title: 'pages.configuration.profile.brandescription',
    //   icon: <Icon icon={roundDescription} width={20} height={20} />,
    //   component: <BranchAbout />
    // }
    // {
    //   value: 'billing',
    //   icon: <Icon icon={roundReceipt} width={20} height={20} />,
    //   component: <AccountBilling cards={cards} addressBook={addressBook} invoices={invoices} />
    // },
    // {
    //   value: 'notifications',
    //   icon: <Icon icon={bellFill} width={20} height={20} />,
    //   component: <AccountNotifications notifications={notifications} />
    // },
    // {
    //   value: 'social_links',
    //   icon: <Icon icon={shareFill} width={20} height={20} />,
    //   component: <AccountSocialLinks myProfile={myProfile} />
    // },
  ];

  return (
    <Page title="Hồ sơ">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        {/* <HeaderBreadcrumbs
          heading="Brand infomation"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: 'Account Settings' }
          ]}
        /> */}

        <Tabs
          value={currentTab}
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          onChange={(e, value) => setCurrentTab(value)}
        >
          {ACCOUNT_TABS.map((tab) => (
            <Tab
              disableRipple
              key={tab.value}
              label={`${translate(tab.title)}`}
              icon={tab.icon}
              value={tab.value}
            />
          ))}
        </Tabs>

        <Box sx={{ mb: 5 }} />

        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}

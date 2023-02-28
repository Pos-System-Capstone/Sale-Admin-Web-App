import roundAccountBox from '@iconify/icons-ic/round-account-box';
import roundReceipt from '@iconify/icons-ic/round-receipt';
import { Icon } from '@iconify/react';
import { Box, Button, Stack, Tab, Tabs } from '@mui/material';
import Page from 'components/Page';
import useLocales from 'hooks/useLocales';
import { get } from 'lodash';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useLocation, useParams } from 'react-router-dom';
import { updateCollection } from 'redux/collections/api';
import { TCollection } from 'types/collection';
import CollectionInfoTab from './tabs/CollectionInfoTab';
import ProductInCollectionTab from './tabs/ProductInCollectionTab';
import { useCollectionDetails } from 'hooks/useCollections';

enum TabType {
  COLLECTION_INFO = 'COLLETION_INFO',
  PRODUCT_COLLECTION = 'PRODUCT_COLLECTION'
}

function TabPanel(props: any) {
  const { children, hidden, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={hidden}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box sx={{ py: 2 }}>{children}</Box>
    </div>
  );
}

const UpdateCollectionPage = () => {
  const { translate } = useLocales();
  const { state } = useLocation();
  const { id } = useParams();
  const [currentTab, setCurrentTab] = React.useState<TabType>(TabType.COLLECTION_INFO);
  const { enqueueSnackbar } = useSnackbar();

  const { data: collection } = useCollectionDetails(id!, { page: 1, size: 10 });
  const form = useForm<TCollection>({
    defaultValues: {
      ...collection
    }
  });

  useEffect(() => {
    if (collection) {
      form.reset(collection);
    }
  }, [collection, form]);
  const onUpdateCollection = (values: TCollection) =>
    updateCollection(id!, values)
      .then(() =>
        enqueueSnackbar(translate('common.200'), {
          variant: 'success'
        })
      )
      .catch((err) => {
        const errMsg = get(err.response, ['data', 'message'], `Có lỗi xảy ra. Vui lòng thử lại`);
        enqueueSnackbar(errMsg, {
          variant: 'error'
        });
      });

  const MENU_TABS = [
    {
      value: TabType.COLLECTION_INFO,
      label: translate('collections.collectionInfoTab'),
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: (
        <Stack>
          <CollectionInfoTab onSubmit={form.handleSubmit(onUpdateCollection)} />
        </Stack>
      )
    },
    {
      value: TabType.PRODUCT_COLLECTION,
      label: 'Sản phẩm trong bộ sưu tập',
      icon: <Icon icon={roundReceipt} width={20} height={20} />,
      component: <ProductInCollectionTab id={id} />
    }
  ];

  return (
    <FormProvider {...form}>
      <Page
        title={translate('collections.editTitle')}
        actions={() => [
          <Button key="delete-collection" size="small" color="error" variant="outlined">
            {translate('common.delete')}
          </Button>
        ]}
      >
        <Box mx="auto">
          <Tabs
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            onChange={(e, value) => setCurrentTab(value)}
          >
            {MENU_TABS.map((tab) => (
              <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
            ))}
          </Tabs>
          <Box mt={2}>
            {MENU_TABS.map((tab, index) => {
              const isMatched = tab.value === currentTab;
              return (
                <TabPanel key={tab.value} index={index} hidden={!isMatched}>
                  {tab.component}
                </TabPanel>
              );
            })}
          </Box>
        </Box>
      </Page>
    </FormProvider>
  );
};

export default UpdateCollectionPage;

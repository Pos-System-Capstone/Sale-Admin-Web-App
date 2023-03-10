import roundAccountBox from '@iconify/icons-ic/round-account-box';
import roundStore from '@iconify/icons-ic/round-store';
import { Icon } from '@iconify/react';
import { Box, Button, Stack, Tab, Tabs } from '@mui/material';
import menuApi from 'api/menu';
import { transformMenuForm } from 'components/form/Menu/helper';
import confirm from 'components/Modal/confirm';
import Page from 'components/Page';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import React, { useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH_DASHBOARD } from 'routes/paths';
import { PosMenu, ProductFormatTypeToUpdate, TUpdateMenuInformation } from 'types/menu';
import { convertTimeToInteger, processDayFiter } from 'utils/utils';
import MenuInfoTab from './tabs/MenuInfoTab';
import ProductInMenuTab from './tabs/ProductInMenuTab';
import StoreApplyTab from './tabs/StoreApplyTab';

enum TabType {
  MENU_INFO = 'MENUINFO',
  STORE_APPLY = 'STORE_APPLY',
  PRODUCT_MENU = 'PRODUCT_MENU'
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

const UpdateMenuPage = () => {
  // const { menu }: { menu: Menu } = useLocation();
  const { id } = useParams();
  const [currentTab, setCurrentTab] = React.useState<TabType>(TabType.MENU_INFO);
  const { enqueueSnackbar } = useSnackbar();
  const tableRef = useRef<any>();
  const navigate = useNavigate();
  const form = useForm({});
  const [currentProductListInMenu, setCurrentProductListInMenu] = useState<
    ProductFormatTypeToUpdate[]
  >([]);

  const {
    data: menu,
    isLoading,
    refetch,
    error
  } = useQuery(
    ['products', Number(id)],
    () => menuApi.getById(id).then((res) => res.data)
    // {
    //   onSuccess: (res) => form.reset(normalizeMenuData(res))
    // }
  );

  React.useEffect(() => {
    if (menu && menu?.products.length > 0) {
      const newProductListWithNewField: ProductFormatTypeToUpdate[] = [];
      menu.products.map((product) => {
        newProductListWithNewField.push({
          productId: product?.id,
          sellingPrice: product?.sellingPrice,
          discountPrice: product?.discountPrice
        });
      });
      setCurrentProductListInMenu(newProductListWithNewField);
    }
  }, [menu]);

  const onUpdateMenu = (updateMenu: any) =>
    menuApi
      .update(id, transformMenuForm(updateMenu))
      .then(() => {
        enqueueSnackbar(`C???p nh???t th??nh c??ng`, {
          variant: 'success'
        });
        refetch();
      })
      .catch((err) => {
        // const errMsg = get(err, ['message'], `C?? l???i x???y ra. Vui l??ng th??? l???i`);
        enqueueSnackbar(err.Error, {
          variant: 'error'
        });
      });

  const onDeleteMenu = async (menuId: string) => {
    try {
      await menuApi.delete(menuId);
      enqueueSnackbar('Xo?? th??nh c??ng', {
        variant: 'success'
      });
      console.log(`tableRef.current`, tableRef.current);
      tableRef.current?.reload();
      navigate(`${PATH_DASHBOARD.tradingReport.root}`);
    } catch (error) {
      console.log(`error`, error);
      enqueueSnackbar((error as any).message, {
        variant: 'error'
      });
    }
  };

  const onConfirmDelete = async (menu: PosMenu) => {
    confirm({
      title: 'X??c nh???n xo??',
      content: `B???n ?????ng ?? x??a menu "${menu.code}"?`,
      onOk: async () => {
        await onDeleteMenu(menu.id);
      },
      onCancle: () => {}
    });
  };

  const handleMenuInformationToUpdate = (data: any) => {
    const { dayFilter, endTime, startTime, priority } = data;

    const processedDataToUpdate: TUpdateMenuInformation = {
      priority: priority,
      dateFilter: dayFilter.length > 0 ? processDayFiter(dayFilter) : undefined,
      startTime: startTime ? convertTimeToInteger(moment(startTime).format('HH:mm')) : undefined,
      endTime: endTime ? convertTimeToInteger(moment(endTime).format('HH:mm')) : undefined
    };
    return processedDataToUpdate;
  };
  const MENU_TABS = [
    {
      value: TabType.MENU_INFO,
      label: 'Th??ng tin chung',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: (
        <Stack direction="column" mt={2} spacing={2}>
          <MenuInfoTab
            menu={menu!}
            onSubmit={async () => {
              try {
                // TODO: Check this
                await form.handleSubmit(async (values) => {
                  const dataToUpdate = handleMenuInformationToUpdate(values);
                  return onUpdateMenu(dataToUpdate);
                }, console.log)();
                return true;
              } catch (error) {
                console.log(`errror`, error);
              }
            }}
          />
          <ProductInMenuTab menuId={id} productListInMenuDetail={currentProductListInMenu} />
        </Stack>
      )
    },
    {
      value: TabType.STORE_APPLY,
      label: 'C???a h??ng ??p d???ng',
      icon: <Icon icon={roundStore} width={20} height={20} />,
      component: <StoreApplyTab />
    }
  ];

  // if (isLoading) {
  //   return <CircularProgress />;
  // }

  // if (error) {
  //   return <Typography>{get(error, 'message', 'C?? l???i vui l??ng th??? l???i')}</Typography>;
  // }

  return (
    <FormProvider {...form}>
      <Page
        title={`Chi ti???t b???ng gi?? ${menu?.code}`}
        actions={() => [
          <Button
            onClick={() => onConfirmDelete(menu!)}
            key="delete-menu"
            size="small"
            color="error"
            variant="outlined"
          >
            X??a
          </Button>
        ]}
      >
        <Tabs
          value={currentTab}
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          onChange={(e, value) => setCurrentTab(value)}
        >
          {MENU_TABS.map((tab) =>
            false ? (
              <Tab disabled key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
            ) : (
              <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
            )
          )}
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
      </Page>
    </FormProvider>
  );
};

export default UpdateMenuPage;

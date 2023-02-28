import roundAccountBox from '@iconify/icons-ic/round-account-box';
import { Icon } from '@iconify/react';
import { Box, Button, Stack, Tab, Tabs } from '@mui/material';
import menuApi from 'api/menu';
import { normalizeMenuData, transformMenuForm } from 'components/form/Menu/helper';
import Page from 'components/Page';
import roundStore from '@iconify/icons-ic/round-store';
import { get } from 'lodash-es';
import confirm from 'components/Modal/confirm';
import { useSnackbar } from 'notistack';
import React, { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import MenuInfoTab from './tabs/MenuInfoTab';
import ProductInMenuTab from './tabs/ProductInMenuTab';
import { Menu } from 'types/menu';
import { PATH_DASHBOARD } from 'routes/paths';
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

  const {
    data: menu,
    isLoading,
    refetch,
    error
  } = useQuery(['products', Number(id)], () => menuApi.getById(id).then((res) => res.data), {
    onSuccess: (res) => form.reset(normalizeMenuData(res))
  });

  const onUpdateMenu = (updateMenu: any) =>
    menuApi
      .update(+id!, transformMenuForm(updateMenu))
      .then(() =>
        enqueueSnackbar(`Cập nhật thành công`, {
          variant: 'success'
        })
      )
      .then(() => refetch())
      .catch((err) => {
        const errMsg = get(err, ['message'], `Có lỗi xảy ra. Vui lòng thử lại`);
        enqueueSnackbar(errMsg, {
          variant: 'error'
        });
      });

  const onDeleteMenu = async (menuId: string) => {
    try {
      await menuApi.delete(menuId);
      enqueueSnackbar('Xoá thành công', {
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

  const onConfirmDelete = async (menu: Menu) => {
    confirm({
      title: 'Xác nhận xoá',
      content: `Bạn đồng ý xóa menu "${menu.code}"?`,
      onOk: async () => {
        await onDeleteMenu(menu.id);
      },
      onCancle: () => {}
    });
  };
  const MENU_TABS = [
    {
      value: TabType.MENU_INFO,
      label: 'Thông tin chung',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: (
        <Stack direction="column" mt={2} spacing={2}>
          <MenuInfoTab
            menu={menu!}
            onSubmit={async () => {
              console.log(`SUBMIT`);
              try {
                // TODO: Check this
                await form.handleSubmit(async (values) => {
                  console.log(`values`, values);
                  return onUpdateMenu(values);
                }, console.log)();
                return true;
              } catch (error) {
                console.log(`errror`, error);
              }
            }}
          />
          <ProductInMenuTab id={id} />
        </Stack>
      )
    },
    {
      value: TabType.STORE_APPLY,
      label: 'Cửa hàng áp dụng',
      icon: <Icon icon={roundStore} width={20} height={20} />,
      component: <StoreApplyTab />
    }
  ];

  // if (isLoading) {
  //   return <CircularProgress />;
  // }

  // if (error) {
  //   return <Typography>{get(error, 'message', 'Có lỗi vui lòng thử lại')}</Typography>;
  // }

  return (
    <FormProvider {...form}>
      <Page
        title={`Chi tiết bảng giá ${menu?.code}`}
        actions={() => [
          <Button
            onClick={() => onConfirmDelete(menu!)}
            key="delete-menu"
            size="small"
            color="error"
            variant="outlined"
          >
            Xóa
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

import roundAccountBox from '@iconify/icons-ic/round-account-box';
import roundStore from '@iconify/icons-ic/round-store';
import { Icon } from '@iconify/react';
import { Box, Button, Stack, Tab, Tabs } from '@mui/material';
import menuApi from 'api/menu';
import { UpdateConfirmDialog } from 'components/DeleteConfirmDialog';
import Page from 'components/Page';
import { transformMenuForm } from 'components/form/Menu/helper';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import React, { useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { MenuStatus, ProductFormatTypeToUpdate, TUpdateMenuInformation } from 'types/menu';
import { TStoreInMenuDetail } from 'types/store';
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
  const [isShowConfirmUpdateDialog, setIsShowConfirmUpdateDialog] = useState(false);
  const [currentStoreListInMenu, setCurrentStoreListInMenu] = useState<TStoreInMenuDetail[]>([]);

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

    if (menu && menu?.stores.length > 0) {
      const newStoreListInMenu: TStoreInMenuDetail[] = [];
      menu.stores.map((store) => {
        newStoreListInMenu.push(store);
      });
    }
  }, [menu]);

  const onUpdateMenu = (updateMenu: any) =>
    menuApi
      .update(id, transformMenuForm(updateMenu))
      .then(() => {
        enqueueSnackbar(`Cập nhật thành công`, {
          variant: 'success'
        });
        refetch();
      })
      .catch((err) => {
        // const errMsg = get(err, ['message'], `Có lỗi xảy ra. Vui lòng thử lại`);
        enqueueSnackbar(err.Error, {
          variant: 'error'
        });
      });

  const onConfirmUpdateMenuStatus = async () => {
    try {
      await menuApi.updateMenuStatus(menu!.id, MenuStatus.ACTIVE).then(() => {
        enqueueSnackbar('Thay đổi trạng thái thành công', {
          variant: 'success'
        });
        refetch();
        setIsShowConfirmUpdateDialog(!isShowConfirmUpdateDialog);
        // console.log(`tableRef.current`, tableRef.current);
        tableRef.current?.reload();
      });
    } catch (error) {
      enqueueSnackbar((error as any).Error, {
        variant: 'error'
      });
    }
  };

  const handleMenuInformationToUpdate = (data: any) => {
    const { dayFilter, endTime, startTime, priority, allDay } = data;
    let processedDataToUpdate: TUpdateMenuInformation;
    if (allDay) {
      processedDataToUpdate = {
        priority: priority,
        dateFilter: dayFilter.length > 0 ? processDayFiter(dayFilter) : undefined,
        startTime: 0,
        endTime: 1439
      };
    } else {
      processedDataToUpdate = {
        priority: priority,
        dateFilter: dayFilter.length > 0 ? processDayFiter(dayFilter) : undefined,
        startTime: startTime ? convertTimeToInteger(moment(startTime).format('HH:mm')) : undefined,
        endTime: endTime ? convertTimeToInteger(moment(endTime).format('HH:mm')) : undefined
      };
    }
    return processedDataToUpdate;
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
          <ProductInMenuTab
            menuId={id}
            productListInMenuDetail={currentProductListInMenu}
            refetch={() => refetch()}
          />
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
          menu?.status === MenuStatus.DEACTIVATE && (
            <Button
              onClick={() => setIsShowConfirmUpdateDialog(!isShowConfirmUpdateDialog)}
              key="delete-menu"
              size="medium"
              color="primary"
              variant="contained"
            >
              Đưa menu vào hoạt động
            </Button>
          )
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
        <UpdateConfirmDialog
          open={isShowConfirmUpdateDialog}
          onClose={() => setIsShowConfirmUpdateDialog(!isShowConfirmUpdateDialog)}
          onUpdate={() => onConfirmUpdateMenuStatus()}
          title={'Bạn muốn đưa menu này vào hoạt động'}
          description={'Menu này chuyển trạng thái từ "tạm ẩn" thành "hoạt động"'}
        />
      </Page>
    </FormProvider>
  );
};

export default UpdateMenuPage;

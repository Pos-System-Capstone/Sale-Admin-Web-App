import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Card, Chip, Stack } from '@mui/material';
import { useRequest } from 'ahooks';
import menuApi from 'api/menu';
import Label from 'components/Label';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import confirm from 'components/Modal/confirm';
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import { DAY_OF_WEEK } from 'constraints';
import useLocales from 'hooks/useLocales';
import { get } from 'lodash-es';
import { useSnackbar } from 'notistack';
import { CardTitle } from 'pages/Products/components/Card';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import storeApi from 'redux/store/api';
import { PATH_DASHBOARD } from 'routes/paths';
import { Menu } from 'types/menu';
import { TStore } from 'types/store';
import StoreForm from './components/StoreForm';
import { storeSchemaBuilder } from './utils';

const UpdateStorePage = () => {
  const { id } = useParams();
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { data: store } = useQuery(['stores', Number(id)], () =>
    storeApi.getById(id).then((res) => res.data)
  );
  useEffect(() => {
    if (store) {
      form.reset(store);
    }
  }, [store]);
  const form = useForm({
    resolver: yupResolver(storeSchemaBuilder(translate)),
    defaultValues: {
      ...store
    }
  });
  const { data: menuInStores, refresh } = useRequest(
    () => storeApi.getMenusByStoreId(Number(id)).then((res) => res.data),
    {
      onError: (error) => console.log(error)
    }
  );
  const onUpdateStore = (storeData: any) =>
    storeApi
      .update(+id!, storeData)
      .then(() =>
        enqueueSnackbar(`Cập nhật thành công`, {
          variant: 'success'
        })
      )
      .catch((err) => {
        const errMsg = get(err.response, ['data', 'message'], `Có lỗi xảy ra. Vui lòng thử lại`);
        enqueueSnackbar(errMsg, {
          variant: 'error'
        });
      });

  const onDeleteStore = async (storeId: string) => {
    try {
      await storeApi.delete(storeId);
      enqueueSnackbar('Xoá thành công', {
        variant: 'success'
      });
      navigate(`${PATH_DASHBOARD.promotion.root}`);
    } catch (error) {
      console.log(`error`, error);
      enqueueSnackbar((error as any).message, {
        variant: 'error'
      });
    }
  };
  const onDeleteMenu = async (menuId: string) => {
    try {
      await menuApi.delete(menuId);
      enqueueSnackbar('Xoá thành công', {
        variant: 'success'
      });
      refresh();
    } catch (error) {
      console.log(`error`, error);
      enqueueSnackbar((error as any).message, {
        variant: 'error'
      });
    }
  };

  const onConfirmDeleteMenu = async (menu: Menu) => {
    confirm({
      title: 'Xác nhận xoá',
      content: `Bạn đồng ý xóa menu "${menu.store_name}"?`,
      onOk: async () => {
        await onDeleteMenu(menu.id);
      },
      onCancle: () => {}
    });
  };
  const onConfirmDelete = async (store: TStore) => {
    confirm({
      title: 'Xác nhận xoá',
      content: `Bạn đồng ý xóa "${store.name}"?`,
      onOk: async () => {
        await onDeleteStore(store.id);
      },
      onCancle: () => {}
    });
  };

  return (
    <FormProvider {...form}>
      <Page
        title={translate('pages.stores.updateTitle')}
        actions={() => {
          return [
            <Button
              onClick={() => onConfirmDelete(store!)}
              key="delete"
              size="small"
              color="error"
              variant="outlined"
            >
              {translate('common.delete')}
            </Button>
          ];
        }}
      >
        <Box px={2} mx="auto">
          <Stack direction="column" mt={2} spacing={2}>
            <Card>
              <CardTitle>{translate('pages.stores.storeInfoTitle')}</CardTitle>

              <StoreForm />
              <Box textAlign="right" mt={2}>
                <LoadingAsyncButton
                  size="small"
                  onClick={form.handleSubmit(onUpdateStore)}
                  variant="contained"
                >
                  {translate('common.update')}
                </LoadingAsyncButton>
              </Box>
            </Card>

            <Card>
              <Box display="flex" justifyContent="space-between">
                <CardTitle>{translate('pages.stores.storeMenu')}</CardTitle>
              </Box>
              <Box flex={1}>
                <Stack spacing={2}>
                  <ResoTable
                    dataSource={menuInStores ?? []}
                    rowKey="menu_id"
                    onDelete={onConfirmDeleteMenu}
                    onEdit={(menu: any) =>
                      navigate(`${PATH_DASHBOARD.tradingReport.root}/${menu.menu_id}`, {
                        state: menu
                      })
                    }
                    columns={[
                      {
                        title: translate('pages.menus.table.menuName'),
                        dataIndex: 'menu_name'
                      },
                      {
                        title: translate('pages.menus.table.timeRange'),
                        dataIndex: 'time_ranges',
                        render: (range: any) => (
                          <>
                            {translate('pages.menus.table.fromTime')}{' '}
                            <Label color="success">{range[0][0]}</Label>{' '}
                            {translate('pages.menus.table.toTime')}{' '}
                            <Label color="success">{range[0][1]}</Label>
                          </>
                        )
                      },
                      {
                        title: translate('pages.menus.table.dayFilter'),
                        dataIndex: 'day_filters',
                        render: (dayFilters: any) => (
                          <Stack direction="row" spacing={1}>
                            {dayFilters?.map((day: any) => (
                              <Chip
                                size="small"
                                key={`${day}`}
                                label={DAY_OF_WEEK.find(({ value }) => value === day)?.label}
                              />
                            ))}
                          </Stack>
                        )
                      }
                    ]}
                  />
                </Stack>
              </Box>
            </Card>
          </Stack>
        </Box>
      </Page>
    </FormProvider>
  );
};

export default UpdateStorePage;

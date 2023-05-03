/* eslint-disable camelcase */
import { yupResolver } from '@hookform/resolvers/yup';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
// material
import { Button, Card, Chip, Stack, Typography } from '@mui/material';
import menuApi from 'api/menu';
import { DeleteConfirmDialog } from 'components/DeleteConfirmDialog';
import { menuSchema } from 'components/form/Menu/helper';
import MenuForm from 'components/form/Menu/MenuForm';
import Label from 'components/Label';
import ModalForm from 'components/ModalForm/ModalForm';
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import useAuth from 'hooks/useAuth';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import { useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
// components
import { useNavigate } from 'react-router-dom';
import { getMenusOfBrand } from 'redux/menu/api';
import { PATH_DASHBOARD } from 'routes/paths';
import { DateFilter, MenuStatus, PosMenu, TCreateMenuInformation } from 'types/menu';
import { TTableColumn } from 'types/table';
import { convertTimeToInteger, processDayFiter } from 'utils/utils';

const MenusPage = () => {
  const navigate = useNavigate();
  const tableRef = useRef<any>();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const [isShowConfirmDeleteDialog, setIsShowConfirmDeleteDialog] = useState(false);
  const [deleteMenu, setDeleteMenu] = useState<PosMenu>();

  const menuColumns: TTableColumn<PosMenu>[] = [
    {
      title: 'Code',
      dataIndex: 'code'
    },
    {
      title: 'Thời gian hiệu lực',
      hideInSearch: true,
      render: (_, data: PosMenu) =>
        data.startTime && data.endTime ? (
          <Typography>
            <Label key={data.code} color="primary">
              {moment(data.startTime, 'HH:mm:ss').format('HH:mm')}
            </Label>{' '}
            -{' '}
            <Label key={data.code} color="primary">
              {moment(data.endTime, 'HH:mm:ss').format('HH:mm')}
            </Label>
          </Typography>
        ) : (
          '-'
        )
    },
    {
      title: 'Ngày áp dụng',
      dataIndex: 'dateFilter',
      hideInSearch: true,
      render: (_: any, { dateFilter }: PosMenu) => (
        <Stack direction="row" spacing={1}>
          {dateFilter?.map((date) => (
            <Chip
              size="small"
              key={date}
              label={Object.values(DateFilter)[Object.keys(DateFilter).indexOf(date)]}
            />
          ))}
        </Stack>
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      hideInSearch: true,
      render: (status) =>
        status == MenuStatus.ACTIVE ? (
          <Label color="primary">Hoạt Động</Label>
        ) : (
          <Label color="error">Tạm ẩn</Label>
        )
    },
    {
      title: 'Độ ưu tiên',
      dataIndex: 'priority',
      hideInSearch: true
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      hideInSearch: true,
      render: (_: any, { createdAt }: PosMenu) => (
        <Stack direction="row" spacing={1}>
          <Label key={createdAt} color="warning">
            {moment(createdAt).format('DD/MM/YYYY')}
          </Label>
        </Stack>
      )
    }
  ];

  const createMenuForm = useForm({
    resolver: yupResolver(menuSchema),
    shouldUnregister: true,
    defaultValues: {
      time_ranges: [{ from: null, to: null }],
      allDay: false,
      isBaseMenu: false,
      isUseBaseMenu: false
    }
  });

  const onDeleteMenu = async (menuId: string) => {
    try {
      await menuApi.delete(menuId);
      enqueueSnackbar('Xoá thành công', {
        variant: 'success'
      });
      console.log(`tableRef.current`, tableRef.current);
      tableRef.current?.reload();
    } catch (error) {
      console.log(`error`, error);
      enqueueSnackbar((error as any).message, {
        variant: 'error'
      });
    }
  };

  const onConfirmDelete = async () => {
    try {
      await menuApi.updateMenuStatus(deleteMenu?.id ?? '', MenuStatus.DEACTIVATE).then(() => {
        enqueueSnackbar('Xoá thành công', {
          variant: 'success'
        });
        setIsShowConfirmDeleteDialog(!isShowConfirmDeleteDialog);
        tableRef.current?.reload();
      });
    } catch (error) {
      enqueueSnackbar((error as any).Error, {
        variant: 'error'
      });
    }
  };

  const handleProcessCreateNewMenuRequest = (data: any) => {
    const { code, startTime, endTime, dayFilter, priority, allDay, isBaseMenu, isUseBaseMenu } =
      data;
    let startTimeToInt = 0;
    let endTimeToInt = 0;

    if (allDay) {
      startTimeToInt = 0;
      endTimeToInt = 1439;
    } else {
      // convert all data to int to send request
      startTimeToInt = convertTimeToInteger(moment(startTime).format('HH:mm'));
      endTimeToInt = convertTimeToInteger(moment(endTime).format('HH:mm'));
    }

    const dayFilterTotal = processDayFiter(dayFilter);
    const processedData: TCreateMenuInformation = {
      isBaseMenu: isBaseMenu ?? false,
      isUseBaseMenu: isUseBaseMenu ?? false,
      code: code,
      priority: priority ? parseInt(priority) : 0,
      dateFilter: dayFilterTotal,
      startTime: startTimeToInt,
      endTime: endTimeToInt
    };

    return processedData;
  };

  return (
    <Page
      title="Danh sách menu"
      actions={() => [
        <ModalForm
          key="create-menu"
          onOk={async () => {
            try {
              await createMenuForm.handleSubmit(
                (data: any) => {
                  const requestOfCreateNewMenu = handleProcessCreateNewMenuRequest(data);
                  return menuApi
                    .createNewMenu(requestOfCreateNewMenu)
                    .then((res) => {
                      enqueueSnackbar('Tạo menu thành công', {
                        variant: 'success'
                      });
                      tableRef.current?.reload();
                      return true;
                    })
                    .catch((err) => {
                      enqueueSnackbar(err.Error, {
                        variant: 'error'
                      });
                      return false;
                    });
                },
                (e) => {
                  throw e;
                }
              )();
              return true;
            } catch (error) {
              enqueueSnackbar('Có lỗi xảy ra. Vui lòng thử lại!', {
                variant: 'error'
              });
              return false;
            }
          }}
          title={<Typography variant="h4">Tạo menu mới</Typography>}
          trigger={
            <Button variant="contained" startIcon={<Icon icon={plusFill} />}>
              Tạo menu mới
            </Button>
          }
        >
          <FormProvider {...createMenuForm}>
            <MenuForm />
          </FormProvider>
        </ModalForm>
      ]}
    >
      <Card>
        <Stack spacing={2}>
          <ResoTable
            ref={tableRef}
            onDelete={(data: PosMenu) => (
              setDeleteMenu(data), setIsShowConfirmDeleteDialog(!isShowConfirmDeleteDialog)
            )}
            rowKey="menu_id"
            onEdit={(menu: PosMenu) => navigate(`${PATH_DASHBOARD.menus.root}/${menu.id}`)}
            getData={(params: any) => getMenusOfBrand(user?.brandId, params)}
            columns={menuColumns}
          />
        </Stack>
      </Card>

      <DeleteConfirmDialog
        open={isShowConfirmDeleteDialog}
        onClose={() => setIsShowConfirmDeleteDialog(!isShowConfirmDeleteDialog)}
        onDelete={() => onConfirmDelete()}
        title={'Bạn có muốn xoá menu này'}
        description={'Menu này sẽ bị xoá khỏi hệ thống'}
      />
    </Page>
  );
};

export default MenusPage;

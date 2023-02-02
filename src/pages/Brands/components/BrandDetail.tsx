import { Visibility } from '@mui/icons-material';
import { TabContext, TabList } from '@mui/lab';
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Tab,
  Tooltip,
  Typography
} from '@mui/material';
import brandApi from 'api/brand';
import Label from 'components/Label';
import Page from 'components/Page';
import ResoDescriptions, { ResoDescriptionColumnType } from 'components/ResoDescriptions';
import ResoTable from 'components/ResoTable/ResoTable';
import { useRef, useState } from 'react';

import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router';
import { PATH_DASHBOARD } from 'routes/paths';
import { TBrandDetail } from 'types/brand';
import { TStore } from 'types/store';
import { TTableColumn } from 'types/table';
import { TUser, TUserCreate, UserStatus } from 'types/user';
import AddAccountModal from './AddAccountModel';
import { FormProvider, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

const BrandDetailPage = () => {
  const { brandId } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const ref = useRef<any>();
  const { data: brand } = useQuery(
    ['brands', brandId],
    () => brandApi.getBrandDetail(brandId!).then((res) => res.data),
    {
      enabled: Boolean(brandId)
    }
  );
  const brandDetailColumns: ResoDescriptionColumnType<TBrandDetail>[] = [
    {
      title: 'STT',
      dataIndex: 'index'
    },
    {
      title: 'Tên nhãn hiệu',
      dataIndex: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },
    {
      title: 'Điện thoại',
      dataIndex: 'phone',
      hideInSearch: true
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      hideInSearch: true
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status'
    },
    {
      title: 'Số lượng cửa hàng ',
      dataIndex: 'numberOfStores'
    }
  ];

  const storeDetailColumns: ResoDescriptionColumnType<TStore>[] = [
    {
      title: 'STT',
      dataIndex: 'index',
      hideInSearch: true
    },
    {
      title: 'Tên đầy đủ',
      dataIndex: 'name',
      hideInSearch: true
    },
    {
      title: 'Tên rút gọn',
      dataIndex: 'shortName'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      hideInSearch: true
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      hideInSearch: true
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      hideInSearch: true
    },
    {
      title: 'Chi tiết',
      fixed: 'right',
      hideInSearch: true,
      render: (_: any, store: TStore) => (
        <Tooltip title="Chi tiết">
          <IconButton
            onClick={() => navigate(PATH_DASHBOARD.stores.storeById(store.id))}
            size="large"
          >
            <Visibility />
          </IconButton>
        </Tooltip>
      )
    }
  ];
  const accountColumns: TTableColumn<TUser>[] = [
    {
      title: 'STT',
      dataIndex: 'index',
      hideInSearch: true
    },
    {
      title: 'Tên tài khoản',
      dataIndex: 'username'
    },
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      hideInSearch: true
    },
    {
      title: 'Vị trí',
      dataIndex: 'role',
      render: (type) => <Chip label={type} />
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      width: 150,
      hideInSearch: true,
      render: (status) => (
        <Label color={status == UserStatus.ACTIVE ? 'primary' : 'default'}>
          {status == UserStatus.ACTIVE ? 'Hoạt động' : 'Ngừng hoạt động'}
        </Label>
      )
      // valueEnum: [
      //   {
      //     label: 'Đang bán',
      //     value: 'true'
      //   },
      //   {
      //     label: 'Ngừng bán',
      //     value: 'false'
      //   }
      // ],
    }
  ];
  const [activeTab, setActiveTab] = useState('1');
  const [loading, setLoading] = useState(false);
  const handleChangeTab = (_event: React.SyntheticEvent, newValue: string) => {
    setLoading(true);
    setActiveTab(newValue);
    setLoading(false);
  };
  const [openAddAccountModel, setOpenAddAccountModel] = useState(false);
  const addAccountForm = useForm<TUserCreate>({
    defaultValues: {
      brandId: brandId,
      status: UserStatus.ACTIVE
    },
    shouldUnregister: false
  });

  const onSubmitCreateUser = (values: TUserCreate) => {
    console.log(`data`, values);
    return brandApi
      .createUserOfBrand(brandId!, values)
      .then((res) => {
        enqueueSnackbar(`Tạo thành công`, {
          variant: 'success'
        });
        setOpenAddAccountModel(false);
      })
      .catch((err) => {
        enqueueSnackbar(err.status + `:` + err.title, {
          variant: 'error'
        });
      });
  };

  return (
    <Page title={`Chi tiết thương hiệu: ${brand?.name}`}>
      <Card>
        {brand?.picUrl ? (
          <>
            <DialogTitle
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Typography variant="h5">Hình ảnh Logo</Typography>
            </DialogTitle>

            <DialogContent sx={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar alt="Remy Sharp" src={brand.picUrl} sx={{ width: 100, height: 100 }} />
            </DialogContent>
          </>
        ) : (
          <></>
        )}

        <DialogContent dividers>
          <ResoDescriptions
            title="Thông tin"
            labelProps={{ fontWeight: 'bold' }}
            columns={brandDetailColumns as any}
            datasource={brand}
            column={2}
          />
        </DialogContent>
      </Card>
      <Card sx={{ my: 2 }}>
        <TabContext value={activeTab}>
          <Box sx={{ mb: 2 }}>
            <TabList onChange={handleChangeTab}>
              <Tab label="Danh sách cửa hàng" value="1" />
              <Tab label="Danh sách tài khoản" value="2" />
            </TabList>
          </Box>

          <Stack spacing={2}>
            {activeTab === '1' ? (
              <Box>
                <Typography my={2} variant="h5">
                  Danh sách cửa hàng
                </Typography>
                <ResoTable
                  key={activeTab}
                  pagination
                  ref={ref}
                  showAction={false}
                  loading={loading}
                  rowKey="store_id"
                  getData={(params: any) => brandApi.getStoreOfBrand(brandId!, params)}
                  columns={storeDetailColumns}
                />
              </Box>
            ) : (
              <Box>
                <Stack
                  my={2}
                  spacing={2}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h5">Danh sách tài khoản</Typography>
                  <Button onClick={() => setOpenAddAccountModel(true)} variant="contained">
                    Thêm tài khoản
                  </Button>
                  <FormProvider {...addAccountForm}>
                    <AddAccountModal
                      onClose={() => setOpenAddAccountModel(false)}
                      open={openAddAccountModel}
                      onFinish={addAccountForm.handleSubmit(onSubmitCreateUser)}
                    />
                  </FormProvider>
                </Stack>

                <ResoTable
                  ref={ref}
                  key={activeTab}
                  pagination
                  loading={loading}
                  getData={(params: any) => brandApi.getListUserOfBrand(brandId!, params)}
                  onEdit={() => {}}
                  // onDelete={onDelete}
                  columns={accountColumns}
                  rowKey="id"
                />
              </Box>
            )}
          </Stack>
        </TabContext>
      </Card>
    </Page>
  );
};
export default BrandDetailPage;

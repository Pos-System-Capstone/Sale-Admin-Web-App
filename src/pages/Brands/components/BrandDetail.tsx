import { TabContext, TabList } from '@mui/lab';
import {
  Avatar,
  Box,
  Button,
  Card,
  DialogContent,
  DialogTitle,
  Stack,
  Tab,
  Typography
} from '@mui/material';
import brandApi from 'api/brand';
import Label from 'components/Label';
import Page from 'components/Page';
import ResoDescriptions, { ResoDescriptionColumnType } from 'components/ResoDescriptions';
import { SHA256 } from 'crypto-js';
import useAuth from 'hooks/useAuth';
import { useSnackbar } from 'notistack';
import AccountsList from 'pages/accounts/components/AccountsList';
import StoresList from 'pages/Stores/components/StoresList';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { BrandStatus, TBrandDetail } from 'types/brand';
import { TUserCreate, UserStatus } from 'types/user';
import { Role } from 'utils/role';
import AddAccountModal from './AddAccountModel';
import UpdateBrandInformation from './UpdateBrandInformation/UpdateBrandInformation';

const BrandDetailPage = () => {
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [openUpdateBrandInformationForm, setOpenUpdateBrandInformationForm] = useState(false);
  const [openAddAccountModel, setOpenAddAccountModel] = useState(false);
  const { data: brand, refetch } = useQuery(
    ['brands', user?.brandId],
    () => brandApi.getBrandDetail(user?.brandId).then((res) => res.data),
    {
      enabled: Boolean(user?.brandId)
    }
  );
  const brandDetailColumns: ResoDescriptionColumnType<TBrandDetail>[] = [
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
      dataIndex: 'status',
      render: (status) => {
        return status === BrandStatus.ACTIVE ? (
          <Label color="primary">Hoạt động </Label>
        ) : (
          <Label color="warning"> Không hoạt động </Label>
        );
      }
    },
    {
      title: 'Số lượng cửa hàng ',
      dataIndex: 'numberOfStores'
    }
  ];

  const [activeTab, setActiveTab] = useState('1');
  const [loading, setLoading] = useState(false);

  const handleChangeTab = (_event: React.SyntheticEvent, newValue: string) => {
    setLoading(true);
    setActiveTab(newValue);
    setLoading(false);
  };

  const addAccountForm = useForm<TUserCreate>({
    defaultValues: {
      brandId: user?.brandId,
      status: UserStatus.ACTIVE
    },
    shouldUnregister: false
  });

  const onSubmitCreateUser = (values: TUserCreate) => {
    const createUserData = { ...values };
    createUserData.password = SHA256(createUserData.password).toString();
    return brandApi
      .createUserOfBrand(user?.brandId, createUserData)
      .then((res) => {
        enqueueSnackbar(`Tạo thành công`, {
          variant: 'success'
        });
        setOpenAddAccountModel(false);
      })
      .catch((err) => {
        enqueueSnackbar('Có lỗi xảy ra! Vui lòng thử lại!', {
          variant: 'error'
        });
      });
  };

  return (
    <Page>
      <Box display={'flex'} justifyContent={'center'}>
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <DialogContent>
            <Avatar alt="brand" src={brand?.picUrl} sx={{ width: 200, height: 200 }} />
          </DialogContent>
          <DialogTitle
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Typography variant="h3">{brand?.name}</Typography>
          </DialogTitle>
        </Box>
      </Box>
      {/* Pic of brand */}
      <Card>
        {brand?.picUrl ? (
          <>
            <DialogTitle
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Typography variant="h5">Hình ảnh Logo</Typography>
            </DialogTitle>

            <DialogContent sx={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar alt="brand" src={brand.picUrl} sx={{ width: 100, height: 100 }} />
            </DialogContent>
          </>
        ) : (
          <></>
        )}

        {/* Brand information */}
        <DialogContent dividers>
          <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h5">Thông tin</Typography>
            <Button
              onClick={() => setOpenUpdateBrandInformationForm(!openUpdateBrandInformationForm)}
              variant="contained"
            >
              Cập nhật thông tin
            </Button>
          </Stack>

          {openUpdateBrandInformationForm ? (
            // Form to update brand information
            <UpdateBrandInformation
              onUpdateFormSuccessful={() => {
                setOpenUpdateBrandInformationForm(false);
                refetch();
              }}
              currentBrandInformation={brand}
            />
          ) : (
            <ResoDescriptions
              labelProps={{ fontWeight: 'bold' }}
              columns={brandDetailColumns as any}
              datasource={brand}
              column={2}
            />
          )}
        </DialogContent>
      </Card>

      {/* Show list account in brand */}
      {user?.role.includes(Role.SystemAdmin) ? (
        <Card sx={{ my: 2, p: 5 }}>
          <TabContext value={activeTab}>
            <Box sx={{ mb: 2 }} display={'flex'} justifyContent={'space-between'}>
              <TabList onChange={handleChangeTab}>
                <Tab label="Danh sách cửa hàng" value="1" />
                <Tab label="Danh sách tài khoản" value="2" />
              </TabList>
              {activeTab === '2' && (
                <Box>
                  <Button
                    onClick={() => setOpenAddAccountModel(!openAddAccountModel)}
                    variant="contained"
                  >
                    Tạo tài khoản mới
                  </Button>
                </Box>
              )}
            </Box>
            <Stack spacing={2}>
              {activeTab === '1' ? (
                <StoresList />
              ) : (
                <Box>
                  <AccountsList />
                </Box>
              )}
            </Stack>
          </TabContext>
        </Card>
      ) : (
        <Card sx={{ my: 2 }}>
          <Stack spacing={2}>
            <Box>
              <Typography my={2} variant="h5">
                Danh sách cửa hàng
              </Typography>
              <StoresList />
            </Box>
          </Stack>
        </Card>
      )}
      <FormProvider {...addAccountForm}>
        <AddAccountModal
          onClose={() => setOpenAddAccountModel(false)}
          open={openAddAccountModel}
          onFinish={addAccountForm.handleSubmit(onSubmitCreateUser)}
        />
      </FormProvider>
    </Page>
  );
};
export default BrandDetailPage;

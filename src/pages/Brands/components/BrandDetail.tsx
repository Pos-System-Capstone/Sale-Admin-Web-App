import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
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
import useAuth from 'hooks/useAuth';
import { useSnackbar } from 'notistack';
import StoresList from 'pages/Stores/components/StoresList';
import AccountsList from 'pages/accounts/components/AccountsList';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { BrandStatus, TBrandDetail } from 'types/brand';
import { TUserCreate, UserStatus } from 'types/user';
import { Role } from 'utils/role';
import AddAccountModal from './AddAccountModel';
import UpdateBrandInformation from './UpdateBrandInformation/UpdateBrandInformation';
import { PaymentProviderConfig } from './PaymentMethođUpdate';

const BrandDetailPage = () => {
  const { brandId } = useParams();
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [openUpdateBrandInformationForm, setOpenUpdateBrandInformationForm] = useState(false);
  const [openAddAccountModel, setOpenAddAccountModel] = useState(false);
  const [isSuccessfully, setIsSuccessfully] = useState(false);

  const { data: brand, refetch } = useQuery(['brands', user?.brandId], async () => {
    if (brandId) {
      return await brandApi.getBrandDetail(brandId).then((res) => res.data);
    }
    return await brandApi.getBrandDetail(user?.brandId).then((res) => res.data);
  });

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
      brandId: user?.brandId ?? '',
      status: UserStatus.ACTIVE
    }
    // shouldUnregister: false
  });

  const onSubmitCreateUser = (values: TUserCreate) => {
    const createUserData = { ...values };
    createUserData.brandId = brandId ?? '';
    return brandApi
      .createUserOfBrand(brandId ?? '', createUserData)
      .then((res) => {
        enqueueSnackbar(`Tạo tài khoản thành công`, {
          variant: 'success'
        });
        setIsSuccessfully(!isSuccessfully);
        setOpenAddAccountModel(false);
      })
      .catch((err) => {
        enqueueSnackbar('Có lỗi xảy ra! Vui lòng thử lại!', {
          variant: 'error'
        });
      });
  };

  useEffect(() => {
    addAccountForm.reset();
  }, [openAddAccountModel]);

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
                    startIcon={<Icon icon={plusFill} />}
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
                  <AccountsList isUpdate={isSuccessfully} />
                </Box>
              )}
            </Stack>
          </TabContext>
        </Card>
      ) : (
        <>
          <Card sx={{ my: 2 }}>
            <Stack spacing={2}>
              <Box>
                <Typography my={2} variant="h5">
                  Phương thức thanh toán
                </Typography>
                <PaymentProviderConfig brand={brand} />
              </Box>
            </Stack>
          </Card>
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
        </>
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

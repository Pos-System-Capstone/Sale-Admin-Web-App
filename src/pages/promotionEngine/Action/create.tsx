/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
// import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box, Card, FormHelperText, Grid, Paper, Stack, Typography } from '@mui/material';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import Page from 'components/Page';
import useDashboard from 'hooks/useDashboard';
import useLocales from 'hooks/useLocales';
import { DashboardNavLayout } from 'layouts/dashboard/DashboardNavbar';
import { useSnackbar } from 'notistack';
// import { CardTitle } from 'pages/Products/components/Card';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TreeItem from '@mui/lab/TreeItem';
import TreeView from '@mui/lab/TreeView';
import { InputField } from 'components/form';
// import { storeSchemaBuilder } from 'pages/report/PromotionReport/utils';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import TaskComponent from './cartop';
import { TActionCreate } from 'types/promotion/action';
import actionApi from 'api/promotion/action';
import { PATH_PROMOTION_APP } from 'routes/promotionAppPaths';
import { getUserInfo } from 'utils/utils';

const NewActionPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { setNavOpen } = useDashboard();
  const navigate = useNavigate();
  const { translate } = useLocales();
  const userRaw = getUserInfo();
  const user: any = JSON.parse(userRaw ?? '{}');
  // const brandId = useSelector((state: RootState) => state.brand);
  console.log('user', user.brandId);

  const [selectedText, setSelectedText] = useState<string | null>(null);

  const handleTreeItemClick = (text: string, actionType: number) => {
    reset({
      brandId: user.brandId,
      discountType: 0,
      discountQuantity: 0,
      discountAmount: 0,
      discountPercentage: 0,
      fixedPrice: 0,
      maxAmount: 0,
      minPriceAfter: 0,
      ladderPrice: 0,
      bundlePrice: 0,
      bundleQuantity: 0,
      bundleStrategy: 0,
      bonusPointRate: 0,
      orderLadderProduct: 0,
      listProduct: []
    });
    setValue('actionType', actionType);
    setSelectedText(text);
  };

  const methods = useForm<TActionCreate>({
    // resolver: yupResolver(storeSchemaBuilder(translate))
  });
  const { handleSubmit, setValue, reset } = methods;

  const onSubmit = (values: TActionCreate) => {
    console.log('action', values);
    values.brandId = user.brandId;
    const body: TActionCreate = { ...values };
    body.brandId = user.brandId;
    body.name = values.name;
    body.bonusPointRate = +values.bonusPointRate;
    body.discountAmount = +values.discountAmount;
    body.discountQuantity = +values.discountQuantity;
    body.discountPercentage = +values.discountPercentage;
    body.fixedPrice = +values.fixedPrice;
    body.maxAmount = +values.maxAmount;
    body.minPriceAfter = +values.minPriceAfter;
    body.ladderPrice = +values.ladderPrice;
    body.bundlePrice = +values.bundlePrice;
    body.bundleQuantity = +values.bundleQuantity;
    body.bundleStrategy = +values.bundleStrategy;
    body.orderLadderProduct = +values.orderLadderProduct;
    body.listProduct = values.listProduct;
    actionApi
      .createAction(body)
      .then((res) => {
        enqueueSnackbar(`Tạo thành công ${values.name}`, {
          variant: 'success'
        });
        navigate(`${PATH_PROMOTION_APP.action.root}/`);
        console.log(res);
      })
      .catch((err) => {
        enqueueSnackbar(`Có lỗi xảy ra. Vui lòng thử lại`, {
          variant: 'error'
        });
      });
  };

  return (
    <FormProvider {...methods}>
      <Page title="Tạo mới Action">
        <Stack sx={{ width: '50%', height: '4rem' }} spacing={2}>
          <Alert severity="warning">
            Action là hành động ảnh hưởng đến đơn hàng hoặc thêm quà vào đơn hàng.
          </Alert>
        </Stack>
        <DashboardNavLayout onOpenSidebar={() => setNavOpen(true)}>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <LoadingAsyncButton onClick={handleSubmit(onSubmit)} type="submit" variant="contained">
              + Tạo Action
            </LoadingAsyncButton>
          </Stack>
        </DashboardNavLayout>
        <Stack spacing={2}>
          <Card>
            <Box>
              <Grid container spacing={1}>
                <Grid item xs={6} sm={8} style={{ height: '100px' }}>
                  <InputField
                    fullWidth
                    name="name"
                    label={translate('collections.table.collectionName')}
                  />
                  <FormHelperText error>Vui lòng nhập tên action cần tạo</FormHelperText>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={4}>
                  <Paper variant="outlined" sx={{ width: '100%' }}>
                    <h2>Các danh mục Action</h2>

                    <TreeView
                      aria-label="file system navigator"
                      defaultCollapseIcon={<ExpandMoreIcon />}
                      defaultExpandIcon={<ChevronRightIcon />}
                      sx={{
                        height: 240,
                        flexGrow: 1,
                        maxWidth: 400,
                        overflowY: 'auto',
                        m: '20px 0'
                      }}
                    >
                      <TreeItem
                        nodeId="1"
                        label={
                          <Typography variant="body2" fontSize="20px">
                            {/* Cart item */}
                            Sản Phẩm
                          </Typography>
                        }
                        icon=" "
                      >
                        <TreeItem
                          nodeId="2"
                          // label="Discount amount (VNĐ)"
                          label="Giảm giá đơn hàng(VND)"
                          icon=" "
                          onClick={() => {
                            handleTreeItemClick('4', 4);
                            setValue('actionType', 4);
                          }}
                          sx={{
                            border: '1px solid #57d8a1',
                            m: '10px 0',
                            width: '190px',
                            p: '1.1px',
                            height: '25px',
                            borderRadius: '4px'
                          }}
                        />
                        <TreeItem
                          nodeId="3"
                          // label="Discount percentage (%)"
                          label="Giảm giá % đơn hàng(%)"
                          icon=" "
                          onClick={() => {
                            handleTreeItemClick('5', 5);
                          }}
                          sx={{
                            border: '1px solid #57d8a1',
                            m: '10px 0',
                            width: '190px',
                            p: '1.1px',
                            height: '25px',
                            borderRadius: '4px'
                          }}
                        />
                        <TreeItem
                          nodeId="4"
                          // label="Discount unit"
                          label="Đơn vị giảm giá(Unit)"
                          icon=" "
                          onClick={() => handleTreeItemClick('6', 6)}
                          sx={{
                            border: '1px solid #57d8a1',
                            m: '10px 0',
                            width: '190px',
                            p: '1.1px',
                            height: '25px',
                            borderRadius: '4px'
                          }}
                        />
                        <TreeItem
                          nodeId="5"
                          // label="Fixed price"
                          label="Giá cố định(Fixed)"
                          icon=" "
                          onClick={() => handleTreeItemClick('7', 7)}
                          sx={{
                            border: '1px solid #57d8a1',
                            m: '10px 0',
                            width: '190px',
                            p: '1.1px',
                            height: '25px',
                            borderRadius: '4px'
                          }}
                        />
                        <TreeItem
                          nodeId="6"
                          // label="Ladder price"
                          label="Giá bậc thang(Ladder)"
                          icon=" "
                          onClick={() => handleTreeItemClick('8', 8)}
                          sx={{
                            border: '1px solid #57d8a1',
                            m: '10px 0',
                            width: '190px',
                            p: '1.1px',
                            height: '25px',
                            borderRadius: '4px'
                          }}
                        />
                        <TreeItem
                          nodeId="7"
                          // label="Bundle price"
                          label="Giá trọn gói(Bundle)"
                          icon=" "
                          onClick={() => handleTreeItemClick('9', 9)}
                          sx={{
                            border: '1px solid #57d8a1',
                            m: '10px 0',
                            width: '190px',
                            p: '1.1px',
                            height: '25px',
                            borderRadius: '4px'
                          }}
                        />
                      </TreeItem>

                      <TreeItem
                        nodeId="8"
                        label={
                          <Typography variant="body2" fontSize="20px">
                            Đơn Hàng
                          </Typography>
                        }
                        icon=" "
                        sx={{ mt: '1rem' }}
                      >
                        <TreeItem
                          nodeId="9"
                          // label="Discount amount (VNĐ)"
                          label="Giảm giá đơn hàng(VND)"
                          icon=" "
                          onClick={() => {
                            handleTreeItemClick('1', 1);
                          }}
                          sx={{
                            border: '1px solid #57d8a1',
                            m: '10px 0',
                            width: '190px',
                            p: '1.1px',
                            height: '25px',
                            borderRadius: '4px'
                          }}
                        />
                        <TreeItem
                          nodeId="10"
                          // label="Discount percentage (%)"
                          label="Giảm giá % đơn hàng(%)"
                          icon=" "
                          onClick={() => {
                            handleTreeItemClick('2', 2);
                          }}
                          sx={{
                            border: '1px solid #57d8a1',
                            m: '10px 0',
                            width: '190px',
                            p: '1.1px',
                            height: '25px',
                            borderRadius: '4px'
                          }}
                        />
                        <TreeItem
                          nodeId="11"
                          // label="Shipping amount (VNĐ)"
                          label="Giảm phí Ship(VND)"
                          icon=" "
                          onClick={() => {
                            handleTreeItemClick('3', 3);
                          }}
                          sx={{
                            border: '1px solid #57d8a1',
                            m: '10px 0',
                            width: '190px',
                            p: '1.1px',
                            height: '25px',
                            borderRadius: '4px'
                          }}
                        />
                        <TreeItem
                          nodeId="12"
                          // label="Shipping percentage (%)"
                          label="Giảm phí Ship(%)"
                          icon=" "
                          onClick={() => {
                            handleTreeItemClick('11', 11);
                          }}
                          sx={{
                            border: '1px solid #57d8a1',
                            m: '10px 0',
                            width: '190px',
                            p: '1.1px',
                            height: '25px',
                            borderRadius: '4px'
                          }}
                        />
                        <TreeItem
                          nodeId="13"
                          label="Tặng điểm"
                          icon=" "
                          onClick={() => {
                            handleTreeItemClick('10', 10);
                          }}
                          sx={{
                            border: '1px solid #57d8a1',
                            m: '10px 0',
                            width: '190px',
                            p: '1.1px',
                            height: '25px',
                            borderRadius: '4px'
                          }}
                        />
                      </TreeItem>
                    </TreeView>
                  </Paper>
                </Grid>
                <Grid item xs={6} sm={8}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      '& > :not(style)': {
                        height: 350
                      }
                    }}
                  >
                    <Paper variant="outlined" sx={{ width: '100%' }}>
                      <TaskComponent selectedText={selectedText} />
                    </Paper>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Stack>
      </Page>
    </FormProvider>
  );
};

export default NewActionPage;

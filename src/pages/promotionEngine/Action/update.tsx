/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
// import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box, Card, FormHelperText, Grid, Paper, Stack } from '@mui/material';
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
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import TaskComponent from './cartop';
import { TActionBase, TActionUpdate } from 'types/promotion/action';
import actionApi from 'api/promotion/action';
import { PATH_PROMOTION_APP } from 'routes/promotionAppPaths';
import { getUserInfo } from 'utils/utils';
import { useQuery } from 'react-query';

const UpdateActionPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { setNavOpen } = useDashboard();
  const navigate = useNavigate();
  const { translate } = useLocales();
  const userRaw = getUserInfo();
  const user: any = JSON.parse(userRaw ?? '{}');

  const { id } = useParams();
  const { data: action } = useQuery(
    ['action', user.brandId],
    async () => {
      return actionApi.getActionById(id).then((res) => res.data);
    },
    {
      enabled: Boolean(id)
    }
  );

  const Type = action?.actionType;
  console.log('ActionType ' + Type);

  const [listProduct, setlistProduct] = useState<string[]>([]);

  console.log('check list', listProduct);

  // Hàm callback để nhận dữ liệu từ component con
  const handleDataFromChild = (data: string[]) => {
    setlistProduct(data);
  };

  const [selectedText, setSelectedText] = useState<string | null>('0');
  useEffect(() => {
    setSelectedText(Type?.toString() ?? null);
  }, [Type]);
  const handleTreeItemClick = (text: string, actionType: number) => {
    // reset({
    //   brandId: user.brandId,
    //   discountQuantity: 0,
    //   discountAmount: 0,
    //   discountPercentage: 0,
    //   fixedPrice: 0,
    //   maxAmount: 0,
    //   minPriceAfter: 0,
    //   ladderPrice: 0,
    //   bundlePrice: 0,
    //   bundleQuantity: 0,
    //   bundleStrategy: 0,
    //   bonusPointRate: 0,
    //   orderLadderProduct: 0,
    //   listProduct: []
    // });
    setValue('actionType', actionType);
    setSelectedText(text);
  };

  const methods = useForm<TActionBase>({
    // resolver: yupResolver(storeSchemaBuilder(translate))
  });
  const { handleSubmit, setValue, reset } = methods;
  useEffect(() => {
    if (id) {
      // Thực hiện các hành động cần thiết khi `id` thay đổi
      reset({ ...action });
    }
  }, [id, reset, action]);
  const onSubmit = (values: TActionUpdate) => {
    values.brandId = user.brandId;
    const body: TActionUpdate = { ...values };
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
      .updateAction(id, body)
      .then((res) => {
        enqueueSnackbar(`Update thành công ${values.name}`, {
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

  useEffect(() => {
    if (action !== undefined) {
      reset({ ...action });
    }
  }, [action]);

  return (
    <FormProvider {...methods}>
      <Page title="Cập nhật Action">
        <Stack sx={{ width: '50%', height: '4rem' }} spacing={2}>
          <Alert severity="warning">
            Action là hành động ảnh hưởng đến đơn hàng hoặc thêm quà vào đơn hàng.
          </Alert>
        </Stack>
        <DashboardNavLayout onOpenSidebar={() => setNavOpen(true)}>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <LoadingAsyncButton onClick={handleSubmit(onSubmit)} type="submit" variant="contained">
              + Cập nhật Action
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
                  <FormHelperText error>Please input name</FormHelperText>
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
                      {/* <TreeItem
                        nodeId="1"
                        label={
                          <Typography variant="body2" fontSize="20px">
                            Cart item
                          </Typography>
                        }
                        icon=" "
                      > */}
                      <TreeItem
                        nodeId="2"
                        label="Giảm giá đơn hàng(VNĐ)"
                        icon=" "
                        onClick={() => {
                          handleTreeItemClick('4', 4);
                          // setValue('actionType', 4);
                        }}
                        sx={{
                          border: '1px solid #57d8a1',
                          m: '10px 0',
                          width: '190px',
                          p: '1.1px',
                          height: '25px',
                          borderRadius: '4px',
                          display: Type === 4 ? 'block' : 'none'
                        }}
                      />
                      <TreeItem
                        nodeId="3"
                        label="Giảm giá % đơn hàng(%)"
                        icon=" "
                        onClick={() => {
                          handleTreeItemClick('5', 5);
                          // setValue('actionType', 5);
                        }}
                        sx={{
                          border: '1px solid #57d8a1',
                          m: '10px 0',
                          width: '190px',
                          p: '1.1px',
                          height: '25px',
                          borderRadius: '4px',
                          display: Type === 5 ? 'block' : 'none'
                        }}
                      />
                      <TreeItem
                        nodeId="4"
                        label="Đơn vị giảm giá (Unit)"
                        icon=" "
                        onClick={() => handleTreeItemClick('6', 6)}
                        sx={{
                          border: '1px solid #57d8a1',
                          m: '10px 0',
                          width: '190px',
                          p: '1.1px',
                          height: '25px',
                          borderRadius: '4px',
                          display: Type === 6 ? 'block' : 'none'
                        }}
                      />
                      <TreeItem
                        nodeId="5"
                        label="Giá cố định(Fixed)"
                        icon=" "
                        onClick={() => handleTreeItemClick('7', 7)}
                        sx={{
                          border: '1px solid #57d8a1',
                          m: '10px 0',
                          width: '190px',
                          p: '1.1px',
                          height: '25px',
                          borderRadius: '4px',
                          display: Type === 7 ? 'block' : 'none'
                        }}
                      />
                      <TreeItem
                        nodeId="6"
                        label="Giá bậc thang(Ladder)"
                        icon=" "
                        onClick={() => handleTreeItemClick('8', 8)}
                        sx={{
                          border: '1px solid #57d8a1',
                          m: '10px 0',
                          width: '190px',
                          p: '1.1px',
                          height: '25px',
                          borderRadius: '4px',
                          display: Type === 8 ? 'block' : 'none'
                        }}
                      />
                      <TreeItem
                        nodeId="7"
                        label="Giá trọn gói(Bundle)"
                        icon=" "
                        onClick={() => handleTreeItemClick('9', 9)}
                        sx={{
                          border: '1px solid #57d8a1',
                          m: '10px 0',
                          width: '190px',
                          p: '1.1px',
                          height: '25px',
                          borderRadius: '4px',
                          display: Type === 9 ? 'block' : 'none'
                        }}
                      />
                      {/* </TreeItem> */}

                      {/* <TreeItem
                        nodeId="8"
                        label={
                          <Typography variant="body2" fontSize="20px">
                            Cart
                          </Typography>
                        }
                        icon=" "
                        sx={{ mt: '1rem' }}
                      > */}
                      <TreeItem
                        nodeId="9"
                        label="Giảm giá đơn hàng(VNĐ)"
                        icon=" "
                        onClick={() => {
                          handleTreeItemClick('1', 1);
                          // setValue('actionType', 1);
                        }}
                        sx={{
                          border: '1px solid #57d8a1',
                          m: '10px 0',
                          width: '190px',
                          p: '1.1px',
                          height: '25px',
                          borderRadius: '4px',
                          display: Type === 1 ? 'block' : 'none'
                        }}
                      />
                      <TreeItem
                        nodeId="10"
                        label="Giảm giá % đơn hàng(%)"
                        icon=" "
                        onClick={() => {
                          handleTreeItemClick('2', 2);
                          // setValue('actionType', 2);
                        }}
                        sx={{
                          border: '1px solid #57d8a1',
                          m: '10px 0',
                          width: '190px',
                          p: '1.1px',
                          height: '25px',
                          borderRadius: '4px',
                          display: Type === 2 ? 'block' : 'none'
                        }}
                      />
                      <TreeItem
                        nodeId="11"
                        label="Giảm phí Ship(VND)"
                        icon=" "
                        onClick={() => {
                          handleTreeItemClick('3', 3);
                          // setValue('actionType', 3);
                        }}
                        sx={{
                          border: '1px solid #57d8a1',
                          m: '10px 0',
                          width: '190px',
                          p: '1.1px',
                          height: '25px',
                          borderRadius: '4px',
                          display: Type === 3 ? 'block' : 'none'
                        }}
                      />
                      <TreeItem
                        nodeId="12"
                        label="Giảm phí Ship(VND)"
                        icon=" "
                        onClick={() => {
                          handleTreeItemClick('11', 11);
                          // setValue('actionType', 3);
                        }}
                        sx={{
                          border: '1px solid #57d8a1',
                          m: '10px 0',
                          width: '190px',
                          p: '1.1px',
                          height: '25px',
                          borderRadius: '4px',
                          display: Type === 11 ? 'block' : 'none'
                        }}
                      />
                      <TreeItem
                        nodeId="13"
                        label="Tặng điểm"
                        icon=" "
                        onClick={() => {
                          handleTreeItemClick('10', 10);
                          // setValue('actionType', 10);
                        }}
                        sx={{
                          border: '1px solid #57d8a1',
                          m: '10px 0',
                          width: '190px',
                          p: '1.1px',
                          height: '25px',
                          borderRadius: '4px',
                          display: Type === 10 ? 'block' : 'none'
                        }}
                      />
                      {/* </TreeItem> */}
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

export default UpdateActionPage;

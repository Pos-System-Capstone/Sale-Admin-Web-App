/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
import { yupResolver } from '@hookform/resolvers/yup';
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
import { storeSchemaBuilder } from 'pages/report/PromotionReport/utils';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import storeApi from 'redux/store/api';
import { PATH_PROMOTION_APP } from 'routes/promotionAppPaths';
import { TStore } from 'types/store';

const NewActionPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { setNavOpen } = useDashboard();
  const navigate = useNavigate();
  const { translate } = useLocales();

  const methods = useForm({
    resolver: yupResolver(storeSchemaBuilder(translate)),
    defaultValues: {
      open_time: null,
      close_time: null
    }
  });
  const { handleSubmit } = methods;

  const onSubmit = (values: Omit<TStore, 'id'>) =>
    storeApi
      .create(values)
      .then((res) => {
        enqueueSnackbar(`Tạo thành công ${values.name}`, {
          variant: 'success'
        });
        navigate(`${PATH_PROMOTION_APP.action.root}/${res.data.id}`);
        console.log(res);
      })
      .catch((err) => {
        enqueueSnackbar(`Có lỗi xảy ra. Vui lòng thử lại`, {
          variant: 'error'
        });
      });

  return (
    <FormProvider {...methods}>
      <Page title="ACTION BUILDER">
        <Stack sx={{ width: '50%', height: '4rem' }} spacing={2}>
          <Alert severity="warning">
            Action is the action that affect to the order or add a gift to order.
          </Alert>
        </Stack>
        <DashboardNavLayout onOpenSidebar={() => setNavOpen(true)}>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <LoadingAsyncButton onClick={handleSubmit(onSubmit)} type="submit" variant="contained">
              + New Action
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
                    <h2>Action items</h2>

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
                            Cart item
                          </Typography>
                        }
                        icon=" "
                      >
                        <TreeItem
                          nodeId="2"
                          label="Discount amount (VNĐ)"
                          icon=" "
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
                          label="Discount percentage (%)"
                          icon=" "
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
                          label="Discount unit"
                          icon=" "
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
                          label="Fixed price"
                          icon=" "
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
                          label="Ladder price"
                          icon=" "
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
                          label="Bundle price"
                          icon=" "
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
                            Cart
                          </Typography>
                        }
                        icon=" "
                        sx={{ mt: '1rem' }}
                      >
                        <TreeItem
                          nodeId="9"
                          label="Discount amount (VNĐ)"
                          icon=" "
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
                          label="Discount percentage (%)"
                          icon=" "
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
                          label="Shipping amount (VNĐ)"
                          icon=" "
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
                          label="Shipping percentage (%)"
                          icon=" "
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
                    <Paper variant="outlined" sx={{ width: '100%' }}></Paper>
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

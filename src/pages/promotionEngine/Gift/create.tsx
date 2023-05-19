import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TreeItem from '@mui/lab/TreeItem';
import TreeView from '@mui/lab/TreeView';
import { Box, Card, Grid, Paper, Stack } from '@mui/material';
import Alert from '@mui/material/Alert';
import FormHelperText from '@mui/material/FormHelperText';
import { InputField } from 'components/form';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import Page from 'components/Page';
import useDashboard from 'hooks/useDashboard';
import useLocales from 'hooks/useLocales';
import { DashboardNavLayout } from 'layouts/dashboard/DashboardNavbar';
import { get } from 'lodash';
import { useSnackbar } from 'notistack';
import { CardTitle } from 'pages/Products/components/Card';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { createCollection } from 'redux/collections/api';
import { PATH_PROMOTION_APP } from 'routes/promotionAppPaths';
import { CollectionTypeEnum, TCollection } from 'types/collection';

const NewGiftPage = () => {
  const { translate } = useLocales();
  const [searchParams] = useSearchParams();
  const type: any = Number(searchParams.get('type') ?? CollectionTypeEnum.MenuCollection);
  const isMenuCollection = type === CollectionTypeEnum.MenuCollection;

  const form = useForm<Partial<TCollection & { products: any[] }>>({
    defaultValues: {
      name: '',
      picUrl: '',
      description: '',
      products: []
    }
  });
  const { setNavOpen } = useDashboard();
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const { handleSubmit, watch, setValue } = form;

  const products = watch('products');
  const setProducts = (products: any[]) => {
    setValue('products', products);
  };

  const onSubmit = (values: any) =>
    createCollection(values)
      .then((res) => {
        enqueueSnackbar(`Thêm thành công`, {
          variant: 'success'
        });
        navigate(`${PATH_PROMOTION_APP.gift.root}/${res.data}`);
      })
      .catch((err) => {
        const errMsg = get(err.response, ['data', 'message'], `Có lỗi xảy ra. Vui lòng thử lại`);
        enqueueSnackbar(errMsg, {
          variant: 'error'
        });
      });

  return (
    <Page title="GIFT BUILDER">
      <Stack sx={{ width: '50%', height: '4rem' }} spacing={2}>
        <Alert severity="warning">
          Action is the action that affect to the order or add a gift to order.
        </Alert>
      </Stack>
      <FormProvider {...form}>
        <DashboardNavLayout onOpenSidebar={() => setNavOpen(true)}>
          <Stack direction="row" spacing={2}>
            <LoadingAsyncButton
              onClick={handleSubmit(onSubmit, console.log)}
              type="submit"
              variant="contained"
            >
              + New Action
            </LoadingAsyncButton>
          </Stack>
        </DashboardNavLayout>
        <Stack spacing={2}>
          <Card>
            <CardTitle pb={2} variant="subtitle1">
              {isMenuCollection
                ? translate('collections.createInfo')
                : translate('collections.groupCollection')}
            </CardTitle>
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
                    <h3>Gift items</h3>

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
                      <TreeItem nodeId="1" label="Gift" icon=" ">
                        <TreeItem
                          nodeId="2"
                          label="Product"
                          icon=" "
                          sx={{
                            border: '1px solid #57d8a1',
                            m: '10px 0',
                            width: '160px',
                            p: '1.1px',
                            height: '25px',
                            borderRadius: '4px'
                          }}
                        />
                        <TreeItem
                          nodeId="3"
                          label="Voucher"
                          icon=" "
                          sx={{
                            border: '1px solid #57d8a1',
                            m: '10px 0',
                            width: '160px',
                            p: '1.1px',
                            height: '25px',
                            borderRadius: '4px'
                          }}
                        />
                        <TreeItem
                          nodeId="4"
                          label="Game Code"
                          icon=" "
                          sx={{
                            border: '1px solid #57d8a1',
                            m: '10px 0',
                            width: '160px',
                            p: '1.1px',
                            height: '25px',
                            borderRadius: '4px'
                          }}
                        />
                      </TreeItem>

                      <TreeItem nodeId="5" label="Bonus point" icon=" " sx={{ mt: '1rem' }}>
                        <TreeItem
                          nodeId="6"
                          label="Bonus point"
                          icon=" "
                          sx={{
                            border: '1px solid #57d8a1',
                            m: '10px 0',
                            width: '160px',
                            p: '1.1px',
                            height: '25px',
                            borderRadius: '4px'
                          }}
                        />
                        <TreeItem
                          nodeId="7"
                          label="Product code"
                          icon=" "
                          sx={{
                            border: '1px solid #57d8a1',
                            m: '10px 0',
                            width: '160px',
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
                        height: 300
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
      </FormProvider>
    </Page>
  );
};

export default NewGiftPage;

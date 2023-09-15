import ArrowForward from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useDebounceFn } from 'ahooks';
import brandApi from 'api/brand';
import { chunk } from 'lodash';
import React, { forwardRef, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
// import { setBrandId } from 'redux/slices/brand';
import { RootState } from 'redux/store';
import { PATH_REPORT_APP } from 'routes/reportAppPaths';
import { TStore } from 'types/store';
import { getUserInfo } from 'utils/utils';

const Transition = forwardRef(
  (
    props: TransitionProps & {
      children?: React.ReactElement;
    },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...(props as any)} />
);

type Props = {
  open: boolean;
  onClose: () => void;
  onSelectStore: (store: TStore) => void;
};

const StoreNavigationDialog: React.FC<Props> = ({ open, onClose, onSelectStore }) => {
  const { stores = [] } = useSelector((state: RootState) => state.admin);
  const [filterName, setFilterName] = useState<string | null>(null);

  const { run } = useDebounceFn(
    (values) => {
      setFilterName(values);
    },
    {
      wait: 500
    }
  );

  const filteredStores = useMemo(() => {
    const groupStores: any[] = chunk(stores, 5);

    if (!filterName) return groupStores;

    groupStores.forEach((groupStore: TStore[], index) => {
      groupStores[index] = groupStore.filter(({ name }) =>
        name.toLowerCase().includes(filterName.toLowerCase())
      );
    });
    return groupStores;
  }, [filterName, stores]);

  // const { data: brandData } = useBrands();
  const { pathname } = useLocation();
  const firstElementOfPath = pathname.split('/')[1];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRaw = getUserInfo();
  const user: any = JSON.parse(userRaw ?? '{}');
  const { data: listStore } = useQuery(
    ['stores', user.brandId],
    async () => {
      return brandApi
        .getStoreOfBrand(user.brandId, { page: 1, size: 100 })
        .then((res) => res.data.items);
    },
    {
      enabled: Boolean(user.brandId)
    }
  );
  const [searchNameStoreReport, setSearchNameStoreReport] = useState<string | null>(null);
  const { run: runStore } = useDebounceFn(
    (values) => {
      setSearchNameStoreReport(values);
    },
    {
      wait: 500
    }
  );

  const filteredStoresReport = useMemo(() => {
    const groupStores = listStore;

    if (!searchNameStoreReport) return groupStores;

    return groupStores?.filter(({ name }) =>
      name?.toLowerCase().includes(searchNameStoreReport.toLowerCase())
    );
  }, [searchNameStoreReport, listStore]);

  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      TransitionComponent={Transition}
      open={open}
      onClose={onClose}
      scroll="paper"
    >
      <DialogTitle>
        Danh sách cửa hàng
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
          size="large"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {firstElementOfPath === 'dashboard' && (
        <>
          <Box p={3}>
            <TextField
              onChange={(e) => {
                run(e.target.value);
              }}
              placeholder="Tên cửa hàng..."
              variant="outlined"
              size="small"
            />
          </Box>
          <DialogContent dividers sx={{ height: '700px' }}>
            {filteredStores.map(
              (groupStore: TStore[], index) =>
                !!groupStore.length && (
                  <Box key={`group${index}`} mb={2}>
                    <Typography variant="h6">Nhóm {index + 1}</Typography>
                    <Grid mt={1} container spacing={2} sx={{ width: '100%' }}>
                      {groupStore.map((store: TStore, index) => (
                        <Grid key={`item ${index}`} item xs={12} sm={6} md={4} lg={3}>
                          <Card>
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Box width="60%">
                                <Typography variant="caption">{store.code ?? '-'}</Typography>
                                <Typography variant="subtitle1" noWrap>
                                  {store.name}
                                </Typography>
                              </Box>
                              <Fab
                                onClick={() => {
                                  onSelectStore(store);
                                }}
                                color="primary"
                                aria-label="add"
                              >
                                <ArrowForward />
                              </Fab>
                            </Stack>
                            <Stack
                              mt={2}
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Box>
                                <Typography variant="caption">Địa chỉ</Typography>
                                <Typography variant="body1" noWrap>
                                  QUận 1 123132
                                </Typography>
                              </Box>
                              <Box>
                                <Typography variant="caption">Người quản lý</Typography>
                                <Typography variant="body1" noWrap>
                                  A Nhân
                                </Typography>
                              </Box>
                            </Stack>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )
            )}
          </DialogContent>
        </>
      )}
      {firstElementOfPath === 'report' && (
        <>
          <Box p={3}>
            <TextField
              onChange={(e) => {
                runStore(e.target.value);
              }}
              placeholder="Tên cửa hàng..."
              variant="outlined"
              size="small"
            />
          </Box>
          <Button
            variant="contained"
            sx={{
              padding: 2,
              ml: 3,
              mr: 5
            }}
            onClick={() => {
              navigate(PATH_REPORT_APP('0').home);
              window.location.reload();
            }}
            startIcon={<FormatListBulletedIcon />}
          >
            TOÀN BỘ HỆ THỐNG
          </Button>
          <DialogContent dividers sx={{ height: '700px' }}>
            <Grid container spacing={2}>
              {filteredStoresReport?.map((item) => (
                <Grid item key={item.id} md={4} xs={6}>
                  <Card>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography variant="caption">{item.id ?? '-'}</Typography>
                        <Typography variant="subtitle1" noWrap>
                          {item.name}
                        </Typography>
                      </Box>
                      <Fab
                        color="primary"
                        aria-label="add"
                        onClick={() => {
                          const id: any = item.id;
                          localStorage.setItem('storeId', id);

                          // replace url
                          const a = pathname.split('/');
                          a[2] = id;
                          const b = a.join('/');

                          navigate(`${b}`);

                          window.location.reload();
                        }}
                      >
                        <ArrowForward />
                      </Fab>
                    </Stack>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </DialogContent>
        </>
      )}
      {/* {firstElementOfPath === 'promotion-system' && (
        <DialogContent dividers>
          <Grid container spacing={2}>
            {brandApi.?.map(
              (item: { brandId: React.Key | null | undefined; brandName: string }) => (
                <Grid item key={item.brandId} md={4} xs={6}>
                  <Card>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography variant="subtitle1" noWrap>
                          {item.brandName.charAt(0).toUpperCase() + item.brandName.slice(1)}
                        </Typography>
                      </Box>
                      <Fab
                        color="primary"
                        aria-label="add"
                        onClick={() => {
                          const id: any = item.brandId;
                          const action = setBrandId(id);
                          dispatch(action);
                          onClose();
                        }}
                      >
                        <ArrowForward />
                      </Fab>
                    </Stack>
                  </Card>
                </Grid>
              )
            )}
          </Grid>
        </DialogContent>
      )} */}
      <DialogActions>
        <Button onClick={onClose}>Quay lại</Button>
      </DialogActions>
    </Dialog>
  );
};

export default StoreNavigationDialog;

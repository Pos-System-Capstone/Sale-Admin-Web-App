import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { Box, Card, Grid, Stack } from '@mui/material';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import Page from 'components/Page';
import useDashboard from 'hooks/useDashboard';
import { DashboardNavLayout } from 'layouts/dashboard/DashboardNavbar';
import { useSnackbar } from 'notistack';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import * as yup from 'yup';
import { TConditionUpdate } from 'types/promotion/condition';
// import conditionApi from 'api/promotion/condition';
// import { PATH_PROMOTION_APP } from 'routes/promotionAppPaths';
import { getUserInfo } from 'utils/utils';
import { InputField } from 'components/form';
import { useQuery } from 'react-query';
import conditionApi from 'api/promotion/condition';
import DetailConditionForm from './DetailConditionForm';

interface Props {}

const schema = yup.object({
  ruleName: yup.string().required('Vui lòng nhập tên'),
  description: yup.string().required('Vui lòng nhập điều kiện')
});

export const CreateConditionContext = React.createContext<{
  setValue: (name: string, value: any) => any;
  getValues: (name: string) => any;
}>({
  setValue: (name: string, value: any) => {},
  getValues: (name: string) => {}
});

const UpdateCondition = (props: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { setNavOpen } = useDashboard();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userRaw = getUserInfo();
  const user: any = JSON.parse(userRaw ?? '{}');
  const isExtra: boolean = searchParams.get('isExtra') === 'true';
  const [test, listTest] = useState<any[]>([1, 2]);

  const { id } = useParams();
  const { data: conditionUpdate } = useQuery(
    ['condition', user.brandId],
    async () => {
      return conditionApi.getConditionRuleId(id).then((res) => res.data);
    }
    // {
    //   enabled: Boolean(id)
    // }
  );
  console.log(`conditionUpdate`, conditionUpdate);

  const updateConditionForm = useForm<TConditionUpdate>({
    defaultValues: { ...conditionUpdate },
    resolver: yupResolver(schema)
    // defaultValues: {},
    // shouldUnregister: false
  });
  const { watch, control, handleSubmit, setValue, reset } = updateConditionForm;
  useEffect(() => {
    if (conditionUpdate) {
      reset({ ...conditionUpdate });
    }
  }, [conditionUpdate]);
  const onSubmit = (values: TConditionUpdate) => {
    values.brandId = user.brandId;
    const body: TConditionUpdate = { ...values };
    body.brandId = user.brandId;
    body.ruleName = values.ruleName;
    body.description = values.description;
    body.conditionGroups = values.conditionGroups.map((group) => {
      if (group.productConditions) {
        //convert productType 3 thành 1
        const convertProductType = group.productConditions.map((product) => {
          product.productConditionType =
            product.productConditionType === 3 ? 1 : product.productConditionType;
          return product;
        });
        group.productConditions = convertProductType;
      } else {
        group.productConditions = [];
      }
      return group;
    });

    // conditionApi
    //   .createCondition(body)
    //   .then((res) => {
    //     enqueueSnackbar(`Tạo thành công`, {
    //       variant: 'success'
    //     });
    //     navigate(`${PATH_PROMOTION_APP.condition.root}`);
    //   })
    //   .catch((err) => {
    //     enqueueSnackbar(`Có lỗi xảy ra. Vui lòng thử lại`, {
    //       variant: 'error'
    //     });
    //   });
    console.log(`data`, body);
  };
  const { append, remove, fields } = useFieldArray<TConditionUpdate>({
    control,
    name: 'conditionGroups'
  });

  console.log(`fields`, fields);

  const addHandler = () => {
    append({
      groupNo: fields.length + 1,
      nextOperator: 2,
      productConditions: [],
      orderConditions: []
    });
  };
  const deleteHandler = (index: number) => remove(index);

  return (
    <FormProvider {...updateConditionForm}>
      <DashboardNavLayout onOpenSidebar={() => setNavOpen(true)}>
        <Stack direction="row" spacing={2}>
          <LoadingAsyncButton onClick={handleSubmit(onSubmit)} type="submit" variant="contained">
            + Tạo
          </LoadingAsyncButton>
        </Stack>
      </DashboardNavLayout>
      <Page title="TẠO ĐIỀU KIỆN MỚI">
        <Stack spacing={2}>
          <Box>
            <Grid item container spacing={2}>
              <Card style={{ width: '100%' }}>
                <Grid item container spacing={2}>
                  <Grid item xs={5} sm={5}>
                    <InputField fullWidth name="ruleName" label="Tên Điều kiện" />
                  </Grid>
                  <Grid item xs={5} sm={5}>
                    <InputField name="description" label="Mô tả Điều Kiện" fullWidth />
                  </Grid>
                  <Grid item xs={2} sm={2}>
                    <LoadingAsyncButton onClick={addHandler}>
                      Thêm nhóm điều kiện
                    </LoadingAsyncButton>
                  </Grid>
                </Grid>
              </Card>
              <Grid item container xs={12} sm={12} spacing={3}>
                <CreateConditionContext.Provider
                  value={{
                    setValue: (name, value) => setValue(name as keyof TConditionUpdate, value),
                    getValues: (name) => watch(name as keyof TConditionUpdate)
                  }}
                >
                  {fields.map((field, index) => (
                    <>
                      <Grid item xs={11} sm={11} key={index}>
                        <Card style={{ width: '100%' }}>
                          <DetailConditionForm
                            conditionAppend={append}
                            conditionRemove={remove}
                            conditionFields={fields}
                          />
                        </Card>
                      </Grid>
                      <Grid
                        item
                        xs={1}
                        sm={1}
                        display={'flex'}
                        flexDirection={'column'}
                        justifyContent={'center'}
                        onClick={() => deleteHandler(index)}
                      >
                        <DeleteIcon />
                      </Grid>
                    </>
                  ))}
                </CreateConditionContext.Provider>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Page>
    </FormProvider>
  );
};

export default UpdateCondition;

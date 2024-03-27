import { Box, Button, Stack } from '@mui/material';
import membershipsApi from 'api/promotion/membership';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import Page from 'components/Page';
import useDashboard from 'hooks/useDashboard';
import { DashboardNavLayout } from 'layouts/dashboard/DashboardNavbar';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router';
import { TMembership, TMembershipProgram } from 'types/promotion/membership';
import { getUserInfo } from 'utils/utils';
import FormDetail from './form/FormDetail';

export default function MembershipProgramsDetail() {
  const userRaw = getUserInfo();
  const user: any = JSON.parse(userRaw ?? '{}');
  const { setNavOpen } = useDashboard();
  const navigate = useNavigate();

  const apiKey = user.brandId;
  const { id } = useParams();
  const { data: membershipUpdate } = useQuery(
    ['membership-programs'],
    async () => {
      return membershipsApi.getMembershipProgramsById(id, { apiKey }).then((res) => res.data);
    },
    {}
  );

  const updateMembershipForm = useForm<TMembershipProgram>({
    defaultValues: { ...membershipUpdate }
  });

  useEffect(() => {
    if (membershipUpdate !== undefined) {
      reset({ ...membershipUpdate });
    }
  }, [membershipUpdate]);

  const { watch, handleSubmit, reset } = updateMembershipForm;

  const onSubmit = (values: TMembership) => {
    console.log(`data`, values);
  };

  return (
    <FormProvider {...updateMembershipForm}>
      <DashboardNavLayout onOpenSidebar={() => setNavOpen(true)}>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Hủy
          </Button>
          <LoadingAsyncButton type="submit" variant="contained" onClick={handleSubmit(onSubmit)}>
            Lưu
          </LoadingAsyncButton>
        </Stack>
      </DashboardNavLayout>
      <Page title="Thông tin chuơng trình thành viên">
        <Box display="flex">
          <FormDetail watch={watch} />
        </Box>
      </Page>
    </FormProvider>
  );
}

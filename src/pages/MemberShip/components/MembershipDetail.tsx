import { Box } from '@mui/material';
import membershipsApi from 'api/promotion/membership';
import Page from 'components/Page';
import useDashboard from 'hooks/useDashboard';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router';
import { TMembership } from 'types/promotion/membership';
import { getUserInfo } from 'utils/utils';
import FormDetail from './form/FormDetail';

export default function MembershipDetail() {
  const userRaw = getUserInfo();
  const user: any = JSON.parse(userRaw ?? '{}');
  const { setNavOpen } = useDashboard();
  const navigate = useNavigate();

  const { id } = useParams();
  const { data: membershipUpdate } = useQuery(
    ['memberships', user.brandId],
    async () => {
      return membershipsApi.getMembershipById(id).then((res) => res.data);
    },
    {
      enabled: Boolean(id)
    }
  );

  const updateMembershipForm = useForm<TMembership>({
    defaultValues: { ...membershipUpdate }
  });

  useEffect(() => {
    if (membershipUpdate !== undefined) {
      reset({ ...membershipUpdate });
    }
  }, [membershipUpdate]);

  const { watch, reset } = updateMembershipForm;

  return (
    <FormProvider {...updateMembershipForm}>
      <Page title="Thông tin khách hàng">
        <Box display="flex">
          <FormDetail watch={watch} />
        </Box>
      </Page>
    </FormProvider>
  );
}

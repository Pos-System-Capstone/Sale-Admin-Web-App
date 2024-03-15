import { Box, Grid } from '@mui/material';
import { Stack } from '@mui/material';
import membershipsApi from 'api/promotion/membership';
import { InputField } from 'components/form';
import DateTimePickerField from 'components/form/DateTimePickerField';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { getUserInfo } from 'utils/utils';
type Props = {
  watch?: any;
};
export default function TabTwo({ watch }: Props) {
  const userRaw = getUserInfo();
  const user: any = JSON.parse(userRaw ?? '{}');
  const { id } = useParams();

  const { data: listTransaction } = useQuery(
    ['transactions'],
    () => membershipsApi.getTransactionByMembershipId(id, {}).then((res) => res.data),
    {
      enabled: Boolean(user.brandId)
    }
  );

  return (
    <>
      <Stack width="100%">
        <Box>
          <Grid container spacing={2}>
            <Grid container item xs={6} spacing={2}>
              <Grid item xs={12}>
                <InputField fullWidth name="fullname" label="Tên thành viên" disabled />
              </Grid>
              <Grid item xs={12}>
                <InputField fullWidth name="phoneNumber" label="Số điện thoại" disabled />
              </Grid>
              <Grid item xs={12}>
                <InputField fullWidth name="email" label="Email" disabled />
              </Grid>
            </Grid>
            <Grid container item xs={6} spacing={2}>
              <Grid item xs={12}>
                <DateTimePickerField
                  fullWidth
                  name="insDate"
                  label="Ngày bắt đầu"
                  inputFormat="yyyy/MM/dd hh:mm a"
                  minDate={new Date()}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <DateTimePickerField
                  fullWidth
                  name="updDate"
                  label="Ngày kết thúc"
                  inputFormat="yyyy/MM/dd hh:mm a"
                  minDate={new Date()}
                  disabled
                />
              </Grid>
              {/* <Grid item xs={12}>
                <InputField fullWidth name="memberLevel.memberLevelId" label="Bậc Level" required />
              </Grid> */}
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </>
  );
}

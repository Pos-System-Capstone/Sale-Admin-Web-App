import { Box, Grid } from '@mui/material';
import { Stack } from '@mui/material';
import { InputField } from 'components/form';
import DateTimePickerField from 'components/form/DateTimePickerField';
type Props = {
  watch?: any;
};
export default function TabOne({ watch }: Props) {
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

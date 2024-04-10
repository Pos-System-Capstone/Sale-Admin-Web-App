import { Grid } from '@mui/material';
import { InputField } from 'components/form';
import { Props } from 'framer-motion/types/types';
import React from 'react';
const CreateForm: React.FC<Props> = ({}) => {
  return (
    <>
      <Grid container xs={12} spacing={2}>
        <Grid item xs={8} spacing={2}>
          <InputField id="channelName" required fullWidth name="channelName" label="Tên kênh" />
        </Grid>
        <Grid item xs={4} spacing={2}>
          <InputField id="channelCode" required fullWidth name="channelCode" label="Mã kênh" />
        </Grid>
      </Grid>
    </>
  );
};
export default CreateForm;

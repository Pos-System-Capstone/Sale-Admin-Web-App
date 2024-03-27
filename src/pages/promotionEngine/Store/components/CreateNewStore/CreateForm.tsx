import { Grid } from '@mui/material';
import { InputField } from 'components/form';
import { Props } from 'framer-motion/types/types';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TPStore } from 'types/promotion/store';
const CreateForm: React.FC<Props> = ({}) => {
  const { watch } = useFormContext<TPStore>();
  return (
    <>
      <Grid container xs={12} spacing={2}>
        <Grid item xs={8} spacing={2}>
          <InputField id="storeName" required fullWidth name="storeName" label="Tên cửa hàng" />
        </Grid>
        <Grid item xs={4} spacing={2}>
          <InputField id="storeCode" required fullWidth name="storeCode" label="Mã cửa hàng" />
        </Grid>
      </Grid>
    </>
  );
};
export default CreateForm;

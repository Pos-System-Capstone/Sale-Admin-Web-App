import {
  Alert,
  AlertTitle,
  Box,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { CheckBoxField } from 'components/form';
import useLocales from 'hooks/useLocales';
import React from 'react';
import { useState } from 'react';
import { CardTitle } from 'pages/promotionEngine/Voucher/components/Card';
interface Props {
  hasVariant: any;
}

const SubMiddleForm: React.FC<Props> = ({ hasVariant }) => {
  const [count, setCount] = useState(0);

  const [charset, setCharset] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setCharset(event.target.value);
  };
  const { t } = useLocales();
  return (
    <Card id="variants">
      <CheckBoxField
        name="hasVariant"
        label={`${t('promotionSystem.voucher.addVoucher.advancedSettings')}`}
      />
      {hasVariant && (
        <Box sx={{ width: '100%' }}>
          <CardTitle variant="subtitle1">{`${t(
            'promotionSystem.voucher.addVoucher.advancedSettings'
          )}`}</CardTitle>
          <Stack sx={{ width: '100%', pb: '25px', pt: '20px' }} spacing={1}>
            <Alert severity="warning">
              <AlertTitle>{`${t('promotionSystem.voucher.addVoucher.warning')}`}</AlertTitle>
              {`${t('promotionSystem.voucher.addVoucher.helperWarning')}`}
            </Alert>
          </Stack>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">{`${t(
                    'promotionSystem.voucher.addVoucher.charset.label'
                  )}`}</InputLabel>
                  <Select
                    defaultValue=""
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label={`${t('promotionSystem.voucher.addVoucher.charset.label')}`}
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>{`${t(
                      'promotionSystem.voucher.addVoucher.charset.alphanumeric'
                    )}`}</MenuItem>
                    <MenuItem value={20}>{`${t(
                      'promotionSystem.voucher.addVoucher.charset.alphabetic'
                    )}`}</MenuItem>
                    <MenuItem value={30}>{`${t(
                      'promotionSystem.voucher.addVoucher.charset.alphabeticlowercase'
                    )}`}</MenuItem>
                    <MenuItem value={40}>{`${t(
                      'promotionSystem.voucher.addVoucher.charset.alphabeticuppercase'
                    )}`}</MenuItem>
                    <MenuItem value={50}>{`${t(
                      'promotionSystem.voucher.addVoucher.charset.numbers'
                    )}`}</MenuItem>
                    <MenuItem value={60}>{`${t(
                      'promotionSystem.voucher.addVoucher.charset.custom'
                    )}`}</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  width: 600,
                  maxWidth: '100%'
                }}
              >
                <TextField
                  fullWidth
                  disabled
                  id="outlined-disabled"
                  label={`${t('promotionSystem.voucher.addVoucher.sample')}`}
                  defaultValue="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  width: 600,
                  maxWidth: '100%',
                  position: 'relative'
                }}
              >
                <TextField
                  fullWidth
                  label={`${t('promotionSystem.voucher.addVoucher.prefix')}`}
                  id="fullWidth"
                  autoComplete="off"
                  inputProps={{ maxLength: 10 }}
                  // helperText={`${count}/10`}
                  onChange={(e) => setCount(e.target.value.length)}
                />
                <Typography
                  variant={'caption'}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    right: '12px',
                    zIndex: 9999,
                    transform: 'translateY(-50%)'
                  }}
                >
                  {`${count}/10`}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  width: 600,
                  maxWidth: '100%',
                  position: 'relative'
                }}
              >
                <TextField
                  fullWidth
                  label={`${t('promotionSystem.voucher.addVoucher.postfix')}`}
                  id="fullWidth"
                  autoComplete="off"
                  inputProps={{ maxLength: 10 }}
                  // helperText={`${count}/10`}
                  onChange={(e) => setCount(e.target.value.length)}
                />
                <Typography
                  variant={'caption'}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    right: '12px',
                    zIndex: 9999,
                    transform: 'translateY(-50%)'
                  }}
                >
                  {`${count}/10`}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </Card>
  );
};

export default SubMiddleForm;

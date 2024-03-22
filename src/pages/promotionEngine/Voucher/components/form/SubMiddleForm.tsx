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
  onPrefixChange: (prefix: string) => void;
  onPostfixChange: (postfix: string) => void;
  onCustomCharsetChange: (customCharset: string) => void;
  onCharsetChange: (charset: string) => void;
}

const SubMiddleForm = ({
  hasVariant,
  onPrefixChange,
  onPostfixChange,
  onCustomCharsetChange,
  onCharsetChange
}: Props) => {
  const [countPrefix, setCountPrefix] = useState(0);
  const [countPostfix, setCountPostfix] = useState(0);

  const handleCharsetChange = (event: string) => {
    const value = event;
    onCharsetChange(value); // Pass prefix value to parent component
  };

  const handleCustomCharsetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onCustomCharsetChange(value); // Pass prefix value to parent component
  };
  const handlePrefixChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onPrefixChange(value); // Pass prefix value to parent component
  };

  const handlePostfixChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onPostfixChange(value); // Pass postfix value to parent component
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
          <Stack sx={{ width: '100%', pb: '15px', pt: '20px' }} spacing={1}>
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
                    onChange={(e) => {
                      handleCharsetChange(e.target.value);
                    }}
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
                  value="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
                  onLoad={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleCustomCharsetChange(e);
                  }}
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
                  id="prefix"
                  name="prefix"
                  autoComplete="off"
                  inputProps={{ maxLength: 10 }}
                  // helperText={`${count}/10`}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handlePrefixChange(e);
                    setCountPrefix(e.target.value.length);
                  }}
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
                  {`${countPrefix}/10`}
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
                  name="postfix"
                  inputProps={{ maxLength: 10 }}
                  // helperText={`${count}/10`}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handlePostfixChange(e);
                    setCountPostfix(e.target.value.length);
                  }}
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
                  {`${countPostfix}/10`}
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

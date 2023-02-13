import { Box, Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { InputField, UploadImageField } from 'components/form';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import useLocales from 'hooks/useLocales';
import { Card, CardTitle } from '../../Products/components/Card';

const marks = [
  {
    value: 0,
    label: 'Đầu tiền'
  },
  {
    value: 100,
    label: 'Cuối cùng'
  }
];

const CollectionInfoTab = ({ onSubmit }: { onSubmit: Function }) => {
  const { stores } = useSelector((state: RootState) => state.admin);
  const { translate } = useLocales();

  return (
    <Box>
      <Card>
        <CardTitle>{translate('collections.collectionInfoTab')}</CardTitle>
        <Grid spacing={2} container>
          <Grid item xs={4}>
            <UploadImageField.Avatar label="Hình ảnh" name="picUrl" />
          </Grid>
          <Grid item xs={8}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <InputField fullWidth name="name" label="Tên bộ sưu tập" />
              </Grid>
              <Grid item xs={6}>
                <InputField label="Mã bộ sưu tập" disabled name="code" fullWidth />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputField
                  size="small"
                  rows={4}
                  multiline
                  fullWidth
                  name="description"
                  label="Mô tả"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box textAlign="right" mt={2}>
          <LoadingAsyncButton onClick={onSubmit} variant="contained">
            {translate('common.update')}
          </LoadingAsyncButton>
        </Box>
      </Card>
    </Box>
  );
};

export default CollectionInfoTab;

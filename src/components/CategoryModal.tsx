import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle
} from '@mui/material';
import { useRequest } from 'ahooks';
import useLocales from 'hooks/useLocales';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { getCategoyById } from 'redux/category/api';
import { TCategory } from 'types/category';
import CategoryForm from './form/common/Category/CategoryForm';
import LoadingAsyncButton from './LoadingAsyncButton/LoadingAsyncButton';

type Props = DialogProps & {
  cate_id?: number | null;
  onAdd?: (data: TCategory) => Promise<any>;
  onEdit?: (data: TCategory) => Promise<any>;
  onClose: () => any;
};

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

const CategoryModal: React.FC<Props> = ({ open, cate_id, onClose, onAdd, onEdit }) => {
  const { translate } = useLocales();
  const isUpdate = !!cate_id;

  const form = useForm<TCategory>();

  const { loading, run, data } = useRequest(() => getCategoyById(cate_id!), {
    manual: true,
    refreshDeps: [cate_id],
    formatResult: (res) => res.data
  });

  useEffect(() => {
    if (cate_id) {
      run();
    }
  }, [cate_id, run]);

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data]);

  const submitHandler = (values: TCategory) =>
    (isUpdate ? onEdit!(values) : onAdd!(values)).finally(() => {
      if (onClose) {
        onClose();
      }
    });

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle>
        {isUpdate ? translate('categories.editTitle') : translate('categories.addTitle')}
      </DialogTitle>
      <DialogContent dividers>
        {loading ? (
          <CircularProgress />
        ) : (
          <FormProvider {...form}>
            <CategoryForm />
          </FormProvider>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="inherit">
          {translate('common.cancel')}
        </Button>
        <LoadingAsyncButton variant="contained" onClick={form.handleSubmit(submitHandler)}>
          {isUpdate ? translate('common.update') : translate('common.create')}
        </LoadingAsyncButton>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryModal;

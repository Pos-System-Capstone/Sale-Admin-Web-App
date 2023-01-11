import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  TextField,
  Typography
} from '@mui/material';
import TreeViewField from 'components/form/TreeViewField/TreeViewField';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

type Props = DialogProps & {
  onClose: () => void;
  onFinish: (values: any) => Promise<any>;
};

const AddCategoryModal = ({ onClose, onFinish, ...modalProps }: Props) => {
  // category data
  const addCategoryForm = useForm();
  const control = addCategoryForm.control;

  return (
    <Dialog {...modalProps}>
      <DialogTitle>
        <Typography variant="h3">Thêm Danh mục</Typography>
      </DialogTitle>
      <DialogContent>
        <Controller
          control={control}
          name="categoryName"
          render={({ field }) => <TextField placeholder="Tên Danh mục" fullWidth {...field} />}
        />
        <Box py={4}>
          <Typography color="gray" variant="h6">
            Chọn Danh mục cha
          </Typography>
          <Controller
            control={control}
            name="parentCategory"
            render={({ field }) => <TreeViewField value={field.value} onChange={field.onChange} />}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={onClose}>
          Quay lại
        </Button>
        <Button variant="contained" onClick={addCategoryForm.handleSubmit(onFinish)}>
          Thêm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCategoryModal;

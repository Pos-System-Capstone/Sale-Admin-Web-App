import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Stack,
  Typography
} from '@mui/material';
import { InputField, SelectField } from 'components/form';
import { CREATE_USER_ROLE_OPTIONS } from 'types/user';

type Props = DialogProps & {
  onClose: () => void;
  onFinish: (values: any) => Promise<any>;
};

const AddAccountModal = ({ onClose, onFinish, ...modalProps }: Props) => {
  // category data

  return (
    <Dialog {...modalProps}>
      <DialogTitle>
        <Typography mb={2} variant="h3">
          Thêm Tài khoản
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <InputField label="Tên tài khoản" name="username"></InputField>
          <InputField type={'password'} label="Mật khẩu" name="password"></InputField>
          <InputField label="Họ và tên" name="name"></InputField>
          <SelectField
            options={CREATE_USER_ROLE_OPTIONS}
            name="role"
            label="Quyền hạn"
          ></SelectField>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={onClose}>
          Quay lại
        </Button>
        <Button variant="contained" onClick={onFinish}>
          Thêm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddAccountModal;

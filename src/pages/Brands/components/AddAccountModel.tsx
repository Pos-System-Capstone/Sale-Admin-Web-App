import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { Icon } from '@iconify/react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
  InputAdornment,
  Stack,
  Typography
} from '@mui/material';
import { InputField, SelectField } from 'components/form';
import { useState } from 'react';
import { CREATE_USER_ROLE_OPTIONS } from 'types/user';

type Props = DialogProps & {
  onClose: () => void;
  onFinish: (values: any) => Promise<any>;
};

const AddAccountModal = ({ onClose, onFinish, ...modalProps }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  // category data

  return (
    <Dialog {...modalProps}>
      <DialogTitle>
        <Typography mb={2} variant="h3">
          Thêm tài khoản
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Stack mt={2} spacing={2}>
          <InputField label="Tên tài khoản" name="username"></InputField>
          <InputField
            type={showPassword ? 'text' : 'password'}
            label="Mật khẩu"
            name="password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end" size="large">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
          ></InputField>
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
          Huỷ
        </Button>
        <Button variant="contained" onClick={onFinish}>
          Tạo mới
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddAccountModal;

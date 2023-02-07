import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  DialogContent,
  Button,
  Typography
} from '@mui/material';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import useLocales from 'hooks/useLocales';

interface Props {
  open: boolean;
  onClose: () => void;
  onDelete?: () => any;
  onUpdate?: () => any;
  title: String | React.ReactElement;
  description?: String | React.ReactElement | undefined;
}

const DeleteConfirmDialog: React.FC<Props> = ({ open, onClose, onDelete, title, description }) => {
  const { translate } = useLocales();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="warning-dialog-title">
        <Typography variant="h5">{title}</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="text" color="secondary">
          {translate('common.cancel')}
        </Button>
        <LoadingAsyncButton onClick={onDelete} color="error" variant="contained" autoFocus>
          {translate('common.confirm')}
        </LoadingAsyncButton>
      </DialogActions>
    </Dialog>
  );
};

const UpdateConfirmDialog: React.FC<Props> = ({ open, onClose, onUpdate, title, description }) => {
  const { translate } = useLocales();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="warning-dialog-title"
      aria-describedby="warning-dialog-description"
    >
      <DialogTitle id="warning-dialog-title">
        <DialogContentText variant="h5">{title}</DialogContentText>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="warning-dialog-description">{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="text" color="secondary">
          {translate('common.cancel')}
        </Button>
        <LoadingAsyncButton onClick={onUpdate} variant="contained" autoFocus>
          {translate('common.confirm')}
        </LoadingAsyncButton>
      </DialogActions>
    </Dialog>
  );
};

export { DeleteConfirmDialog, UpdateConfirmDialog };

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle
} from '@mui/material';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import useLocales from 'hooks/useLocales';
import React from 'react';
import { JsxElement } from 'typescript';

type Props = {
  open: boolean;
  title: String | JsxElement;
  description?: String | JsxElement | null;
  onClose: () => any;
};

const ContactInformationDialog: React.FC<Props & DialogProps> = ({
  open,
  title,
  description,
  onClose,
  ...props
}) => {
  const { translate } = useLocales();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      {...props}
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <LoadingAsyncButton onClick={onClose} variant="contained" autoFocus>
          {translate('common.confirm')}
        </LoadingAsyncButton>
      </DialogActions>
    </Dialog>
  );
};

export default ContactInformationDialog;

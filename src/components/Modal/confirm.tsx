/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle
} from '@mui/material';
import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

type ConfirmProps = {
  title: ReactNode;
  content: ReactNode;
  onOk: () => void;
  onCancle?: () => void;
};

const confirm = ({ onCancle, onOk, title, content }: ConfirmProps) => {
  const root = document.getElementById('root') ?? document.body;
  const div = document.createElement('div');
  root.appendChild(div);

  let currentConfig: ConfirmDialogProps = {
    open: true,
    onOk: ok,
    title,
    onCancle: cancle,
    children: content
  };

  function destroy() {
    const result = ReactDOM.unmountComponentAtNode(div);
    if (result && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  }

  function ok() {
    onOk();
    currentConfig = {
      ...currentConfig,
      open: false
    };
    // DESTROY COMPONENT
    destroy();
  }

  function cancle() {
    if (onCancle) onCancle();
    currentConfig = {
      ...currentConfig,
      open: false
    };
    // DESTROY COMPONENT
    destroy();
  }

  function render(config: ConfirmDialogProps) {
    ReactDOM.render(<ConfirmDialog {...config} />, div);
  }

  render(currentConfig);
};

interface ConfirmDialogProps extends Omit<Partial<DialogProps>, 'title'> {
  title: ReactNode;
  onCancle: () => void;
  onOk: () => void;
  children?: ReactNode;
}

const ConfirmDialog = ({
  onOk,
  onCancle,
  title,
  children,
  open,
  ...others
}: ConfirmDialogProps) => {
  return (
    <Dialog {...others} fullWidth maxWidth="sm" open={open!} onClose={onCancle}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onCancle} variant="outlined" color="inherit">
          Huỷ
        </Button>
        <Button variant="contained" onClick={onOk}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default confirm;

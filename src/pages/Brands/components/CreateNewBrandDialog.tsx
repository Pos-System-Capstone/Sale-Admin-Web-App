import { Dialog } from '@mui/material';

import ResoForm, { ResoColumnType } from 'components/ResoForm';
import React from 'react';

type Props = {
  open: boolean;
  onClose: VoidFunction;
};

const CreateNewBrandDialog: React.FC<Props> = ({ open, onClose }) => {
  const brandDetailColumns: ResoColumnType[] = [
    {
      title: 'STT'
    },
    {
      title: 'Tên nhãn hiệu'
    },
    {
      title: 'Email'
    },
    {
      title: 'Điện thoại'
    },
    {
      title: 'Địa chỉ'
    },
    {
      title: 'Trạng thái'
    },
    {
      title: 'Số lượng Store của brand'
    }
  ];

  return (
    <Dialog maxWidth="lg" scroll="paper" open={open} onClose={onClose}>
      <ResoForm columns={brandDetailColumns} />
      {/* <DialogActions>
        <Button onClick={onClose}>Đóng</Button>
      </DialogActions> */}
    </Dialog>
  );
};

export default CreateNewBrandDialog;

import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography
} from '@mui/material';
import EmptyContent from 'components/EmptyContent';
import ResoDescriptions, { ResoDescriptionColumnType } from 'components/ResoDescriptions';
import React from 'react';
import { TLog } from 'types/log';
import { fDateTime } from 'utils/formatTime';

type Props = {
  open: boolean;
  onClose: VoidFunction;
  selectedValue?: { content?: string; created_date?: string; store_id?: string };
};

const LogDetailDialog: React.FC<Props> = ({ open, onClose, selectedValue }) => {
  const details = [selectedValue];
  const detailLogColumns: ResoDescriptionColumnType<TLog>[] = [
    {
      title: 'StoredId',
      dataIndex: 'store_id'
    },
    {
      title: 'CreatedDate',
      dataIndex: 'created_date',
      render: (value) => fDateTime(value)
    }
  ];

  const contentColumns: ResoDescriptionColumnType<TLog>[] = [
    {
      title: 'Content',
      dataIndex: 'content',
      render: (value: any) => {
        return (
          <Typography
            width={'600px'}
            sx={{
              wordBreak: 'break-all'
            }}
          >
            {value}
          </Typography>
        );
      }
    }
  ];

  return (
    <Dialog maxWidth="lg" scroll="paper" open={open} onClose={onClose}>
      {!selectedValue ? (
        <EmptyContent title="Không tìm thấy content" />
      ) : (
        <>
          <DialogTitle
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Typography variant="h4">Chi tiết Log</Typography>
            <IconButton aria-label="close" onClick={onClose} size="large">
              <Icon icon={closeFill} />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Stack spacing={2}>
              <ResoDescriptions
                title="Thông tin"
                labelProps={{ fontWeight: 'bold' }}
                columns={detailLogColumns as any}
                datasource={details && details[0]}
                column={2}
              />
              <ResoDescriptions
                title="Thông tin chi tiết"
                labelProps={{ fontWeight: 'bold' }}
                columns={contentColumns as any}
                datasource={details && details[0]}
                column={2}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Đóng</Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default LogDetailDialog;

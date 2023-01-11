import { Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

type ReportBtnProps = {
  onClick: () => void;
  label?: string;
  title?: string;
  variant?: 'text' | 'outlined' | 'contained';
};

// label = 'XUẤT FILE EXCEL'
function ReportBtn(props: ReportBtnProps) {
  const { onClick, variant = 'outlined', label, title = 'XUẤT FILE EXCEL' } = props;
  return (
    <Button onClick={onClick} variant={variant} title={title}>
      {<FileDownloadIcon />}
      {label}
    </Button>
  );
}

export default ReportBtn;

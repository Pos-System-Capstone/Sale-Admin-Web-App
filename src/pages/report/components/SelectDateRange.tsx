import { DateRangePicker } from '@mui/lab';
import { Box, Button, Menu, MenuItem, Modal, TextField, Typography } from '@mui/material';
import { useState } from 'react';
// icon
import DateRangeIcon from '@mui/icons-material/DateRange';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import moment from 'moment';

interface optionsType {
  value: any;
  label: any;
  subLabel?: any;
}
interface SelectDateRangeProps {
  value: any;
  onChange: (value: any) => void;
  options?: optionsType[];
  showOptionDateRange?: boolean;
}

function SelectDateRange({
  value,
  onChange,
  options,
  showOptionDateRange = true
}: SelectDateRangeProps) {
  const getFirstDateOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1);
  };
  const getLastDateOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0);
  };
  const getDateAndMonth = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}`;
  };
  const getDateRangeDateAndMonth = (dateRange: any) => {
    const startDate = dateRange[0];
    const endDate = dateRange[1];
    return `${getDateAndMonth(startDate)} - ${getDateAndMonth(endDate)}`;
  };
  const getMonday = (d: any) => {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  };
  const yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24);
  // 7 ngay truoc ma khong tinh hom nay
  const SEVEN_DAY_PREVIOUS = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24 * 7);
  const THIRTY_DAY_PREVIOUS = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24 * 30);
  const NINETY_DAY_PREVIOUS = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24 * 90);
  const firstDateOfLastWeek = getMonday(SEVEN_DAY_PREVIOUS);
  const lastDateOfLastWeek = new Date(firstDateOfLastWeek.valueOf() + 1000 * 60 * 60 * 24 * 6);
  const getFirstDateOfLastMonth = getFirstDateOfMonth(
    new Date(new Date().valueOf() - 1000 * 60 * 60 * 24 * 31)
  );
  const getLastDateOfLastMonth = getLastDateOfMonth(
    new Date(new Date().valueOf() - 1000 * 60 * 60 * 24 * 31)
  );
  const [dateRange, setDateRange] = useState<any>([yesterday, yesterday]);
  const optionList = options ?? [
    {
      value: 'TODAY',
      label: 'Hôm nay',
      subLabel: `Hôm nay ${moment(moment.now()).format('DD/MM')}`
    },
    {
      value: '7_DAYS',
      label: '7 ngày trước',
      subLabel: getDateRangeDateAndMonth([SEVEN_DAY_PREVIOUS, yesterday])
    },
    {
      value: 'PREV_WEEK',
      label: 'Tuần trước',
      subLabel: getDateRangeDateAndMonth([firstDateOfLastWeek, lastDateOfLastWeek])
    },
    {
      value: 'PREV_MONTH',
      label: 'Tháng trước',
      subLabel: getDateRangeDateAndMonth([getFirstDateOfLastMonth, getLastDateOfLastMonth])
    },
    {
      value: '30_DAYS',
      label: '30 ngày trước',
      subLabel: getDateRangeDateAndMonth([THIRTY_DAY_PREVIOUS, yesterday])
    },
    {
      value: '90_DAYS',
      label: '90 ngày trước',
      subLabel: getDateRangeDateAndMonth([NINETY_DAY_PREVIOUS, yesterday])
    }
  ];
  const [openDate, setOpenDate] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick1 = () => {
    setOpenDate(true);
  };
  const handleCloseDate = () => {
    setOpenDate(false);
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant="outlined"
        sx={{
          minWidth: '200px',
          display: 'flex',
          justifyContent: 'space-between'
        }}
        color={'inherit'}
      >
        <Typography fontWeight={'500'}>
          {value === undefined
            ? 'Chọn khoảng thời gian'
            : optionList?.find((x) => x.value === value)?.subLabel ||
              getDateRangeDateAndMonth(dateRange)}
        </Typography>
        <KeyboardArrowDownIcon sx={{ ml: 1 }} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        {optionList.map((item: any) => (
          <MenuItem
            key={item.value}
            value={item.value}
            onClick={() => {
              onChange(item.value);
              handleClose();
            }}
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}
          >
            <Typography variant="body1" fontWeight={500}>
              {item.label}
            </Typography>
            <Typography variant="body2">{item.subLabel ?? ''}</Typography>
          </MenuItem>
        ))}
        {showOptionDateRange && (
          <MenuItem
            value="DATE_RANGE"
            onClick={() => {
              handleClick1();
              handleClose();
            }}
          >
            <Typography variant="body1" fontWeight={500} pr={1}>
              Chọn khoảng thời gian
            </Typography>
            <DateRangeIcon />
          </MenuItem>
        )}
      </Menu>
      <Modal
        open={openDate}
        onClose={handleCloseDate}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute' as 'absolute',
            top: '25%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            borderRadius: 1,
            boxShadow: 24,
            p: 5
          }}
        >
          <DateRangePicker
            inputFormat="dd/MM/yyyy"
            // minDate={moment(`${today.getFullYear()}/${today.getMonth()}/01`).toDate()}
            maxDate={yesterday}
            disableFuture
            disableCloseOnSelect
            value={dateRange}
            renderInput={(startProps, endProps) => (
              <>
                <TextField {...startProps} label="Từ" />
                <Box sx={{ mx: 2 }}> - </Box>
                <TextField {...endProps} label="Đến" />
              </>
            )}
            onChange={(e) => {
              if (e[0] && e[1]) {
                setDateRange(e);
                onChange(e);
              }
            }}
          />
        </Box>
      </Modal>
    </div>
  );
}

export default SelectDateRange;

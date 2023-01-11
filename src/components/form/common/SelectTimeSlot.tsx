import { SelectProps } from '@mui/material';
import { useRequest } from 'ahooks';
import { AxiosResponse } from 'axios';
import axiosInstance from 'utils/axios';
import SelectField from '../SelectField';

type Props = SelectProps;

type TimeSlot = {
  id: number;
  value: string;
};

const SelectTimeSlot: React.FC<Props> = ({ name, label, ...other }) => {
  const { data } = useRequest<AxiosResponse<TimeSlot>>(() => axiosInstance.get('/time-slots'), {
    cacheKey: 'time-slots',
    formatResult: (res) => res.data
  });

  const options = data?.map((opt: TimeSlot) => ({
    label: opt.value,
    value: opt.id
  }));

  return <SelectField options={options} name={name} label={label} {...other} />;
};

export default SelectTimeSlot;

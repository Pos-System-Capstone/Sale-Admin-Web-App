import moment from 'moment';
import * as yup from 'yup';

type TimeRangeForm = {
  from: string;
  to: string;
};

export const normalizeMenuData = (values: any) => {
  const data = { ...values };
  data.time_ranges = values.time_ranges.map((t: string[]) => ({
    from: moment(t[0], 'HH:mm'),
    to: moment(t[1], 'HH:mm')
  }));

  if (values.time_ranges.length === 1) {
    const [from, to] = values.time_ranges[0];
    if (from === to && from === '00:00') {
      data.allDay = true;
    }
  }

  if (data.start_time && data.end_time) {
    data.start_end_time = [data.start_time, data.end_time];
  } else {
    data.start_end_time = [null, null];
  }

  return data;
};

export const transformMenuForm = (values: any) => {
  const data = { ...values };
  console.log(`values`, values);
  data.time_ranges = values?.time_ranges?.map((t: TimeRangeForm) => [
    moment(t.from).format('HH:mm'),
    moment(t.to).format('HH:mm')
  ]);

  if (values.allDay) {
    data.time_ranges = [['00:00', '00:00']];
  }

  if (data.start_end_time) {
    data.start_time = moment(data.start_end_time[0]).toJSON();
    data.end_time = moment(data.start_end_time[1]).toJSON();
  }

  return data;
};

export const menuSchema = yup.object({
  code: yup.string().required('Vui lòng nhập menu code'),
  dayFilter: yup.array().min(1, 'Vui lòng chọn ngày áp dụng'),
  priority: yup.number().min(0, 'Vui lòng nhập đúng'),
  startTime: yup.date(),
  endTime: yup
    .date()
    .when(
      'startTime',
      (started, yup) =>
        started &&
        yup.required('Vui lòng nhập thời gian kết thúc').min(started, 'Thời gian kết thúc sai')
    )

  // time_ranges: yup.array().when('allDay', {
  //   is: false, // alternatively: (val) => val == true
  //   then: yup
  //     .array()
  //     .of(
  //       yup.object({
  //         from: yup.date().required('Vui lòng chọn giờ').typeError('Vui lòng chọn giờ'),
  //         to: yup.date().required('Vui lòng chọn giờ').typeError('Vui lòng chọn giờ')
  //       })
  //     )
  //     .min(1, 'Vui lòng chọn ít nhất một khung giờ'),
  //   otherwise: yup.array().min(0)
  // })
});

export const menuInStoreSchema = yup.object({
  store_id: yup
    .number()
    .required('Vui lòng cửa hàng áp dụng')
    .typeError('Vui lòng cửa hàng áp dụng'),
  time_ranges: yup.array().when('allDay', {
    is: false, // alternatively: (val) => val == true
    then: yup
      .array()
      .of(
        yup.object({
          from: yup.date().required('Vui lòng chọn giờ').typeError('Vui lòng chọn giờ'),
          to: yup.date().required('Vui lòng chọn giờ').typeError('Vui lòng chọn giờ')
        })
      )
      .min(1, 'Vui lòng chọn ít nhất một khung giờ'),
    otherwise: yup.array().min(0)
  })
});

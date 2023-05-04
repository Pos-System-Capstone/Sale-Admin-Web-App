import { Edit } from '@mui/icons-material';
import { Box, Chip, Stack, Typography } from '@mui/material';
import MenuForm from 'components/form/Menu/MenuForm';
import Label from 'components/Label';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import ModalForm from 'components/ModalForm/ModalForm';
import ResoDescriptions, { ResoDescriptionColumnType } from 'components/ResoDescriptions';
import moment from 'moment';
import { MenuStatus, PosMenu } from 'types/menu';
import { Card, CardTitle } from '../../Products/components/Card';
import { DateFilter } from 'types/menu';

const columns: ResoDescriptionColumnType<PosMenu>[] = [
  {
    title: 'Code',
    dataIndex: 'code'
  },
  {
    title: 'Thời gian hiệu lực',
    hideInSearch: true,
    render: (_, data: PosMenu) =>
      data.startTime && data.endTime ? (
        <Typography>
          <Label key={data.code} color="primary">
            {moment(data.startTime, 'HH:mm:ss').format('HH:mm')}
          </Label>{' '}
          -{' '}
          <Label key={data.code} color="primary">
            {moment(data.endTime, 'HH:mm:ss').format('HH:mm')}
          </Label>
        </Typography>
      ) : (
        '-'
      )
  },
  {
    title: 'Độ ưu tiên',
    dataIndex: 'priority',
    hideInSearch: true
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createdAt',
    hideInSearch: true,
    render: (_: any, { createdAt }: PosMenu) => (
      <Stack direction="row" spacing={1}>
        <Label key={createdAt} color="warning">
          {moment(createdAt).format('DD/MM/YYYY')}
        </Label>
      </Stack>
    )
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    hideInSearch: true,
    render: (status) =>
      status == MenuStatus.ACTIVE ? (
        <Label color="primary">Hoạt Động</Label>
      ) : (
        <Label color="error">Tạm ẩn</Label>
      )
  },
  {
    title: 'Ngày áp dụng',
    dataIndex: 'dateFilter',
    hideInSearch: true,
    span: 2,
    render: (_: any, { dateFilter }: PosMenu) => (
      <Stack direction="row" spacing={1}>
        {dateFilter?.map((date) => (
          <Chip
            size="small"
            key={date}
            label={Object.values(DateFilter)[Object.keys(DateFilter).indexOf(date)]}
          />
        ))}
      </Stack>
    )
  }
];

const MenuInfoTab = ({ onSubmit, menu }: { onSubmit: any; menu: PosMenu }) => {
  return (
    <Box>
      <Card>
        <Stack direction="row" justifyContent="space-between">
          <CardTitle>Thông tin Menu</CardTitle>
          <Box>
            <ModalForm
              title={<Typography variant="h4">Cập nhật thông tin menu</Typography>}
              onOk={onSubmit}
              trigger={
                <LoadingAsyncButton startIcon={<Edit />} size="small" variant="contained">
                  Cập nhật
                </LoadingAsyncButton>
              }
            >
              <MenuForm isUpdateMenu={true} />
            </ModalForm>
          </Box>
        </Stack>
        <ResoDescriptions column={2} layout="row" datasource={menu} columns={columns as any} />
        {/* <MenuForm /> */}
      </Card>
    </Box>
  );
};

export default MenuInfoTab;
// {
//   title: 'Tên',
//   dataIndex: 'code'
// },
// {
//   title: 'Áp dụng',
//   dataIndex: 'is_brand_mode',
//   valueType: 'select',
//   tooltip:
//     'Ở cùng 1 khung giờ nếu có BrandMenu và StoreMenu được apply thì sẽ ưu tiên StoreMenu.',
//   valueEnum: [
//     {
//       label: 'Toàn hệ thống',
//       value: true,
//       color: 'success'
//     },
//     {
//       label: 'Theo cửa hàng',
//       value: false
//     }
//   ]
// },
// // {
// //   title: 'Thời gian hiệu lực',
// //   span: 2,
// //   hideInSearch: true,
// //   render: (_, data: Menu) =>
// //     data.start_time && data.end_time ? (
// //       <Typography>
// //         {fDate(data.start_time)} - {fDate(data.end_time)}
// //       </Typography>
// //     ) : (
// //       '-'
// //     )
// // },
// {
//   title: 'Khung giờ',
//   dataIndex: 'time_ranges',
//   hideInSearch: true,
//   render: (_: any, { time_ranges = [] }: Menu) => {
//     const isAllDay =
//       get(time_ranges, [0, 0]) === get(time_ranges, [0, 1]) &&
//       get(time_ranges, [0, 1]) === '00:00';

//     if (isAllDay) {
//       return <Chip label="Cả ngày" size="small" color="success" />;
//     }
//     return (
//       <Stack direction="row" spacing={1}>
//         {time_ranges?.map(([from, to]) => (
//           <Chip size="small" key={`${from}-${to}`} label={`${from}-${to}`} />
//         ))}
//       </Stack>
//     );
//   }
// },
// // {
// //   title: 'Ngày hoạt động',
// //   dataIndex: 'day_filters',
// //   valueType: 'select',
// //   valueEnum: DAY_OF_WEEK,
// //   span: 2,
// //   render: (_: any, { day_filters: dayFilters, id }: Menu) => (
// //     <Stack direction="row" spacing={1}>
// //       {dayFilters?.length === 7 ? (
// //         <Chip size="small" color="success" label="Cả tuần" />
// //       ) : (
// //         dayFilters?.map((day) => (
// //           <Chip
// //             size="small"
// //             key={`${id}-${day}`}
// //             label={DAY_OF_WEEK.find(({ value }) => value === day)?.label}
// //           />
// //         ))
// //       )}
// //     </Stack>
// //   )
// // },
// {
//   title: 'Độ ưu tiên',
//   dataIndex: 'priority',
//   hideInSearch: true
// }
// // {
// //   title: 'Ngày tạo',
// //   dataIndex: 'create_at',
// //   hideInSearch: true,
// //   render: (value) => fDateTime(value)
// // }

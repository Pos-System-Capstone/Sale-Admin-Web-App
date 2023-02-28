import { Edit } from '@mui/icons-material';
import { Box, Chip, Stack } from '@mui/material';
import MenuForm from 'components/form/Menu/MenuForm';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import ModalForm from 'components/ModalForm/ModalForm';
import ResoDescriptions, { ResoDescriptionColumnType } from 'components/ResoDescriptions';
import { get } from 'lodash';
import { Menu } from 'types/menu';
import { Card, CardTitle } from '../../Products/components/Card';

const columns: ResoDescriptionColumnType<Menu>[] = [
  {
    title: 'Tên',
    dataIndex: 'code'
  },
  {
    title: 'Áp dụng',
    dataIndex: 'is_brand_mode',
    valueType: 'select',
    tooltip:
      'Ở cùng 1 khung giờ nếu có BrandMenu và StoreMenu được apply thì sẽ ưu tiên StoreMenu.',
    valueEnum: [
      {
        label: 'Toàn hệ thống',
        value: true,
        color: 'success'
      },
      {
        label: 'Theo cửa hàng',
        value: false
      }
    ]
  },
  // {
  //   title: 'Thời gian hiệu lực',
  //   span: 2,
  //   hideInSearch: true,
  //   render: (_, data: Menu) =>
  //     data.start_time && data.end_time ? (
  //       <Typography>
  //         {fDate(data.start_time)} - {fDate(data.end_time)}
  //       </Typography>
  //     ) : (
  //       '-'
  //     )
  // },
  {
    title: 'Khung giờ',
    dataIndex: 'time_ranges',
    hideInSearch: true,
    render: (_: any, { time_ranges = [] }: Menu) => {
      const isAllDay =
        get(time_ranges, [0, 0]) === get(time_ranges, [0, 1]) &&
        get(time_ranges, [0, 1]) === '00:00';

      if (isAllDay) {
        return <Chip label="Cả ngày" size="small" color="success" />;
      }
      return (
        <Stack direction="row" spacing={1}>
          {time_ranges?.map(([from, to]) => (
            <Chip size="small" key={`${from}-${to}`} label={`${from}-${to}`} />
          ))}
        </Stack>
      );
    }
  },
  // {
  //   title: 'Ngày hoạt động',
  //   dataIndex: 'day_filters',
  //   valueType: 'select',
  //   valueEnum: DAY_OF_WEEK,
  //   span: 2,
  //   render: (_: any, { day_filters: dayFilters, id }: Menu) => (
  //     <Stack direction="row" spacing={1}>
  //       {dayFilters?.length === 7 ? (
  //         <Chip size="small" color="success" label="Cả tuần" />
  //       ) : (
  //         dayFilters?.map((day) => (
  //           <Chip
  //             size="small"
  //             key={`${id}-${day}`}
  //             label={DAY_OF_WEEK.find(({ value }) => value === day)?.label}
  //           />
  //         ))
  //       )}
  //     </Stack>
  //   )
  // },
  {
    title: 'Độ ưu tiên',
    dataIndex: 'priority',
    hideInSearch: true
  }
  // {
  //   title: 'Ngày tạo',
  //   dataIndex: 'create_at',
  //   hideInSearch: true,
  //   render: (value) => fDateTime(value)
  // }
];

const MenuInfoTab = ({ onSubmit, menu }: { onSubmit: any; menu: Menu }) => {
  return (
    <Box>
      <Card>
        <Stack direction="row" justifyContent="space-between">
          <CardTitle>Thông tin Menu</CardTitle>
          <Box>
            <ModalForm
              title={`Cập nhật bảng giá`}
              onOk={onSubmit}
              trigger={
                <LoadingAsyncButton startIcon={<Edit />} size="small" variant="contained">
                  Điều chỉnh
                </LoadingAsyncButton>
              }
            >
              <MenuForm />
            </ModalForm>
          </Box>
        </Stack>
        <ResoDescriptions layout="row" datasource={menu} columns={columns as any} />
        {/* <MenuForm /> */}
      </Card>
    </Box>
  );
};

export default MenuInfoTab;

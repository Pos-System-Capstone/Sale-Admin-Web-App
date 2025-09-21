import { Button, Card, Stack } from '@mui/material';
import { Icon } from '@iconify/react';
import Page from 'components/Page';
import plusFill from '@iconify/icons-eva/plus-fill';
import { useNavigate } from 'react-router';
import { PATH_DASHBOARD } from 'routes/paths';
import { TVariant } from 'types/report/variant';
import { TTableColumn } from 'types/table';
import ResoTable from 'components/ResoTable/ResoTable';
import variantApi from 'api/variant';
import { useSnackbar } from 'notistack';
import TagField from 'components/form/TagField';

export default function ListVariants() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const variantColumn: TTableColumn<any>[] = [
    {
      title: `STT`,
      dataIndex: 'index',
      hideInSearch: true
    },
    { title: 'Tên', dataIndex: 'name', hideInSearch: true },
    {
      title: `Giá trị`,
      dataIndex: 'value',
      hideInSearch: true,
      render: (value: any) => <TagField data={value} punctuation={'_'} />
    },
    {
      title: `Mức độ ưu tiên`,
      dataIndex: 'displayOrder',
      hideInSearch: true
    }
  ];

  const handleDelete = async (id: any) => {
    const data: TVariant = {};
    data.status = 'DEACTIVE';
    const response = await variantApi.updateVariant(id, data);
    response.status == 200
      ? enqueueSnackbar(`Xóa thành công`, {
          variant: 'success'
        })
      : enqueueSnackbar(`Có lỗi xảy ra`, {
          variant: 'error'
        });
  };

  return (
    <Page
      title={`Biến thể sản phẩm`}
      actions={() => [
        <Button
          key="create-variant"
          onClick={() => {
            navigate(`${PATH_DASHBOARD.variants.new}`);
          }}
          variant="contained"
          startIcon={<Icon icon={plusFill} />}
        >
          Tạo Biến Thể
        </Button>
      ]}
    >
      <Card>
        <Stack spacing={2}>
          <ResoTable
            // showAction={true}
            pagination
            onDelete={(params: any) => handleDelete(params.id)}
            onEdit={(params: any) => navigate(`${PATH_DASHBOARD.variants.root}/${params.id}`)}
            getData={(params: any) => variantApi.getVariants(params)}
            columns={variantColumn}
            rowKey="Variant_id"
          />
        </Stack>
      </Card>
    </Page>
  );
}

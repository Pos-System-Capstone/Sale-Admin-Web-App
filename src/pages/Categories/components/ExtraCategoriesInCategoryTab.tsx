import { Avatar, Box, Button, Card, Stack } from '@mui/material';
import ResoTable from 'components/ResoTable/ResoTable';
import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import { TTableColumn } from 'types/table';
import { CategoryStatus, TCategory } from 'types/category';
import { PATH_DASHBOARD } from 'routes/paths';
import categoryApi from 'api/category';
import Label from 'components/Label';
import ModalExtraCategoryForm from './ModalExtraCategoryForm';
interface Props {}

const ExtraCategoriesInCategoryTab = (props: Props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const tableRef = useRef<any>();
  const categoryColumns: TTableColumn<TCategory>[] = [
    {
      title: 'STT',
      dataIndex: 'index',
      hideInSearch: true
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'picUrl',
      hideInSearch: true,
      render: (src, { product_name }: any) => (
        <Avatar
          alt={product_name}
          src={src}
          variant="square"
          style={{ width: '54px', height: '54px' }}
        />
      )
    },
    {
      title: 'Tên danh mục',
      dataIndex: 'name'
    },
    {
      title: 'Mã danh mục',
      dataIndex: 'code',
      hideInSearch: true
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      hideInSearch: true,
      render: (status) => {
        return status === CategoryStatus.ACTIVE ? (
          <Label color="primary">Hoạt động </Label>
        ) : (
          <Label color="warning"> Không hoạt động </Label>
        );
      }
    }
  ];

  return (
    <Card>
      <Stack justifyContent="flex-end" mb={2} direction="row" spacing={2}>
        <ModalExtraCategoryForm
          cateId={id}
          trigger={<Button variant="outlined">Thêm danh mục extra</Button>}
          onReload={() => tableRef.current?.reload()}
        />
      </Stack>
      <Box py={2}>
        {/* <ResoTable
          showFilter={false}
          pagination={false}
          showSettings={false}
          columns={modifierColumns}
          rowKey="description"
          dataSource={modifiers ?? []}
          onDelete={onDeleteModifier}
          onEdit={(values: TModifier) => updateForm.reset(normalizeModifier(values))}
          renderEdit={(dom: ReactNode, modifier: TModifier) => (
            <ModalForm
              onOk={async () => {
                try {
                  await updateForm.handleSubmit(
                    (data) => {
                      return updateModifierAsync({
                        cateId: id!,
                        data: transformModifier(data),
                        modifierId: modifier.id
                      });
                    },
                    (e) => {
                      throw e;
                    }
                  )();
                  return true;
                } catch (error) {
                  return false;
                }
              }}
              title={<Typography variant="h3">Cập nhật tuỳ chỉnh</Typography>}
              trigger={dom}
            >
              <FormProvider {...updateForm}>
                <CategoryModifierForm />
              </FormProvider>
            </ModalForm>
          )}
        /> */}
        <ResoTable
          ref={tableRef}
          onEdit={(cate: TCategory) => {
            navigate(`${PATH_DASHBOARD.categories.editById(cate.id)}`);
          }}
          // onDelete={(cate: TCategory) => setCurrentDeleteItem(cate)}
          rowKey="id"
          getData={(params: any) => categoryApi.getExtraCategoriesInProductCategory(id!, params)}
          columns={categoryColumns}
        />
      </Box>
    </Card>
  );
};

export default ExtraCategoriesInCategoryTab;

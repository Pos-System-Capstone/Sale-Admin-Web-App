import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Card, Chip } from '@mui/material';
import categoryApi from 'api/category';
import confirm from 'components/Modal/confirm';
import ResoTable from 'components/ResoTable/ResoTable';
import { PRODUCT_TYPE_DATA } from 'constraints';
import useAddExtra from 'hooks/extra-categories/useAddExtra';
import useDeleteExtra from 'hooks/extra-categories/useDeleteExtra';
import useUpdateExtra from 'hooks/extra-categories/useUpdateExtra';
import { useSnackbar } from 'notistack';
import { useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { ModifierSelectType } from 'types/Modifier';
import { TCategoryExtra } from 'types/category';
import { TProduct } from 'types/product';
import { TTableColumn } from 'types/table';
import * as yup from 'yup';
import { transformExtra } from '../helper';
import { PATH_DASHBOARD } from 'routes/paths';

interface Props {}

const schema = yup.object({
  extra_cate_id: yup.number().required('Vui lòng nhập chọn 1 extra'),
  min: yup
    .number()
    .min(0, 'Thấp nhất 0')
    .typeError('Vui lòng nhập giá trị tối thiểu')
    .required('Vui lòng nhập giá trị tối thiểu'),
  max: yup
    .number()
    .min(0, 'Thấp nhất 0')
    .typeError('Vui lòng nhập giá trị tối đa')
    .required('Vui lòng nhập giá trị tối đa'),
  select_type: yup.mixed().oneOf(Object.values(ModifierSelectType), 'Vui lòng chọn kiểu')
});

const CategoryExtraTab = (props: Props) => {
  const categoryExtraForm = useForm();

  const { enqueueSnackbar } = useSnackbar();

  const { id } = useParams();

  const tableRef = useRef<any>();
  const [_anchorEl, setAnchorEl] = useState(null);
  const [_openMenu, setOpenMenu] = useState<null | number>(null);
  const navigate = useNavigate();
  const { mutateAsync: addExtraAsync } = useAddExtra();
  const { mutateAsync: updateExtraAsync } = useUpdateExtra();
  const { mutateAsync: deleteExtraAsync } = useDeleteExtra();

  const openEditMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const createExtraForm = useForm({
    resolver: yupResolver(schema),
    shouldUnregister: true,
    defaultValues: {
      min: 0,
      max: 1,
      cate_id: Number(id)
    }
  });

  const updateForm = useForm({
    resolver: yupResolver(schema),
    shouldUnregister: true,
    defaultValues: {
      min: 0,
      max: 1
    }
  });

  const onDeleteExtra = (extra: TCategoryExtra) => {
    confirm({
      title: (
        <>
          Xác nhận xóa <strong>{extra.extra_cate.name}</strong>
        </>
      ),
      content: 'Xoá nhóm extra này?',
      onOk: async () => {
        try {
          await deleteExtraAsync(extra.id);
          enqueueSnackbar('Xoá thành công', {
            variant: 'success'
          });
          tableRef.current?.reload();
        } catch (error) {
          console.log(`error`, error);
          enqueueSnackbar((error as any).message, {
            variant: 'error'
          });
        }
      },
      onCancle: () => {}
    });
  };
  const editProduct = (data: TProduct) => {
    navigate(`${PATH_DASHBOARD.products.root}/${data.id}`);
  };

  const onAddExtra = async (values: TCategoryExtra) => {
    try {
      const data = transformExtra({ ...values });
      await addExtraAsync({ ...data });
      return true;
    } catch (error) {
      enqueueSnackbar((error as any).message, {
        variant: 'error'
      });
    }
    return false;
  };

  const categoryExtraColumns: TTableColumn<TProduct>[] = [
    {
      title: 'STT',
      dataIndex: 'index',
      hideInSearch: true
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'picUrl',
      hideInSearch: true,
      render: (src, { name }: any) => (
        <Box
          component="img"
          alt={name}
          src={
            src ??
            'https://firebasestorage.googleapis.com/v0/b/pos-system-47f93.appspot.com/o/files%2Fproduct.png?alt=media&token=8eb70c21-2c0e-4d5c-b92a-0b93c3020c9b'
          }
          sx={{ width: 48, height: 48, borderRadius: 1.5 }}
        />
      )
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name'
    },
    {
      title: 'Giá bán',
      dataIndex: 'sellingPrice',
      hideInSearch: true,
      valueType: 'money'
    },
    {
      title: 'Mã sản phẩm',
      dataIndex: 'code',
      hideInSearch: true
    },
    {
      title: 'Loại Sản Phẩm',
      dataIndex: 'type',
      valueType: 'select',
      valueEnum: PRODUCT_TYPE_DATA,
      render: (type) => (
        <Chip label={PRODUCT_TYPE_DATA.find(({ value }) => value === type)?.label} />
      )
    }
    // {
    //   title: 'Tên',
    //   dataIndex: 'name',
    //   render: (data: TCategory) => <Typography>{data.name}</Typography>
    // },
    // {
    //   title: 'Số lượng tối thiểu',
    //   dataIndex: 'min_max'
    //   // render: (value, __) => <TextField value={value} label="Mã sản phẩm" disabled />
    // },
    // {
    // title: 'Mã sản phẩm',
    //   dataIndex: 'select_type',
    //   valueType: 'select',
    //   valueEnum: modifierSelectTypeOptions
    // },
    // {
    //   title: 'Hành động',
    //   valueType: 'option',
    //   render: (_, data) => {
    //     const { id } = data;
    //     return (
    //       <>
    //         <IconButton
    //           key={`menu-${id}`}
    //           onClick={(e) => {
    //             openEditMenu(e);
    //             setOpenMenu(id);
    //           }}
    //           aria-label="more"
    //           aria-controls="long-menu"
    //           aria-haspopup="true"
    //           size="large"
    //         >
    //           <Icon icon={moreVerticalFill} />
    //         </IconButton>
    //         <Menu
    //           anchorEl={_anchorEl}
    //           MenuListProps={{
    //             'aria-labelledby': 'edit-menu'
    //           }}
    //           onClose={(e) => {
    //             setAnchorEl(null);
    //             setOpenMenu(null);
    //           }}
    //           open={id == _openMenu}
    //           key={`menu-edit-${id}`}
    //           id={`menu-edit-${id}`}
    //           sx={{
    //             p: 0
    //           }}
    //         >
    //           <MenuItem>
    //             <ListItemText>Danh sách sản phẩm</ListItemText>
    //           </MenuItem>
    //           <ModalForm
    //             onOk={async () => {
    //               try {
    //                 await updateForm.handleSubmit(
    //                   (data: any) => {
    //                     return updateExtraAsync({
    //                       categoryExtraId: Number(id),
    //                       data: transformExtra(data)
    //                     });
    //                   },
    //                   (e) => {
    //                     throw e;
    //                   }
    //                 )();
    //                 tableRef.current?.reload();
    //                 return true;
    //               } catch (error) {
    //                 return false;
    //               }
    //             }}
    //             title={<Typography variant="h3">Cập nhật extra</Typography>}
    //             trigger={
    //               <MenuItem onClick={() => updateForm.reset(normalizeExtra(data))}>
    //                 <ListItemText>Điều chỉnh</ListItemText>
    //               </MenuItem>
    //             }
    //           >
    //             <FormProvider {...updateForm}>
    //               <CategoryExtraForm updateMode />
    //             </FormProvider>
    //           </ModalForm>

    //           <MenuItem onClick={() => onDeleteExtra(data)}>
    //             <ListItemText>Xoá</ListItemText>
    //           </MenuItem>
    //         </Menu>
    //       </>
    //     );
    //   }
    // }
  ];

  return (
    <Card>
      {/* <ModalForm
        onOk={async () => {
          try {
            await createExtraForm.handleSubmit(onAddExtra, (e) => {
              throw e;
            })();
            tableRef.current?.reload();
            return true;
          } catch (error) {
            return false;
          }
        }}
        title={<Typography variant="h3">Thêm nhóm extra</Typography>}
        trigger={<Button variant="contained">Thêm nhóm extra</Button>}
      >
        <FormProvider {...createExtraForm}>
          <CategoryExtraForm />
        </FormProvider>
      </ModalForm> */}
      <Box py={2}>
        <FormProvider {...categoryExtraForm}>
          <ResoTable
            ref={tableRef}
            showFilter={false}
            showSettings={false}
            columns={categoryExtraColumns}
            onEdit={editProduct}
            rowKey="cate_id"
            getData={(params: any) => categoryApi.getProductsInCategory(id!, params)}
          />
        </FormProvider>
      </Box>
    </Card>
  );
};

export default CategoryExtraTab;

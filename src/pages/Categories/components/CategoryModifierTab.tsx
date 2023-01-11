import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Card, Typography } from '@mui/material';
import CategoryModifierForm from 'components/form/CategoryModifier/CategoryModifierForm';
import confirm from 'components/Modal/confirm';
import ModalForm from 'components/ModalForm/ModalForm';
import ResoTable from 'components/ResoTable/ResoTable';
import useAddModifier from 'hooks/categories/useAddModifier';
import useCategoryModifiers from 'hooks/categories/useCategoryModifers';
import useDeleteModifier from 'hooks/categories/useDeleteModifier';
import useUpdateModifier from 'hooks/categories/useUpdateModifier';
import { useSnackbar } from 'notistack';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ReactNode } from 'react-markdown';
import { useParams } from 'react-router';
import {
  ModifierForm,
  ModifierSelectType,
  modifierSelectTypeOptions,
  TModifier
} from 'types/Modifier';
import { TTableColumn } from 'types/table';
import * as yup from 'yup';
import { normalizeModifier, transformModifier } from '../helper';
interface Props {}

const schema = yup.object({
  title: yup.string().required('Vui lòng nhập tên tuỳ chỉnh'),
  select_type: yup.mixed().oneOf(Object.values(ModifierSelectType), 'Vui lòng chọn kiểu'),
  modifiers: yup
    .array()
    .min(1, 'Vui lòng có ít nhất một giá trị')
    .of(
      yup.object().shape({
        label: yup.string().required('Vui lòng nhập tên gía trị'),
        value: yup.string().required('Vui lòng nhập gía trị')
      })
    )
});

const CategoryModifierTab = (props: Props) => {
  const { id } = useParams();
  const modifierForm = useForm<ModifierForm>({
    resolver: yupResolver(schema),
    shouldUnregister: true
  });
  const updateForm = useForm<ModifierForm>({
    resolver: yupResolver(schema),
    shouldUnregister: true
  });
  const { enqueueSnackbar } = useSnackbar();

  const { data: modifiers } = useCategoryModifiers(Number(id));
  const { mutateAsync: addModifierAsync } = useAddModifier();
  const { mutateAsync: deleteModifierAsync } = useDeleteModifier();
  const { mutateAsync: updateModifierAsync } = useUpdateModifier();

  const modifierColumns: TTableColumn<TModifier>[] = [
    {
      title: 'Tên',
      dataIndex: 'title'
    },
    {
      title: 'Type',
      dataIndex: 'select_type',
      valueType: 'select',
      valueEnum: modifierSelectTypeOptions
    },
    {
      title: 'Giá trị',
      dataIndex: 'options',
      render: (_, data) => {
        const values = data.options?.map((m) => m.label);
        return <Typography>{values?.join(',') ?? 'N/A'}</Typography>;
      }
    },
    {
      title: 'Bắt buộc',
      dataIndex: 'is_required',
      valueType: 'select',
      valueEnum: [
        {
          label: 'Bắt buộc',
          value: true
        },
        {
          label: 'Không bắt buộc',
          value: false
        }
      ]
    },
    {
      title: 'Thứ tự',
      dataIndex: 'display_index'
    }
  ];

  const onAddModifier = async (values: ModifierForm) => {
    try {
      const data = transformModifier({ ...values, cate_id: Number(id) });
      await addModifierAsync({ data, cateId: Number(id) });
      return true;
    } catch (error) {
      enqueueSnackbar((error as any).message, {
        variant: 'error'
      });
    }
    return false;
  };

  const onDeleteModifier = (values: TModifier) => {
    confirm({
      title: 'Xác nhận xoá',
      content: 'Xoá tuỳ chỉnh này sẽ tác động tới các sản phẩm đang được áp dụng',
      onOk: async () => {
        try {
          await deleteModifierAsync({ cateId: Number(id), modifierId: values.id });
        } catch (error) {
          console.log(`error`, error);
          enqueueSnackbar(error as any, {
            variant: 'error'
          });
        }
      },
      onCancle: () => {}
    });
  };

  return (
    <Card>
      <ModalForm
        onOk={async () => {
          try {
            await modifierForm.handleSubmit(onAddModifier, (e) => {
              throw e;
            })();
            console.log(`success`);
            return true;
          } catch (error) {
            return false;
          }
        }}
        title={<Typography variant="h3">Thêm tuỳ chỉnh</Typography>}
        trigger={<Button variant="contained">Thêm tuỳ chỉnh</Button>}
      >
        <FormProvider {...modifierForm}>
          <CategoryModifierForm />
        </FormProvider>
      </ModalForm>
      <Box py={2}>
        <ResoTable
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
                        cateId: Number(id),
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
        />
      </Box>
    </Card>
  );
};

export default CategoryModifierTab;

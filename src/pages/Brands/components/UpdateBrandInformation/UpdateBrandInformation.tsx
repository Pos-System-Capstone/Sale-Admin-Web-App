import { Stack } from '@mui/material';
import brandApi from 'api/brand';
import { UpdateConfirmDialog } from 'components/DeleteConfirmDialog';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { TBrandDetail, TBrandUpdate } from 'types/brand';
import UpdateBrandInformationForm from './UpdateBrandInformationForm';

type Props = {
  currentBrandInformation: TBrandDetail | undefined;
  onUpdateFormSuccessful: () => void;
};

const UpdateBrandInformation = ({ currentBrandInformation, onUpdateFormSuccessful }: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false);

  const updateBrandForm = useForm<TBrandUpdate>({
    defaultValues: {
      name: '',
      email: '',
      address: '',
      phone: '',
      picUrl: ''
    }
  });

  useEffect(() => {
    if (!currentBrandInformation) return;
    updateBrandForm.reset({ ...currentBrandInformation });
  }, [currentBrandInformation, updateBrandForm]);

  const onSubmitBrandInformationToUpdate = (values: TBrandUpdate) => {
    setIsOpenConfirmDialog(!isOpenConfirmDialog);
    return brandApi
      .updateBrandInformation(currentBrandInformation ? currentBrandInformation.id : '', values)
      .then(() => {
        enqueueSnackbar(`Cập nhật thành công`, {
          variant: 'success'
        });
        onUpdateFormSuccessful();
      })
      .catch((err) => {
        enqueueSnackbar('Xảy ra lỗi, thử lại sau!', {
          variant: 'error'
        });
      });
  };

  return (
    <Stack spacing={2}>
      <FormProvider {...updateBrandForm}>
        <UpdateBrandInformationForm
          currentBrandInformation={currentBrandInformation}
          onFinish={() => setIsOpenConfirmDialog(true)}
        />
        <UpdateConfirmDialog
          title={'Xác nhận update thông tin'}
          description={'Bạn chắc chắn muốn cập nhật thông tin ?'}
          open={isOpenConfirmDialog}
          onClose={() => setIsOpenConfirmDialog(false)}
          onUpdate={updateBrandForm.handleSubmit(onSubmitBrandInformationToUpdate)}
        />
      </FormProvider>
    </Stack>
  );
};

export default UpdateBrandInformation;

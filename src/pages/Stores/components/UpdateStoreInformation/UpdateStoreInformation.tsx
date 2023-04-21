import { Stack } from '@mui/material';
import { UpdateConfirmDialog } from 'components/DeleteConfirmDialog';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { TStoreDetail, TStoreUpdate } from 'types/store';
import UpdateStoreInformationForm from './UpdateStoreInformationForm';
import storeApi from 'api/store';

type Props = {
  currentStoreInformation: TStoreDetail | undefined;
  onUpdateFormSuccessful: () => void;
};

const UpdateStoreInformation = ({ currentStoreInformation, onUpdateFormSuccessful }: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false);

  const updateStoreForm = useForm<TStoreUpdate>();

  useEffect(() => {
    if (!currentStoreInformation) return;
    updateStoreForm.reset({ ...currentStoreInformation });
  }, [currentStoreInformation, updateStoreForm]);

  const onSubmitStoreInformationToUpdate = (values: TStoreUpdate) => {
    const updateValues: TStoreUpdate = {
      name: values.name,
      address: values.address,
      code: values.code,
      email: values.email,
      phone: values.phone,
      shortName: values.shortName
    };
    setIsOpenConfirmDialog(!isOpenConfirmDialog);
    return storeApi
      .updateStoreInformation(
        currentStoreInformation ? currentStoreInformation.id : '',
        updateValues
      )
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
      <FormProvider {...updateStoreForm}>
        <UpdateStoreInformationForm
          currentStoreInformation={currentStoreInformation}
          onFinish={() => setIsOpenConfirmDialog(true)}
        />
        <UpdateConfirmDialog
          title={'Xác nhận cập nhật thông tin'}
          description={'Bạn chắc chắn muốn cập nhật thông tin ?'}
          open={isOpenConfirmDialog}
          onClose={() => setIsOpenConfirmDialog(false)}
          onUpdate={updateStoreForm.handleSubmit(onSubmitStoreInformationToUpdate)}
        />
      </FormProvider>
    </Stack>
  );
};

export default UpdateStoreInformation;

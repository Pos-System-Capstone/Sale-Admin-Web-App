import trashIcon from '@iconify/icons-eva/trash-outline';
import { Icon } from '@iconify/react';
import { UploadFileOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Avatar, IconButton, Radio, Stack, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import ResoTable from 'components/ResoTable/ResoTable';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Controller, useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { uploadfile } from 'redux/file/api';
import { ProductImage } from 'types/product';
import { TTableColumn } from 'types/table';
import { CardTitle } from '../Card';

interface Props {}

const Input = styled('input')({
  display: 'none'
});

const ProductImagesForm = (props: Props) => {
  const { control } = useFormContext<any>();
  const [isUploadImage, setUploadImage] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const watchFieldArr = useWatch({ control, name: 'product_image' });
  const {
    fields,
    append: appendProductImage,
    remove: removeProductImage
  } = useFieldArray({
    control,
    name: 'product_image',
    keyName: 'id'
  });

  const productImages = (fields ?? [])?.map((f, idx) => ({
    ...f
    // ...(watchFieldArr && watchFieldArr[idx])
  }));

  const onUpload = async (e: { target: { files: FileList } }) => {
    setUploadImage(true);
    const files = e.target.files;
    const requests = Array.from(files).map((file: any) => {
      const formData = new FormData();
      formData.append('file', file);
      return uploadfile(formData);
    });
    const listURL = await Promise.all(requests);

    const newOrderMedias = listURL.map((url) => ({
      image_url: url,
      description: ''
    }));

    setUploadImage(false);
    enqueueSnackbar('Upload thành công', {
      variant: 'success'
    });
    appendProductImage(newOrderMedias);
  };

  const productImgColumns: TTableColumn<ProductImage & { id: string }>[] = [
    {
      title: 'Hình ảnh',
      dataIndex: 'image_url',
      render: (_: any, data) => {
        return <Avatar variant="square" sx={{ width: 54, height: 54 }} src={data.image_url} />;
      }
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      render: (_, data, idx) => (
        <Controller
          control={control}
          name={`product_image.${idx}.description`}
          render={({ field }) => (
            <TextField
              key={`${data.image_url}-${productImages[idx]?.id}`}
              label="Mô tả"
              {...field}
            />
          )}
        />
      )
    },
    {
      title: 'Ảnh đại diện',
      render: (_: any, data, idx) => {
        return (
          <Controller
            control={control}
            name={`pic_url`}
            render={({ field }) => (
              <Radio
                key={`${data.image_url}`}
                value={data.image_url}
                onChange={() => {
                  field.onChange(data.image_url);
                }}
                checked={data.image_url === field.value}
              />
            )}
          />
        );
      }
    },
    {
      title: '',
      render: (_, data, idx) => (
        <IconButton
          key={`remove-${data.id}`}
          onClick={() => removeProductImage(idx)}
          sx={{ color: 'red' }}
          size="large"
        >
          <Icon icon={trashIcon} />
        </IconButton>
      )
    }
  ];

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <CardTitle mb={2} variant="subtitle1">
          Hình ảnh
        </CardTitle>
        <label htmlFor="contained-button-file">
          <Input
            onChange={(e: any) => onUpload(e)}
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
          />
          <LoadingButton
            loading={isUploadImage}
            component="span"
            size="small"
            variant="outlined"
            startIcon={<UploadFileOutlined />}
          >
            Upload
          </LoadingButton>
        </label>
      </Stack>
      <ResoTable
        showFilter={false}
        pagination={false}
        showSettings={false}
        showAction={false}
        columns={productImgColumns}
        rowKey="id"
        dataSource={productImages}
      />
    </>
  );
};

export default ProductImagesForm;

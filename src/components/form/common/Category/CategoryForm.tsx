import { Grid, Stack } from '@mui/material';
import { InputField, SelectField, UploadImageField } from 'components/form';
import { useFormContext } from 'react-hook-form';
import { CREATE_CATEGORY_TYPE_OPTIONS } from 'types/category';

interface Props {
  updateMode?: boolean;
}

const CategoryForm = ({ updateMode }: Props) => {
  // const { translate } = useLocales();
  // const type = watch('categoryType');
  const { watch } = useFormContext();
  return (
    <Grid container spacing={2}>
      <Grid alignItems={'center'} item xs={12} sm={4}>
        <UploadImageField.Avatar label="Hình ảnh" name="picUrl" style={{ margin: '0 auto 40px' }} />
      </Grid>
      <Grid spacing={2} xs={12} sm={8}>
        <Stack ml={2} my={2} direction="column" spacing={2}>
          <InputField fullWidth name="name" label="Tên danh mục" />
          <InputField disabled={updateMode} fullWidth name="code" label="Mã danh mục" />
          <InputField type="number" fullWidth name="displayOrder" label="Thứ tự hiển thị" />
          <SelectField
            fullWidth
            disabled={updateMode}
            options={CREATE_CATEGORY_TYPE_OPTIONS}
            name="categoryType"
            label="Loại danh mục"
          ></SelectField>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <InputField fullWidth name="description" label="Mô tả" />
      </Grid>
      {/* {!isExtra && (
        <Grid item xs={12}>
          <CheckBoxField name="is_root" label="Đây là Danh mục gốc" />
        </Grid>
      )}
      {!isRoot && !isExtra && (
        <Grid item xs={12}>
          <Typography mb={2}>Danh mục cha</Typography>
          <Controller
            name="parent_cate_id"
            render={({ field }) => (
              <TreeViewField
                onDisabled={(id) => !checkIsRootCategory(id, categories ?? [])}
                data={categoryTreeData}
                value={field.value}
                onClickContainer={getChilds}
                onChange={(e: any) => {
                  field.onChange(e);
                }}
              />
            )}
          />
        </Grid>
      )} */}
    </Grid>
  );
};

export default CategoryForm;

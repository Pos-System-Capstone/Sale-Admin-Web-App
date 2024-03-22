import { Grid } from '@mui/material';
import { InputField } from 'components/form';
import { useFormContext } from 'react-hook-form';
// import { CREATE_CATEGORY_TYPE_OPTIONS } from 'types/category';

interface Props {
  updateMode?: boolean;
}

const CategoryForm = ({ updateMode }: Props) => {
  const { watch } = useFormContext();
  return (
    <Grid container xs={12} spacing={2}>
      <Grid item xs={8}>
        <InputField fullWidth name="name" label="Tên danh mục" />
      </Grid>
      <Grid item xs={4}>
        <InputField fullWidth name="cateId" label="Mã danh mục" />
      </Grid>
    </Grid>
  );
};

export default CategoryForm;

import { Grid } from '@mui/material';
import useExtras from 'hooks/extras/useExtras';
import { modifierSelectTypeOptions } from 'types/Modifier';
import { AutoCompleteField, InputField, SelectField } from '..';

interface Props {
  updateMode?: boolean;
}

const CategoryExtraForm = ({ updateMode }: Props) => {
  const { data: extras = [] } = useExtras();

  const extraOptions = extras.map((c) => ({ label: c.name, value: c.id }));

  const getOpObj = (option: any) => {
    if (!option) return option;
    if (!option.value) return extraOptions.find((opt) => opt.value === option);
    return option;
  };

  return (
    <Grid container spacing={2}>
      <InputField name="cate_id" sx={{ display: 'none' }} />
      <Grid item xs={6}>
        <AutoCompleteField
          disabled={updateMode}
          options={extraOptions}
          getOptionLabel={(value: any) => {
            return getOpObj(value)?.label;
          }}
          isOptionEqualToValue={(option: any, value: any) => {
            if (!option) return option;
            return option.value === getOpObj(value)?.value;
          }}
          transformValue={(opt: any) => opt.value}
          name="extra_cate_id"
          size="small"
          type="text"
          label="Nhóm extra"
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <SelectField
          options={modifierSelectTypeOptions}
          name="select_type"
          type="text"
          label="Kiểu"
          fullWidth
          size="small"
        />
      </Grid>
      <Grid item xs={6}>
        <InputField type="number" size="small" fullWidth name="min" label="Tối thiểu" />
      </Grid>
      <Grid item xs={6}>
        <InputField type="number" size="small" fullWidth name="max" label="Tối đa" />
      </Grid>
    </Grid>
  );
};

export default CategoryExtraForm;

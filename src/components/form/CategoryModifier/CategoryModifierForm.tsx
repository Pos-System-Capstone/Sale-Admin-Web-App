import trashIcon from '@iconify/icons-eva/trash-outline';
import { Icon } from '@iconify/react';
import { Grid, Box, Typography, IconButton, Button, Stack } from '@mui/material';
import useLocales from 'hooks/useLocales';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { modifierSelectTypeOptions } from 'types/Modifier';
import { ErrorMessage } from '@hookform/error-message';
import { InputField, SelectField, CheckBoxField } from '..';

interface Props {}

const marks = [
  {
    value: 0,
    label: 'Đầu tiền'
  },
  {
    value: 100,
    label: 'Cuối cùng'
  }
];

const CategoryModifierForm = (props: Props) => {
  const {
    control,
    formState: { errors }
  } = useFormContext();
  const {
    fields: modifiers,
    append: appendModifier,
    remove: removeModifier
  } = useFieldArray({
    control,
    name: 'modifiers'
  });
  const { translate } = useLocales();
  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={6}>
        <InputField name="title" size="small" type="text" label="Tên tuỳ chỉnh" fullWidth />
      </Grid>
      <Grid item xs={6} md={6}>
        <SelectField
          options={modifierSelectTypeOptions}
          name="select_type"
          size="small"
          type="text"
          label="Kiểu"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <CheckBoxField name="is_required" label="Bắt buộc" />
      </Grid>
      <Grid item xs={12}>
        <Box>
          <Typography gutterBottom>{translate('collections.table.position')}</Typography>
          <Box px={4}>
            <InputField type="number" min={0} name="display_index" />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography>Giá trị</Typography>
        <Stack spacing={2}>
          <ErrorMessage
            errors={errors}
            name="modifiers"
            render={({ message }) => (
              <Typography color="red" variant="caption">
                {message}
              </Typography>
            )}
          />
          {modifiers.map(({ id }, optIndex) => (
            <Box key={`modifier-${id}`}>
              <Stack direction="row" spacing={2}>
                <InputField
                  name={`modifiers.${optIndex}.label`}
                  size="small"
                  label="Tên tùy chỉnh"
                />
                <InputField name={`modifiers.${optIndex}.value`} size="small" label="Giá trị" />

                <IconButton onClick={() => removeModifier(optIndex)} sx={{ color: 'red' }}>
                  <Icon icon={trashIcon} />
                </IconButton>
              </Stack>
            </Box>
          ))}
          <span>
            <Button
              onClick={() =>
                appendModifier({
                  label: '',
                  value: ''
                })
              }
              variant="outlined"
            >
              Thêm tùy chọn
            </Button>
          </span>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default CategoryModifierForm;

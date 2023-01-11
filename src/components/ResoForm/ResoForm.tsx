import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import React, { ReactNode, useImperativeHandle } from 'react';
import { Controller, useForm, UseFormProps, UseFormReturn } from 'react-hook-form';
import { InputProps, ResoColumnType, ResoFormRef, ValueType } from './types';
import { buildFormItem } from './utils/utils';

type FormLayoutType = 'embed' | 'form' | 'modal' | 'drawer';

type FormProps = {
  onFinish?: (values: any) => Promise<void | boolean | undefined> | void;
  columns: ResoColumnType[];
  formProps?: UseFormProps;
};

type DefaultProps = {
  size?: 'small' | 'medium' | undefined;
  layoutType?: FormLayoutType;
  submitter?:
    | ((form: UseFormReturn) => ReactNode)
    | boolean
    | {
        submitText: string;
        resetText: string;
      };
};

const defaultProps = {
  size: 'small',
  layoutType: 'form',
  submitter: true
} as DefaultProps;

const ResoForm = React.forwardRef<ResoFormRef, FormProps & DefaultProps>(
  ({ formProps, columns, onFinish, size, submitter }, ref: any) => {
    const form = useForm(formProps);

    useImperativeHandle(
      ref,
      () => ({
        form
      }),
      [form]
    );

    const renderContent = (columns: ResoColumnType[]): ReactNode[] => {
      return columns
        .filter(({ hideInForm }) => !hideInForm)
        .map((col) => {
          if (col.valueType === 'group') {
            if (!col.columns) return null;
            return (
              <Box>
                <Typography variant="h5" sx={{ pb: 2 }}>
                  {col.title}
                </Typography>
                <Grid container spacing={2}>
                  {renderContent(col.columns)}
                </Grid>
              </Box>
            );
          }

          if (col.valueType === 'divider') {
            return <Divider />;
          }

          if (!col.name) return null;
          const itemProps: {
            valueType: ValueType;
            formProps: InputProps;
          } = {
            valueType: col.valueType as ValueType,
            formProps: {
              name: col.name,
              control: form.control,
              fieldProps: {
                ...col.fieldProps,
                label: col.title,
                fullWidth: true,
                size: size || 'small'
              },
              options: col.valueEnum
            }
          };

          const item = col.renderFormItem ? (
            <Grid item xs={col.width}>
              <Controller control={form.control} render={col.renderFormItem} name={col.name} />
            </Grid>
          ) : (
            <Grid item xs={col.width}>
              {buildFormItem(itemProps)}
            </Grid>
          );

          return item;
        });
      // grid.push(
      //   <Box>
      //     <Grid container spacing={2} alignItems='start'>
      //       {gridItems}
      //     </Grid>
      //   </Box>
      // )
      // return grid
    };

    const submitContent = () => {
      if (!submitter) return null;
      if (typeof submitter === 'function') {
        return submitter(form);
      }
      return (
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={() => form.reset({})}>
            {(submitter as any).resetText || 'Xóa'}
          </Button>
          <Button variant="contained" type="submit">
            {(submitter as any).submitText || 'Gửi'}
          </Button>
        </Stack>
      );
    };

    return (
      <form
        onSubmit={form.handleSubmit((values) => {
          if (onFinish) {
            onFinish(values);
          }
        })}
      >
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Stack spacing={2}>
            {renderContent(columns)}
            {submitContent()}
          </Stack>
        </Stack>
      </form>
    );
  }
);

ResoForm.displayName = 'ResoForm';

ResoForm.defaultProps = defaultProps;

export default ResoForm;

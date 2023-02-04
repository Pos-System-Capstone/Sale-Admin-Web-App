/* eslint-disable react/prop-types */
import { TextField } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const FormInput = ({ name, label = '', rules = null, defaultValue = '', ...props }) => {
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          {...props}
          error={Boolean(fieldState.error)}
          helpertext={fieldState.error ? fieldState.error.message : props.helperText}
          label={label}
          placeholder={defaultValue}
          defaultValue={defaultValue}
        />
      )}
      name={name}
      control={control}
      rules={rules}
    />
  );
};

export default FormInput;

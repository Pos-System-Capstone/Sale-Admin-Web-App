/* eslint-disable react/prop-types */
import { FormControl, FormHelperText, TextField } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const FormInput = ({
  name,
  label = '',
  rules = null,
  defaultValue = '',
  disabled = false,
  placeholder = '',
  fullWidth = false,
  className = null,
  size = 'small',
  isHidden = false,
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field, fieldState }) => (
        <FormControl
          error={Boolean(fieldState.error)}
          className={className}
          fullWidth={fullWidth}
          size={size}
          disabled={disabled}
          required={props.required}
        >
          <TextField
            {...field}
            {...props}
            size="small"
            id={name}
            disabled={disabled}
            error={Boolean(fieldState.error)}
            helpertext={fieldState.invalid ? fieldState.error.message : props.helperText}
            label={label}
            placeholder={placeholder}
            defaultValue={defaultValue}
          />
          <FormHelperText variant="filled">
            {fieldState.error && fieldState.error.message}
          </FormHelperText>
        </FormControl>
      )}
      name={name}
      control={control}
      rules={rules}
    />
  );
};

export default FormInput;

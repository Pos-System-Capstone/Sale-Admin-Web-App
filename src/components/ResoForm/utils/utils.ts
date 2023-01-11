import { createElement, ReactElement } from 'react';
import {
  ResoFormCheckbox,
  // ResoFormCheckboxGroup,
  ResoFormRadio,
  ResoFormSelect,
  ResoFormText
} from 'components';
import { InputProps, ValueType } from '../types';

export const buildFormItem = (tableConfig: {
  valueType: ValueType;
  formProps: InputProps;
}): ReactElement => {
  const { valueType, formProps } = tableConfig;
  let C: any = ResoFormText;

  const props = { ...formProps };
  switch (valueType) {
    case 'text':
      C = ResoFormText;
      break;
    case 'radio':
      props.options = formProps.options;
      C = ResoFormRadio;
      break;
    case 'select':
      C = ResoFormSelect;
      break;
    case 'checkbox':
      C = ResoFormCheckbox;
      // if (formProps.options) {
      //   props.options = formProps.options;
      //   C = ResoFormCheckboxGroup;
      // } else {
      //   C = ResoFormCheckbox;
      // }
      break;
    default:
      break;
  }

  return createElement(C, props);
};

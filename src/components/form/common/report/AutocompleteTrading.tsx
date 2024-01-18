import { AutoCompleteField } from 'components/form';
import useTrading from 'hooks/report/useTrading';
import React from 'react';

interface Props {
  name: string;
  label?: string;
  [key: string]: any;
}

const AutocompleteTrading = (props: Props) => {
  const { data: extras = [] } = useTrading();

  const extraOptions = extras.map((c: any) => ({ label: c.storeName, value: c.storeName }));
  const getOpObj = (option: any) => {
    if (!option) return option;
    if (!option.label) return extraOptions.find((opt: any) => opt.label === option);
    return option;
  };

  return (
    <AutoCompleteField
      options={extraOptions}
      getOptionLabel={(value: any) => {
        return getOpObj(value)?.label;
      }}
      isOptionEqualToValue={(option: any, value: any) => {
        if (!option) return option;
        return option.label === getOpObj(value)?.label;
      }}
      transformValue={(opt: any) => opt.label}
      size="small"
      type="text"
      {...props}
      label={props.label}
      name={props.name}
      fullWidth
    />
  );
};

export default AutocompleteTrading;

import { AutoCompleteField } from 'components/form';
import useStore from 'hooks/report/useStore';
import React from 'react';

interface Props {
  name: string;
  label?: string;
  [key: string]: any;
}

const AutocompleteStore = (props: Props) => {
  const { data: extras = [] } = useStore();
  const extraOptions = extras.map((c: any) => ({ label: c.name, value: c.id }));
  const getOpObj = (option: any) => {
    if (!option) return option;
    if (!option.value) return extraOptions.find((opt: any) => opt.value === option);
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
        return option.value === getOpObj(value)?.value;
      }}
      transformValue={(opt: any) => opt.value}
      size="small"
      type="text"
      {...props}
      label={props.label}
      name={props.name}
      fullWidth
    />
  );
};

export default AutocompleteStore;

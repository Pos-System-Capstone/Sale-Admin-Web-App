import { AutoCompleteField } from 'components/form';
import useCategories from 'hooks/categories/useCategories';
import React from 'react';

interface Props {
  name: string;
  label?: string;
  [key: string]: any;
}

const AutocompleteCategory = (props: Props) => {
  const { data: extras = [] } = useCategories();
  const extraOptions = extras.map((c) => ({ label: c.cate_name, value: c.cate_id }));
  const getOpObj = (option: any) => {
    if (!option) return option;
    if (!option.value) return extraOptions.find((opt) => opt.value === option);
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

export default AutocompleteCategory;

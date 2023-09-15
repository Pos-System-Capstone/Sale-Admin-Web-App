import { AutoCompleteField } from 'components/form';
import useProduct from 'hooks/report/useProduct';

interface Props {
  name: string;
  label?: string;
  [key: string]: any;
}

const AutocompleteProduct = (props: Props) => {
  const { data: extras = [] } = useProduct();
  const extraOptions = extras.map((c: any) => ({ label: c.productName, value: c.productId }));
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

export default AutocompleteProduct;

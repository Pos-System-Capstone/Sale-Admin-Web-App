import { AutoCompleteField } from 'components/form';
import { useProducts } from 'hooks/products/useProduct';
import { ProductTypeEnum } from 'types/product';

interface Props {
  name: string;
  label?: string;
  [key: string]: any;
  type?: ProductTypeEnum;
}

const AutocompleteProduct = (props: Props) => {
  const { data: products } = useProducts({ page: 1, size: 1000 });
  console.log('categories', products);
  const productsFilter = products?.filter((product) => product.type === props.type);

  const cateOptions =
    productsFilter != undefined && props.type !== undefined
      ? productsFilter?.map((c) => ({ label: c.name, value: c.id }))
      : products !== undefined
      ? products?.map((c) => ({ label: c.name, value: c.id }))
      : [];
  const getOpObj = (option: any) => {
    if (!option) return option;
    if (!option.value) return cateOptions?.find((opt) => opt.value === option);
    return option;
  };

  return (
    <AutoCompleteField
      options={cateOptions}
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

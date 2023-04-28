import { AutoCompleteField } from 'components/form';
import useCategories from 'hooks/categories/useCategories';
import { CategoryType } from 'types/category';

interface Props {
  name: string;
  label?: string;
  [key: string]: any;
  isExtra: boolean;
}

const AutocompleteCategory = (props: Props) => {
  const { data: categories } = useCategories({ page: 1, size: 1000 });
  console.log('categories', categories);
  const extraCategories = categories?.filter((cate) => cate.categoryType === CategoryType.EXTRA);

  const cateOptions =
    extraCategories !== undefined && props.isExtra
      ? extraCategories?.map((c) => ({ label: c.name, value: c.id }))
      : categories !== undefined
      ? categories
          ?.filter((cate) => cate.categoryType !== CategoryType.EXTRA)
          .map((c) => ({ label: c.name, value: c.id }))
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

export default AutocompleteCategory;

import brandApi from 'api/brand';
import { AutoCompleteField } from 'components/form';
import { useQuery } from 'react-query';
import { getUserInfo } from 'utils/utils';

interface Props {
  name: string;
  label?: string;
  [key: string]: any;
}
const userRaw = getUserInfo();
const user: any = JSON.parse(userRaw ?? '{}');
const AutocompleteStore = (props: Props) => {
  const { data: listStore } = useQuery(
    ['stores', user.brandId],
    async () => {
      return brandApi
        .getStoreOfBrand(user.brandId, { page: 1, size: 100 })
        .then((res) => res.data.items);
    },
    {
      enabled: Boolean(user.brandId)
    }
  );
  const storeOptions = [{ label: 'Toàn hệ thống', value: 'ALL' }];
  listStore?.map((c) => storeOptions.push({ label: c.shortName, value: c.code }));
  // const storeOptions = listStore?.map((c) => ({ label: c.name, value: c.code }));

  const getOpObj = (option: any) => {
    if (!option) return option;
    if (!option.value) return storeOptions?.find((opt) => opt.value === option);
    return option;
  };

  return (
    <AutoCompleteField
      options={storeOptions}
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

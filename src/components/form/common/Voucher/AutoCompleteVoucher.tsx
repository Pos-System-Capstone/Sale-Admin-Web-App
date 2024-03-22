import voucherApi from 'api/promotion/voucher';
import { AutoCompleteField } from 'components/form';

import { useQuery } from 'react-query';

import { getUserInfo } from 'utils/utils';

interface Props {
  name: string;
  label?: string;
  [key: string]: any;
  isExtra: boolean;
}
export default function AutoCompleteVoucher(props: Props) {
  const userRaw = getUserInfo();
  const user: any = JSON.parse(userRaw ?? '{}');
  const brandId = user.brandId;
  const { data: listVoucherGroup } = useQuery(['voucher-groups'], async () => {
    return voucherApi.getVoucherGroup({ brandId }).then((res) => res.data.items);
  });
  const storeOptions = listVoucherGroup?.map((c) => ({
    label: c.voucherName,
    value: c.voucherGroupId
  }));

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
}

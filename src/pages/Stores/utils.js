import * as yup from 'yup';

export const storeSchemaBuilder = (translate) =>
  yup.object({
    store_code: yup
      .string()
      .required(translate('common.required', { name: translate('pages.stores.table.storeCode') }))
      .typeError(translate('common.required', { name: translate('pages.stores.table.storeCode') })),
    name: yup
      .string()
      .required(translate('common.required', { name: translate('pages.stores.table.name') }))
  });

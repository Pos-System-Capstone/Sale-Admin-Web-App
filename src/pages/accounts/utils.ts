import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import {
  CombinationModeEnum,
  ComboProductType,
  CreateComboForm,
  TProductBase,
  TProductCombo,
  TProductMaster
} from 'types/product';
import { UpdateProductForm } from './type';

export const transformProductForm = (values: UpdateProductForm) => {
  const transformData = { ...values };
  transformData.atts = values.variants?.map(({ optName }) => optName);
  if (transformData.product_type) {
    const variantArr = values.variants?.reduce<any>((acc, { values = [] }) => [...acc, values], []);
    // transformData.child_products = getCbn(...variantArr)?.map((arr) => ({
    //   atts: arr,
    //   is_available: true,
    //   code: `${transformData.code}${arr.join('')}`,
    //   product_name: `${transformData.product_name}-${arr.join('-')}`
    // }));
  }

  // TODO: fix bug when create product, auto create empty field for image

  transformData.product_image = transformData.product_image?.filter(({ image_url }) =>
    Boolean(image_url)
  );

  transformData.child_products = transformData.child_products?.map((c) => ({
    ...c,
    is_default_child: c.product_id === transformData.defaultChildProduct
  }));

  return transformData;
};

export const transformDraftToStr = (values: any) => {
  const data = { ...values };
  if ((data.description as any) instanceof EditorState) {
    data.description = draftToHtml(
      convertToRaw((data.description as any as EditorState).getCurrentContent())
    );
  }

  return data;
};

export const transformDraftEdtior = (data: any, key: string) => {
  if (!data) return {};
  const values = { ...data };
  const html = values[key];
  const contentBlock = htmlToDraft(html ?? '');
  if (contentBlock) {
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    const editorState = EditorState.createWithContent(contentState);
    values[key] = editorState;
  } else {
    values[key] = EditorState.createEmpty();
  }
  return values;
};

export const normalizeProductData = (values: TProductMaster) => {
  const transformData: Partial<UpdateProductForm> = {
    ...values
  };
  transformData.variants =
    transformData.atts?.map((att) => ({
      optName: att,
      values: []
    })) ?? [];

  transformData.defaultChildProduct = transformData.child_products?.find(
    (p: TProductBase) => p.is_default_child
  )?.product_id;

  // transformData
  transformData.child_products?.forEach((childProd) => {
    if (childProd?.atts) {
      for (let index = 0; index < childProd?.atts?.length; index++) {
        const att = childProd.atts[index];
        const opt = transformData?.variants && transformData?.variants[index];
        if (!opt?.values.includes(att) && opt?.values) {
          opt.values.push(att);
        }
      }
    }
  });

  transformData.hasVariant = Boolean(transformData.child_products?.length);



  return transformData;
};

export const normalizeProductCombo = (values: TProductCombo): CreateComboForm => {
  let data: Partial<CreateComboForm> = { ...transformDraftToStr(values) } as any;

  data.groups = values.groups
    .filter((g) => g.combination_mode === CombinationModeEnum.ChoiceCombo)
    .map((g) => ({
      ...g
    }));

  data.fixedProducts = values.groups
    .filter((g) => g.combination_mode === CombinationModeEnum.ChoiceCombo)
    .reduce((current, g) => [...current, ...g.products], [] as ComboProductType[]);

  // console.log(`data`, data);

  return data as CreateComboForm;
};

// export const transformComboForm = (
//   formData: CreateComboForm,
//   mode: CombinationModeEnum = CombinationModeEnum.ChoiceCombo
// ): CreateComboRequest => {
//   let data: Partial<CreateComboRequest> = { ...transformDraftToStr(formData) } as any;
//   data.groups = [];
//   formData.groups.forEach((g) => {
//     data.groups?.push({
//       collection_id: g.collection_id,
//       combination_mode: g.combination_mode,
//       default_min_max: `${g.default ?? 0}-${g.min ?? 0}-${g.max ?? 0}`,
//       position: g.position,
//       base_product_id: g.base_product_id,
//       id: g.id
//     });
//     data.groups?.push(
//       ...g.products.map((p) => ({
//         ...p,
//         collection_id: g.collection_id,
//         default_min_max: `${p.default ?? 0}-${p.min ?? 0}-${p.max ?? 0}`,
//         product_id: p.product_id,
//         base_product_id: p.base_product_id
//       }))
//     );
//   });
//   formData.fixedProducts?.forEach((g) => {
//     data.groups?.push({
//       ...g,
//       product_id: g.product_id,
//       combination_mode: CombinationModeEnum.FixedCombo,
//       default_min_max: `${g.default ?? 0}-${g.min ?? 0}-${g.max ?? 1}`,
//       base_product_id: g.base_product_id
//     });
//   });
//   // data.product_type = ProductTypeEnum.Combo;
//   return data as CreateComboRequest;
// };

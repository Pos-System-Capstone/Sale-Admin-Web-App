export enum ModifierSelectType {
  SINGLE = 1,
  MULTIPLE = 2,
  SWATCH = 3
}

export const modifierSelectTypeOptions = [
  {
    label: 'Một giá trị',
    value: ModifierSelectType.SINGLE
  },
  {
    label: 'Nhiều giá trị',
    value: ModifierSelectType.MULTIPLE
  },
  {
    label: 'Màu sắc',
    value: ModifierSelectType.SWATCH
  }
];

export type TModifier = {
  id: number;
  title: string;
  select_type: ModifierSelectType;
  json_value: string;
  display_index: number;
  cate_id: number;
  is_required: boolean;
  options?: ModifierValue[];
};

export type ModifierValue = {
  label: string;
  value: string | number;
};

export type ModifierForm = Omit<TModifier, 'id'> & {
  modifiers: ModifierValue[];
};

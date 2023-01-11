import { TCategoryExtra } from 'types/category';
import { ModifierForm, TModifier } from 'types/Modifier';

export const transformModifier = (values: ModifierForm) => {
  const data = { ...values };
  if (values.modifiers && values.modifiers.length) {
    data.json_value = JSON.stringify(values.modifiers);
  }
  return data;
};

export const normalizeModifier = (values: TModifier) => {
  const data: Partial<ModifierForm> = { ...values };
  let modifiers = [];

  try {
    const parseModifiers = JSON.parse(values.json_value);
    if (Array.isArray(parseModifiers)) {
      modifiers = parseModifiers;
    }
  } catch (error) {}

  data.modifiers = modifiers;

  return data;
};

export const normalizeExtra = (values: TCategoryExtra) => {
  const data: any = { ...values };
  let minMaxArr = data.min_max?.split('-') ?? [];
  data.min = minMaxArr[0] ?? 0;
  data.max = minMaxArr[1] ?? 1;
  return data;
};

export const transformExtra = (values: TCategoryExtra & { min?: number; max?: number }) => {
  const data: any = { ...values };
  data.min_max = `${values.min ?? 0}-${values.max ?? 1}`;

  return data;
};

import { Grid } from '@mui/material';
import {
  CheckBoxField,
  DatePickerField,
  InputField,
  RadioGroupField,
  SelectField,
  SwitchField,
  TimePickerField
} from 'components/form';
import DateRangePickerField from 'components/form/DateRangePickerField';
import React from 'react';
import { TTableColumn } from 'types/table';

type TableType = TTableColumn<any>;

interface Props {
  controls: TableType[];
}

const buildFormItem = (tableConfig: TableType) => {
  const { valueType, dataIndex, title, valueEnum = [], formProps = {} } = tableConfig;
  let C: any = InputField;
  const props: any = {
    label: title,
    name: dataIndex,
    size: 'small',
    fullWidth: true,
    ...formProps
  };
  if (tableConfig.renderFormItem) {
    return tableConfig.renderFormItem(tableConfig, props);
  }
  switch (valueType) {
    case 'text':
      C = InputField;
      break;
    case 'radio':
      props.options = valueEnum;
      C = RadioGroupField;
      break;
    case 'select':
      props.options = valueEnum;
      C = SelectField;
      break;
    case 'checkbox':
      C = CheckBoxField;
      break;
    case 'time':
      C = TimePickerField;
      break;
    case 'date':
      C = DatePickerField;
      break;
    case 'dateRange':
      C = DateRangePickerField;
      break;
    case 'datetime':
      C = DatePickerField;
      break;
    case 'switch':
      C = SwitchField;
      break;
    default:
      break;
  }
  return <C {...props} />;
};

const TableFilterForm = ({ controls }: Props) => {
  const buildFormList = () => {
    const gridItem: JSX.Element[] = controls
      .filter(({ hideInSearch, valueType }) => !hideInSearch && valueType !== 'option')
      .map((control) => {
        const controlComponent = buildFormItem(control);
        return (
          <Grid key={`${control.title}`} item xs={12} sm={12} md={3}>
            {controlComponent}
          </Grid>
        );
      });
    return gridItem;
  };

  return (
    <Grid container spacing={2}>
      {buildFormList()}
    </Grid>
  );
};

export default TableFilterForm;

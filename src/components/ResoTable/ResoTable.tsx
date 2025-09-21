import editIcon from '@iconify/icons-eva/edit-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import trashIcon from '@iconify/icons-eva/trash-outline';
import { Icon } from '@iconify/react';
import { Replay, SettingsOutlined } from '@mui/icons-material';
import {
  Box,
  Checkbox,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Popover,
  Radio,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography,
  useMediaQuery
} from '@mui/material';
import { makeStyles, withStyles } from '@mui/styles';
import { useAntdTable } from 'ahooks';
import EmptyContent from 'components/EmptyContent';
import Label from 'components/Label';
import TableFilterForm from 'components/ResoTable/TableFilterForm';
import useLocales from 'hooks/useLocales';
import get from 'lodash/get';
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { getCellValue, renderText, transformParamToHyphen } from './utils';
import { Theme } from '@mui/material/styles';
import { TTableColumn } from 'types/table';

interface TableProps {
  columns?: TTableColumn<any>[];
  dataSource?: any;
  pagination?: boolean;
  filters?: any;
  onEdit?: (data: any) => void;
  onDelete?: (data: any) => void;
  rowKey?: string;
  checkboxSelection?: boolean | { selection?: any[]; type?: 'checkbox' | 'radio' };
  onChangeSelection?: (selectedIds: any[], selectedData: any[]) => void;
  scroll?: any;
  showAction?: boolean;
  disabledSelections?: any[];
  showFilter?: boolean;
  showSettings?: boolean;
  toolBarRender?: () => React.ReactNode[];
  getData?: (params: any) => Promise<any>;
  defaultFilters?: Record<string, any>;
  renderEdit?: (dom: React.ReactNode) => React.ReactNode;
  renderDelete?: (dom: React.ReactNode) => React.ReactNode;
  ref?: React.Ref<any>;
}

interface StyleProps {
  left?: string | number;
  right?: string | number;
}

const StickyLeftTableCell = withStyles((theme) => ({
  head: {
    left: 0,
    position: 'sticky',
    zIndex: theme.zIndex.appBar + 2
  },
  body: {
    minWidth: '50px',
    left: '0',
    position: 'sticky',
    zIndex: theme.zIndex.modal,
    backgroundColor: theme.palette.primary.main
  }
}))(TableCell);

const StickyRightTableCell = withStyles((theme) => ({
  head: {
    // color: theme.palette.common.white,
    right: 0,
    position: 'sticky',
    zIndex: theme.zIndex.modal
  },
  body: {
    minWidth: '50px',
    right: '0',
    position: 'sticky',
    zIndex: theme.zIndex.modal,
    backgroundColor: 'white'
    // borderLeft: `1px solid ${theme.palette.grey[400]}`
  }
}))(TableCell);

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  root: {
    textAlign: 'left'
  },
  actionColumn: {
    minWidth: '70px',
    width: '70px',
    justifyContent: 'flex-end'
  },
  stickyLeft: {
    width: '60px',
    position: 'sticky',
    left: (props: StyleProps) => props.left ?? '0',
    backgroundColor: 'white'
    // borderRight: `1px solid ${theme.palette.grey[400]}`
  },
  stickyRight: {
    textAlign: 'right',
    width: '60px',
    position: 'sticky',
    right: (props: StyleProps) => props.right ?? '0',
    backgroundColor: '#fff'
    // borderLeft: `1px solid ${theme.palette.grey[400]}`
  },
  body: {}
}));

const ResoTable: React.FC<TableProps> = ({
  ref,
  columns = [],
  dataSource = null,
  pagination = true,
  filters = null,
  onEdit,
  onDelete,
  rowKey = 'id',
  checkboxSelection = false,
  onChangeSelection,
  scroll = null,
  showAction = true,
  disabledSelections = [],
  showFilter = true,
  showSettings = true,
  toolBarRender = () => [],
  getData,
  defaultFilters = {},
  renderEdit = (dom: React.ReactNode) => dom,
  renderDelete = (dom: React.ReactNode) => dom,
  ...props
}) => {
  const classes = useStyles({});
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useLocales();

  const form = useForm({
    defaultValues: defaultFilters
  });
  const { control } = form;

  const _filters = useWatch({
    control
  });

  const { sortDirection, sortProperty } = _filters;

  const {
    tableProps,
    search,
    loading,
    data,
    pagination: { changeCurrent, changePageSize }
  } = useAntdTable(
    (params) => {
      if (dataSource) return Promise.resolve(dataSource);
      if (!getData) return [];
      return getData({
        ...transformParamToHyphen({ ...params.filters, ..._filters }),
        page: params.current,
        size: params.pageSize
      });
    },
    {
      defaultPageSize: 10,
      defaultParams: [{ current: 1, pageSize: 10 }],
      formatResult: (res) => ({
        total: dataSource ? dataSource.length : res.data.total,
        list: dataSource ?? res.data?.items ?? [],
        success: true
      }),
      onError: (error) =>
        enqueueSnackbar(get(error, 'message', 'Some thing wrong'), {
          variant: 'error'
        }),
      refreshDeps: [dataSource, _filters],
      debounceInterval: 300,
      defaultLoading: true
    }
  );
  const { current, pageSize, total } = tableProps?.pagination ?? {};

  const [_columns, setColumns] = useState(columns ?? []);
  const [_selectedIds, setSelectedIds] = useState<any[]>(
    (checkboxSelection && typeof checkboxSelection === 'object'
      ? checkboxSelection.selection
      : null) ?? []
  );
  const [_anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [_settingColEl, setSettingColEl] = useState<HTMLElement | null>(null);
  const [_openMenu, setOpenMenu] = useState<string | null>(null);
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  const openEditMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeEditMenu = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setColumns(columns);
  }, [columns]);

  React.useEffect(() => {
    if (typeof onChangeSelection === 'function') {
      // TH default selection chua co trong list data
      const selectionData = data?.list?.filter((d: any) => _selectedIds.includes(d[rowKey])) ?? [];
      // data
      onChangeSelection(_selectedIds, selectionData);
    }
  }, [_selectedIds, onChangeSelection, data?.list, rowKey]);

  const handleEdit = useCallback(
    (data) => {
      if (typeof onEdit === 'function') {
        onEdit(data);
      }
      closeEditMenu();
    },
    [onEdit]
  );

  const handleDelete = useCallback(
    (data) => {
      if (typeof onDelete === 'function') {
        onDelete(data);
      }
      closeEditMenu();
    },
    [onDelete]
  );

  const onSelectAllClick = React.useCallback(
    (e) => {
      if (e.target.checked) {
        const updatedIds = [..._selectedIds];
        data?.list?.forEach((d) => {
          if (!_selectedIds.includes(d[rowKey])) {
            updatedIds.push(d[rowKey]);
          }
        });
        setSelectedIds(updatedIds);
      } else {
        setSelectedIds([]);
      }
    },
    [_selectedIds, data?.list, rowKey]
  );

  const handleClick = React.useCallback(
    (event, name) => {
      const selectedIndex = _selectedIds.indexOf(name);
      let newSelected: any[] = [];

      if (
        checkboxSelection &&
        typeof checkboxSelection === 'object' &&
        checkboxSelection.type === 'radio'
      ) {
        if (selectedIndex === -1) {
          newSelected = [name];
        } else {
          newSelected = [];
        }
      } else if (selectedIndex === -1) {
        newSelected = newSelected.concat(_selectedIds, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(_selectedIds.slice(1));
      } else if (selectedIndex === _selectedIds.length - 1) {
        newSelected = newSelected.concat(_selectedIds.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          _selectedIds.slice(0, selectedIndex),
          _selectedIds.slice(selectedIndex + 1)
        );
      }

      setSelectedIds(newSelected);
    },
    [_selectedIds, checkboxSelection]
  );

  const handleSort = React.useCallback(
    (columnConfig) => {
      let direction = sortDirection;

      switch (sortDirection) {
        case 'asc':
          direction = 'desc';
          break;
        case 'desc':
          direction = null;
          break;
        default:
          direction = 'asc';
      }

      form.setValue('sortDirection', direction);
      form.setValue('sortProperty', direction ? columnConfig.dataIndex : null);
    },
    [sortDirection, form]
  );

  const tableHeader = React.useMemo(() => {
    const headers = [..._columns].filter(({ hideInTable }) => !hideInTable);

    const tableHeaders = [];

    if (checkboxSelection) {
      const checkAllCurrentData = data?.list?.every((item) => _selectedIds.includes(item[rowKey]));
      const checkIndeterminateCurrentData =
        _selectedIds.filter((id) => data?.list.some((d) => d[rowKey] === id)).length > 0 &&
        !checkAllCurrentData;
      tableHeaders.push(
        <StickyLeftTableCell className={classes.stickyLeft} padding="checkbox">
          {checkboxSelection &&
            typeof checkboxSelection === 'object' &&
            checkboxSelection.type === 'checkbox' && (
              <Checkbox
                indeterminate={checkIndeterminateCurrentData}
                checked={(data?.list?.length ?? 0) > 0 && checkAllCurrentData}
                onChange={onSelectAllClick}
                inputProps={{ 'aria-label': 'select all desserts' }}
              />
            )}
        </StickyLeftTableCell>
      );
    }

    headers.forEach((header, index) => {
      const CellComp = TableCell;
      const { sortable = true } = header;
      tableHeaders.push(
        <CellComp
          className={[classes.root, header.fixed === 'right' ? classes.stickyRight : ''].join(' ')}
          key={`header_${index}`}
          align={(header as any).alignRight ? 'right' : 'left'}
          sx={{ left: checkboxSelection ? '64px' : 0 }}
        >
          <TableSortLabel
            active={sortProperty === header.dataIndex}
            direction={sortDirection ? sortDirection : undefined}
            hideSortIcon={!sortable}
            onClick={header.sortable ? () => handleSort(header) : undefined}
          >
            <Typography variant="body1" noWrap>
              {getCellValue(header.title, null, header)}
            </Typography>
          </TableSortLabel>
        </CellComp>
      );
    });

    if (showAction) {
      tableHeaders.push(
        <StickyRightTableCell className={[classes.root, classes.actionColumn].join(' ')}>
          <TableSortLabel hideSortIcon>
            <span />
          </TableSortLabel>
        </StickyRightTableCell>
      );
    }

    return <TableRow>{tableHeaders}</TableRow>;
  }, [
    _columns,
    checkboxSelection,
    showAction,
    data?.list,
    _selectedIds,
    classes.stickyLeft,
    classes.root,
    classes.stickyRight,
    classes.actionColumn,
    onSelectAllClick,
    rowKey,
    handleSort,
    sortProperty,
    sortDirection
  ]);

  const tableBodyContent = React.useMemo(() => {
    if (!data) return;
    const isSelected = (key: any) => _selectedIds.indexOf(key) !== -1;
    const isDisabled = (key: any) =>
      disabledSelections.findIndex((value: any) => value === key) !== -1;

    const body = [..._columns].filter(({ hideInTable }) => !hideInTable);
    const tableBodys: React.ReactElement[] = [];
    data?.list.forEach((data, idx) => {
      const bodyRow = body.map((column, index) => {
        const CellComp = TableCell;

        let cell;

        if (typeof column.render === 'function') {
          cell = column.render(get(data, column.dataIndex ?? '', '-'), data, idx) ?? '-';
        } else {
          if (column.valueEnum) {
            const opt =
              column.valueEnum?.find(
                (opt: any) => `${opt.value}` === `${get(data, column.dataIndex ?? '')}`
              ) ?? get(data, column.dataIndex ?? '', '-');
            cell = (
              <Label {...opt}>
                <Typography variant="subtitle2" noWrap>
                  {opt.label}
                </Typography>
              </Label>
            );
          } else {
            cell = (
              <Typography variant="subtitle2" noWrap>
                {column.dataIndex === 'index'
                  ? idx + 1
                  : renderText(
                      column.valueType,
                      get(data, column.dataIndex ?? '') ?? '-',
                      column.formatProps
                    )}
              </Typography>
            );
          }
        }

        return (
          <CellComp
            className={[
              index === 0 ? classes.stickyLeft : classes.body,
              column.fixed === 'right' && classes.stickyRight
            ].join(' ')}
            key={`${column.title}-${data[rowKey]}`}
            sx={{ left: checkboxSelection ? '64px' : 0 }}
          >
            {cell}
          </CellComp>
        );
      });

      if (checkboxSelection) {
        const isItemSelected = isSelected(data[rowKey]);
        const disabled = isDisabled(data[rowKey]);
        bodyRow.unshift(
          <TableCell className={classes.stickyLeft} padding="checkbox">
            {checkboxSelection &&
            typeof checkboxSelection === 'object' &&
            checkboxSelection.type === 'checkbox' ? (
              <Checkbox
                disabled={disabled}
                checked={isItemSelected}
                inputProps={{ 'aria-labelledby': data[rowKey] }}
              />
            ) : (
              <Radio
                disabled={disabled}
                checked={isItemSelected}
                inputProps={{ 'aria-labelledby': data[rowKey] }}
              />
            )}
          </TableCell>
        );
      }

      if (showAction) {
        const editComp = renderEdit(
          <Tooltip title="Điều chỉnh">
            <IconButton onClick={() => handleEdit(data)} size="large">
              <Icon icon={editIcon} />
            </IconButton>
          </Tooltip>
        );
        const deleteComp = renderDelete(
          <Tooltip title="Xóa">
            <IconButton onClick={() => handleDelete(data)} sx={{ color: 'red' }} size="large">
              <Icon icon={trashIcon} />
            </IconButton>
          </Tooltip>
        );
        const ActionCell = mdUp ? (
          <StickyRightTableCell>
            <Stack direction="row" justifyContent="flex-end">
              {/* prettier-ignore */}
              {typeof onDelete === 'function' && deleteComp}
              <Divider orientation="vertical" flexItem />
              {editComp}
            </Stack>
          </StickyRightTableCell>
        ) : (
          <StickyRightTableCell key={`edit-cell-${data[rowKey]}`}>
            <IconButton
              onClick={(e) => {
                openEditMenu(e);
                setOpenMenu(data[rowKey]);
              }}
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              size="large"
            >
              <Icon icon={moreVerticalFill} />
            </IconButton>
            <Menu
              anchorEl={_anchorEl}
              MenuListProps={{
                'aria-labelledby': 'edit-menu'
              }}
              onClose={(e) => {
                closeEditMenu();
                setOpenMenu(null);
              }}
              open={data[rowKey] === _openMenu}
              key={`menu-edit-${data[rowKey]}`}
              id={`menu-edit-${data[rowKey]}`}
            >
              {renderDelete(
                <MenuItem onClick={() => handleDelete(data)} sx={{ color: 'red' }}>
                  <ListItemIcon>
                    <Icon icon={trashIcon} />
                  </ListItemIcon>
                  <ListItemText>Xóa</ListItemText>
                </MenuItem>
              )}

              {renderEdit(
                <MenuItem
                  onClick={() => {
                    handleEdit(data);
                  }}
                >
                  <ListItemIcon>
                    <Icon icon={editIcon} />
                  </ListItemIcon>
                  <ListItemText>Điều chỉnh</ListItemText>
                </MenuItem>
              )}
            </Menu>
          </StickyRightTableCell>
        );

        bodyRow.push(ActionCell);
      }

      tableBodys.push(
        <TableRow
          hover
          onClick={(event) => checkboxSelection && handleClick(event, data[rowKey])}
          role="checkbox"
          key={`rows-${data[rowKey]}`}
        >
          {bodyRow}
        </TableRow>
      );
    });
    return tableBodys;
  }, [
    data,
    _columns,
    _selectedIds,
    disabledSelections,
    checkboxSelection,
    showAction,
    rowKey,
    classes.stickyLeft,
    classes.body,
    classes.stickyRight,
    renderEdit,
    renderDelete,
    mdUp,
    _anchorEl,
    _openMenu,
    handleEdit,
    handleDelete,
    handleClick,
    onDelete
  ]);

  const settingColumns = () => {
    const handleToggle = (col: any, idx: number) => {
      const updateColumns = [..._columns];
      updateColumns[idx].hideInTable = !updateColumns[idx].hideInTable;
      setColumns(updateColumns);
    };

    const showQuantity = _columns.reduce(
      (acc, { hideInTable }) => (!hideInTable ? acc + 1 : acc),
      0
    );

    const intermediate = showQuantity > 0 && showQuantity < _columns.length;

    const onToggleAll = () => {
      setColumns(
        _columns.map((col) => ({ ...col, hideInTable: !(showQuantity < _columns.length) }))
      );
    };

    return (
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <ListItem disablePadding>
          <ListItemButton role={undefined} onClick={onToggleAll} dense>
            <ListItemIcon>
              <Checkbox
                edge="start"
                indeterminate={intermediate}
                checked={showQuantity === _columns.length}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{
                noWrap: true
              }}
              primary={t('resoTable.settingColumn')}
            />
          </ListItemButton>
        </ListItem>
        <Divider />
        {_columns.map((col, idx) => {
          const labelId = `checkbox-list-label-${String(col.dataIndex)}`;

          return (
            <ListItem key={String(col.dataIndex)} disablePadding sx={{ paddingLeft: 1 }}>
              <ListItemButton role={undefined} onClick={() => handleToggle(col, idx)} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={!col.hideInTable}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    noWrap: true
                  }}
                  id={labelId}
                  primary={col.title}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    );
  };

  return (
    <FormProvider {...form}>
      <Container style={{ padding: 0 }}>
        {showFilter && (
          <Box py={0}>
            <TableFilterForm controls={columns} />
          </Box>
        )}
        {showSettings && (
          <Box py={1}>
            <Stack direction="row">
              <Box ml="auto">
                <Stack spacing={1} direction="row">
                  {toolBarRender()}
                  {/* {form.formState.isDirty && (
                    <Button
                      startIcon={<ClearAllOutlined />}
                      onClick={() => form.reset({})}
                      disableRipple
                    >
                      {t('resoTable.clearFilters')}
                    </Button>
                  )} */}
                  <IconButton size="small" onClick={search?.submit}>
                    {loading ? <CircularProgress style={{ width: 24, height: 24 }} /> : <Replay />}
                  </IconButton>
                  <IconButton size="small" onClick={(e) => setSettingColEl(e.currentTarget)}>
                    <SettingsOutlined />
                  </IconButton>
                  <Popover
                    open={Boolean(_settingColEl)}
                    anchorEl={_settingColEl}
                    onClose={() => setSettingColEl(null)}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left'
                    }}
                  >
                    {settingColumns()}
                  </Popover>
                </Stack>
              </Box>
            </Stack>
          </Box>
        )}
        <TableContainer sx={{ maxHeight: scroll?.y, maxWidth: scroll?.x }}>
          <Table stickyHeader>
            <TableHead>{tableHeader}</TableHead>

            <TableBody>
              {loading && (
                <TableRow style={{ height: 1 }}>
                  <TableCell colSpan={20} style={{ paddingBottom: '0px', paddingTop: '0px' }}>
                    <LinearProgress color="primary" />
                  </TableCell>
                </TableRow>
              )}
              {tableBodyContent}
            </TableBody>
          </Table>
        </TableContainer>
        {!loading && !data?.list?.length && (
          <Box width="100%">
            <EmptyContent
              title="Trống"
              sx={{
                width: '100%'
              }}
            />
          </Box>
        )}
        {pagination && (
          <TablePagination
            rowsPerPageOptions={[10, 50, 100]}
            component="div"
            rowsPerPage={pageSize ?? 10}
            count={total ?? 0}
            page={(current ?? 1) - 1}
            onPageChange={(_, page) => changeCurrent(page + 1)}
            onRowsPerPageChange={(e) => changePageSize(Number(e.target.value))}
          />
        )}
      </Container>
    </FormProvider>
  );
};

export default ResoTable;

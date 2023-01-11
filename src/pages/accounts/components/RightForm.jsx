/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React from 'react';
import {
  Box,
  Divider,
  Checkbox,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  ListItemText
} from '@mui/material';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { useFormContext, useWatch } from 'react-hook-form';

import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import { CardTitle, StickyCard, Card } from './Card';
import { SelectField, SwitchField } from '../../../components/form';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginY: theme.spacing(1),
    minWidth: 120,
    width: '100%'
  }
}));

const tagsData = ['Pizza', 'Trò chơi', 'Mát mẻ', 'Mùa hè'];

const RightForm = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const open = Boolean(anchorEl);

  const { control, setValue } = useFormContext();

  const [tags = [], colletions = []] = useWatch({
    control,
    name: ['tags', 'collection_id']
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { categories = [], collections: collectionsData = [] } = useSelector(
    (state) => state.admin
  );

  return (
    <Box p={1} width="250px">
      <StickyCard>
        <CardTitle>Trạng thái</CardTitle>
        <Box display="flex" justifyContent="space-between">
          <SwitchField
            name="is_available"
            label={<Typography variant="caption">Kích hoạt</Typography>}
          />
          <Box>
            <IconButton
              id="delete-menu"
              onClick={handleClick}
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              size="large"
            >
              <Icon icon={moreVerticalFill} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              MenuListProps={{
                'aria-labelledby': 'delete-menu'
              }}
              onClose={handleClose}
              open={open}
              id="long-menu"
              keepMounted
            >
              <MenuItem sx={{ color: 'red' }}>Xóa</MenuItem>
            </Menu>
          </Box>
        </Box>
      </StickyCard>
      <Card sx={{ textAlign: 'left', paddingX: 0 }}>
        <Box textAlign="left">
          <CardTitle>Danh mục sản phẩm</CardTitle>
          <SelectField
            name="cat_id"
            label="Chọn loại sản phẩm"
            defaultValue=""
            size="small"
            className={classes.formControl}
          >
            {categories?.map(({ cate_id, cate_name }) => (
              <MenuItem value={cate_id} key={`cate_select_${cate_id}`}>
                {cate_name}
              </MenuItem>
            ))}
          </SelectField>
        </Box>
        <Box my={2}>
          <Divider />
        </Box>

        <Box my={2}>
          <Divider />
        </Box>
        <Box textAlign="left">
          <CardTitle>Thẻ </CardTitle>
          <SelectField
            name="tags"
            labelId="tags-select"
            label="Tag"
            multiple
            size="small"
            className={classes.formControl}
            variant="outlined"
            renderValue={(selected) => selected.join(',')}
          >
            {tagsData?.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={tags?.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </SelectField>
          <Box pt={2}>
            {tags?.map((value) => (
              <Chip
                size="small"
                key={value}
                label={value}
                onDelete={() =>
                  setValue(
                    'tags',
                    tags.filter((t) => t !== value)
                  )
                }
              />
            ))}
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default RightForm;

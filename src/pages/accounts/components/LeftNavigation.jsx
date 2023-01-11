import { Box, Divider, ListItem, ListItemText } from '@mui/material';
import React from 'react';
import { StickyCard } from './Card';

const LeftNavigation = () => (
  <Box position="relative" p={1} minWidth="160px" minHeight="250px">
    <StickyCard>
      <ListItem component="a" button href="#product-detail">
        <ListItemText primary="Chi tiết" />
      </ListItem>
      <Divider />
      <ListItem component="a" button href="#price">
        <ListItemText primary="Giá" />
      </ListItem>
      <Divider />
      <ListItem component="a" button href="#variants">
        <ListItemText primary="Mẫu mã" />
      </ListItem>
      <Divider />
      <ListItem component="a" button href="#seo">
        <ListItemText primary="SEO" />
      </ListItem>
    </StickyCard>
  </Box>
);

export default LeftNavigation;

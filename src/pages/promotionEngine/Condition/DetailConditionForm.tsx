import { Box, Grid, Paper } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { ConditionGroup } from 'types/promotion/condition';
import UpdateConditionForm from './updateConditionForm/updateConditionForm';
interface Props {
  conditionAppend: (condition: Partial<ConditionGroup>) => void;
  conditionRemove?: any;
  conditionFields?: any;
}

export const ConditionContext = React.createContext({
  conditionRemove: (index: number) => {}
});

interface ConditionGroupsContextProps {
  conditionGroupIndex: number;
  productIndex?: number;
  orderIndex?: number;
}

export const ConditionGroupsContext = React.createContext<ConditionGroupsContextProps>({
  conditionGroupIndex: 0
});

const DetailConditionForm = ({ conditionFields, conditionAppend, conditionRemove }: Props) => {
  const [currentContent, setCurrentContent] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('1');
  const [flashing, setFlashing] = useState(false);
  const handleTreeItemClick = (nodeId: string, content: string) => {
    setSelectedNodeId(nodeId);
    setCurrentContent(content);
    setFlashing(!flashing);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={3}>
          <Paper variant="outlined" sx={{ width: '100%' }}>
            <TreeView
              aria-label="file system navigator"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              sx={{ height: 190, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
            >
              <TreeItem
                nodeId="1"
                label="Sản Phẩm"
                icon=" "
                onClick={() => handleTreeItemClick('1', 'Cart item content')}
              >
                <TreeItem
                  nodeId="2"
                  label="Số lượng"
                  icon=" "
                  onClick={() => handleTreeItemClick('2', 'Cart item content')}
                  sx={{
                    border: '1px solid #57d8a1',
                    m: '10px 0',
                    width: '160px',
                    p: '1.1px',
                    height: '25px',
                    borderRadius: '4px'
                  }}
                />

                <TreeItem
                  nodeId="3"
                  label="Mã sản phẩm"
                  icon=" "
                  onClick={() => handleTreeItemClick('3', 'Cart item content')}
                  sx={{
                    border: '1px solid #57d8a1',
                    m: '10px 0',
                    width: '160px',
                    p: '1.1px',
                    height: '25px',
                    borderRadius: '4px'
                  }}
                />
              </TreeItem>
              <TreeItem
                nodeId="4"
                label="Đơn Hàng"
                icon=" "
                onClick={() => handleTreeItemClick('4', 'Cart item content')}
                sx={{
                  mb: '0.5rem',
                  mt: '1rem'
                }}
              >
                <TreeItem
                  nodeId="5"
                  label="Số lượng"
                  icon=" "
                  onClick={() => handleTreeItemClick('5', 'Cart item content')}
                  sx={{
                    border: '1px solid #57d8a1',
                    m: '10px 0',
                    width: '160px',
                    p: '1.1px',
                    height: '25px',
                    borderRadius: '4px'
                  }}
                />
                <TreeItem
                  nodeId="6"
                  label="Tổng số"
                  icon=" "
                  onClick={() => handleTreeItemClick('6', 'Cart item content')}
                  sx={{
                    border: '1px solid #57d8a1',
                    m: '10px 0',
                    width: '160px',
                    p: '1.1px',
                    height: '25px',
                    borderRadius: '4px'
                  }}
                />
              </TreeItem>
            </TreeView>
            <h3>Nhóm điều kiện</h3>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={9}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              height: 250,
              flexGrow: 1,
              overflowY: 'auto',
              overflowX: 'hidden'
            }}
          >
            <Paper variant="outlined" sx={{ width: '100%' }}>
              {selectedNodeId !== null && (
                <ConditionContext.Provider value={{ conditionRemove }}>
                  <UpdateConditionForm
                    nodeId={selectedNodeId}
                    content={currentContent}
                    conditionFields={conditionFields}
                    flashing={flashing}
                  />
                </ConditionContext.Provider>
              )}
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default DetailConditionForm;

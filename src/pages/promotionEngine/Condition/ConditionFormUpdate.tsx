import { Box, Grid, Paper } from '@mui/material';
import { InputField } from 'components/form';
// import TreeViewField, { RenderTree } from 'components/form/TreeViewField/TreeViewField';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import CreateConditionFormUpdate from './createConditionForm.tsx/createConditionFormUpdate';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
interface Props {
  updateMode?: boolean;
}

const ConditionForm = ({ updateMode }: Props) => {
  const { watch } = useFormContext();
  const [currentContent, setCurrentContent] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const handleTreeItemClick = (nodeId: string, content: string) => {
    setSelectedNodeId(nodeId);
    setCurrentContent(content);
  };

  // const getChilds = async (cateId?: number) => {
  //   let results = await getCategoryChilds(Number(cateId));
  //   const updateCategories = cloneDeep([...categories]);
  //   let foundedParent = null;
  //   for (const childCate of updateCategories) {
  //     foundedParent = findParentCateFromCate(childCate, cateId!);
  //     if (foundedParent) break;
  //   }
  //   if (foundedParent) {
  //     foundedParent.childs = results;
  //   }
  //   setCategories(updateCategories);
  // };

  // const findParentCateFromCate = (cate: TCategory, parentCateId: number): TCategory | null => {
  //   if (cate.cate_id === parentCateId) {
  //     return cate;
  //   }
  //   if (!cate.childs) return null;
  //   for (const childCate of cate.childs) {
  //     const foundedParent = findParentCateFromCate(childCate, parentCateId!);
  //     if (foundedParent) return foundedParent;
  //   }
  //   return null;
  // };

  // const checkIsRootCategory = (id: string, cates: TCategory[]): boolean => {
  //   return cates?.some((c) => {
  //     if (c.cate_id === Number(id)) {
  //       return c.is_container;
  //     }
  //     if (c.childs) {
  //       return checkIsRootCategory(id, c.childs);
  //     }
  //     return false;
  //   });
  // };

  // const [isExtra, isRoot, is_container] = watch(['is_extra', 'is_root', 'is_container']);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={6} style={{ height: '100px' }}>
          <InputField fullWidth name="ruleName" label="Tên " maxlength="200px" />
          {/* <FormHelperText error>Please input name</FormHelperText> */}
        </Grid>

        <Grid item xs={6} sm={6}>
          <InputField name="description" label="Mô tả" fullWidth multiline></InputField>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={4}>
          <Paper variant="outlined" sx={{ width: '100%' }}>
            <h3>ĐIỀU KIỆN</h3>

            <TreeView
              aria-label="file system navigator"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto', m: '20px 0' }}
            >
              <TreeItem
                nodeId="1"
                label="Sản Phẩm"
                icon=" "
                onClick={() => handleTreeItemClick('1', 'productCondition')}
              >
                <TreeItem
                  nodeId="2"
                  label="Số lượng"
                  icon=" "
                  onClick={() => handleTreeItemClick('2', 'quantity')}
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
                onClick={() => handleTreeItemClick('4', 'orderCondition')}
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

              {/* <TreeItem
                nodeId="7"
                label="Group"
                icon=" "
                sx={{
                  mb: '0.5rem',
                  mt: '1rem'
                }}
              >
                <TreeItem
                  nodeId="8"
                  label="Group"
                  icon=" "
                  sx={{
                    border: '1px solid #57d8a1',
                    m: '10px 0',
                    width: '160px',
                    p: '1.1px',
                    height: '25px',
                    borderRadius: '4px'
                  }}
                ></TreeItem>
              </TreeItem> */}
            </TreeView>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={8}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              '& > :not(style)': {
                height: 300
              }
            }}
          >
            <Paper variant="outlined" sx={{ width: '100%' }}>
              {selectedNodeId !== null && (
                <CreateConditionFormUpdate nodeId={selectedNodeId} content={currentContent} />
              )}
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ConditionForm;

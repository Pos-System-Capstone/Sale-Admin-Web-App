import { Box, Grid } from '@mui/material';
import { DraftEditorField, InputField, SelectField, UploadImageField } from 'components/form';
import useLocales from 'hooks/useLocales';
import { Controller, useFormContext } from 'react-hook-form';
import { CREATE_CATEGORY_TYPE_OPTIONS } from 'types/category';

interface Props {
  updateMode?: boolean;
}

const CategoryForm = ({ updateMode }: Props) => {
  const { translate } = useLocales();
  const { watch } = useFormContext();

  // const categoryTreeData = useMemo<RenderTree[]>(() => {
  //   const generateTree: any = (category: TCategory) => {
  //     if (!category.is_container) {
  //       return {
  //         id: category.cate_id,
  //         name: category.cate_name,
  //         children: [],
  //         isContainer: category.is_container
  //       };
  //     }
  //     return {
  //       id: category.id,
  //       name: category.name
  //       // isContainer: category.is_container,
  //       // children: category.childs?.length ? category.childs.map(generateTree) : [<div key="stub" />]
  //     };
  //   };

  //   return (
  //     categories?.map((c) => ({
  //       id: `${c.id}`,
  //       name: c.name
  //       // isContainer: c.is_container,
  //       // children: c?.childs.map(generateTree)
  //     })) ?? []
  //   );
  // }, [categories]);

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
  //     if (c.id === Number(id)) {
  //       return c.is_container;
  //     }
  //     if (c.childs) {
  //       return checkIsRootCategory(id, c.childs);
  //     }
  //     return false;
  //   });
  // };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} sx={{ textAlign: 'center' }}>
        <Box>
          <UploadImageField name="picUrl" label={translate('categories.table.thumbnail')} />
        </Box>
      </Grid>
      <Grid item xs={12} sm={8}>
        <InputField fullWidth name="name" label="Tên danh mục" />
      </Grid>
      <Grid item xs={12} sm={4}>
        <InputField disable={updateMode} fullWidth name="code" label="Mã danh mục" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputField type="number" fullWidth name="displayOrder" label="Thứ tự hiển thị" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <SelectField
          fullWidth
          options={CREATE_CATEGORY_TYPE_OPTIONS}
          name="categoryType"
          label="Loại danh mục"
        ></SelectField>
      </Grid>
      <Grid item xs={12}>
        <Controller
          name="description"
          render={({ field }) => {
            return (
              <DraftEditorField
                ariaLabel="Mô tả chi tiếtÏ"
                value={field.value}
                onChange={field.onChange}
              />
            );
          }}
        />
      </Grid>
      {/* {!isExtra && (
        <Grid item xs={12}>
          <CheckBoxField name="is_root" label="Đây là Danh mục gốc" />
        </Grid>
      )}
      {!isRoot && !isExtra && (
        <Grid item xs={12}>
          <Typography mb={2}>Danh mục cha</Typography>
          <Controller
            name="parent_cate_id"
            render={({ field }) => (
              <TreeViewField
                onDisabled={(id) => !checkIsRootCategory(id, categories ?? [])}
                data={categoryTreeData}
                value={field.value}
                onClickContainer={getChilds}
                onChange={(e: any) => {
                  field.onChange(e);
                }}
              />
            )}
          />
        </Grid>
      )} */}
    </Grid>
  );
};

export default CategoryForm;

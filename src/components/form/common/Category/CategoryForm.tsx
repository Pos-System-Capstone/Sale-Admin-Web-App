import { useEffect, useMemo } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { CheckBoxField, DraftEditorField, InputField, UploadImageField } from 'components/form';
import useLocales from 'hooks/useLocales';
import { Controller, useFormContext } from 'react-hook-form';
import TreeViewField, { RenderTree } from 'components/form/TreeViewField/TreeViewField';
import useCategories from 'hooks/categories/useCategories';
import { TCategory } from 'types/category';
import getCategoryChilds from 'hooks/categories/useCategoryChild';
import { useState } from 'react';
import { cloneDeep } from 'lodash';

interface Props {
  updateMode?: boolean;
}

const CategoryForm = ({ updateMode }: Props) => {
  const { translate } = useLocales();
  const { watch } = useFormContext();
  const [categories, setCategories] = useState<TCategory[]>([]);

  const { data } = useCategories({ 'only-root': true });

  useEffect(() => {
    setCategories(data ?? []);
  }, [data]);

  const categoryTreeData = useMemo<RenderTree[]>(() => {
    const generateTree: any = (category: TCategory) => {
      if (!category.is_container) {
        return {
          id: category.cate_id,
          name: category.cate_name,
          children: [],
          isContainer: category.is_container
        };
      }
      return {
        id: category.cate_id,
        name: category.cate_name,
        isContainer: category.is_container,
        children: category.childs?.length ? category.childs.map(generateTree) : [<div key="stub" />]
      };
    };

    return (
      categories?.map((c) => ({
        id: `${c.cate_id}`,
        name: c.cate_name,
        isContainer: c.is_container,
        children: c?.childs.map(generateTree)
      })) ?? []
    );
  }, [categories]);

  const getChilds = async (cateId?: number) => {
    let results = await getCategoryChilds(Number(cateId));
    const updateCategories = cloneDeep([...categories]);
    let foundedParent = null;
    for (const childCate of updateCategories) {
      foundedParent = findParentCateFromCate(childCate, cateId!);
      if (foundedParent) break;
    }
    if (foundedParent) {
      foundedParent.childs = results;
    }
    setCategories(updateCategories);
  };

  const findParentCateFromCate = (cate: TCategory, parentCateId: number): TCategory | null => {
    if (cate.cate_id === parentCateId) {
      return cate;
    }
    if (!cate.childs) return null;
    for (const childCate of cate.childs) {
      const foundedParent = findParentCateFromCate(childCate, parentCateId!);
      if (foundedParent) return foundedParent;
    }
    return null;
  };

  const checkIsRootCategory = (id: string, cates: TCategory[]): boolean => {
    return cates?.some((c) => {
      if (c.cate_id === Number(id)) {
        return c.is_container;
      }
      if (c.childs) {
        return checkIsRootCategory(id, c.childs);
      }
      return false;
    });
  };

  const [isExtra, isRoot, is_container] = watch(['is_extra', 'is_root', 'is_container']);

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <CheckBoxField
          disabled={updateMode}
          name="is_container"
          label="Đây không phải danh mục chứa sản phẩm"
        />
      </Grid>
      <Grid item xs={6}>
        {!is_container && <CheckBoxField name="is_extra" label="Đây là Danh mục extra" />}
      </Grid>
      <Grid item xs={12} sm={12} sx={{ textAlign: 'left' }}>
        <Box>
          <UploadImageField.Avatar name="pic_url" label={translate('categories.table.thumbnail')} />
        </Box>
      </Grid>

      <Grid item xs={12} sm={6}>
        <InputField fullWidth name="cate_name" label={translate('categories.table.cateName')} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputField
          fullWidth
          name="cate_name_eng"
          label={translate('categories.table.cateNameEn')}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          name="description"
          render={({ field }) => {
            return <DraftEditorField value={field.value} onChange={field.onChange} />;
          }}
        />
      </Grid>
      {!isExtra && (
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
      )}
    </Grid>
  );
};

export default CategoryForm;

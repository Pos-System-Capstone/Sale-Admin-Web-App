import { ErrorMessage } from '@hookform/error-message';
import { Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';

interface Props {
  isExtraCate?: boolean;
}

const CategoryTreeForm = ({ isExtraCate = false }: Props) => {
  const {
    formState: { errors }
  } = useFormContext();
  // const { data: categories } = useCategories({ 'is-extra': isExtraCate, 'only-root': true });

  // const categoryTreeData = useMemo<RenderTree[]>(() => {
  //   const generateTree: any = (category: TCategory) => {
  //     if (!category.childs || category.childs.length === 0) {
  //       return {
  //         id: category.cate_id,
  //         name: category.cate_name,
  //         children: [],
  //         isContainer: category.is_container
  //       };
  //     }
  //     return {
  //       id: category.cate_id,
  //       name: category.cate_name,
  //       children: category.childs.map(generateTree),
  //       isContainer: category.is_container
  //     };
  //   };

  //   return (
  //     categories?.map((c) => ({
  //       id: `${c.cate_id}`,
  //       name: c.cate_name,
  //       isContainer: c.is_container,
  //       children: c?.childs.map(generateTree)
  //     })) ?? []
  //   );
  // }, [categories]);

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

  return (
    <>
      <ErrorMessage
        errors={errors}
        name="cat_id"
        render={({ message }) => (
          <Typography color="red" variant="caption">
            {message}
          </Typography>
        )}
      />
      {/* <Controller
        name="cat_id"
        render={({ field }) => (
          <TreeViewField
            onDisabled={(id) => checkIsRootCategory(id, categories ?? [])}
            data={categoryTreeData}
            {...field}
          />
        )}
      /> */}
    </>
  );
};

export default CategoryTreeForm;

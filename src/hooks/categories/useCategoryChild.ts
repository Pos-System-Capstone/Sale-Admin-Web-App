import categoryApi from 'api/category';

const getCategoryChilds = (cateId?: string) => {
  return categoryApi.getChildByCategoryId(cateId!).then((res) => res.data);
};

export default getCategoryChilds;

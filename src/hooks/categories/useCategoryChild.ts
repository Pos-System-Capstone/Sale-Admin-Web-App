import categoryApi from 'api/category';

const getCategoryChilds = (cateId?: number) => {
  return categoryApi.getChildByCategoryId(cateId!).then((res) => res.data);
};

export default getCategoryChilds;

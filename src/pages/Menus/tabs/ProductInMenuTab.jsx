/* eslint-disable react/prop-types */
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import { Avatar, Box, Button, Card, Typography } from '@mui/material';
import menuApi from 'api/menu';
import DrawerProductForm from 'components/DrawerProductForm/DrawerProductForm';
import ResoTable from 'components/ResoTable/ResoTable';
import { get } from 'lodash-es';
import { useSnackbar } from 'notistack';
import { CardTitle } from 'pages/Products/components/Card';
import React, { useState } from 'react';
import { getProductInMenus } from 'redux/menu/api';
import { formatCurrency } from 'utils/utils';
import ProductInMenuDialog from '../components/EditProductDialog';

const ProductInMenuTab = (props) => {
  const { menuId, productListInMenuDetail } = props;
  const [filters, setFilters] = React.useState(null);
  const ref = React.useRef();
  const [isUpdateProduct, setIsUpdateProduct] = React.useState(false);

  const run = ref.current?.reload;

  const { enqueueSnackbar } = useSnackbar();
  const [selectedProductToEdit, setSelectedProductToEdit] = useState();
  const [selectedProductToAddOrRemoveFromMenu, setSelectedProductToAddOrRemoveFromMenu] =
    React.useState([]);
  const [selectedProductIds, setSelectedProductIds] = React.useState([]);
  const [oldIds, setOldIds] = React.useState([]);

  // const [currentCate, setCurrentCate] = React.useState(null);
  // const { translate } = useLocales();
  // const { categories = [] } = useSelector((state) => state.admin);
  // const [currentDeleteItem, setCurrentDeleteItem] = React.useState(null);
  // const form = ref.current?.formControl;
  // const { run: changeProductNameFilter } = useDebounceFn(
  //   (value) => {
  //     setFilters((prev) => ({ ...prev, 'product-name': value }));
  //   },
  //   {
  //     wait: 500
  //   }
  // );
  // React.useEffect(() => {
  //   setFilters((prev) => ({ ...prev, 'cat-id': currentCate }));
  // }, [currentCate]);

  React.useEffect(() => {
    let selectedProductIdList = [];
    if (selectedProductToAddOrRemoveFromMenu.length > 0) {
      selectedProductToAddOrRemoveFromMenu.map((product) => {
        selectedProductIdList.push(product.productId);
      });
      setSelectedProductIds(selectedProductIdList);
    } else {
      productListInMenuDetail.map((product) => {
        selectedProductIdList.push(product.productId);
      });
      setSelectedProductIds(selectedProductIdList);
    }
  }, [productListInMenuDetail, selectedProductToAddOrRemoveFromMenu, selectedProductToEdit]);

  const handleCallApiToUpdateProductInMenu = async (newProductListInMenuDetail) => {
    // Call api to update product list
    await menuApi
      .updateMenuInProduct(menuId, newProductListInMenuDetail)
      .then(() => {
        enqueueSnackbar(`Điều chỉnh thành công`, {
          variant: 'success'
        });
        setSelectedProductIds(newProductListInMenuDetail);
        return true;
      })
      .then(run)
      .catch((err) => {
        const errMsg = get(err.error, ['data', 'message'], `Có lỗi xảy ra. Vui lòng thử lại`);
        enqueueSnackbar(errMsg, {
          variant: 'error'
        });
        return false;
      });
  };

  // const addAndRemoveProductToMenuHandler = (datas) =>
  const addAndRemoveProductToMenuHandler = (data) => {
    const newProductIdsToAddOrRemove = [];
    data.map((id) => {
      newProductIdsToAddOrRemove.push({
        productId: id
      });
    });
    handleCallApiToUpdateProductInMenu(newProductIdsToAddOrRemove);
    setSelectedProductToAddOrRemoveFromMenu(newProductIdsToAddOrRemove);
  };

  const updateProdInMenu = (value) => {
    const newProductListInMenuDetail = [...productListInMenuDetail];
    newProductListInMenuDetail[
      newProductListInMenuDetail.findIndex(
        (product) => product.productId === selectedProductToEdit.id
      )
    ] = {
      productId: selectedProductToEdit.id,
      sellingPrice: value.sellingPrice ? value.sellingPrice : selectedProductToEdit.sellingPrice,
      discountPrice: value.discountPrice ? value.discountPrice : selectedProductToEdit.discountPrice
    };
    // Call api to update product list
    handleCallApiToUpdateProductInMenu(newProductListInMenuDetail).then(() =>
      setIsUpdateProduct(false)
    );
  };

  return (
    <Box flex={1}>
      <ProductInMenuDialog
        open={isUpdateProduct}
        onClose={() => setIsUpdateProduct(false)}
        data={selectedProductToEdit}
        onSubmit={updateProdInMenu}
      />

      <Box as={Card} p={2}>
        <Box display="flex" justifyContent="space-between">
          <CardTitle>Danh sách sản phẩm</CardTitle>
          <DrawerProductForm
            selected={selectedProductIds}
            onSubmit={(data) => {
              addAndRemoveProductToMenuHandler(data);
            }}
            trigger={
              <Button size="small" startIcon={<Icon icon={plusFill} />}>
                Thêm/Xoá sản phẩm
              </Button>
            }
          />
        </Box>
        <ResoTable
          ref={ref}
          filters={filters}
          getData={(params) => getProductInMenus(menuId, params)}
          rowKey="product_id"
          onEdit={(data) => {
            setSelectedProductToEdit(data);
            setIsUpdateProduct(true);
          }}
          columns={[
            {
              title: 'Mã sản phẩm',
              dataIndex: 'code'
            },
            {
              title: 'Hình ảnh',
              dataIndex: 'picUrl',
              render: (src, { product_name }) => (
                <Avatar
                  alt={product_name}
                  src={src}
                  variant="square"
                  style={{ width: '54px', height: '54px', zIndex: 1 }}
                />
              ),
              hideInSearch: true
            },
            {
              title: 'Tên sản phẩm',
              dataIndex: 'name'
            },
            {
              title: 'Giá gốc',
              dataIndex: 'historicalPrice',
              render: (value) => <Typography>{formatCurrency(value)}</Typography>,
              hideInSearch: true
            },
            {
              title: 'Giá khuyến mãi',
              dataIndex: 'discountPrice',
              render: (value) => <Typography>{formatCurrency(value)}</Typography>,
              hideInSearch: true
            },
            {
              title: 'Giá bán',
              dataIndex: 'sellingPrice',
              render: (value) => <Typography>{formatCurrency(value)}</Typography>,
              hideInSearch: true
            }
            // {
            //   title: 'Cố định giá',
            //   dataIndex: 'is_fixed_price',
            //   render: (isFixed) => (
            //     <Label color={isFixed ? 'success' : 'default'}>
            //       {isFixed ? 'Cố định' : 'Không'}
            //     </Label>
            //   ),
            //   hideInSearch: true
            // }
          ]}
        />
      </Box>
    </Box>
  );
};

// updateProdInMenuInfo(menuId, currentProduct.product_id, values)
//   .then(() =>
//     enqueueSnackbar(`Cập nhật thành công`, {
//       variant: 'success'
//     })
//   )
//   .then(() => setCurrentProduct(null))
//   .then(run)
//   .catch((err) => {
//     const errMsg = get(err.response, ['data', 'message'], `Có lỗi xảy ra. Vui lòng thử lại`);
//     enqueueSnackbar(errMsg, {
//       variantF: 'error'
//     });
//   });
// const onDelete = () =>
//   deleteProductInMenu(menuId, currentDeleteItem.product_id)
//     .then((res) => {
//       enqueueSnackbar(`Xóa thành công `, {
//         variant: 'success'
//       });
//     })
//     .then(run)
//     .catch((err) => {
//       enqueueSnackbar(`Có lỗi xảy ra. Vui lòng thử lại`, {
//         variant: 'error'
//       });
//     })
//     .finally(() => setCurrentDeleteItem(null));

// addProductInMenus(+id, datas)
//   .then(() =>
//     enqueueSnackbar(`Thêm thành công`, {
//       variant: 'success'
//     })
//   )
//   .then(() => {
//     setIsAddProduct(false);
//     setCurrentProduct(null);
//   })
//   .then(run)
//   .catch((err) => {
//     const errMsg = get(err.response, ['data', 'message'], `Có lỗi xảy ra. Vui lòng thử lại`);
//     enqueueSnackbar(errMsg, {
//       variant: 'error'
//     });
//   });

{
  /* <DeleteConfirmDialog
        open={Boolean(currentDeleteItem)}
        onClose={() => setCurrentDeleteItem(false)}
        onDelete={onDelete}
        title={
          <>
            {translate('common.confirmDeleteTitle')}{' '}
            <strong>{currentDeleteItem?.product_name}</strong>
          </>
        }
      /> */
}

export default ProductInMenuTab;

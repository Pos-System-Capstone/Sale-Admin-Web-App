import { Button, Card, Stack } from '@mui/material';
import { Box } from '@mui/system';
import ResoTable from 'components/ResoTable/ResoTable';
import productApi from 'api/product';
import { TTableColumn } from 'types/table';
import { TVariant } from 'types/report/variant';
import TagField from 'components/form/TagField';
import { useParams } from 'react-router';
import { useSnackbar } from 'notistack';
import { get } from 'lodash';
import ModalVariants from './ModelVariants';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
export default function UpdateVariant() {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [selectedVariants, setSelectedVariants] = useState<string[]>([]);
  const tableRef = useRef<any>();
  const variantsColunm: TTableColumn<TVariant>[] = [
    {
      title: 'STT',
      dataIndex: 'index',
      hideInSearch: true
    },
    {
      title: 'Tên biến thể',
      dataIndex: 'name'
    },
    {
      title: 'Mã sản phẩm',
      dataIndex: 'value',
      hideInSearch: true,
      render: (value: any) => <TagField data={value} punctuation={'_'} />
    }
  ];
  const { data: variants } = useQuery(['variants1'], () =>
    productApi.getVariantsInProduct(id, { page: 1, size: 10 }).then((res) => res.data.items)
  );
  console.log('va', variants);
  useEffect(() => {
    if (variants !== undefined) {
      const selectedIds: string[] = variants.map((e) => e.id!);

      setSelectedVariants(selectedIds);
    }
  }, [variants]);
  console.log('selectedExtraCategoryIds', selectedVariants);
  const addVariantsToProduct = async (ids: string[], data: any) => {
    try {
      await productApi.addVariantsToProduct(id!, ids);
      enqueueSnackbar('common.201', {
        variant: 'success'
      });
      tableRef.current?.reload();
    } catch (err) {
      const errMsg = get(err as any, ['message'], `Có lỗi xảy ra. Vui lòng thử lại`);
      enqueueSnackbar(errMsg, {
        variant: 'error'
      });
    }
  };

  return (
    <Box flex={1}>
      <Box component={Card} p={2}>
        <Stack justifyContent="flex-end" mb={2} direction="row" spacing={2}>
          <ModalVariants
            variantsColunm={variantsColunm}
            ProductId={id}
            trigger={<Button variant="outlined">Cập nhật biến thể trong sản phẩm</Button>}
            onReload={() => tableRef.current?.reload()}
            selectedVariants={selectedVariants}
            update={setSelectedVariants}
          />
        </Stack>
        <Stack spacing={2} textAlign="left">
          <Box p={1} sx={{ flex: 1, overflowY: 'auto' }}>
            <Stack spacing={2}>
              <ResoTable
                showAction={false}
                scroll={{ y: '50%', x: '100%' }}
                rowKey="id"
                getData={(params: any) => productApi.getVariantsInProduct(id, params)}
                columns={variantsColunm}
              />
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

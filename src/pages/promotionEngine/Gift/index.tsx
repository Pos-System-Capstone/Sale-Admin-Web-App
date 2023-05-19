/* eslint-disable camelcase */
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import { Button, Card, Stack } from '@mui/material';
// components
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
// material
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCollections } from 'redux/collections/api';
import { PATH_PROMOTION_APP } from 'routes/promotionAppPaths';
import { TCollection } from 'types/collection';
import { TTableColumn } from 'types/table';

const GiftPage = () => {
  const navigate = useNavigate();
  const { translate } = useLocales();
  const tableRef = useRef<any>();

  const [currentDeleteItem, setCurrentDeleteItem] = useState<TCollection | null>(null);

  const columns: TTableColumn<TCollection>[] = [
    {
      title: 'NO',
      hideInSearch: true
    },
    {
      title: 'Name',
      hideInSearch: true
    },
    {
      title: 'Type',
      hideInSearch: true
    },
    {
      title: 'Created Date',
      hideInSearch: true
    },
    {
      title: 'Updated Date',
      hideInSearch: true
    }
  ];

  return (
    <Page
      title={translate('collections.list')}
      actions={() => [
        <Button
          key="add-collection"
          onClick={() => {
            navigate(PATH_PROMOTION_APP.gift.new);
          }}
          variant="contained"
          startIcon={<Icon icon={plusFill} />}
        >
          {translate('menu.promotion.giftBtn')}
        </Button>
      ]}
    >
      <Card>
        <Stack spacing={2}>
          <ResoTable
            ref={tableRef}
            onEdit={(collecton: TCollection) =>
              navigate(`${PATH_PROMOTION_APP.gift.root}/${collecton.id}`, {
                state: collecton
              })
            }
            onDelete={setCurrentDeleteItem}
            rowKey="id"
            getData={getCollections}
            columns={columns}
          />
        </Stack>
      </Card>
    </Page>
  );
};

export default GiftPage;

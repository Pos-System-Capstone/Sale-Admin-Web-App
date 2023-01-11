/* eslint-disable camelcase */
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
// material
import { Button, Card, Container, Stack, Typography } from '@mui/material';
import Label from 'components/Label';
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import { useState } from 'react';
// components
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from 'routes/paths';
import { TTableColumn } from 'types/table';
import { Customer, customersListData } from '../../@types/customer';

const CustomerListPage = () => {
  const navigate = useNavigate();
  const { translate } = useLocales();
  const [filters, setFilters] = useState(null);
  const orderColumns: TTableColumn<Customer>[] = [
    {
      title: translate('pages.customers.table.no'),
      dataIndex: 'index',
      hideInSearch: true
    },
    {
      title: translate('pages.customers.table.name'),
      dataIndex: 'firstName',
      render: (_: any, customer) => <>{`${customer.lastName} ${customer.firstName}`}</>
    },
    {
      title: translate('pages.customers.table.homeEmail'),
      dataIndex: 'homeEmail',
      hideInSearch: true
    },
    {
      title: translate('pages.customers.table.companyName'),
      dataIndex: 'companyName',
      hideInSearch: true
    },
    {
      title: translate('pages.customers.table.tags'),
      dataIndex: 'tags',
      hideInSearch: true
    },
    {
      title: translate('common.status'),
      dataIndex: 'status',
      hideInSearch: true,
      render: (status: number, _: any) => (
        <Label color={status === 1 ? 'success' : 'default'}>
          {status === 1 ? translate('common.available') : translate('common.notAvailable')}
        </Label>
      )
    }
  ];
  return (
    <Page title={`Dashboard ${translate('pages.customers.listTitle')} | Reso Sales`}>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h4" gutterBottom>
            {translate('pages.customers.listTitle')}
          </Typography>
          <Button
            onClick={() => {
              navigate(PATH_DASHBOARD.customers.new);
            }}
            variant="contained"
            startIcon={<Icon icon={plusFill} />}
          >
            {translate('pages.customers.addBtn')}
          </Button>
        </Stack>
        <Card>
          <Stack spacing={2}>
            <ResoTable
              // filters={filters}
              rowKey="customers_id"
              columns={orderColumns}
              dataSource={customersListData}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          </Stack>
        </Card>
      </Container>
    </Page>
  );
};

export default CustomerListPage;

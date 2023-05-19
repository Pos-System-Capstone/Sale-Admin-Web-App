import appstoreOutlined from '@iconify/icons-ant-design/appstore-outlined';
import branchesOutlined from '@iconify/icons-ant-design/branches-outlined';
import dropboxOutlined from '@iconify/icons-ant-design/dropbox-outlined';
import rocketFilled from '@iconify/icons-ant-design/rocket-filled';
import ShopFill from '@iconify/icons-ant-design/shop-fill';
// material
import { Box, Card, Divider, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// import Label from 'components/Label';
import Page from 'components/Page';
import ButtonWidget from 'components/_dashboard/configuration/settings/ButtonWidget';
import useLocales from 'hooks/useLocales';

// components

const SettingPage = () => {
  const { translate } = useLocales();
  const theme = useTheme();

  // Todo: add href to each button
  const settingSections = [
    {
      header: 'Phân phối',
      widgets: [
        {
          title: 'Cửa hàng',
          description: 'Quản lí cửa hàng',
          icon: ShopFill,
          href: ''
        },
        {
          title: 'Chi nhánh',
          description: 'Quản lí Chi nhánh',
          icon: branchesOutlined,
          href: ''
        }
      ]
    },
    {
      header: 'Sản phẩm',
      widgets: [
        {
          title: 'Sản phẩm',
          description: 'Quản lí Sản phẩm',
          icon: dropboxOutlined,
          href: ''
        },
        {
          title: 'Danh mục',
          description: 'Quản lí Danh mục',
          icon: appstoreOutlined,
          href: ''
        }
      ]
    },
    {
      header: 'Khác',
      widgets: [
        {
          title: 'Chiến dịch',
          description: 'Quản lí Chiến dịch',
          icon: rocketFilled,
          href: ''
        }
      ]
    }
  ];

  return (
    <Page
      title={`${translate('menu.promotion.setting')}`}
      actions={() => [
        // <Button
        //   key="create-store"
        //   onClick={() => {
        //     navigate(PATH_DASHBOARD.stores.new);
        //   }}
        //   variant="contained"
        //   startIcon={<Icon icon={plusFill} />}
        // >
        //   {translate('pages.stores.addBtn')}
        // </Button>
      ]}
    >
      {settingSections.map((section, index) => (
        <Box key={index} paddingY="2vh">
          <Card
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Stack
              display="flex"
              flexDirection={'column'}
              justifyContent="space-between"
              minHeight={'10rem'}
            >
              <Typography variant="h3">{section.header}</Typography>
              <Divider />
              <Box display="flex" paddingTop="3vh">
                {section.widgets.map((widget) => (
                  <ButtonWidget
                    key={widget.title}
                    title={widget.title}
                    icon={widget.icon}
                    href={widget.href}
                  />
                ))}
              </Box>
            </Stack>
          </Card>
        </Box>
      ))}
    </Page>
  );
};

export default SettingPage;

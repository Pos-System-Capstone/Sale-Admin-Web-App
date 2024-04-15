import { useEffect, useRef, useState } from 'react';
// import { sentenceCase } from 'change-case';
import { useParams } from 'react-router-dom';
// material
import {
  Box,
  Button,
  Card,
  Tab
  // , Pagination
} from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getPost } from '../../redux/slices/blog';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
// @types
import { BlogState } from '../../@types/blog';
// components
import Page from '../../components/Page';
import { Icon } from '@iconify/react';
import { useLocation, useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';
import plusFill from '@iconify/icons-eva/plus-fill';
import { TabContext, TabList } from '@mui/lab';
import ResoTable from 'components/ResoTable/ResoTable';
import { UseFormReturn } from 'react-hook-form';
import { postColumns } from './config';
import blogApi from 'api/blog';

// ----------------------------------------------------------------------

export default function BlogPosts() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { post, error, recentPosts } = useSelector((state: { blog: BlogState }) => state.blog);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const currentPage = params.get('tabindex');
  const [activeTab, setActiveTab] = useState(currentPage || '1');
  const ref = useRef<{ reload: Function; formControl: UseFormReturn<any> }>();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getPost(id!));
  }, [dispatch, id]);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    ref.current?.formControl.setValue(
      'ispublished',
      newValue === '1' ? 1 : newValue === '2' ? 0 : 2
    );
    setActiveTab(newValue);
    ref.current?.formControl.setValue('tabindex', newValue);
  };

  return (
    <Page
      title="Quản lý bài viết"
      actions={() => [
        <Button
          key="add-post"
          onClick={() => {
            navigate(PATH_DASHBOARD.blog.newPost);
          }}
          variant="contained"
          startIcon={<Icon icon={plusFill} />}
        >
          Thêm bài viết
        </Button>
      ]}
    >
      <Card>
        <TabContext value={activeTab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Bài viết đã xuất bản" value="1" />
              <Tab label="Bài viết chưa xuất bản" value="2" />
              <Tab label="Bài viết nháp" value="3" />
            </TabList>
          </Box>
          <ResoTable
            ref={ref}
            pagination
            getData={(params: any) => blogApi.getBlogs(params)}
            // onEdit={editPost}
            // onDelete={onDelete}
            columns={postColumns}
            rowKey="post_id"
          />
        </TabContext>
      </Card>
    </Page>
  );
}

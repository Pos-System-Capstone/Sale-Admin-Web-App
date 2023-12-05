import { isString } from 'lodash';
// material
import { LoadingButton } from '@mui/lab';
import { alpha, styled } from '@mui/material/styles';
import { Box, Button, Container, Typography, DialogActions } from '@mui/material';
// @types
import { NewPostViewFormikInstance } from '../../../@types/blog';
//
import { DialogAnimate } from '../../animate';
import Scrollbar from '../../Scrollbar';
import EmptyContent from '../../EmptyContent';

// ----------------------------------------------------------------------

const HeroStyle = styled('div')(({ theme }) => ({
  paddingTop: '56%',
  position: 'relative',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  '&:before': {
    top: 0,
    content: "''",
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: alpha(theme.palette.grey[900], 0.72)
  }
}));

// ----------------------------------------------------------------------

type PreviewHeroProps = {
  title: string;
  image?: string | null;
};

function PreviewHero({ title, image }: PreviewHeroProps) {
  return (
    <HeroStyle sx={{ backgroundImage: `url(${image})` }}>
      <Container
        sx={{
          top: 0,
          left: 0,
          right: 0,
          margin: 'auto',
          position: 'absolute',
          pt: { xs: 3, lg: 10 },
          color: 'common.white'
        }}
      >
        <Typography variant="h2" component="h1">
          {title}
        </Typography>
      </Container>
    </HeroStyle>
  );
}

type BlogNewPostPreviewProps = {
  formik: NewPostViewFormikInstance;
  isOpenPreview: boolean;
  onClosePreview: VoidFunction;
};

export default function BlogNewPostPreview({
  formik,
  isOpenPreview,
  onClosePreview
}: BlogNewPostPreviewProps) {
  const { values, handleSubmit, isSubmitting, isValid } = formik;
  const { title, blogContent } = values;
  const image = isString(values.image) ? values.image : values.image?.preview;
  const hasContent = title || blogContent || image;
  const hasHero = title || image;

  return (
    <DialogAnimate fullScreen open={isOpenPreview} onClose={onClosePreview}>
      <DialogActions sx={{ py: 2, px: 3 }}>
        <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
          Preview Post
        </Typography>
        <Button onClick={onClosePreview}>Cancel</Button>
        <LoadingButton
          type="submit"
          variant="contained"
          disabled={!isValid}
          loading={isSubmitting}
          onClick={() => handleSubmit()}
        >
          Post
        </LoadingButton>
      </DialogActions>

      {hasContent ? (
        <Scrollbar>
          {hasHero && <PreviewHero title={title} image={image} />}
          <Container>
            <Box sx={{ mt: 5, mb: 10 }}>
              <Typography variant="h6" sx={{ mb: 5 }}>
                {blogContent}
              </Typography>
            </Box>
          </Container>
        </Scrollbar>
      ) : (
        <EmptyContent title="Empty content" />
      )}
    </DialogAnimate>
  );
}

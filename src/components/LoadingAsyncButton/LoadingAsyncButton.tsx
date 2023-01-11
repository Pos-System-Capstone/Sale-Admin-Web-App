import { LoadingButton } from '@mui/lab';
import React from 'react';

const LoadingAsyncButton = ({ onClick, children, ...props }: any) => {
  const [loading, setLoading] = React.useState(false);

  const handleClick = () => {
    if (onClick) {
      setLoading(true);
      return Promise.resolve(onClick()).finally(() => setLoading(false));
    }
    return null;
  };

  return (
    <LoadingButton loading={loading} onClick={handleClick} {...props}>
      {children}
    </LoadingButton>
  );
};

export default LoadingAsyncButton;

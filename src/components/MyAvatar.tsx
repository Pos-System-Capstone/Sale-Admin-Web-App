// hooks
import useAuth from '../hooks/useAuth';
//
import { MAvatar } from './@material-extend';
import { MAvatarProps } from './@material-extend/MAvatar';
import createAvatar from '../utils/createAvatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }: MAvatarProps) {
  const { user } = useAuth();

  return (
    <MAvatar
      src={user?.photoURL}
      alt={user?.name}
      color={user?.photoURL ? 'default' : createAvatar(user?.name || 'User').color}
      {...other}
    >
      {createAvatar(user?.name || 'User').name}
    </MAvatar>
  );
}

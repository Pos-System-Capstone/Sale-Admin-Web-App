import { useContext } from 'react';
import { AuthContext } from '../contexts/JWTContext';
// import { AuthContext } from '../contexts/AwsCognitoContext';
// import { AuthContext } from '../contexts/Auth0Context';
import { AuthContext as FirebaseContext } from '../contexts/FirebaseContext';

// ----------------------------------------------------------------------

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error('Auth context must be use inside AuthProvider');

  return context;
};

const useFirebaseAuth = () => {
  const context = useContext(FirebaseContext);

  if (!context) throw new Error('FirebaseContext context must be use inside FirebaseContext');

  return context;
};

export { useFirebaseAuth };

export default useAuth;

import { createContext, ReactNode, useEffect, useReducer } from 'react';
// utils
import axios, { axiosInstances } from '../utils/axios';
import { isValidToken, setSession } from '../utils/jwt';
import { getUserInfo, setUserInfo } from '../utils/utils';
// @types
import { useNavigate } from 'react-router';
import { ActionMap, AuthState, AuthUser, JWTContextType } from '../@types/authentication';
import { Role } from 'utils/role';

// ----------------------------------------------------------------------

enum Types {
  Initial = 'INITIALIZE',
  Login = 'LOGIN',
  Logout = 'LOGOUT',
  Register = 'REGISTER',
  ChangeUser = 'CHANGE_USER'
}

type JWTAuthPayload = {
  [Types.Initial]: {
    isAuthenticated: boolean;
    user: AuthUser;
  };
  [Types.Login]: {
    user: AuthUser;
  };
  [Types.Logout]: undefined;
  [Types.Register]: {
    user: AuthUser;
  };
  [Types.ChangeUser]: {
    user: AuthUser;
  };
};

export type JWTActions = ActionMap<JWTAuthPayload>[keyof ActionMap<JWTAuthPayload>];

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const JWTReducer = (state: AuthState, action: JWTActions) => {
  switch (action.type) {
    case 'INITIALIZE':
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user
      };
    case 'LOGIN':
      setUserInfo(action.payload.user);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };

    case 'REGISTER':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user
      };

    case 'CHANGE_USER':
      setUserInfo(action.payload.user);
      return {
        ...state,
        user: action.payload.user
      };
    default:
      return state;
  }
};

const AuthContext = createContext<JWTContextType | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(JWTReducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');
        const userRaw = getUserInfo();
        if (accessToken && isValidToken(accessToken) && userRaw) {
          setSession(accessToken);

          // TODO: IMPLEMENT METHOD TO GET USER INFO FROM TOKEN
          // const response = await axios.get('/api/account/my-account');
          // const { user } = response.data;

          const user = JSON.parse(userRaw);

          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: true,
              user
            }
          });
        } else {
          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: false,
              user: null
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: Types.Initial,
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    };

    initialize();
  }, []);

  const changeUser = async (user: AuthUser) => {
    // dispatch({ type: Types.Logout });
    // setTimeout(() => {
    //   const accessToken = window.localStorage.getItem('accessToken');
    //   setSession(accessToken);
    // }, 500);
    setUserInfo(user);
    dispatch({
      type: Types.Login,
      payload: {
        user
      }
    });
  };

  const login = async (username: string, password: string) => {
    const response = await axiosInstances.login.post('/auth/login', {
      username,
      password
    });
    const { accessToken, id, name, role, status, brandId, storeId, brandPicUrl } = response.data;
    if (role === Role.StoreStaff) {
      setSession(null);
      setUserInfo({});
      navigate('/auth/login', { replace: true });
      throw new Error('Bạn không có quyền đăng nhập vào hệ thống');
    }
    const user = {
      id: id,
      name: name,
      displayName: name,
      role: role,
      brandId: brandId,
      storeId: storeId,
      brandPicUrl: brandPicUrl
    };
    setSession(accessToken);
    setUserInfo(user);
    navigate('/', { replace: true });
    dispatch({
      type: Types.Login,
      payload: {
        user
      }
    });
  };

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    const response = await axios.post('/api/account/register', {
      email,
      password,
      firstName,
      lastName
    });
    const { accessToken, user } = response.data;

    window.localStorage.setItem('accessToken', accessToken);
    dispatch({
      type: Types.Register,
      payload: {
        user
      }
    });
  };

  const logout = async () => {
    setSession(null);
    setUserInfo({});
    dispatch({ type: Types.Logout });
    navigate('/auth/login', { replace: true });
  };

  const resetPassword = (email: string) => console.log(email);

  const updateProfile = () => {};

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
        resetPassword,
        updateProfile,
        changeUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type UserRole = 'SysAdmin' | 'store-admin' | any;

export type AuthUser =
  | {
      id: string;
      name: string;
      role?: UserRole[];
      displayName: string;
      email?: string;
      photoURL?: string;
      phoneNumber?: string;
      country?: string;
      address?: string;
      state?: string;
      city?: string;
      zipCode?: number;
      about?: string;
      isPublic?: boolean;
      brandPicUrl?: string;
      [key: string]: any;
    }
  | null
  | Record<string, any>;

export type AuthState = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
};

export type JWTContextType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
  method: 'jwt';
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => void;
  updateProfile: VoidFunction;
  changeUser?: (user: AuthUser) => void;
};

export type FirebaseContextType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
  method: 'firebase';
  // login: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  // loginWithGoogle: () => Promise<firebase.auth.UserCredential>;
  // loginWithFaceBook: () => Promise<firebase.auth.UserCredential>;
  // loginWithTwitter: () => Promise<firebase.auth.UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: VoidFunction;
};

export type AWSCognitoContextType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
  method: 'cognito';
  login: (email: string, password: string) => Promise<unknown>;
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<unknown>;
  logout: VoidFunction;
  resetPassword: (email: string) => void;
  updateProfile: VoidFunction;
};

export type Auth0ContextType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
  method: 'auth0';
  login: () => Promise<void>;
  logout: VoidFunction;
  resetPassword: (email: string) => void;
  updateProfile: VoidFunction;
};

import axios, { AxiosRequestConfig } from 'axios';

// Custom Axios Type
export enum AxiosClientFactoryEnum {
  ADMIN = 'admin',
  LOGIN = 'login'
}

// ----------------------------------------------------------------------

export const parseParams = (params: any) => {
  const keys = Object.keys(params);
  let options = '';

  keys.forEach((key) => {
    const isParamTypeObject = typeof params[key] === 'object';
    const isParamTypeArray =
      isParamTypeObject && Array.isArray(params[key]) && params[key].length >= 0;

    if (!isParamTypeObject) {
      options += `${key}=${params[key]}&`;
    }

    if (isParamTypeObject && isParamTypeArray) {
      params[key].forEach((element: any) => {
        options += `${key}=${element}&`;
      });
    }
  });

  return options ? options.slice(0, -1) : options;
};

const admin = `${process.env.REACT_APP_WEB_ADMIN_URL}`;
const account = `${process.env.REACT_APP_LOGIN_BASE_URL}`;

const requestWebAdmin = axios.create({
  baseURL: admin,
  paramsSerializer: parseParams
});

requestWebAdmin.interceptors.request.use((options) => {
  const { method } = options;

  if (method === 'put' || method === 'post') {
    Object.assign(options.headers, {
      'Content-Type': 'application/json;charset=UTF-8'
    });
  }

  return options;
});

requestWebAdmin.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Có lỗi xảy ra')
);

const requestLogin = axios.create({
  baseURL: account,
  paramsSerializer: parseParams
});

requestLogin.interceptors.request.use((options) => {
  const { method } = options;

  if (method === 'put' || method === 'post') {
    Object.assign(options.headers, {
      'Content-Type': 'application/json;charset=UTF-8'
    });
  }

  return options;
});

requestLogin.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Có lỗi xảy ra')
);

// const requestReport = axios.create({
//   baseURL: report,
//   paramsSerializer: parseParams
// });

// requestReport.interceptors.request.use((options) => {
//   const { method } = options;

//   if (method === 'put' || method === 'post') {
//     Object.assign(options.headers, {
//       'Content-Type': 'application/json;charset=UTF-8'
//     });
//   }

//   return options;
// });

// requestReport.interceptors.response.use(
//   (response) => response,
//   (error) => Promise.reject((error.response && error.response.data) || 'Có lỗi xảy ra')
// );

// ----------------------------------------------------------------------
class AxiosClientFactory {
  /**
   * Use to get instance of AxiosClientFactory
   * @param type AxiosClientFactoryEnum
   * @param config AxiosRequestConfig
   * @returns AxiosInstance
   *
   * @example
   * ```javascript
   *
   * // Get the Axios Instance
   * import { axiosClientFactory, axiosInstance } from 'utils/axios';
   * var axiosInstance = axiosClientFactory.getAxiosClient(AxiosClientFactoryEnum.SALE);
   *
   *
   * ```
   *
   */
  getAxiosClient(type?: AxiosClientFactoryEnum, config: AxiosRequestConfig = {}) {
    switch (type) {
      case 'admin':
        return requestWebAdmin;
      case 'login':
        return requestLogin;
      default:
        return requestWebAdmin;
    }
  }
}

const axiosClientFactory = new AxiosClientFactory();
/**
 * Singleton Pattern for Axios Request
 */
const axiosInstances = {
  login: axiosClientFactory.getAxiosClient(AxiosClientFactoryEnum.LOGIN),
  webAdmin: axiosClientFactory.getAxiosClient(AxiosClientFactoryEnum.ADMIN)
};

export { axiosClientFactory, axiosInstances };

export default axiosInstances.webAdmin;

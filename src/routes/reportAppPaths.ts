// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}
const ROOTS_AUTH = '/auth';
export const ROOTS_DASHBOARD = `/report`;

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify')
};

export const PATH_REPORT_APP = (storeId: string) => {
  // const storeId = localStorage.getItem('storeId') || 0;
  return {
    root: ROOTS_DASHBOARD,
    general: {
      reportDashboard: path(ROOTS_DASHBOARD, `/${storeId}/dashboard`)
    },
    home: path(ROOTS_DASHBOARD, `/${storeId}/home`),
    insights: path(ROOTS_DASHBOARD, `/${storeId}/insights`),
    overviewDate: path(ROOTS_DASHBOARD, `/${storeId}/overview-date`),
    overviewMonth: path(ROOTS_DASHBOARD, `/${storeId}/overview-month`),
    payment: path(ROOTS_DASHBOARD, `/${storeId}/payment`),
    productSale: path(ROOTS_DASHBOARD, `/${storeId}/product-sale`),
    productProgress: path(ROOTS_DASHBOARD, `/${storeId}/product-progress`),
    promotion: path(ROOTS_DASHBOARD, `/${storeId}/promotion`),
    dayReport: path(ROOTS_DASHBOARD, `/${storeId}/day-report`),
    timeReport: path(ROOTS_DASHBOARD, `/${storeId}/day-report/time-report`),
    dateReport: path(ROOTS_DASHBOARD, `/${storeId}/day-report/date-report`),
    monthReport: path(ROOTS_DASHBOARD, `/${storeId}/day-report/month-report`),
    stores: path(ROOTS_DASHBOARD, `/${storeId}/stores`)
  };
};

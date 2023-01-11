import React from 'react';

const DashboardContext = React.createContext();

const useDashboard = () => {
  const context = React.useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a SnackBarProvider');
  }
  return context;
};

// eslint-disable-next-line react/prop-types
const DashboardProvider = ({ defaultState = {}, children }) => {
  const [state, setState] = React.useState({
    ...defaultState,
    open: false
  });
  const setNavOpen = React.useCallback((open) => setState({ ...state, open }), [state]);

  const value = { ...state, setNavOpen };
  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};

export const withDashboard = (Comp) => (props) =>
  (
    <DashboardProvider>
      <Comp {...props} />
    </DashboardProvider>
  );

export { DashboardProvider };
export default useDashboard;

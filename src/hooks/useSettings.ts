import { useContext } from 'react';
import { SettingsContext } from '../contexts/SettingsContext';

// -----------------------------cd -----------------------------------------

const useSettings = () => useContext(SettingsContext);

export default useSettings;

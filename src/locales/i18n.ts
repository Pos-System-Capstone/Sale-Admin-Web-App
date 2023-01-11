import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
//
import viLocales from './vi.json';
import enLocales from './en.json';

import vi from './vi/index';
import en from './en/index';

// ----------------------------------------------------------------------

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translations: { ...enLocales, ...en } },
      vi: { translations: { ...viLocales, ...vi } }
    },
    lng: localStorage.getItem('i18nextLng') || 'vi',
    fallbackLng: 'vi',
    debug: false,
    ns: ['translations'],
    defaultNS: 'translations',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

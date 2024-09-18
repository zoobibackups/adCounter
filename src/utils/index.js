import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as resources from './translations/resources';
i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    ...Object.entries(resources).reduce(
      (acc, [key, value]) => (
        {
          ...acc,
          [key]:{
            translation:value,
          },
        }),
        {},
    )
  },
  lng: 'en',
  fallbackLng: ['en','de','zh','fr','de','hi','iw','it','ja','ko','pt-PT','es'],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

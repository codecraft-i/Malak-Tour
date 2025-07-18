// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Har bir til uchun JSON fayllarini import qilamiz
import translationEN from './locales/en/translation.json';
import translationUZ from './locales/uz/translation.json';
import translationRU from './locales/ru/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEN },
      uz: { translation: translationUZ },
      ru: { translation: translationRU },
    },
    lng: 'uz',
    fallbackLng: 'uz',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
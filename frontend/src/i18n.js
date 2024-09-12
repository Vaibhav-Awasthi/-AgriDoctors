// src/i18n.js
import i18n from 'i18next'; // Import the i18n instance
import { initReactI18next } from 'react-i18next';
import translateEN from './local/en.json';
import translateHI from './local/hi.json';

// Define translation resources directly within the configuration
const resources = {
  en: {
    translation: translateEN,
  },
  hi: {
    translation: translateHI,
  },
  // Add more languages here if needed
};

i18n
  .use(initReactI18next) // Pass the i18n instance to react-i18next
  .init({
    resources, // Provide the translation resources
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language if the current language's translation is missing
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    // Optional: configure debug mode
    // debug: true,
  });

export default i18n;

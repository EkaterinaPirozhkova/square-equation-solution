import i18next from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

// Locales
import translationEN from "../locales/en/translation.json";
import translationRU from "../locales/ru/translation.json";

const resources = {
  en: {
    translation: translationEN,
  },
  ru: {
    translation: translationRU,
  },
};

i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    detection: {
      order: ["queryString", "cookie"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

if (localStorage.getItem("language") == null)
  localStorage.setItem("language", "tr");

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  lng: localStorage.getItem("language"),
  resources: {
    en: {
      translations: require("./Locales/en/translations.json"),
    },
    tr: {
      translations: require("./Locales/tr/translations.json"),
    },
  },
  ns: ["translations"],
  defaultNS: "translations",
});

i18n.languages = ["en", "tr"];

export default i18n;

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './en.json'
import km from './km.json'

export const LANGS = {
  en: { label: 'English', native: 'English', flag: '/flags/en.svg', dir: 'ltr' },
  km: { label: 'Khmer', native: 'ខ្មែរ', flag: '/flags/km.svg', dir: 'ltr' },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      km: { translation: km },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'km'],
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'khode-lang',
      caches: ['localStorage'],
    },
    interpolation: { escapeValue: false },
    returnObjects: true,
  })

// Keep <html lang> in sync so font + selectors react correctly.
const applyHtmlLang = (lng) => {
  const code = (lng || 'en').split('-')[0]
  document.documentElement.setAttribute('lang', LANGS[code] ? code : 'en')
}
applyHtmlLang(i18n.language)
i18n.on('languageChanged', applyHtmlLang)

export default i18n

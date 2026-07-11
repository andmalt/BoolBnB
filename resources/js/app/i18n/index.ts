import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import it from './it'
import en from './en'

export const LANGUAGES = ["it", "en"] as const

const savedLanguage = localStorage.getItem("language")

i18n
    .use(initReactI18next)
    .init({
        resources: {
            it: { translation: it },
            en: { translation: en },
        },
        lng: savedLanguage && LANGUAGES.includes(savedLanguage as any) ? savedLanguage : "it",
        fallbackLng: "it",
        interpolation: {
            // react already escapes values
            escapeValue: false,
        },
    })

i18n.on("languageChanged", (lng) => {
    localStorage.setItem("language", lng)
    document.documentElement.lang = lng
})

document.documentElement.lang = i18n.language

export default i18n

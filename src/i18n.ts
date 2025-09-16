import i18n from 'i18next'
import HttpApi from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
i18n
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        debug: false,
        // ns: [
        //     'main',
        //     'header_and_footer',
        //     'contect_us'
        // ],
        // backend: {
        //     loadPath: "/locales/{{lng}}/{{ns}}.json",
        //     allowMultiLoading: true
        // },
        // interpolation: {
        //     escapeValue: false
        // },
        detection: {
            order: ['localStorage', 'querystring', 'cookie', 'navigator'],
            caches: ['localStorage', 'cookie'],
            lookupLocalStorage: 'i18nextLng',
            lookupCookie: 'i18nextLng'
        },
        react: {
            useSuspense: true
        }
    });


// Normalize language code after detection
i18n.on('languageChanged', (lng) => {
    const normalizedLng = lng.split('-')[0];
    if (normalizedLng !== lng) {
        i18n.changeLanguage(normalizedLng);
    }
});

export default i18n;
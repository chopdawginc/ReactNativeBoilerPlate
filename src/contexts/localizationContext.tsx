import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import i18n from 'i18next'
import { KEYS } from '@enums'
import { en, fr } from '../languages'
import { useAsyncStorage } from '@hooks'
import { LocalizationContextType, ProviderProps } from '@types'
import { initReactI18next, useTranslation } from 'react-i18next'

// Initialize i18n
const resources = {
    en: { translation: en },
    fr: { translation: fr },
}

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    })

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined)

export const useLocalization = () => {
    const context = useContext(LocalizationContext)
    if (!context) {
        throw new Error('useLocalization must be used within a LocalizationProvider')
    }
    return context
}

export const LocalizationProvider: React.FC<ProviderProps> = ({ children }) => {
    const { t, i18n } = useTranslation()
    const { fetchAsync, saveAsync } = useAsyncStorage()
    const [currentLanguage, setCurrentLanguage] = useState<string>(i18n.language)

    useEffect(() => {
        getSavedLanguage()
    }, [])

    const getSavedLanguage = useCallback(async () => {
        const fetchCurrentLangauge: any = await fetchAsync(KEYS.LANGUAGE)
        if (fetchCurrentLangauge) {
            setCurrentLanguage(fetchCurrentLangauge)
            i18n.changeLanguage(fetchCurrentLangauge)
        }
    }, [])

    // useEffect(() => {
    //     setCurrentLanguage(i18n.language)
    // }, [i18n.language])

    const changeLanguage = async (lng: string) => {
        i18n.changeLanguage(lng)
        await saveAsync(KEYS.LANGUAGE, lng)
    }

    return (
        <LocalizationContext.Provider value={{
            t,
            changeLanguage,
            currentLanguage,
        }}>
            {children}
        </LocalizationContext.Provider>
    )
} 

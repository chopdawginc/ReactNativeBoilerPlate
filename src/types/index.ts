import { TextStyle, ViewStyle } from 'react-native'
import React from 'react'
import { PermissionStatus } from 'react-native-permissions'

export type PermissionType = 'camera' | 'gallery' | 'location' | 'contacts' | 'notifications'

export interface PermissionsState {
    camera: PermissionStatus
    gallery: PermissionStatus
    location: PermissionStatus
    contacts: PermissionStatus
    notifications: PermissionStatus
}

export interface AsyncStorageHook<T> {
    fetchAsync: (key: string) => Promise<T | null>
    saveAsync: (key: string, value: T) => Promise<void>
    deleteAsync: (key: string) => Promise<void>
}

export interface UseSearchHandlers {
    search: string
    handleSearch: (text: string) => void
}

export type Timestamp = {
    seconds: number
    nanoseconds?: number
}

export type DateFormatOptions = {
    weekday?: 'long' | 'short' | 'narrow'
    era?: 'long' | 'short' | 'narrow'
    year?: 'numeric' | '2-digit'
    month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow'
    day?: 'numeric' | '2-digit'
    hour?: 'numeric' | '2-digit'
    minute?: 'numeric' | '2-digit'
    second?: 'numeric' | '2-digit'
    timeZoneName?: 'long' | 'short'
}

export interface ThemeContextProps {
    currentTheme: string
    THEME_COLOR: any
    toggleTheme: Function
}

export interface LocalizationContextType {
    t: (key: string, options?: any) => string
    changeLanguage: (lng: string) => void
    currentLanguage: string
}

export interface ProviderProps {
    children: React.ReactNode
}

export interface ButtonProps {
    text: string
    style?: ViewStyle
    onPress?: Function
    isLoading?: Boolean
    textStyle?: TextStyle
}

import { useCallback } from 'react'
import { AsyncStorageHook } from '@types'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const useAsyncStorage = <T>(): AsyncStorageHook<T> => {

    // Get value from AsyncStorage
    const fetchAsync = useCallback(async (key: string): Promise<T | null> => {
        try {
            const item = await AsyncStorage.getItem(key)
            return item ? JSON.parse(item) : null
        } catch (e) {
            console.error(`Failed to fetch item with key "${key}":`, e)
            return null
        }
    }, [])

    // Set value to AsyncStorage
    const saveAsync = useCallback(async (key: string, value: T): Promise<void> => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(key, jsonValue)
        } catch (e) {
            console.error(`Failed to save item with key "${key}":`, e)
        }
    }, [])

    // Remove value from AsyncStorage
    const deleteAsync = useCallback(async (key: string): Promise<void> => {
        try {
            await AsyncStorage.removeItem(key)
        } catch (e) {
            console.error(`Failed to delete item with key "${key}":`, e)
        }
    }, [])

    return {
        fetchAsync,
        saveAsync,
        deleteAsync,
    }
} 

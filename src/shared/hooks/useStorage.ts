import { useCallback } from 'react'
import { StorageHook } from '@types'
import { mmkvService } from '@services'

/**
 * Storage hook using MMKV for high-performance storage operations
 * @returns StorageHook with get, set, and remove methods
 */
const useStorage = <T>(): StorageHook<T> => {

    // Get value from MMKV storage
    const get = useCallback(async (key: string): Promise<T | null> => {
        try {
            return mmkvService.getItem<T>(key)
        } catch (e) {
            console.error(`Failed to get item with key "${key}":`, e)
            return null
        }
    }, [])

    // Set value to MMKV storage
    const set = useCallback(async (key: string, value: T): Promise<void> => {
        try {
            mmkvService.setItem(key, value)
        } catch (e) {
            console.error(`Failed to set item with key "${key}":`, e)
        }
    }, [])

    // Remove value from MMKV storage
    const remove = useCallback(async (key: string): Promise<void> => {
        try {
            mmkvService.removeItem(key)
        } catch (e) {
            console.error(`Failed to remove item with key "${key}":`, e)
        }
    }, [])

    return {
        get,
        set,
        remove,
    }
}

export default useStorage

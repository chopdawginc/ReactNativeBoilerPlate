import { Platform } from 'react-native'
import { useState, useEffect } from 'react'
import { isIOS } from '@utils'
import { PERMISSION } from '@constant'
import { PermissionType, PermissionsState } from '@types'
import { request, check, PERMISSIONS, RESULTS, PermissionStatus } from 'react-native-permissions'

// 
// This custom hook can be used to ask for user permissions, you just have to pass the type of Permission
// you want to ask for. It can mange all of the permission mentioned in the //* "PermissionType"
//

export const usePermissions = () => {
    const [permissions, setPermissions] = useState<PermissionsState>({
        camera: RESULTS.UNAVAILABLE,
        gallery: RESULTS.UNAVAILABLE,
        location: RESULTS.UNAVAILABLE,
        contacts: RESULTS.UNAVAILABLE,
        notifications: RESULTS.UNAVAILABLE,
    })

    useEffect(() => {
        checkPermissions()
    }, [])

    const checkPermissions = async () => {
        const camera = await checkPermission(PERMISSION.CAMERA)
        const gallery = await checkPermission(PERMISSION.GALLERY)
        const location = await checkPermission(PERMISSION.LOCATION)
        const contacts = await checkPermission(PERMISSION.CONTACTS)
        const notifications = await checkPermission(PERMISSION.NOTIFICATIONS)

        setPermissions({ camera, gallery, location, contacts, notifications })
    }

    const checkPermission = async (type: PermissionType): Promise<PermissionStatus> => {
        switch (type) {
            case PERMISSION.CAMERA:
                return isIOS()
                    ? await check(PERMISSIONS.IOS.CAMERA)
                    : await check(PERMISSIONS.ANDROID.CAMERA)
            case PERMISSION.GALLERY:
                return isIOS()
                    ? await check(PERMISSIONS.IOS.PHOTO_LIBRARY)
                    : await checkGalleryPermission()
            case PERMISSION.LOCATION:
                return isIOS()
                    ? await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
                    : await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
            case PERMISSION.CONTACTS:
                return isIOS()
                    ? await check(PERMISSIONS.IOS.CONTACTS)
                    : await check(PERMISSIONS.ANDROID.READ_CONTACTS)
            case PERMISSION.NOTIFICATIONS:
                await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
            default:
                return RESULTS.UNAVAILABLE
        }
    }

    const checkGalleryPermission = async (): Promise<PermissionStatus> => {
        const platformVersion = typeof Platform.Version === 'string'
            ? parseInt(Platform.Version, 10)
            : Platform.Version

        if (platformVersion >= 33) {
            return await check(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES)
        } else {
            return await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
        }
    }

    const requestPermission = async (type: PermissionType) => {
        let result: PermissionStatus
        switch (type) {
            case PERMISSION.CAMERA:
                result = isIOS()
                    ? await request(PERMISSIONS.IOS.CAMERA)
                    : await request(PERMISSIONS.ANDROID.CAMERA)
                break
            case PERMISSION.GALLERY:
                result = isIOS()
                    ? await request(PERMISSIONS.IOS.PHOTO_LIBRARY)
                    : await requestGalleryPermission()
                break
            case PERMISSION.LOCATION:
                result = isIOS()
                    ? await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
                    : await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
                break
            case PERMISSION.CONTACTS:
                result = isIOS()
                    ? await request(PERMISSIONS.IOS.CONTACTS)
                    : await request(PERMISSIONS.ANDROID.READ_CONTACTS)
                break
            case PERMISSION.NOTIFICATIONS:
                await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
                break
            default:
                return
        }

        setPermissions((prev) => ({ ...prev, [type]: result }))
    }

    const requestGalleryPermission = async (): Promise<PermissionStatus> => {
        const platformVersion = typeof Platform.Version === 'string'
            ? parseInt(Platform.Version, 10)
            : Platform.Version

        if (platformVersion >= 33) {
            return await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES)
        } else {
            return await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
        }
    }

    return {
        permissions,
        requestPermission,
    }
} 

import React from 'react'
import useProfile from '../hooks/useProfile'
import EditProfileScreen from '../screens/EditProfileScreen'

const EditProfileContainer = () => {
    const { user, updateProfile } = useProfile()

    return <EditProfileScreen user={user} onUpdateProfile={updateProfile} />
}

export default EditProfileContainer

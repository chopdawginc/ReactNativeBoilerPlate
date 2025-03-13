import React from 'react'
import useProfile from '../hooks/useProfile'
import ProfileScreen from '../screens/ProfileScreen'

const ProfileContainer = () => {
  const { user } = useProfile()

  return <ProfileScreen user={user} />
}

export default ProfileContainer

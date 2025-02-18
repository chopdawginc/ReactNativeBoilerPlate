import { useEffect, useState } from 'react'
import ProfileService from '../services/ProfileService'

const useProfile = () => {
  const [user, setUser] = useState<{ name: string } | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const data = await ProfileService.getProfile()
      setUser(data)
    }
    fetchUser()
  }, [])

  const updateProfile = async (newData: { name: string }) => {
    await ProfileService.updateProfile(newData)
    setUser(newData) // Update local state
  }

  return { user, updateProfile }
}

export default useProfile

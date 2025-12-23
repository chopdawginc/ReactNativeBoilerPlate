import { useEffect, useState } from 'react'
import { ProfileService } from '@services'

const useProfile = () => {
  const [user, setUser] = useState<{ name: string } | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const data = await new ProfileService().getProfile()
      setUser(data)
    }
    fetchUser()
  }, [])

  const updateProfile = async (newData: { name: string }) => {
    await new ProfileService().updateProfile(newData)
    setUser(newData) // Update local state
  }

  return { user, updateProfile }
}

export default useProfile

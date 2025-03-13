import axios from 'axios'

class ProfileService {
  async getProfile() {
    const response = await axios.get('https://api.example.com/profile')
    return response.data
  }

  async updateProfile(newData: { name: string }) {
    await axios.put('https://api.example.com/profile', newData)
  }
}

export default ProfileService
 

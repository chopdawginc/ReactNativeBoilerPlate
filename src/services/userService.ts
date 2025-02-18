// userService.ts
import BaseService from './baseService'
import { User } from '../collections/user'
import { FIREBASE_COLLECTION } from '@constant'

export default class UserService extends BaseService<User> {
  constructor() {
    super(FIREBASE_COLLECTION.USERS)
  }

  // Add custom operations specific to the User schema

  async findById(id: string): Promise<User | null> {
    return await this.read(id) as User
  }

  async findByEmail(email: string): Promise<User | null> {
    const snapshot = await this.collection.where('email', '==', email).get()
    if (snapshot.empty) {
      return null
    }
    return snapshot.docs[0].data() as User
  }
}

// userService.ts
import Firestore from '@react-native-firebase/firestore'
import { BaseService } from './BaseService';
import { User } from '../collections/user';

export class UserService extends BaseService<User> {
  constructor(firestore: Firestore) {
    super(firestore, 'users');
  }

  // Add custom operations specific to the User schema

  async findByEmail(email: string): Promise<User | null> {
    const snapshot = await this.collection.where('email', '==', email).get();
    if (snapshot.empty) {
      return null;
    }
    return snapshot.docs[0].data() as User;
  }
}

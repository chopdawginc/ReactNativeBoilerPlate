// userService.ts
import BaseService from './baseService';
import {User} from '../collections/user';
import {FIREBASE_COLLECTION, FIRESTORE_FILTER} from '@constant';
import {query as fsQuery, orderBy as fsOrderBy} from '@react-native-firebase/firestore';

export default class UserService extends BaseService<User> {
  constructor() {
    super(FIREBASE_COLLECTION.USERS);
  }

  // Add custom operations specific to the User schema

  async findById(id: string): Promise<User | null> {
    return (await this.read(id)) as User;
  }

  async findByEmail(email: string): Promise<User | null> {
    const results = await this.where('email', email);
    if (!results || results.length === 0) {
      return null;
    }
    return results[0] as User;
  }

  listUsersQuery = () => {
    return fsQuery(this.collectionRef, fsOrderBy(FIRESTORE_FILTER.CREATED_AT, 'desc'));
  };
}

// user.ts
import {Timestamp} from '@react-native-firebase/firestore';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Timestamp;
}

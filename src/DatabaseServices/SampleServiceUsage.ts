// // main.ts
// import Firestore from '@react-native-firebase/firestore'
// import { UserService } from './UserService';
// import { User } from '../collections/user';

// const firestore = new Firestore();
// const userService = new UserService(firestore);

// // Example usage
// (async () => {
//   // Create a new user
//   const newUser: User = {
//     id: '1',
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//     createdAt: new Date(),
//   };
//   await userService.create(newUser);

//   // Read a user by ID
//   const user = await userService.read('1');
//   console.log(user);

//   // Update a user
//   await userService.update('1', { name: 'Jane Doe' });

//   // List all users
//   const users = await userService.list();
//   console.log(users);

//   // Custom operation: Find user by email
//   const foundUser = await userService.findByEmail('john.doe@example.com');
//   console.log(foundUser);

//   // Delete a user
//   await userService.delete('1');
// })();

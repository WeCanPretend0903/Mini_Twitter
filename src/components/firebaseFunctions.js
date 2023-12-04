import { getFirestore, collection, addDoc, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';

// Function to add a user to Firebase
export const addUserToFirebase = async (userData) => {
  const db = getFirestore();
  const usersCollection = collection(db, 'users');

  try {
    await addDoc(usersCollection, userData);
    console.log('User added to Firebase:', userData);
  } catch (error) {
    console.error('Error adding user to Firebase:', error);
  }
};

// Function to delete a user from Firebase
export const deleteUserFromFirebase = async (userId) => {
  const db = getFirestore();
  const userRef = doc(db, 'users', userId);

  try {
    await deleteDoc(userRef);
    console.log('User deleted from Firebase');
  } catch (error) {
    console.error('Error deleting user from Firebase:', error);
  }
};

// Function to get all users from Firebase
export const getUsersFromFirebase = async () => {
  const db = getFirestore();
  const usersCollection = collection(db, 'users');

  try {
    const querySnapshot = await getDocs(usersCollection);
    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log('Users retrieved from Firebase:', users);
    return users;
  } catch (error) {
    console.error('Error getting users from Firebase:', error);
    return [];
  }
};

// Function to warn a user in Firebase (analogous to setting a flag or attribute)
export const warnUserInFirebase = async (userId) => {
  const db = getFirestore();
  const userRef = doc(db, 'users', userId);

  try {
    await userRef.update({ warned: true });
    console.log('User warned in Firebase');
  } catch (error) {
    console.error('Error warning user in Firebase:', error);
  }
};

// Function to get warned users from Firebase
export const getWarnedUsersFromFirebase = async () => {
  const db = getFirestore();
  const usersCollection = collection(db, 'users');
  const warnedUsersQuery = query(usersCollection, where('warned', '==', true));

  try {
    const querySnapshot = await getDocs(warnedUsersQuery);
    const warnedUsers = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log('Warned users retrieved from Firebase:', warnedUsers);
    return warnedUsers;
  } catch (error) {
    console.error('Error getting warned users from Firebase:', error);
    return [];
  }
};

// Other functions for updating, deleting, or fetching data from Firebase can be defined similarly

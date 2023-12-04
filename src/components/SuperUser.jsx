import React, { useEffect, useState } from 'react';
import { getAuth, deleteUser } from 'firebase/auth';
import { getDatabase, ref, remove, set } from 'firebase/database';

const SuperUser = () => {
  const [users, setUsers] = useState([]);

  const auth = getAuth();
  const db = getDatabase();

  useEffect(() => {
    // Fetch all users on component mount
    fetchAllUsers();
  }, []);

  const fetchAllUsers = () => {
    // Fetch users from Firebase Realtime Database
    const usersRef = ref(db, 'users');
    const userList = [];
    usersRef.on('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const userData = childSnapshot.val();
        userList.push({ id: childSnapshot.key, ...userData });
      });
      setUsers(userList);
    });
  };

  const handleDeleteUser = async (userId) => {
    try {
      // Delete user from Firebase Authentication
      await deleteUser(auth, userId);

      // Delete user data from Realtime Database
      const userRef = ref(db, `users/${userId}`);
      remove(userRef);

      // Fetch updated user list after deletion
      fetchAllUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleWarnUser = async (userId) => {
    try {
      // Perform a warning action using Realtime Database
      const userRef = ref(db, `users/${userId}`);
      // Update a 'warning' field for the user
      await set(userRef, { warning: true });

      // Optionally, perform other actions after warning
    } catch (error) {
      console.error('Error warning user:', error);
    }
  };

  return (
    <div>
      <h1>Super User Dashboard</h1>
      <h2>User Management</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <span>{user.username}</span>
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
            <button onClick={() => handleWarnUser(user.id)}>Warn</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuperUser;

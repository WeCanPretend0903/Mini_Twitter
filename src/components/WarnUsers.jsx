import React, { useState, useEffect } from 'react';
import { warnUserInFirebase, getUsersFromFirebase } from './firebaseFunctions';

const WarnUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users when the component mounts
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getUsersFromFirebase();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleWarnClick = async (userId) => {
    try {
      await warnUserInFirebase(userId);
      // Refresh the user list after warning a user
      const updatedUsers = await getUsersFromFirebase();
      setUsers(updatedUsers);
      console.log('User warned successfully.');
    } catch (error) {
      console.error('Error warning user:', error);
    }
  };

  return (
    <div>
      <h2>Warn Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} -{' '}
            <button onClick={() => handleWarnClick(user.id)}>Warn</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WarnUsers;

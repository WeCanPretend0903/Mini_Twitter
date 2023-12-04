import React, { useEffect, useState } from 'react';
import { getUsersFromFirebase } from './firebaseFunctions';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersFromFirebase = await getUsersFromFirebase();
        setUsers(usersFromFirebase);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ViewUsers;

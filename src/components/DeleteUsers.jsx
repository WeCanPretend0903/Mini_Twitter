import React, { useState } from 'react';
import { deleteUserFromFirebase } from './firebaseFunctions';

const DeleteUsers = () => {
  const [userIdToDelete, setUserIdToDelete] = useState('');

  const handleInputChange = (e) => {
    setUserIdToDelete(e.target.value);
  };

  const handleDeleteUser = () => {
    deleteUserFromFirebase(userIdToDelete);
    setUserIdToDelete('');
  };

  return (
    <div>
      <h2>Delete User</h2>
      <input
        type="text"
        placeholder="Enter User ID to Delete"
        value={userIdToDelete}
        onChange={handleInputChange}
      />
      <button onClick={handleDeleteUser}>Delete User</button>
    </div>
  );
};

export default DeleteUsers;

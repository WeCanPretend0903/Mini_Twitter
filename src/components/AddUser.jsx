import React, { useState } from 'react';
import { addUserToFirebase } from './firebaseFunctions';

const AddUser = () => {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    // other user details
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = () => {
    addUserToFirebase(newUser);
    // Clear the form after adding the user
    setNewUser({
      name: '',
      email: '',
      // other user details
    });
  };

  return (
    <div>
      <h2>Add User</h2>
      <form>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={newUser.name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={newUser.email}
          onChange={handleInputChange}
        />
        {/* Other input fields for user details */}
        <button type="button" onClick={handleAddUser}>
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUser;

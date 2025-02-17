// frontend/src/components/UserManagement.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState({});

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get('http://localhost:5000/api/admin/users', config);
      setUsers(response.data);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch users.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = (id, newRole) => {
    setSelectedRole(prev => ({ ...prev, [id]: newRole }));
  };

  const updateUserRole = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const role = selectedRole[id];
      await axios.put(`http://localhost:5000/api/admin/users/${id}/role`, { role }, config);
      alert('Role updated successfully.');
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert('Failed to update user role.');
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, config);
      alert('User deleted successfully.');
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert('Failed to delete user.');
    }
  };

  return (
    <div className="user-management">
      <h3>User Management</h3>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Current Role</th>
            <th>Change Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.email}</td>
              <td>{user.role || 'buyer'}</td>
              <td>
                <select 
                  value={selectedRole[user._id] || user.role || 'buyer'} 
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                >
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td>
                <button onClick={() => updateUserRole(user._id)}>Update Role</button>
                <button onClick={() => deleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
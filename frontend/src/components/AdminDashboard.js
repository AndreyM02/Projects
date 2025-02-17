import UserManagement from './UserManagement';
import ProductAssignment from './ProductAssignment';
import { useState } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="tab-buttons">
        <button 
          onClick={() => setActiveTab('users')}
          className={activeTab === 'users' ? 'active' : ''}
        >
          User Management
        </button>
        <button 
          onClick={() => setActiveTab('products')}
          className={activeTab === 'products' ? 'active' : ''}
        >
          Product Assignment
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 'users' ? <UserManagement /> : <ProductAssignment />}
      </div>
    </div>
  );
};

export default AdminDashboard;
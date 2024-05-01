import '../css/SessionCreate.css';
import '../css/ViewUser.css';
import React, { useEffect, useState } from 'react';
import { Input, message, Cascader } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RouteStore from '../store/RouteStore';


import { adminUsers } from '../model/Student';
export default function ViewUser() {
    const nav = useNavigate()

    const [users, setUsers] = useState<adminUsers[]>([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get<adminUsers[]>('http://localhost:8088/api/admin/getAllUsers');
          setUsers(response.data);
        } catch (error) {
          console.error('Error fetching user data', error);
        }
      };
  
      fetchData();
    }, []);
  
    const handleDeleteUser = async (userId: number) => {
      try {
        await axios.delete(`http://localhost:8088/api/admin/deleteUser/${userId}`);
        // Remove the deleted user from the local state
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        message.success('Delete user successful')
      } catch (error) {
        console.error('Error deleting user', error);
        message.error('Error deleting user')
      }
    };
  
    return (
      <div>
        <div className="header">
          <h1>View Accounts</h1>
        </div>
        <div className="lineHolder">
          <div className="line"></div>
        </div>
  
        <div className="session-create-page">
          <div className="formContent">
            <div className='table-container'>
              <table className='accountTable'>
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Role</th>
                    <th>Avatar ID</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td>{user.id}</td>
                      <td>{user.username}</td>
                      <td>{user.password}</td>
                      <td>{user.role}</td>
                      <td>{user.avatarID}</td>
                      <td>
                        <button className="deleteButton" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
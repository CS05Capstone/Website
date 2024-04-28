import '../css/SessionCreate.css';
import React, { useEffect, useState } from 'react';
import { Input, message, Cascader } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RouteStore from '../store/RouteStore';

import { addedUser, adminValidationErrors } from '../model/Student';

export default function AddUser() {
    const nav = useNavigate()
    function finishAdd() {
        message.success('Add user successful')
        nav('/addUser')
    }

    function failedAdd() {
        message.error('Add user Failed. Reapeated username')
    }
  
    const [errors, setErrors] = useState<adminValidationErrors>({});
    const [user, setUser] = useState<addedUser>({
        username: "",
        password: "",
        role: "caseWorker"
    });

    const options = [
        {
          label: 'Case Worker',
          value: 'caseWorker',
        },
        {
          label: 'Young Person',
          value: 'user',
        },
      ];

    async function handleSubmit(event: React.FormEvent){
        let validationErrors: adminValidationErrors = {};
        event.preventDefault();
        try {
            if (!user.password) {
                validationErrors.password = "password is required!";
            }

            if(!user.username) {
                validationErrors.username = "username is required!";
            }

            if(user.role != "caseWorker" && user.role != "user") {
                validationErrors.username = "Invalid user role!";
            }

            if (Object.keys(validationErrors).length) {
                setErrors(validationErrors);
            
                setTimeout(() => {
                    setErrors({});
                }, 2000); // If the icon is active, set the color to green
                return; // This will stop form submission
            }
            console.log(user)
            const response = await axios.post('http://localhost:8088/api/admin/addUser'
            , user);

            console.log(response)
            if (response.status === 200) {
                // Successful Processing Response
                console.log(response.data);  // Print the returned data
                finishAdd();
                // If necessary, other operations can be performed here, such as navigating to a new page or displaying a success message
            } else {
                // Handling Error Responses
                console.error("Failed to add a user.");
            }


        } catch (error) {
            console.error("There was an error adding the user.", error);
            setErrors(validationErrors)
            failedAdd();
        }
    };

      
  
  return (
    <div>
        <div className="header">
            <h1>Add User</h1>
        </div>
        <div className='lineHolder'>
            <div className="line"></div>
        </div>
        

        <div className="session-create-page">
            <div className='formContent'>
            <form className="session-form" onSubmit={handleSubmit}>
                    <div className="form-item">
                        <label>User name</label>
                        <Input 
                            placeholder="Enter user name"
                            value={user.username}
                            onChange={e => setUser(prev => ({ ...prev, username: e.target.value }))}
                            style={{border: '1px solid darkblue'}} required />
                        {errors.username && <p className="error-message"style={{marginLeft:'10px'}}>{errors.username}</p>}    
                    </div>

                    <div className="form-item">
                        <label>User Password</label>
                        <Input 
                            placeholder="Enter user password"
                            value={user.password}
                            onChange={e => setUser(prev => ({ ...prev, password: e.target.value }))}
                            style={{border: '1px solid darkblue'}} 
                        />
                        {errors.password && <p className="error-message" style={{marginLeft:'10px'}}>{errors.password}</p>} 
                    </div>

                    <div className="form-item">
                        <label >Role</label>
                        <Cascader 
                        options={options} 
                        defaultValue={['caseWorker']} 
                        allowClear={false}
                        onChange={value => setUser({ ...user, role: value[0].toString() })}
                        />
                    </div>

                    <div className="form-item">
                        <button type="submit" style={{marginLeft: '500px'}}>Submit</button>
                    </div>
                </form>

            </div>
        </div>

      
    </div>
  )
  
}

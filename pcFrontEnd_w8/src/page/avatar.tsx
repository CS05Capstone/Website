import React, { useEffect, useState } from 'react';
import '../css/Avatar.css';
import { useNavigate } from 'react-router-dom';
import RouteStore from '../store/RouteStore';
import { load } from '../router/MyRouter';
import {Route} from '../model/Student';
import { useLocation } from 'react-router-dom';
import { Link, Navigate, Outlet, } from 'react-router-dom'
import gameIcon from '../resources/11.png';
import axios from 'axios';
import { Button, message } from 'antd';

interface SkillItem {
    name: string; 
    progress: number;
  }
  
  const skills: SkillItem[] = [
    // static strength
    { name: 'Run', progress: 80 },
    { name: 'Jump', progress: 70 },
    { name: 'Help', progress: 90 },
];


export default function AvatarPage(){
    const [avatarIndex, setAvatarIndex] = useState(RouteStore.currentAvatarID);
    const [avatarURL, setAvatarURL] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8088/findAvatar/${avatarIndex}`)
            .then(response => {
                setAvatarURL(response.data);
            })
            .catch(error => {
                console.error("Error fetching avatar:", error);
            });
    }, [avatarIndex]);
    function handlePrevAvatar() {
        setAvatarIndex((prev: number) => (prev - 2 + 4) % 4 + 1); // Current index is -1, but stay within the range of 1-4
    }

    function handleNextAvatar() {
        setAvatarIndex((prev: number) => prev % 4 + 1); // The current index +1, but stay within the range of 1-4
    }
    // function handleSetAvatar() {
    //     // Send Post to the backend
    //     axios.put('http://localhost:8088/setAvatar', {
    //         avatarID: avatarIndex,
    //         userID: RouteStore.currentUserId // Assuming you have the current user's ID in RouteStore. If not, please adjust accordingly based on the actual situation.
    //     })
    //     .then(response => {
    //         console.log("Avatar set successfully:", response.data);
    //     })
    //     .catch(error => {
    //         console.error("Error setting avatar:", error);
    //     });
    
    //     //  set the avatarID in RouteStore to the selected avatarIndex
    //     RouteStore.currentAvatarID = avatarIndex;
    // }
    function handleSetAvatar() {
        // Construct URL
        const url = `http://localhost:8088/updateAvatar/?id=${RouteStore.currentUserId}&avatarID=${avatarIndex}`;
    
        // Send Put to the backend
        axios.put(url)
        .then(response => {
            message.success('set successful')
            console.log("Avatar updated successfully:", response.data);
        })
        .catch(error => {
            console.error("Error updating avatar:", error);
        });
        
        // Set the avatarID in RouteStore to the selected avatar Index
        RouteStore.currentAvatarID = avatarIndex;
        RouteStore.currentAvatar = avatarURL;
        localStorage.setItem('currentAvatar', JSON.stringify(avatarURL))
        localStorage.setItem('currentAvatarID', JSON.stringify(avatarIndex))
    }
    
    // Static page
    return (
        <div className="Avatar-container">
           
        
            <Outlet />  {/* Placeholder for nested routes */}
            <div className="header">
            < img src={gameIcon} style={{ position: 'relative',  verticalAlign: 'middle'  ,left: '50px'}}/>
                <Link to="/game"> <Button id="gameStartButton">Game Start</Button></Link>
            </div>
            <div className="line"></div>
            
            <div className="content">
                <div className="left-content">
                    {/* Avatar */}
                    <img src={avatarURL} alt="Avatar" className="avatar" />
                </div>
                <div className="right-content">
                    {/* basic information */}
                    <h1>{RouteStore.currentUserName}</h1>
                    <p>Young Person</p>
                    {/* <div style={{display:"flex",justifyContent: "space-between"}}>
                        <button onClick={handlePrevAvatar}>←</button>
                        <button onClick={handleNextAvatar}>→</button>
                    </div> */}
                    <div style={{display:"flex",justifyContent: "space-between"}}>
                        <button onClick={handlePrevAvatar}>←</button>
                        <button onClick={handleSetAvatar}>Confirm</button>
                        <button onClick={handleNextAvatar}>→</button>
                    </div>

        
                
                </div>
            </div>
            <div className="Skill-container">
                <div className="skills">
                    {/* strengths skill list */}
                    {skills.map((skill, index) => (
                    <div className="skill-item" key={index}>
                        <div className="skill-name">{skill.name}</div>
                        <div className="progress-bar">
                        <div
                            className="progress"
                            style={{ width: `${skill.progress}%` }}
                        ></div>
                        </div>
                        <div className="progress-value">{skill.progress}</div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
      );
}
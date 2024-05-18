import React, { useEffect, useState } from 'react';
import '../css/LogAvatar.css';
import { useNavigate } from 'react-router-dom';
import RouteStore from '../store/RouteStore';
import { load } from '../router/MyRouter';
import {Route} from '../model/Student';
import { useLocation } from 'react-router-dom';

import axios from 'axios';
import { SessionModel } from '../model/SessionModel';

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


export default function LogAvatarPage(){
    const nav = useNavigate()
    function navLogModule(session: SessionModel) {
        const routeExists = RouteStore.dynamicRoutes.some(route => route.path === '/log/Module');
        if (!routeExists) {
            RouteStore.addRoute({
                path: '/log/Module',
                element: 'logModule',
            });
            localStorage.setItem(
              'dynamicRoutes',
              JSON.stringify(RouteStore.dynamicRoutes)
            )
            console.log('log module creator')
        }else{
          console.log('already exist')
        }
        nav('/log/Module', { state: { session } });
      }


    const [avatarURL, setAvatarURL] = useState("");

    const location = useLocation();
    const session: SessionModel = location.state.session;
    
    useEffect(() => {
        axios.get(`http://localhost:8088/findAvatar/1`) // Read the avatar at index 1
            .then(response => {
                setAvatarURL(response.data);
            })
            .catch(error => {
                console.error("Error fetching avatar:", error);
            });
    }, []);


    // static page
    return (
        <div className="Avatar-container">
            <div className="header">
                <h1>Avatar</h1>
            </div>
            <div className="line"></div>
            <div className="top">
                    <div className="logAvatar-buttons">
                        <button className="buttonAvatar" disabled={true} 
                            style={{
                                color: 'white',
                                backgroundColor: '#002463'
                            }}>Strength</button>
                        <button className="buttonActivity" onClick={() => navLogModule(session)} 
                            style={{ 
                                color: '#002463',
                                backgroundColor: 'transparent',
                                transition: 'backgroundColor 0.3s'
                            }}>Activities</button>
                    </div>
            </div>
            <div className="content">
                <div className="left-content">
                    {/* avatar */}
                    <img src={avatarURL} alt="Avatar" className="avatar" />
                </div>
                <div className="right-content">
                    {/* basic information */}
                    <h1>{session.serviceUser}</h1>
                    <p>Young Person</p>
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
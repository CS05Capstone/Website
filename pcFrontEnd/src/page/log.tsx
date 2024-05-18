import React, { useEffect, useState } from 'react';
//import '../css/Session.css';
import '../css/Log.css';
import { useNavigate } from 'react-router-dom';
import RouteStore from '../store/RouteStore';
import { load } from '../router/MyRouter';
import {Route} from '../model/Student';
import SessionCreate from '../page/sessionCreate';
import axios from 'axios';
import { SessionModel } from '../model/SessionModel';
import { Modal, Pagination } from 'antd';
import { ArrowRightOutlined, CloseCircleOutlined } from '@ant-design/icons';
import Search from 'antd/es/input/Search';
import { BarsOutlined } from '@ant-design/icons';

export default function LogPage() {
  
  const nav = useNavigate()

  function navLogAvatar(session: SessionModel) {
    const routeExists = RouteStore.dynamicRoutes.some(route => route.path === '/log/Avatar');
    if (!routeExists) {
        RouteStore.addRoute({
            path: '/log/Avatar',
            element: 'logAvatar',
        });
        localStorage.setItem(
          'dynamicRoutes',
          JSON.stringify(RouteStore.dynamicRoutes)
        )
        console.log('log avatar creator')
    }else{
      console.log('already exist')
    }
    nav('/log/Avatar', { state: { session } });
  }

  const [sessions, setSessions] = useState<SessionModel[]>([]);

  useEffect(() => {
    let url = ''
    if(RouteStore.currentUserRole === 'caseWorker'){
      url = `http://localhost:8088/api/sessions/byCaseworker/${RouteStore.currentUserId}`;
      console.log('is caseworker')
    }else{
      url = `http://localhost:8088/api/sessions/byTeenager/${RouteStore.currentUserName}`;
      console.log('is young person')
    }
  
    axios.get(url).then(response => {
      setSessions(response.data);
    
    }).catch(error => {
      console.error("Error fetching sessions:", error);
    });
  }, [RouteStore.currentUserId]);

  function getDayAbbreviation(dateString: string | number | Date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    return days[date.getDay()];
  }
  function formatDate(dateString: string | number | Date) {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}
  
  return (
    <div>
      <div className="header">
        <h1>Skill Log</h1>
      </div>
      <div className="line"></div>
      <div className="top">
            <div className="buttons">
            </div>
            <div className="log-search-container">
                <BarsOutlined />  
                <Search
                placeholder="Search for modules..."
                onSearch={value => console.log(value)}
                style={{ width: 200 }}
                />
            </div>
      </div>
      {/* Original session ends */}
      <div className="sessions">
            {sessions.map(session => (
                <div key={session.id} className="session-box" onClick={() => navLogAvatar(session)}>
                    <div className="session-info">
                        <div className="session-left-content">
                            <span className="session-title">{session.sessionName}</span>
                            <span className="session-caseworker">CaseWorker: {RouteStore.currentUserName}</span>
                            <span className="session-location">Location: {session.location}</span>
                        </div>
                        <div className="session-right-content">
                            <span className="session-date">{formatDate(session.sessionDate)}</span>
                            <span className="session-time">{session.startTime.split(':')[0] + ':' + session.startTime.split(':')[1]} - {session.endTime.split(':')[0] + ':' + session.endTime.split(':')[1]}</span>
                            <span className="session-day">{getDayAbbreviation(session.sessionDate)}</span>
                            <ArrowRightOutlined className="session-arrow-indicator" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
}

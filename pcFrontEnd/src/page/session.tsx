import React, { useEffect, useState } from 'react';
//import '../css/Session.css';
import '../css/SessionNew.css';
import { Routes, useNavigate } from 'react-router-dom';
import RouteStore from '../store/RouteStore';
import { load } from '../router/MyRouter';
import {Route} from '../model/Student';
import SessionCreate from '../page/sessionCreate';
import axios from 'axios';
import { SessionModel } from '../model/SessionModel';
import { Modal, Pagination } from 'antd';
import { ArrowRightOutlined, CloseCircleOutlined, DashOutlined } from '@ant-design/icons';
import Search from 'antd/es/input/Search';
import { BarsOutlined } from '@ant-design/icons';

export default function Session() {
  
  const nav = useNavigate()
  const [sessions, setSessions] = useState<SessionModel[]>([]);
  const ITEMS_PER_PAGE = 3; 
  const [currentPage, setCurrentPage] = useState(1);
  //edit logic:
  const [isEditing, setIsEditing] = useState(false);
  const paginatedSessions = sessions.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  function handlePageChange(page: React.SetStateAction<number>) {
    setCurrentPage(page);
  }

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [selectedSession, setSelectedSession] = useState<SessionModel>();
  const [searchQuery, setSearchQuery] = useState('');
  const filteredSessions = sessions.filter(session => session.sessionName.includes(searchQuery) && session.status === 'unfinished');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'none'>('none');
  function handleSortIconClick() {
    if (sortOrder === 'none' || sortOrder === 'desc') {
      setSessions(prevSessions => 
        [...prevSessions].sort((a, b) => b.sessionName.localeCompare(a.sessionName))
      );
      setSortOrder('asc');
    } else if (sortOrder === 'asc') {
      
      setSessions(prevSessions => 
        [...prevSessions].sort((a, b) => a.sessionName.localeCompare(b.sessionName))
      );
      setSortOrder('desc');
    }
  }
  
  const handleSessionClick = async (session: SessionModel) => {
    // If the role is caseWorker，navigate to the session
    if (RouteStore.currentUserRole === 'caseWorker') {
      navSessionContent(session);
      return;
    }
  
    setSelectedSession(session);
    setIsModalVisible(true);
  };

  function navCreatSession() {
    // check if the path has the existence of route '/session/create'
    const routeExists = RouteStore.dynamicRoutes.some(route => route.path === '/session/create');

    // if not exists, add the new path
    if (!routeExists) {
        RouteStore.addRoute({
            path: '/session/create',
            element: 'sessionCreate',
        });
        localStorage.setItem(
          'dynamicRoutes',
          JSON.stringify(RouteStore.dynamicRoutes)
        )
        console.log('create session creator')
    }else{
      console.log('already exist')
    }

    // navigate to '/session/create'
    nav('/session/create');
   
  }

  function navSessionContent(session: SessionModel) {
    const routeExists = RouteStore.dynamicRoutes.some(route => route.path === '/session/sessionContent');

    if (!routeExists) {
        RouteStore.addRoute({
            path: '/session/sessionContent',
            element: 'sessionContent',
        });
        localStorage.setItem(
          'dynamicRoutes',
          JSON.stringify(RouteStore.dynamicRoutes)
        )
        console.log('create session sessionContent')
    }else{
      console.log('already exist')
    }

    nav('/session/sessionContent', { state: { session } });
   
  }
  
  // get the data from backend when loading the components
  useEffect(() => {
    // const url = `http://localhost:8088/api/sessions/${RouteStore.currentUserId}`;
    let url = ''
    if(RouteStore.currentUserRole === 'caseWorker'){
      url = `http://localhost:8088/api/sessions/byCaseworker/${RouteStore.currentUserId}`;
      console.log('is caseworker')
    }else{
      url = `http://localhost:8088/api/sessions/byTeenager/${RouteStore.currentUserName}`;
      console.log('is young person')
    }
  
    // your backend API endpoint
    axios.get(url).then(response => {
      setSessions(response.data);
    
    }).catch(error => {
      console.error("Error fetching sessions:", error);
    });
  }, [RouteStore.currentUserId]); // empty depedency array means thie effect only loading for the first time running
  const handlePasswordChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setEnteredPassword(e.target.value);
    setPasswordError(false); // Reset the password error when user types
  };

  const handleOk = () => {
    if (selectedSession && enteredPassword === selectedSession.password) {
      setIsModalVisible(false);
      navSessionContent(selectedSession);
      
    } else {
      setPasswordError(true);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEnteredPassword(""); // Reset entered password when modal is closed
  };

  
  function handleEditButtonClick() {
    setIsEditing(prev => !prev);  // change the edit state
  }
  async function handleDeleteSession(e: React.MouseEvent<HTMLSpanElement, MouseEvent>, sessionId: number | undefined) {
    e.stopPropagation();  //stop the events bubble to onclick event of outer div

    try {
      
        const response = await axios.delete(`http://localhost:8088/api/sessions/${sessionId}`);
        if (response.status === 204) {
            // remove this session from the sessions list in the frontend
            const updatedSessions = sessions.filter(session => session.id !== sessionId);
            setSessions(updatedSessions);
            // update paginatedSessions
            const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
            const endIndex = startIndex + ITEMS_PER_PAGE;
            const newPaginatedSessions = updatedSessions.slice(startIndex, endIndex);
            // paginatedSessions = newPaginatedSessions;
        } else {
            console.error("Failed to delete session from backend.");
        }
    } catch (error) {
        console.error("There was an error deleting the session.", error);
    }
  }

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
        <h1>Sessions</h1>
      </div>
      <div className="line"></div>
      {/* <div className="buttons">
        <button className="button create" onClick={navCreatSession}>Create</button>
        <button className="button edit">Edit</button>
      </div> */}
      <div>
        <div className="buttons">
            {RouteStore.currentUserRole === 'caseWorker' && (
                <>
                    <button className="button create" onClick={navCreatSession}>Create</button>
                    <button className="button edit" onClick={handleEditButtonClick}>Delete</button>

                </>
            )}
        </div>
        <div className="session-search-container">
  
            {/* <BarsOutlined style={RouteStore.currentUserRole === 'caseWorker' ? { marginTop: '-70px' } : {}}/>   */}
            {/* <Search
              placeholder="Search for modules..."
              onSearch={value => console.log(value)}
              style={RouteStore.currentUserRole === 'caseWorker' ? { marginTop: '-70px' } : {}}
              
            /> */}
            {
              sortOrder === 'asc'
                ? <DashOutlined onClick={handleSortIconClick} style={RouteStore.currentUserRole === 'caseWorker' ? { marginTop: '-70px' } : {}}/>
                : <BarsOutlined onClick={handleSortIconClick} style={RouteStore.currentUserRole === 'caseWorker' ? { marginTop: '-70px' } : {}}/>
            }

            <Search
                placeholder="Search for modules..."
                onSearch={value => console.log(value)}
                onChange={e => setSearchQuery(e.target.value)}
                style={RouteStore.currentUserRole === 'caseWorker' ? { marginTop: '-70px' } : {}}
              />

          </div>
        </div>
      {/* <div className="sessions">
        {paginatedSessions.map(session => (
          <div key={session.sessionName} className="session-box" onClick={() => navSessionContent(session)}>
            <div className="session-form-mock">
            </div>
            <div className="session-info">
              <div className="session-name">{session.sessionName}</div>
              <div className="session-date">{session.sessionDate}</div>
            </div>
          </div>
        ))}
      </div> */}
           {/* {paginatedSessions.map(session => (
        <div key={session.sessionName} className="session-box" onClick={() => handleSessionClick(session)}>
          <div className="session-form-mock"></div>
          <div className="session-info">
            <div className="session-name">{session.sessionName}</div>
            <div className="session-date">{session.sessionDate}</div>
          </div>
        </div>
      ))} */}

      {/* 原版session */}
      {/* <div className="sessions">
 

        {paginatedSessions.map(session => (
          
          <div key={session.sessionName} className="session-box" onClick={() => handleSessionClick(session)}>
            {isEditing && (
              <CloseCircleOutlined className="delete-icon" onClick={(e) => handleDeleteSession(e, session.id)} />

            )}
            <div className="session-form-mock"></div>
            <div className="session-info">
              <div className="session-name">{session.sessionName}</div>
              <div className="session-date">{session.sessionDate}</div>
            </div>
          </div>
        ))}

        <Modal 
          title="Enter Password" 
          open={isModalVisible} 
          onOk={handleOk} 
          onCancel={handleCancel}
        >
          <input type="password" value={enteredPassword} onChange={handlePasswordChange} />
          {passwordError && <p style={{color: 'red'}}>Incorrect password!</p>}
        </Modal>
      </div> */}

      <div className="sessions">
            {filteredSessions.map(session => (
                <div key={session.id} className="session-box" onClick={() => handleSessionClick(session)}>
                    {isEditing && (
                        <CloseCircleOutlined className="delete-icon" onClick={(e) => handleDeleteSession(e, session.id)} />
                    )}
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
            <Modal 
                title="Enter Password" 
                open={isModalVisible} 
                onOk={handleOk} 
                onCancel={handleCancel}
            >
                <input type="password" value={enteredPassword} onChange={handlePasswordChange} />
                {passwordError && <p style={{color: 'red'}}>Incorrect password!</p>}
            </Modal>

      {/* <div className="pagination">
        <button 
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} 
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button 
          onClick={() => setCurrentPage(prev => Math.min(Math.ceil(sessions.length / ITEMS_PER_PAGE), prev + 1))} 
          disabled={currentPage * ITEMS_PER_PAGE >= sessions.length}
        >
          Next
        </button>
      </div> */}
      {/* <div className="pagination-center">
        <Pagination
          current={currentPage}
          onChange={handlePageChange}
          total={sessions.length}
          pageSize={ITEMS_PER_PAGE}
          showSizeChanger={false}
        />
      </div> */}




    </div>
  );
}

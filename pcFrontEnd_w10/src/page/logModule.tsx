import React, { useEffect, useState } from 'react';
import '../css/LogModule.css';
import leftArrow from '../resources/left-arrow-white.png';
import downArrow from '../resources/down-arrow-white.png';
import { useNavigate } from 'react-router-dom';
import RouteStore from '../store/RouteStore';
import { useLocation } from 'react-router-dom';

import axios from 'axios';
import { Activity, Module,ExpandedState } from '../model/Module';
import Search from 'antd/es/input/Search';
import { BarsOutlined } from '@ant-design/icons';
import { SessionModel } from '../model/SessionModel';

export default function LogModulePage(){ 
    const nav = useNavigate()
    let newModules : Module[];
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

      const location = useLocation();
      const session: SessionModel = location.state.session;

    // Here, a temporary list of activities within all modules is listed.

    // navActivities(1,1)
    
    const [modules, setModules] = useState<Module[]>([]); //store module data
    
    useEffect(() => {
      const fetchData = async () => {
          try {
              const modulesResponse = await axios.get<Module[]>('http://localhost:8088/api/modules');
              const tempModules = await Promise.all(
                  modulesResponse.data.map(async m => {
                      try {
                          const activitiesResponse = await axios.get<Activity[]>(`http://localhost:8088/api/modules/${m.id}/activities`);
                          return {
                              ...m,
                              activities: activitiesResponse.data,
                          };
                      } catch (innerError) {
                          console.warn(`Error fetching activities for module ${m.id}:`, innerError);
                          return {
                              ...m,
                              activities: [],
                          };
                      }
                  })
              );
             
          
              setModules(tempModules.slice(0,2));
  
              const initialStates: ExpandedState[] = tempModules.map(module => ({
                  moduleId: module.id,
                  isExpanded: false,
              }));
              setExpandedStates(initialStates);
              
          } catch (error) {
              console.error("Error fetching data:", error);
          }
      };
      fetchData();
  }, []);
  
    
   
    
    // Initialize the folding state
    const initialStates: ExpandedState[] = modules.map(module => ({
      moduleId: module.id,
      isExpanded: false,
    }));
    const [expandedStates, setExpandedStates] = useState<ExpandedState[]>(initialStates);


    //fold function
    const toggleModule = (moduleId: number) => {
      setExpandedStates(prevStates => {
        const newState = prevStates.find(state => state.moduleId === moduleId);
        if (newState) {
          return prevStates.map(state =>
            state.moduleId === moduleId
              ? { ...state, isExpanded: !state.isExpanded }
              : state
          );
        } else {
          return [...prevStates, { moduleId, isExpanded: true }];
        }
      });
    };
    console.log(modules)
    return (
      <div className='Module-container'>
        
        <div className="header">
          <h1>Completed Activities</h1>
        </div>
        <div className="line"></div>
        <div className='top'>
            <div className="logModule-buttons">
                <button className="buttonAvatar" onClick={() => navLogAvatar(session)} 
                style={{ 
                    color: '#002463',
                    backgroundColor: 'transparent',
                    transition: 'backgroundColor 0.3s'
                }}>Strength</button>

                <button className="buttonActivity" disabled={true}
                style={{
                    color: 'white',
                    backgroundColor: '#002463'
                 }}>Activities</button>
            </div>
            <div className="logModule-search-container">
                <BarsOutlined />  
                <Search
                placeholder="Search for modules..."
                onSearch={value => console.log(value)}
                style={{ width: 200 }}
                />
            </div>
        </div>
        {modules.map(module => {
          const moduleExpandedState = expandedStates.find(state => state.moduleId === module.id);
          const isExpanded = moduleExpandedState ? moduleExpandedState.isExpanded : false;
          return (
            <div className={`module ${isExpanded ? 'expanded' : ''}`} key={module.id}>
              <div className="module-header" onClick={() => toggleModule(module.id)}>
                {module.name}
              
                <img
                        src={isExpanded ? downArrow : leftArrow}
                        alt={isExpanded ? 'Down Arrow' : 'Left Arrow'}
                        style={{ width: '35px', height: '35px', float: 'right'}}
                    />
                {/* <span className="arrow-icon">{isExpanded ? '▼' : '◀'}</span> */}
              </div>
              {isExpanded &&  module && module.activities &&(
                <div className="module-content">
                  <ul>
                    {module.activities.map(activity => (
                      <li key={activity.id}
                        //   onClick= {() => navActivities(module.id,activity.id)}
                          style={{ cursor: 'pointer' }}
                      >
                        {activity.name}
                      </li>  
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );   
}
import React, { useEffect, useState } from 'react';
import '../css/Module.css';
import leftArrow from '../resources/left-arrow-white.png';
import downArrow from '../resources/down-arrow-white.png';


import RouteStore from '../store/RouteStore';
import { Link, Navigate, Outlet, Route, useNavigate } from 'react-router-dom'
import gameIcon from '../resources/11.png';
import { Button, Modal, Input, notification, message } from 'antd';

import axios from 'axios';
import { Activity, Module,ExpandedState } from '../model/Module';
import Search from 'antd/es/input/Search';
import { BarsOutlined,DashOutlined } from '@ant-design/icons';
 
export default function ModulePage(){ 
  // Handle activity add
  const [showModal, setShowModal] = useState(false);
  const [activityName, setActivityName] = useState('');
  const [addActivityMode, setAddActivityMode] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);
  // State for the modal's input
    const nav = useNavigate()
    function navActivities(moduleID: number, activityID: number) { 
      const routeExists = RouteStore.dynamicRoutes.some(route => route.path === `/api/modules/${moduleID}/activities/${activityID}`);
      // If it does not exist, add a new route
      if (!routeExists) {
          RouteStore.addRoute({
              path: `/api/modules/${moduleID}/activities/${activityID}`,
              element: 'moduleActivity'
          });
          localStorage.setItem(
            'dynamicRoutes',
            JSON.stringify(RouteStore.dynamicRoutes)
          )
          console.log('create activity in module')
      }else{
        console.log('already exist')
      }

      // navigate to the corresponding page
      nav(`/api/modules/${moduleID}/activities/${activityID}`);
    }

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
  
              setModules(tempModules);
  
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
  }, [showModal]);
  
    
    // initialize the folding state
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
    const [searchQuery, setSearchQuery] = useState('');
    const filteredModules = modules.filter(module => module.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const [isSorted, setIsSorted] = useState(false);
    const sortedModules = isSorted 
    ? [...modules].sort((a, b) => a.name.localeCompare(b.name))
    : modules;

    const filteredModulesByAplha = sortedModules.filter(module => 
        module.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const handleSortToggle = () => {
        setIsSorted(prevState => !prevState);
    };
    
    


    // Modal open/close handlers
    const handleOk = async () => {
        if (selectedModuleId !== null) {
            console.log(selectedModuleId)
            // const newActivity = {
            //     name: activityName,
            //     moduleId1: selectedModuleId,
            //     tips: '',
            //     introduction: 'introduction',
            // };
            const newActivity = {
              tips: '',  // You can set it to a specific value or leave it as an empty string
              module: {
                  id: selectedModuleId,  // Assuming you already have the variable selectedModuleId
              },
              name: activityName,
              moduleId1 : selectedModuleId
          };
          
          

            try {
                const response = await axios.post('http://localhost:8088/api/activities/create', newActivity);
                if (response.data === 'Activity created successfully.') {
     
                    message.success('Activity added!')
                } else {
                  message.error('Failed to add activity.');
                }
            } catch (error) {
                message.error('Error while adding activity.')
                
            }

            setShowModal(false);
            setActivityName('');
            setAddActivityMode(false);
        }
    };

    const handleCancel = () => {
        // setAddActivityMode(false)
        setShowModal(false);
        
        setActivityName('');

        console.log('closing'+showModal)
    };

    const handleActivityNameChange = (e: { target: { value: React.SetStateAction<string>; }; })=> {
      setActivityName(e.target.value);
    };

    return (
      
      <div className='Module-container'>

        <div className="header">
          <h1>Modules</h1>
        </div>
        <div className="line"></div>
        <Button className="buttonModule" onClick={() => setAddActivityMode(prevState => !prevState)}>Add Activity</Button>


        
        <div className="search-container">
          {/* <BarsOutlined />   */}
          {/* <Search
            placeholder="Search for modules..."
            onSearch={value => console.log(value)}
            style={{ width: 200 }}
          /> */}
          {isSorted 
                ? <DashOutlined onClick={handleSortToggle} /> 
                : <BarsOutlined onClick={handleSortToggle} />
            }
          <Search
              placeholder="Search for modules..."
              onSearch={value => console.log(value)}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ width: 200 }}
          />
        </div>
        {filteredModulesByAplha.map(module => {
          const moduleExpandedState = expandedStates.find(state => state.moduleId === module.id);
          const isExpanded = moduleExpandedState ? moduleExpandedState.isExpanded : false;
          return (
            // <div className={`module ${isExpanded ? 'expanded' : ''}`} key={module.id}>
            
            <div className={`module ${isExpanded ? 'expanded' : ''} ${addActivityMode ? 'highlight' : ''}`} key={module.id} 
                  onClick={() => {
                    try {
                      if (addActivityMode) {
                        setSelectedModuleId(module.id);
                        console.log(selectedModuleId)
                        console.log(module.id)
                        setShowModal(true);
                        setAddActivityMode(false);
                    } else {
                        toggleModule(module.id);
                    }
                    
                    } catch (error) {
                        console.error("Error occurred during onClick:", error);
                    }
                }}
          
                >
              <Modal 
                    title="Add New Activity" 
                    visible={showModal} 
                    mask={false}
                    maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
                    onOk={handleOk} 
                    onCancel={handleCancel}
                    footer={[
                        <Button onClick={handleCancel}>
                            Cancel
                        </Button>,
                        <Button type="primary" onClick={handleOk}>
                            Submit
                        </Button>
                    ]}
                >
                    <input 
                        type="text" 
                        value={activityName} 
                        onChange={handleActivityNameChange} 
                        placeholder="Enter activity name"
                    />
                    {/* You can also add any error messages or additional elements in this modal here, similar to your example with passwordError */}
                </Modal>

              {/* <div className="module-header" onClick={() => toggleModule(module.id)}> */}
              <div className="module-header" > 
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
                          onClick= {() => navActivities(module.id,activity.id)}
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
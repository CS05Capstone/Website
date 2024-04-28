import React, { useEffect, useState } from 'react';
import { Button, Input, Typography,Divider, Select } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/SessionContent.css';
import { SessionModel } from '../model/SessionModel';
import RouteStore from '../store/RouteStore';
import logo from '../resources/logo.png';
import axios from 'axios';
import { Activity, Module, ModuleWithActivities } from '../model/Module';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const { Option } = Select;



export default function SessionContent() {
    const location = useLocation();
    console.log(location.state,"Aaaa")
    const session: SessionModel = location.state.session;
    const [showGame, setShowGame] = useState(false);
    const [avatar, setAvatar] = useState('');
    const { Text } = Typography;
    const nav = useNavigate()
    function navActivity(session: SessionModel) {
        const routeExists = RouteStore.dynamicRoutes.some(route => route.path === '/session/sessionContent/activity');
    
        if (!routeExists) {
            RouteStore.addRoute({
                path: '/session/sessionContent/activity',
                element: 'activityPage',
            });
            localStorage.setItem(
              'dynamicRoutes',
              JSON.stringify(RouteStore.dynamicRoutes)
            )
            console.log('create activity page')
        }else{
          console.log('already exist')
        }
        console.log(modulesAndActivities)
        nav('/session/sessionContent/activity', { state: { session,modulesAndActivities } });
       
      }
    //to store the module and activity the has been mapped
    const [modulesAndActivities, setModulesAndActivities] = useState<ModuleWithActivities[]>([]);
    //to ensure we select the module, otherwise we will not show the activities. this ensures we cannot view activities without selecting modules
    const [selectedModule, setSelectedModule] = useState<number>();
    //store the activities belonging to the module
    const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
    //used to store the selected activities. The main reason is that refresh actitivites should reselect the module
    const [selectedActivity, setSelectedActivity] = useState<number>();
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8088/api/sessions/${session.id}/details`);
                console.log(response)
                console.log(session.id)
                //get all activities data
                let activities = response.data.activities;
                //get no repeated modules
                let uniqueModuleIds = [...new Set(activities.map((activity: { module_id_1: any; }) => activity.module_id_1))];
              
                // uniqueModuleIds = [1,2]
                //according to the module id, take the module from backend
                const modules = await Promise.all(uniqueModuleIds.map(moduleId => {
                    return axios.get(`http://localhost:8088/api/modules/${moduleId}`);
                }));
                //Mapp all module and activities, through activities to see if the module id is consistent
                let combinedData = modules.map((module, index) => {
                    return {
                        module: module.data,
                        activities: activities.filter((activity: { module_id_1: unknown; }) => activity.module_id_1 === uniqueModuleIds[index])
                    };
                });
                setModulesAndActivities(combinedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [session.id]);
    console.log(session)
    //handle with the changing of module
    const handleModuleChange = (moduleId:number) => {
        //set the selected module
        setSelectedModule(moduleId);
        setSelectedActivity(undefined); // clear the present selected activity
        let matchingActivities = modulesAndActivities.find(ma => ma.module.id === moduleId)?.activities || [];
        //set the corresponding activities
        setFilteredActivities(matchingActivities);
    };

    const [preconcern, setPreconcern] = useState("issue concering")
    // When the component is mounted, retrieve the 'preconcern' state from localStorage
    useEffect(() => {
        const savedPreconcern = localStorage.getItem('preconcern');
        if (savedPreconcern) {
            setPreconcern(savedPreconcern);
        } else {
            setPreconcern("issue concering");
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setPreconcern(newValue);

        // Save it to localStorage every time the preconcern state changes.
        localStorage.setItem('preconcern', newValue);
    };

    //handle with the outcome:
    // const [learningOutcome, setLearningOutcome] = useState<string>("");
    const [learningOutcomes, setLearningOutcomes] = useState<any[]>([]);

    useEffect(() => {
        const url = `http://localhost:8088/api/sessions/${session.id}/learning-outcomes`;
        
        axios.get(url)
            .then(response => {
                setLearningOutcomes(response.data)
            })
           
    }, [session.id]);


    
    useEffect(()=>{
        let userId = session.serviceUser;
        const url = `http://localhost:8088/avatar/${userId}`;
        axios.get(url)
            .then(response => {
                console.log(response.data,"AAAAA")
                setAvatar(response.data)
            })
    },[])



    const handleOutcomeChange = async (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
        const newOutcomes = [...learningOutcomes];
        newOutcomes[index].content = e.target.value;
        setLearningOutcomes(newOutcomes);
        console.log(learningOutcomes)

        const url = `http://localhost:8088/api/learning-outcomes/update/${session.id}`;
        const response = await axios.put(url, learningOutcomes);

        console.log(response.data)
    };
    //handle with the websocket
    const [webSocketConnected, setWebSocketConnected] = useState(false);
    
    useEffect(() => {
        // create the WebSocket connection
        const socket = new SockJS('http://localhost:8088/ws');
        const stompClient = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                setWebSocketConnected(true);
                
                stompClient.subscribe('/topic/sessionUpdates', (message) => {
                    if (message.body && Number(message.body) === session.id) {
                        // if we receive the sessionId and it is same as the present session ID, re-get the data from the backend
                        fetchSessionData();
                    }
                });
            },
            onDisconnect: () => {
                setWebSocketConnected(false);
            }
        });

        stompClient.activate();

        return () => {
            if (stompClient.connected) {
                stompClient.deactivate();
            }
        };
    }, [session.id]);
    
    const fetchSessionData = () => {
        const url = `http://localhost:8088/api/sessions/${session.id}/learning-outcomes`;
        axios.get(url)
        .then(response => {
            const outcomeIds = response.data.id; // assume it's a id array
            console.log(outcomeIds)
            console.log(response.data)
            setLearningOutcomes(response.data)
            // return Promise.all(outcomeIds.map((id: any) => 
            //     axios.get(`http://localhost:8088/api/learning-outcomes/${id}`)
            // ));
        })
    };


    return (
        <div className="form-container">
            {/* <div>{learningOutcome}</div> */}


            <div className="session-content">
                <div className="header-section">
                    <img src={logo} alt="Logo" className="form_logo"/>
                    <div className="session-id">Session No. {session.id}</div>
                </div>
                <div className="blue-line"></div>
    
                <div className="form-section">
                    <div className="section-part">
                        <div className="avatar-and-info">
                        <div 
                            className="avatar-placeholder" 
                            
                            style={{ backgroundImage: `url(${avatar})` }}
                        ></div>

                            <div className="info-section">
    
                                <div className="input-container">
                                    <label className="input-label">Young person name:</label>
                                    <Input defaultValue={session.serviceUser} placeholder="Name" />
                                </div>
    
                                <div className="input-container">
                                    <label className="input-label">Caseworker Name:</label>
                                    <Input defaultValue={RouteStore.currentUserName.split(' ')[0]} placeholder="CaseWorker" />
                                </div>
    
                                <div className="input-container">
                                    <label className="input-label">Session date:</label>
                                    <Input defaultValue={session.sessionDate} placeholder="Date" />
                                </div>
    
                                <div className="horizontal-inputs">
    
                                    <div className="input-container">
                                        <label className="input-label">Start time:</label>
                                        <Input defaultValue={session.startTime} placeholder="StartTime" />
                                    </div>
    
                                    <div className="input-container">
                                        <label className="input-label">Location:</label>
                                        <Input defaultValue={session.location} placeholder="Location" />
                                    </div>
    
                                </div>
                            </div>
                        </div>
                    </div>
                    <Divider></Divider>
                    <div className="section-part">
                        <div className="text-and-input">
                            <p className="blue-text">Today we will be talking about</p>
                            <div 
                                style={{ 
                                    height: '100px', 
                                    border: '1px solid #d9d9d9', 
                                    padding: '5px', 
                                    overflowY: 'auto' 
                                }}
                            >
                                {learningOutcomes.map((outcome, index) => (
                                    <div key={index} style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
                                        <span style={{ marginRight: '5px' }}>{index + 1}.</span> 
                                        <Input.TextArea 
                                            style={{ 
                                                border: '1px', 
                                                width: 'calc(100% - 30px)',
                                                resize: 'none', 
                                                padding: '2px' 
                                            }} 
                                            value={outcome.content}
                                            rows={1}
                                            autoSize={{ minRows: 1, maxRows: 3 }}
                                            onChange={(e) => handleOutcomeChange(e, index)}
                                            disabled={RouteStore.currentUserRole !== 'caseWorker'} // Disable if currentRole is not a case worker
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>





                    </div>

    
                    <div className="section-part">
                        <div className="text-and-input">
                            <p className="blue-text">Any issues or concerns that need to be addressed first?</p>
                            <Input.TextArea 
                                style={{height:'100px'}}
                                value={preconcern} // Control this component using 'value' instead of 'defaultValue'.
                                placeholder="Issues or concerns"
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>



                    <div className="section-part">
                        <div className="start-section">
                            <p className="blue-text">Are we ready to proceed to the interactive activities?</p>
                            <Button type="primary" onClick={(e) => {
                                e.preventDefault();
                                // show game screen
                                // setShowGame(true);
                                navActivity(session)
                            }}>Let's Start!</Button>
                        </div>
                    </div>
    
                    <div className="Session-container">
                        {showGame ? (
                            <iframe 
                                src="game/index.html" 
                                width="800" 
                                height="600"
                                frameBorder="0"
                            ></iframe>
                        ) : null}
                    </div>

                </div>
            </div>
        </div>
    );
}

function nav(arg0: string, arg1: { state: { session: SessionModel; }; }) {
    throw new Error('Function not implemented.');
}


import '../css/SessionCreate.css';


import React, { useEffect, useState } from 'react';
import { Input, DatePicker, TimePicker, Select, message, Form, Button, Modal,Cascader } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LearningOutcome, SessionModel,validationErrors } from '../model/SessionModel';
import axios from 'axios';
import { Activity, Module } from '../model/Module';
import RouteStore from '../store/RouteStore';
import { fetchLearningOutcome } from './sessionCreateFunctions';

export default function SessionCreate() {
  const { Option } = Select;
  const { Item } = Form;
  const nav = useNavigate()
  function backButton(){
    nav('/session')
  }
  function finishCreate() {
    message.success('Create session successful')
    nav('/session')
  }
  
  //handle with the error
  const [errors, setErrors] = useState<validationErrors>({});

  const [session, setSession] = useState<SessionModel>({
    sessionName: "",
    sessionDate: "",
    startTime: "",
    endTime: "",
    serviceUser: "",
    password: "",
    location: "",
    // learningOutcome: "",
    createdByCaseworkerId: 2,
    learningOutcomeSelecting: [],
  });
  //show outcomes
  const [selectedOutcomes, setSelectedOutcomes] = useState<number[]>([]);
  const [addedActivityId, setAddedActivityId] = useState<number[]>([]);
  //handle cascade
    const [cascaderOptions, setCascaderOptions] = useState<any[]>([]);

      //store type of the outcome
  const [learningOutcomes, setLearningOutcomes] = useState<LearningOutcome[]>([]);
    const handleAdd = async () => {
        
        if (selectedModule && selectedActivities.length > 0) {
            const module = modules.find(m => m.id === Number(selectedModule));
            if (module) {
                const existingModuleOptionIndex = cascaderOptions.findIndex(opt => opt.value === module.id);
                const activitiesForModule = activities.filter(a => selectedActivities.includes(a.id));
                const newActivities = activitiesForModule.map(a => ({
                    value: a.id,
                    label: a.name,
                }));
    
                if (existingModuleOptionIndex !== -1) {
                    // Determine whether these new activities already exist
                    const existingActivities = cascaderOptions[existingModuleOptionIndex].children;
    
                    const uniqueNewActivities = newActivities.filter(newAct => !existingActivities.some((existingAct: { value: number; }) => existingAct.value === newAct.value));
    
                    if (uniqueNewActivities.length === 0) {
                        // return if exist
                        console.log(cascaderOptions)
                        handleCancel();
                        return;
                    }
    
                    const updatedModuleOption = {
                        ...cascaderOptions[existingModuleOptionIndex],
                        children: [
                            ...existingActivities,
                            ...uniqueNewActivities
                        ]
                    };
                    const newCascaderOptions = [...cascaderOptions];
                    newCascaderOptions[existingModuleOptionIndex] = updatedModuleOption;
                    setCascaderOptions(newCascaderOptions);
                } else {
                    // If the module option doesn't exist, we create a new module option and add it to the Cascader options
                    const newOption = {
                        value: module.id,
                        label: module.name,
                        children: newActivities
                    };
                    setCascaderOptions(prevOptions => [...prevOptions, newOption]);
                }
                console.log('you selecte222d ' + selectedActivities)

                if (selectedActivities.length > 0) {
                    let allOutcomes = [...(session.learningOutcomeSelecting || [])]; // Clone current learning outcomes from state or set it as empty array
                    console.log(session.learningOutcomeSelecting,allOutcomes,"allOutcomesallOutcomesallOutcomes")
                    for (let activityId of selectedActivities) {
                        if(addedActivityId.includes(activityId)){
                            console.log('already inside continue...')
                            continue;
                        }else{
                            console.log(activityId)
                            console.log(addedActivityId)
                            const outcomeArray = await fetchLearningOutcome(activityId);
                            //store learning outcome
                            // if (outcomeArray) {
                            //     setLearningOutcomes(outcomeArray);
                            // } else {
                            //     console.log('Error: Could not fetch learning outcomes or data is missing.');
                            // }
                            if (outcomeArray) {
                                setLearningOutcomes(prevState => [...prevState, ...outcomeArray]);
                            } else {
                                console.log('Error: Could not fetch learning outcomes or data is missing.');
                            }

                            //拿去content
                            if (outcomeArray) {
                                const contents = outcomeArray.map(outcome => outcome.content);
                                allOutcomes.push(...contents);
                                //allOutcomes.push(...contents); // Spread operator to push each outcome into allOutcomes
                            } else {
                                console.log('outcome extract failed');
                            }
                            setAddedActivityId(prevState => [...prevState, activityId]);
                        }
                        
                    }
                
                    setSession(prev => ({ ...prev, learningOutcomeSelecting: allOutcomes })); // Set updated learning outcomes as the array
                }
                
            }
        } else {
            console.log('nothing selected');
        }
        console.log(cascaderOptions)
        handleCancel(); // Close modal dialog
    };
    
    //handle with the outcome logic
    // const [hasSelectedOutcome, setHasSelectedOutcome] = useState(false);

    const toggleOutcomeSelection = (index: number) => {
        if (selectedOutcomes.includes(index)) {
            setSelectedOutcomes(prev => prev.filter(i => i !== index));
        } else {
            setSelectedOutcomes(prev => [...prev, index]);
        }
        
    };
    

  //To handle the addition of module activity
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedModule, setSelectedModule] = useState(null);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [modules, setModules] = useState<Module[]>([]);
    const [selectedActivities, setSelectedActivities] = useState<number[]>([]);
    const handleActivitySelect = (activityId: number) => {
        setSelectedActivities(prevState => {
            if (prevState.includes(activityId)) {
                return prevState.filter(id => id !== activityId);
            } else {
                return [...prevState, activityId];
            }
        });
    };
    
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleModuleChange = async (value: React.SetStateAction<null>) => {
        setSelectedModule(value);
        
        // Retrieve the corresponding activities from the database based on the selected module ID
        try{
            const fetchedActivities = await axios.get<Activity[]>(`http://localhost:8088/api/modules/${value}/activities`);
            setActivities(fetchedActivities.data);
        }catch{
            setActivities([]);
        }
        
    };
    useEffect(() => {
        const fetchModules = async () => {
            try {
                const response = await axios.get<Module[]>('http://localhost:8088/api/modules');
                setModules(response.data);
            } catch (error) {
                console.error("Failed to fetch modules:", error);
            }
        };
    
        fetchModules();
    }, []);


    async function handleSubmit(event: React.FormEvent){
        let validationErrors: validationErrors = {};
        event.preventDefault();
        try {
            console.log(session.sessionName)
            console.log(session.startTime)
            console.log(session.sessionDate)
            console.log(session.endTime)
            console.log(session.serviceUser)
            console.log(session.password)
            console.log(session.location)
            // if (selectedOutcomes.length > 0) {
            //     setHasSelectedOutcome(true);
            // } else {
            //     setHasSelectedOutcome(false);
            // }
            
            if (!session.sessionName) {
                validationErrors.sessionName = "Session name is required!";
            }
        
            if (!session.serviceUser) {
                validationErrors.serviceUser = "Young person is required!";
            }

            if (!session.location) {
                validationErrors.location = "Location is required!";
            }

            if (!session.password) {
                validationErrors.password = "password is required!";
            }
            // if (!hasSelectedOutcome) {
            //     validationErrors.outcome = "please select at least one learning outcome!";
            // }
            if (selectedOutcomes.length > 0) {
                // ... 
                console.log(selectedOutcomes)
            } else {
                validationErrors.outcome = "please select at least one learning outcome!";
            }
            if (Object.keys(validationErrors).length) {
                setErrors(validationErrors);
            
                setTimeout(() => {
                    setErrors({});
                }, 2000);
                return;
            }
            session.createdByCaseworkerId = RouteStore.currentUserId
            console.log(selectedOutcomes)
            console.log(learningOutcomes)
            const payload = {
                session: session,
                cascaderData: cascaderOptions,
                learningOutcomes: selectedOutcomes.map(index => learningOutcomes[index].id)
            };
            console.log("123")
            console.log(payload)
            const response = await axios.post('http://localhost:8088/api/sessions'
            , payload);

            console.log(response.status)
            if (response.status === 201) {
                console.log(response.data); 
                finishCreate();
            } else {
                console.error("Failed to create session.");
            }
        } catch (error) {
            validationErrors.serviceUser = "Young Person Not Match"
            console.error("There was an error submitting the session.", error);
            setErrors(validationErrors)
        }
    };

      
   
    const [fromTime, setFromTime] = useState<any>(null);
    const [toTime, setToTime] = useState<any>(null);

    const disabledHoursForTo = () => {
        if (!fromTime) return [];
        let hours = [];
        for (let i = 0; i < fromTime.hour(); i++) {
            hours.push(i);
        }
        return hours;
    };

    const disabledMinutesForTo = (selectedHour: any) => {
        if (!fromTime || selectedHour !== fromTime.hour()) return [];
        let minutes = [];
        for (let i = 0; i < fromTime.minute(); i++) {
            minutes.push(i);
        }
        return minutes;
    };

    const disabledHoursForFrom = () => {
        if (!toTime) return [];
        let hours = [];
        for (let i = toTime.hour() + 1; i < 24; i++) {
            hours.push(i);
        }
        return hours;
    };

    const disabledMinutesForFrom = (selectedHour: any) => {
        if (!toTime || selectedHour !== toTime.hour()) return [];
        let minutes = [];
        for (let i = toTime.minute() + 1; i < 60; i++) {
            minutes.push(i);
        }
        return minutes;
    };
      
    const [allYoungPerson, setAllYoungPerson] = useState<any>();
    useEffect(() => {
        const url = `http://localhost:8088/user/findAll`;
        axios.get(url)
            .then(response => {
                console.log(response.data)
                
                // Use filter to select objects with the role 'user'.
                const filteredUsers = response.data.filter((user: { role: string; }) => user.role === "user");
                
                // set state for the selected users
                setAllYoungPerson(filteredUsers);
                
            })
    },[])
    
  return (
    <div>
        <div className="header">
            <h1>Create Session</h1>
        </div>
        <div className='lineHolder'>
            <button className='backButton' onClick={backButton}>Back</button>
            <div className="line"></div>
        </div>
        

        <div className="session-create-page">
            <div className='formContent'>
            <form className="session-form" onSubmit={handleSubmit}>
                    <div className="form-item">
                        <label>Session name</label>
                        <Input 
                            placeholder="Enter session name"
                            value={session.sessionName}
                            onChange={e => setSession(prev => ({ ...prev, sessionName: e.target.value }))}
                            style={{border: '1px solid darkblue'}} required />
                        {errors.sessionName && <p className="error-message"style={{marginLeft:'10px'}}>{errors.sessionName}</p>}    
                    </div>

                    {/* <div className="form-item">
                        <label>Session date</label>
                        <DatePicker 
                            style={{ marginRight: "10px" ,border: '1px solid darkblue'}}
                            //date ? date.format('YYYY-MM-DD') : ""
                            // onChange={date => setSession(prev => ({ ...prev, sessionDate: date?.format('YYYY-MM-DD') || "" }))}
                            onChange={date => setSession(prev => ({ ...prev, sessionDate: date ? date.format('YYYY-MM-DD') : "" }))}
                        />
                        <label>From</label>
                        <TimePicker 
                            format="HH:mm"
                            style={{ marginRight: "10px",border: '1px solid darkblue' }}
                            // onChange={time => setSession(prev => ({ ...prev, startTime: time?.format('HH:mm') || "" }))}
                            onChange={time => setSession(prev => ({ ...prev, startTime: time? time.format('HH:mm') : "" }))}
                            
                        />
                        
                        <label>To</label>
                        <TimePicker 
                            format="HH:mm" 
                            style={{border: '1px solid darkblue'}}
                            onChange={time => setSession(prev => ({ ...prev, endTime: time? time.format('HH:mm') : "" }))}
                        />
                    </div> */}
                    <div className="form-item">
                        <label>Session date</label>
                        <DatePicker 
                            style={{ marginRight: "10px", border: '1px solid darkblue' }}
                            onChange={date => setSession(prev => ({ ...prev, sessionDate: date ? date.format('YYYY-MM-DD') : "" }))}
                        />
                        <label>From</label>
                        <TimePicker 
                            format="HH:mm"
                            style={{ marginRight: "10px", border: '1px solid darkblue' }}
                            onChange={time => {
                                setSession(prev => ({ ...prev, startTime: time ? time.format('HH:mm') : "" }));
                                setFromTime(time);
                            }}
                            disabledHours={disabledHoursForFrom}
                            disabledMinutes={disabledMinutesForFrom}
                        />
                        <label>To</label>
                        <TimePicker 
                            format="HH:mm" 
                            style={{ border: '1px solid darkblue' }}
                            onChange={time => {
                                setSession(prev => ({ ...prev, endTime: time ? time.format('HH:mm') : "" }));
                                setToTime(time);
                            }}
                            disabledHours={disabledHoursForTo}
                            disabledMinutes={disabledMinutesForTo}
                        />
                    </div>

                    <div className="form-item">
                        {/* <label>Young person</label>
                        <Input 
                            placeholder="Enter user" 
                            value={session.serviceUser}
                            onChange={e => setSession(prev => ({ ...prev, serviceUser: e.target.value }))}
                            style={{ marginRight: "10px",border: '1px solid darkblue' }} 
                        /> */}
                        <label>Young person</label>
                        <Select 
                            placeholder="Select user" 
                            value={session.serviceUser}
                            onChange={value => setSession(prev => ({ ...prev, serviceUser: value }))}
                            style={{ width:'30vw'}}
                        >
                            {
                                // Display each username in allYoungPerson as an option
                                allYoungPerson?.map((person: { id: React.Key | null | undefined; username: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
                                    <Select.Option key={person.id} value={person.username}>
                                        {person.username}
                                    </Select.Option>
                                ))
                            }
                        </Select>
                        {errors.serviceUser && <p className="error-message"style={{marginLeft:'10px'}}>{errors.serviceUser}</p>} 
                        {/* The Location and Activity fields were not saved in the session state, so I'm leaving them unchanged. */}
                        <label>Location</label>
                        <Input placeholder="Enter location" 
                        value={session.location}
                        onChange={e => setSession(prev => ({ ...prev, location: e.target.value }))}
                        style={{border: '1px solid darkblue'}} />
                        {errors.location && <p className="error-message"style={{marginLeft:'10px'}}>{errors.location}</p>} 
                    </div>

                    <div className="form-item">
                        <label >Module Activities</label>
                        {/* <Select style={{ width: 120 }}>
                            <Option value="1">1</Option>
                            <Option value="2">2</Option>
                            <Option value="3">3</Option>
                            <Option value="4">4</Option>
                        </Select> */}
                        <Cascader options={cascaderOptions} placeholder="Please select module and activities" />

                        <Button onClick={showModal}>Add Module</Button>
            
                        <Modal
                            title="Select Module and Activities"
                            open={isModalVisible}
                            onCancel={handleCancel}
                            footer={null}
                            bodyStyle={{color: 'darkblue', padding: '20px'}}
                        >
                            <div className="deep-blue">
                                <label>Select Module:</label>
                                <div>
                                    <Select 
                                        style={{ width: 450, fontWeight: 'bold', textAlign: 'center' }} 
                                        onChange={handleModuleChange}
                                    >
                                        {modules.map(module => (
                                            <Option className="bold" key={module.id} value={module.id.toString()}>
                                                {module.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                            
                            <div style={{marginTop: '20px'}}>
                                <label>Select Activities:</label>
                                <div className="activities-wrapper">
                                    {activities.map(activity => (
                                        <div 
                                            key={activity.id} 
                                            className={`activity-item ${selectedActivities.includes(activity.id) ? 'activity-selected' : ''}`} 
                                            onClick={() => handleActivitySelect(activity.id)}
                                        >
                                            {activity.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div style={{marginLeft:'300px',marginTop:'20px'}}>
                                {[
                                    <Button key="back" onClick={handleCancel}>
                                        Cancel
                                    </Button>,
                                    <Button key="submit" type="primary" onClick={handleAdd}>
                                        Add
                                    </Button>,
                                ]}
                            </div>
                            
                        </Modal>

                    </div>

                    {/* The Learning Outcomes field was also not saved in the session state, so it's left unchanged. */}
                    <div className="form-item">
                        <label>Learning Outcomes</label>
           
                        <div className="learning-outcomes-container">
                            {session.learningOutcomeSelecting?.map((outcome, index) => (
                                <div
                                    key={index}
                                    className={`learning-outcome ${selectedOutcomes.includes(index) ? 'selected' : ''}`}
                                    onClick={() => toggleOutcomeSelection(index)}
                                >
                                    {outcome}
                                </div>
                            ))}
                        </div>
                        {/* If no outcome is selected, display a prompt message */}
                        {errors.outcome && <p className="error-message" style={{marginLeft:'10px'}}>{errors.outcome}</p>}

                    </div>

                    <div className="form-item">
                        <label>Session Password</label>
                        <Input 
                            placeholder="Enter session password"
                            value={session.password}
                            onChange={e => setSession(prev => ({ ...prev, password: e.target.value }))}
                            style={{border: '1px solid darkblue'}} 
                            type="number"
                        />
                        {errors.password && <p className="error-message" style={{marginLeft:'10px'}}>{errors.password}</p>} 
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

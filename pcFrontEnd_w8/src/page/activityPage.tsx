import { useLocation, useNavigate } from 'react-router-dom';
import { SessionModel } from "../model/SessionModel";
import logo from '../resources/logo.png';
import '../css/activityPage.css';
import { Button } from 'antd';
import { ForwardRefExoticComponent, RefAttributes, useEffect, useState } from 'react';
import { Activity, Module, ModuleWithActivities } from '../model/Module';
import axios from 'axios';
import { Select } from 'antd';
import { List, Space } from 'antd'; 
// import Icon from '@ant-design/icons';
import { CheckCircleOutlined, CiCircleOutlined, ClockCircleOutlined, LockOutlined, SyncOutlined, UnlockOutlined } from '@ant-design/icons'; // Import required icons
import Icon from '../store/Icon';
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';

const { Option } = Select;
export default function ActivityPage(){
    const location = useLocation();
    const session: SessionModel = location.state.session;
    console.log(location.state,"location.state")
    const modulesAndActivities: ModuleWithActivities[] = location.state.modulesAndActivities;
    const nav = useNavigate()
    console.log(session)
    console.log(modulesAndActivities)
    const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
    const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
    const filteredActivities = selectedModuleId ? modulesAndActivities.find(m => m.module.id === Number(selectedModuleId))?.activities || [] : [];
    
    //Set a status for each activity to track which icon is selected
    const [iconStates, setIconStates] = useState<{ [key: string]: { [type: string]: boolean } }>({});




    // const handleIconClick = (iconType: string, activityId: string) => {
    //     console.log(`Clicked on ${iconType} for activity ${activityId}`);
    //     // Handle your logic here
    //     setIconState(prevState => ({
    //         ...prevState,
    //         [activityId]: iconType
    //     }));
    // };
    const handleIconClick = (iconType: string, activityId: string) => {
        console.log(`Clicked on ${iconType} for activity ${activityId}`);
    
        setIconStates(prev => ({
            ...prev, 
            [activityId]: {
                ...prev[activityId],
                [iconType]: !(prev[activityId] && prev[activityId][iconType])
            }
        }));
    };
    
    const getIcon = (type: string, activityId: string) => {
        const isActive = iconStates[activityId] && iconStates[activityId][type];
        
        let IconComponent;
        let iconStyle: Record<string, any> = {}; // Define an object that can accept any attribute to store styles.

        
        switch(type) {
            case 'circle':
                IconComponent = isActive ? CheckCircleOutlined : ClockCircleOutlined;
                if (isActive) {
                    iconStyle.color = 'green'; // If the icon is active, set the color to green
                }
                break;
            case 'lock':
                IconComponent = isActive ? UnlockOutlined : LockOutlined;
                break;
            case 'repeat':
                IconComponent = SyncOutlined; // Assuming you just want color change
                if (isActive) {
                    iconStyle.color = 'blue';
                }
                break;
            default:
                return null;  // No icon for unknown type
        }
        
        return <IconComponent onClick={() => handleIconClick(type, activityId.toString())} style={iconStyle} />;
    };
    
    
    
    
    return (
        <div className="form-container">
            <div className="session-content">
                <div className="header-section">
                    <img src={logo} alt="Logo" className="form_logo"/>
                    <div className="session-id">Session No. {session.id}</div>
                </div>
                <div className="blue-line"></div>
                <Button  onClick={(e) => {
                                e.preventDefault();
                         
                                nav('/session/sessionContent', { state: { session } })
                }}>Back</Button> 
                <div className="module-selection">
                    <span style={{ marginRight: '100px' }}>Select a module:</span>  {/* Updated here */}
                    <Select
                        placeholder="Select a module"
                        style={{ width: 200 }}
                        value={selectedModuleId}
                        
                        onChange={(value) => setSelectedModuleId(value.toString())}
                    >
                        {modulesAndActivities.map(ma => (
                            <Option key={ma.module.id} value={ma.module.id.toString()}>{ma.module.name}</Option>
                        ))}
                    </Select>
                </div>


                {selectedModuleId && (
                    <div className="activity-list">
                        <span>Activity List:</span>
                        <List
                            itemLayout="horizontal"
                            dataSource={filteredActivities}
                            bordered={true}
                            style={{ width: '500px', marginTop:'20px' }}
                            renderItem={activity => (
                                <List.Item
                                    // actions={[
                                    //     <ClockCircleOutlined onClick={() => handleIconClick('circle', activity.id.toString())} />,
                                    //     <LockOutlined onClick={() => handleIconClick('lock', activity.id.toString())} />,
                                    //     <SyncOutlined onClick={() => handleIconClick('repeat', activity.id.toString())} />
                                    // ]}
                                    actions={[
                                        getIcon('circle', activity.id.toString()),
                                        getIcon('lock', activity.id.toString()),
                                        getIcon('repeat', activity.id.toString())
                                    ]}
                                >
                                    <List.Item.Meta
                                        title={activity.name}
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                )}

                <Button type="primary" style={{ marginTop: '200px', width: '200px',marginLeft: '450px'}}>View Young Person</Button>
            </div>
        </div>
    );
}

import React, { useEffect, useState } from 'react';
import '../css/Module.css';
import { useNavigate } from 'react-router-dom';
import RouteStore from '../store/RouteStore';
import { load } from '../router/MyRouter';
import {Route} from '../model/Student';
import { useLocation } from 'react-router-dom';

import axios from 'axios';
import { Activity, Module } from '../model/Module';
import Paragraph from 'antd/es/typography/Paragraph';
import { LearningOutcome } from '../model/SessionModel';
import { Button, Input, message } from 'antd';


export default function ModulePage(){


    const nav = useNavigate();
    function navActivities(moduleID: number, activityID: number) { 
    }

    // Using useLocation to get the path information of the current page
    const location = useLocation();
    const path = location.pathname.split('/'); // get path
    // Extract variables from a path using string manipulation
    const moduleId = path[3];
    const activityId = path[5];
    const [activity, setActivity] = useState<Activity>();

    const [tips, setTips] = useState<string[]>([]);
    const [outcomes, setOutcomes] = useState<LearningOutcome[]>([]);
    const [isEditingOutcome, setIsEditingOutcome] = useState<boolean>(false);
    const [editableOutcome, setEditableOutcome] = useState<string[]>([]);

    const [editableIntroduction, setEditableIntroduction] = useState<string>('');
    const [editableTips, setEditableTips] = useState<string[]>([]);
    const [isEditingIntroduction, setIsEditingIntroduction] = useState<boolean>(false);
    const [isEditingTips, setIsEditingTips] = useState<boolean>(false);
    const handleEditIntroduction = () => {
        setIsEditingIntroduction(true);
        setEditableIntroduction(activity?.introduction || '');
    }
    
    const handleConfirmEditIntroduction = async () => {
        setIsEditingIntroduction(false);
        // Make API call to update introduction
        try {
            const response = await fetch(`http://localhost:8088/api/activities/${activityId}/updateIntroduction`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: editableIntroduction
            });
            if (!response.ok) throw new Error('Failed to update introduction');
            setActivity(prev => {
                if (!prev) return prev;  // if prev is undefined, return it as is
                return { ...prev, introduction: editableIntroduction, id: prev.id };
              });
              
        } catch (error) {
            console.error("Error updating introduction:", error);
        }
    }
    
    const handleEditTips = () => {
        setIsEditingTips(true);
        setEditableTips(tips);
    }
  
    const handleConfirmEditTips = async () => {
        setIsEditingTips(false);
        // Make API call to update tips
        try {
            const transformedTips = editableTips.map(tip => ({ content: tip }));
            const response = await fetch(`http://localhost:8088/tips/batch-update/${activityId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(transformedTips)
            });
            if (!response.ok) throw new Error('Failed to update tips');
            setTips(editableTips);
        } catch (error) {
            console.error("Error updating tips:", error);
        }
    }
    const toggleAddTip = () => {
        if (newTip === "") {
            setNewTip(" ");
        } else {
            setNewTip("");
        }
    }
    const [newTip, setNewTip] = useState("");
    const handleAddTips = async () => {
        // Post new outcome to the server
        try {
            const response = await fetch("http://localhost:8088/tips/create", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // If you have authentication, add it here
                },
                body: JSON.stringify({
                    content: newTip, 
                    activityId: activity?.id 
                })
            });
    
            if (response.ok) {
                setEditableTips(prev => [...prev, newTip]); // append to editable outcomes
                setNewTip(""); // reset new outcome content
            } else {
                throw new Error('Failed to add new tip to the server');
            }
    
        } catch (error) {
            message.error('too much words or other errors')
            console.error('There was an error adding the tip:', error);
            // You can also set some state here to notify the user
        }
    }
    
    const handleEditOutcome = (index: number) => {
        setIsEditingOutcome(true);
        setEditableOutcome(outcomes.map(o => o.content));
    }

    const handleOutcomeChange = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
        const newOutcomes = [...editableOutcome];
        newOutcomes[index] = e.target.value;
        setEditableOutcome(newOutcomes);
    }

    const handleConfirmOutcome = async () => {
        setIsEditingOutcome(false);
        setOutcomes(outcomes.map((outcome, index) => ({
                        ...outcome,
                        content: editableOutcome[index]
                    })));
        console.log(outcomes)
        // Define the URL based on the session id
        const url = `http://localhost:8088/api/learning-outcomes/batch-update/${activityId}`;
        
        // Data you want to send to the server
        const updatedOutcomes = outcomes.map((outcome, index) => ({
            ...outcome,
            content: editableOutcome[index]
        }));
        
        try {
            // Transform the outcomes to the desired structure
            const transformedOutcomes = updatedOutcomes.map(outcome => ({ content: outcome.content }));
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // add other headers if needed, like authorization headers
                },
                body: JSON.stringify(transformedOutcomes)  // Convert data to string
            });
        
            if (!response.ok) {  // Check if response went well
                throw new Error('Failed to update learning outcomes on the server');
            }
        
            // Update the state after the request was successful
            setOutcomes(updatedOutcomes);
        
        } catch (error) {
            console.error('There was an error updating the learning outcomes:', error);
            // Handle errors: show a notification, revert changes, etc.
        }
    }
    
    const [newOutcomeContent, setNewOutcomeContent] = useState("");

    const handleAddOutcome = async () => {
        // Post new outcome to the server
        try {
            const response = await fetch("http://localhost:8088/api/learning-outcomes", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // If you have authentication, add it here
                },
                body: JSON.stringify({
                    content: newOutcomeContent, 
                    activityId: activity?.id 
                })
            });
    
            if (response.ok) {
                setEditableOutcome(prev => [...prev, newOutcomeContent]); // append to editable outcomes
                setNewOutcomeContent(""); // reset new outcome content
            } else {
                throw new Error('Failed to add new outcome to the server');
            }
    
        } catch (error) {
            message.error('too much words or other errors')
            console.error('There was an error adding the outcome:', error);
            // You can also set some state here to notify the user
        }
    }
    const toggleAddOutcome = () => {
        if (newOutcomeContent === "") {
            setNewOutcomeContent(" ");
        } else {
            setNewOutcomeContent("");
        }
    }
    
    
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const activityResponse = await axios.get<Activity>(`http://localhost:8088/api/modules/${moduleId}/activities/${activityId}`);
       
                setActivity(activityResponse.data);
                console.log(activityResponse.data);
                // Fetch tips and outcomes
                const outcomesResponse = await axios.get<LearningOutcome[]>(`http://localhost:8088/api/modules/outcome/${activityResponse.data.id}`);
                setOutcomes(outcomesResponse.data);
                
                const tipsResponse = await axios.get<string[]>(`http://localhost:8088/api/modules/tips/${activityResponse.data.id}`);
                setTips(tipsResponse.data);

                

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [moduleId, activityId,editableOutcome,editableTips]); // Notice that I added dependencies to the useEffect, to ensure it doesn't run unnecessarily
    const contentBoxStyle: React.CSSProperties = {
        width: '100%',
        height: 'auto',
        overflowY: 'auto',
        border: '1px solid #d9d9d9',
        padding: '10px',
        whiteSpace: 'pre-line',
        lineHeight: '1.5',  // Adjusts the spacing between lines
        fontSize: '18px',   // Adjusts the font size
        color: '#003366',  // Deep blue color
    
    };
    
    const formattedTips = tips.map(tip => 
      `<span style="color: darkblue;">${tip}</span><br/>`
    ).join('');
    
    const formattedOutcomes = outcomes.map(outcome => 
      `<span style="color: darkblue;">${outcome.content}</span><br/>`
    ).join('');
    console.log(activity?.introduction)
    return (
      <div style={{height:'100vh', overflow:'auto'}}>
          <div className="header">
              <h1>{activity?.name}</h1>
          </div>
          <div className="line"></div>
          <div className="module-activity">
              <div style={{display:'flex'}}>
                  <h2>Introduction</h2>
            
                <Button className='edit-introduction' onClick={handleEditIntroduction}>Edit Introduction</Button>
                 
              </div>
              {isEditingIntroduction ? (
                    <div>
                        <Input.TextArea 
                            value={editableIntroduction} 
                            onChange={(e) => setEditableIntroduction(e.target.value)} 
                        />
                        <Button className='intro-confirm' onClick={handleConfirmEditIntroduction}>Confirm</Button>
                    </div>
                ) : (
                    <Paragraph style={contentBoxStyle}>{activity?.introduction}</Paragraph>
                )}
              <br />
              
              <div style={{display:'flex'}}>
                  <h2>Tips</h2>
                  {newTip !== "" && (
                        <div>
                            <Input.TextArea 
                                value={newTip} 
                                onChange={(e) => setNewTip(e.target.value)} 
                            />
                            <Button className='confirm-button' onClick={handleAddTips}>Confirm New Tip</Button>
                        </div>
                    )}
                    <Button className='edit-tips' onClick={handleEditTips}>Edit Tips</Button>
                    <Button className='add-tip' onClick={toggleAddTip}>Add Tip</Button>
                    
                    
              </div>
              {isEditingTips ? (
                        <div >
                            {editableTips.map((tip, index) => (
                                <div key={index}>
                                    <Input.TextArea 
                                        value={tip} 
                                        onChange={(e) => {
                                            const newTips = [...editableTips];
                                            newTips[index] = e.target.value;
                                            setEditableTips(newTips);
                                        }} 
                                    />
                                </div>
                            ))}
                            <Button className='tip-confirm' onClick={handleConfirmEditTips}>Confirm</Button>
                        </div>
                    ) : (
                        <div style={contentBoxStyle} dangerouslySetInnerHTML={{ __html: formattedTips }} />
                    )}
            
              <div>
              <div className='outcome-container'>
                    <h2>Outcomes</h2>
                    {!isEditingOutcome && (
                        <>
                            <Button className='edit-button' onClick={() => handleEditOutcome(0)}>Edit</Button>
                            <Button className='add-button' onClick={toggleAddOutcome}>Add</Button>


                        </>
                    )}

                    {newOutcomeContent !== "" && (
                        <div>
                            <Input.TextArea 
                                value={newOutcomeContent} 
                                onChange={(e) => setNewOutcomeContent(e.target.value)} 
                            />
                            <Button className='confirm-button' onClick={handleAddOutcome}>Confirm New Outcome</Button>
                        </div>
                    )}
                </div>


                
                {isEditingOutcome ? (
                    <div>
                        {editableOutcome.map((outcome, index) => (
                            <div key={index}>
                                <Input.TextArea value={outcome} onChange={(e) => handleOutcomeChange(e, index)} />
                            </div>
                        ))}
                        <Button className='edit-button' onClick={handleConfirmOutcome}>Confirm</Button>
                    </div>
                ) : (
                    <div style={contentBoxStyle} dangerouslySetInnerHTML={{ __html: formattedOutcomes }} />
                )}
                
            </div>
              {/* <div>
                  <button>Demonstration</button>
              </div> */}
          </div>
      </div>
    );
    
    
    
}
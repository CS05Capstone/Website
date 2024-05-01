import React, { useEffect, useState } from 'react';
// import '../css/Session.css';
import { useNavigate } from 'react-router-dom';
import RouteStore from '../store/RouteStore';
import { load } from '../router/MyRouter';
import {Route} from '../model/Student';
import SessionCreate from '../page/sessionCreate';
import axios from 'axios';
import { SessionModel } from '../model/SessionModel';
import { Pagination } from 'antd';
import '../css/SessionNew.css';
// 静态report model
type ReportSessionModel = {
     id: number;
    sessionName: string;
    sessionDate: string;
  };

export default function Report() {
  
    const ITEMS_PER_PAGE = 3;
    const nav = useNavigate();
    const [sessions, setSessions] = useState<SessionModel[]>([]);
    // static report model
    const reportSessions: ReportSessionModel[] = [
        {
          id:1,
          sessionName: 'Report Session 1',
          sessionDate: '2023-09-13',
        },
        {
          id:2,
          sessionName: 'Report Session 2',
          sessionDate: '2023-09-14',
        }
      ];
    // const [reportSessions, setReportSessions] = useState<ReportSessionModel[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [showReportView, setShowReportView] = useState(false);
    const [selectedSession, setSelectedSession] = useState<SessionModel | ReportSessionModel | null>(null);
    useEffect(() => {
      // Fetch session data from the backend
      axios.get('http://localhost:8088/api/sessions').then(response => {
        // Filter sessions with status "finished"
        const finishedSessions = response.data.filter((session: { status: string; }) => session.status === 'finished');
        setSessions(finishedSessions);
      }).catch(error => {
        console.error("Error fetching sessions:", error);
      });
    }, []);
    
  
    // useEffect(() => {
    //     if (sessions.length > 0) {
    //       const staticReports: ReportSessionModel[] = sessions.flatMap(session => ([
    //         {
    //           sessionName: `${session.sessionName} report 1`,
    //           sessionDate: session.sessionDate,
    //         },
    //         {
    //           sessionName: `${session.sessionName} report 2`,
    //           sessionDate: session.sessionDate,
    //         },
    //       ]));
    //       setReportSessions(staticReports);
    //     }
    //   }, [sessions]);


    const paginatedData = showReportView ? reportSessions : sessions;
    function handlePageChange(page: React.SetStateAction<number>) {
      setCurrentPage(page);
    }
  

    function toggleReportView() {
        setShowReportView(false);
        setSelectedSession(null); 
    }
  
    function navSessionContent(session: SessionModel | ReportSessionModel) {
      console.log(session)
      if (showReportView) {

        nav('/session/sessionContent', { state: { session } });
      } else {

        setShowReportView(true);
        setSelectedSession(session); 
      }
    }



    return (
      <div>
        <div className="header">
          <h1>Report</h1>
        </div>
        <div className="line"></div>
        <div className="buttons">
          {/* switch button，only available in "report" view */}
          {showReportView && (
            <button className="button create"onClick={toggleReportView}>Back</button>
          )}
          {showReportView && (
            <button className="button create">Upload</button>
          )}
          {showReportView && (
            <button className="button create">Print</button>
          )}
        </div>
  
        <div className="sessions">
          {paginatedData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map((session, index) => (
            <div key={index} className="session-box" onClick={() => navSessionContent(session)}>
              <div className="session-form-mock">
              </div>
              <div className="session-info">
                <div className="session-name">{session.sessionName}</div>
                <div className="session-date">{session.sessionDate}</div>
              </div>
            </div>
          ))}
        </div>
      
        {/* <div className="pagination-center">
          <Pagination
            current={currentPage}
            onChange={handlePageChange}
            total={paginatedData.length}
            pageSize={ITEMS_PER_PAGE}
            showSizeChanger={false}
          />
        </div> */}
      </div>
    );
}

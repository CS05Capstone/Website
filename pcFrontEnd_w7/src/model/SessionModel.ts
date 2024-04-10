export interface SessionModel {
    id?: number;
    sessionName: string;
    sessionDate: string;  // use string for simplicity; you can transform it before sending to the server if needed
    startTime: string;
    endTime: string;
    serviceUser: string;
    password: string;
    location: string;
    // learningOutcome: string;
    createdByCaseworkerId?: number;
    learningOutcomeSelecting?: string[];
    status?: string;
  }

export interface validationErrors {
    sessionName?: string;
    serviceUser?: string;
    location?: string;
    password?: string;
    outcome?: string;
}

export interface LearningOutcome{
  id: number;
  content: string;
  activity_id:number;
  
}


  
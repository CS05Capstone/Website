import axios from "axios";
import { LearningOutcome } from "../model/SessionModel";

export const fetchLearningOutcome = async (activityId: number) => {
  try {
    const outcomesResponse = await axios.get<LearningOutcome[]>(`http://localhost:8088/api/modules/outcome/${activityId}`);
    
    return outcomesResponse.data;
  } catch (error) {
    console.error('Error fetching learning outcome:', error);
    return null;
  }
};
  
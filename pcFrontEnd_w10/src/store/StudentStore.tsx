import axios from "axios";
import { Student } from "../model/Student";
import { makeAutoObservable, runInAction } from "mobx";

class StudentStore{
    //Attributes correspond to state data
    student: Student = {id:0, username:'doki',password:'',role:'' }
    //The method corresponds to the action method
    setName(username:string){
        this.student.username = username    
    }
    async fetch(id: number){
        const resp = await axios.get('http://localhost:8088/user/findAll')
        //change the student
        runInAction(()=>{
            console.log(resp.data[0])
           
            this.student = resp.data[id-1]   
        })
    }

    //get method
    get displayRole(){
        if(this.student.role === 'caseWorker'){
            return this.student.username + ' caseWorker'
        }else if(this.student.role === 'user'){
            return this.student.username + ' teenager'
        }else{
            return '?'
        }
    }

    //constructor
    constructor(){
        //Observation period is responsible for monitoring attribute data.
        makeAutoObservable(this)
    }
}

export default new StudentStore()
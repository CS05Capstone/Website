import axios from 'axios'
import { useEffect, useState, createContext, useContext } from 'react'
import {R, Student} from '../model/Student'
import '../css/P8.css';

export default function P8(){
    const [student, setStudent] = useState({id:3,username:'',password:'',role:'caseWorker'})

    const options = [3,4]

    const [message, setMessage] = useState('')
// //can refer to the contents in the map options. So that jsx is the label of two lines of option
    const jsx = options.map(e=> <option key={e}>{e}</option>)

    function  onChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>){
        //e is the input that has been changed. We can change the value by using e.value. Name is what we added in the label to distinguish the attributes
        console.log(e.target.name + "=" + e.target.value)

        setStudent((old)=>{
            console.log('old',old)

//         //The new returened value, cannot be the same object with the old
            //the ... represents the unfolding values, then we will add a new state. The new state will replace the old because the name is a variable.
//         //Thus we need {}
            const n = {...old, [e.target.name]:e.target.value}
            console.log('new',n)
            return n
        })
    }

    async function onClick(){
        const resp = await axios.post('http://localhost:8088/user/register', student)
        console.log(resp.data)
        setMessage(resp.data)
    }
    const messageJsx = message && <div className='success'>{message}</div>
    return (
        <form>
            <div>
                <label>username</label>
                <input type="text" value={student.username} onChange={onChange} name='username'></input>
            </div>
            <div>
                <label>id</label>
                <select value={student.id} onChange={onChange} name='id'>
                    {jsx}
                </select>
            </div>
            <div>
                <label>password</label>
                <input type="text" value={student.password} onChange={onChange} name='password'></input>
            </div>
            <div>
                <input type='button' value='Add' onClick={onClick}/>
            </div>
            {messageJsx}
        </form>
    )
}
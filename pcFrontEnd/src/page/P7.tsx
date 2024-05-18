import axios from 'axios'
import { useEffect, useState, createContext, useContext } from 'react'
import {R, Student} from '../model/Student'


//useContext reads the context, with false meaning to display it directly without hiding
//createContext create the context
const HiddenContext = createContext(false)

export default function P7(){
    const [students, setStudents] = useState<Student[]>([])
    const [hidden, setHidden] = useState(false)
    useEffect(()=>{
        
        async function updateStudents(){
            try{
                const resp = await axios.get<Student[]>("http://localhost:8088/user/findAll")
                setStudents(resp.data)
                // axios.get("http://localhost:8088/user/findAll").then(res =>{
                //     console.log(res)
                    
                // })
            }catch{
                console.log("Error")
            }
            
        }
        updateStudents()
    },[])
    
    //更改boolean
    // function hidde(){
    //     setHidden(true)
    // }

    // function show(){
    //     setHidden(false)
    // }
    function hideOrShow(){
        //Change display, 'old' is the value before the context label
        setHidden((old)=>{
            return !old
        })
        
    }

    //Used to change the context object, directly returning the context label
    //As long as the value of this context tag changes, it will be re-executed<P71 students={students}></P71>
    return <HiddenContext.Provider value={hidden}>

        <input type="button" value={hidden?'show':'hidde'} onClick={hideOrShow}/>
        
        <P71 students={students}></P71>
    </HiddenContext.Provider>

    //return <h1>{students[0].username}</h1>
}

function P71({students}: {students: Student[]}){
    //use context from hiddenContext 
    
    useContext(HiddenContext)
    const list = students.map(s=><P72 key={s.id} student={s}></P72>)
    return <>{list}</>
}
function P72({student}: {student: Student}){
    const hidden = useContext(HiddenContext)
    
    //do not show if hidden is true
    const jsx = !hidden && <span>{student.password}</span>
    return <div>{student.username} {student.role} {jsx}</div>
}

// const [student, setStudent] = useState({name:'',sex:'man',age:18})

// const options = ['man','women']
// //can refer to the contents in the map options. So that jsx is the label of two lines of option
// const jsx = options.map(e=> <option key={e}>{e}</option>)

// function  onChangge(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>){
        //e is the input that has been changed. We can change the value by using e.value. Name is what we added in the label to distinguish the attributes
//     console.log(e.target.name + "=" + e.target.value)

//     setStudent((old)=>{
//         console.log('old',old)

//         //The new returened value, cannot be the same object with the old
            //the ... represents the unfolding values, then we will add a new state. The new state will replace the old because the name is a variable.
//         //Thus we need {}
//         const n = {...old, [e.target.name]:e.target.value}
//         console.log('new',n)
//         return n
//     })
// }
import {Button, Input, Space, Table} from "antd"
import { ColumnsType, TablePaginationConfig } from "antd/es/table"
import { Student } from "../model/Student"
import { useEffect, useState } from "react"
import axios from "axios"
import DeleteButton from "./DeleteButton"
import UpdateButton from "./UpdateButton"

//Client-side pagination code
export default function A2(){

    const [students, setStudents] = useState<Student[]>([])
    const [loading, setLoading] = useState(true)
    const [pagination, setPagination] = useState<TablePaginationConfig>(
        //5 entries for each page
        {current:1, pageSize:1}
    )

    //call getStudents when A2 is called for the first time
    useEffect(()=>{
        async function getStudents(){
            const resp = await axios.get<Student[]>('http://localhost:8088/user/findAll')
            setStudents(resp.data)
            setLoading(false)
        } 
        getStudents()
    },[])

    //call when need to change the page number
    function onTableChange(newPagination: TablePaginationConfig){
        setPagination(newPagination)
    }

    function refreshPage(){
        console.log("Finish refresh")
    }

    const columns : ColumnsType<Student> =[
        {
            title:'id',
            //show ID
            dataIndex: 'id'
        },
        {
            title:'username',
            dataIndex: 'username'
        },
        {
            title:'password',
            dataIndex: 'password'
        },
        {
            title:'role',
            dataIndex: 'role'
        },
        {
            title:'Edit',
            dataIndex: 'Edit',
            // value: {value}, student
            render: (_, student)=>{
                return <>
                {/* space means add space between tags */}
                    <Space>
                        {/* <Button danger size='small'>Delete</Button> */}
                        <DeleteButton id={student.id} onSucess={refreshPage}></DeleteButton>
                        <Button type='default' size='small' onClick={()=>{onUpdateClick(student)}}>Edit</Button>
                    </Space>
                </>
            }
        }
    ]
    //click to open the edit page and pass the student information
    function onUpdateClick(student:Student){
        setUpdateOpen(true)
        setUpdateForm(student)
    }

    function onNameChange(e: React.ChangeEvent<HTMLInputElement>){
        console.log(e.target.value)
    }

    function onUpdateSuccess(){
        setUpdateOpen(false)

    }

    function onUpdateCancel(){
        setUpdateOpen(false)
    }

    const [updateOpen, setUpdateOpen] = useState(false)
    const [updateForm, setUpdateForm] = useState({id:1, username: 'doki', password:'123',role:'caseWorker'})

    //Datasource is the data source, rowKey is the unique identifier, loading UI is displayed, and it is closed after loading the data
    return (
        <div>
      
            <UpdateButton open={updateOpen} student={updateForm} onSuccess={onUpdateSuccess} onCancel={onUpdateCancel}></UpdateButton>
            <div>
                <Input style={{width:120}} placeholder="Please enter the name" value="" onChange={onNameChange}></Input>
            </div>
            <Table 
                columns={columns} 
                dataSource={students} 
                rowKey='id' 
                loading={loading}
                pagination={pagination}
                onChange={onTableChange}></Table>
        </div> 
    )
}
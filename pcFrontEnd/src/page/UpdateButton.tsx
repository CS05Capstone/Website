import {Form, Input, Modal, Radio, message} from "antd"
import { Student } from "../model/Student"
import { useEffect } from "react"
import { Rule } from "antd/es/form"

export default function UpdateButton({open,student,onSuccess,onCancel}: {open: boolean, student: Student, onSuccess?:()=>void, onCancel?:()=>void}){
    const options = [
        {label:'man', value:'man'},
        {label:'woman', value:'woman'}
    ]

    const [form] = Form.useForm() //represents the single object
    
    //add check for the name
    const nameRules: Rule[] = [
        {required: true, message:'姓名必须'},
        {min: 2, type:'string', message:'至少两个字符'},
        {max: 16, type:'string', message:'最多16个字符'}
    ]
   
    async function onOk(){
        //check and get the form data
        const values = await form.validateFields()
        message.success(values.id)
        //call if the function is not null
        onSuccess && onSuccess()
    }



    useEffect(()=>{
        form.setFieldsValue(student) //id,username,password,role...

    }, [student])

    return <Modal open={open} title='edit student' onOk={onOk} onCancel={onCancel}>
        <Form form={form}>
            <Form.Item label='id' name='id'>
                <Input readOnly></Input>
            </Form.Item>

            <Form.Item label='username' name='username' rules={nameRules}>
                <Input></Input>
            </Form.Item>

            <Form.Item label='password' name='password'>
                <Input></Input>
            </Form.Item>

            <Form.Item label='role' name='role'>
                <Input></Input>
            </Form.Item>

            <Form.Item label='sex' name='sex'>
                <Radio.Group options={options} optionType="button" buttonStyle="solid"></Radio.Group>
            </Form.Item>
        </Form>
    </Modal>
}
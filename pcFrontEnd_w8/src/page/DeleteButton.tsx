import {Button, Popconfirm,message} from "antd"

//onSuccess is initialized as empty function
export default function DeleteButton({id, onSucess}: {id:number, onSucess: ()=>void}){
    function onConfirm(){
        console.log('u deleted the row ' + id)
        message.success(id)
        //execute the function passed in
        onSucess()
    }
   
   return <Popconfirm  title='Are you sure to delete?' onConfirm={onConfirm} >
        <Button danger size='small'>Delete</Button>
    </Popconfirm>
}
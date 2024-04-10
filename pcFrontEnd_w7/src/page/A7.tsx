import { Input } from "antd";
import StudentStore from '../store/StudentStore'
import {observer} from 'mobx-react-lite'
import Search from "antd/es/input/Search";
//The observer is used to observe whether there is any change in StudentStore, and if there is, it refreshes A7

function A7(){

    //e It's the content entered in the label
    function onChange(e:React.ChangeEvent<HTMLInputElement>){
        StudentStore.setName(e.target.value)
    }

    return <>
        <Input onChange={onChange}></Input>
        <h3>{StudentStore.displayRole}</h3>
        <Search placeholder="please enter id" onSearch={(v)=>{
            StudentStore.fetch(Number(v))
        }}></Search>
    </>
}

export default observer(A7)
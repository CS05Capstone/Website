import { Link, Navigate, Outlet, } from 'react-router-dom'
import gameIcon from '../resources/11.png';

import { Button, message } from 'antd';




export default function A8MainStudent(){
    return (
        <>
        <img src={gameIcon} style={{ position: 'relative', verticalAlign: 'middle', left: '50px' }} />
        <Link to="/game"> <Button id="gameStartButton">Game Start</Button></Link>
        <Outlet />{}
        <h3>Main Student</h3>
        </>  
    )

}
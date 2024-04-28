import { Button, Form, Input, Radio, Select, message } from 'antd';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginReq } from '../model/Student';
import RoutesStore from '../store/RouteStore';
import logo from '../resources/logo.png';

function A8Login() {
  // function onFinish(values: LoginReq) {
  //   RoutesStore.login(values)
  // }
  function onFinish(values: LoginReq) {
    // Include the userRole (selectedRole) to the login function
    RoutesStore.login(values, userRole);
} 
  const { Option } = Select;
  const [userRole, setUserRole] = useState('user');

  const nav = useNavigate() // Obtain the navigation function
  useEffect(()=>{
    if(RoutesStore.state === 'done') {
      // Go to the homepage
      nav('/')
    } else if(RoutesStore.state === 'error') {
      message.error(RoutesStore.message)
    }
  }, [RoutesStore.state])

  // return (
  //   <div style={{ paddingTop: 200 }}>
  //     <Form
  //       name='basic'
  //       labelCol={{ span: 8 }}
  //       wrapperCol={{ span: 8 }}
  //       onFinish={onFinish}>
  //       <Form.Item
  //         label='username'
  //         name='username'
  //         rules={[{ required: true, message: 'please enter the username!' }]}>
  //         <Input autoComplete='off' />
  //       </Form.Item>

  //       <Form.Item
  //         label='password'
  //         name='password'
  //         rules={[{ required: true, message: 'please enter the password!' }]}>
  //         <Input.Password autoComplete='off' />
  //       </Form.Item>

  //       <Form.Item wrapperCol={{ offset: 8, span: 6 }}>
  //         <Button type='primary' htmlType='submit'>
  //           Login
  //         </Button>
  //       </Form.Item>
  //     </Form>
  //   </div>
  // )
  //NSW Youth Justice Chart
  return(
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
    <div style={{ width: '400px', backgroundColor: 'white', borderRadius: '10px', overflow: 'hidden' }}>
      <div style={{ backgroundColor: 'white', padding: '40px 20px 20px', borderBottom: '1px solid #e8e8e8', textAlign: 'center' }}>
        <img src={logo} alt="Logo" style={{ width: '170px', marginTop:0 }} />
        <Radio.Group 
        defaultValue="user" 
        buttonStyle="solid" 
        style={{ display: 'flex', marginTop: '10px' }}
        onChange={(e) => setUserRole(e.target.value)}  // 2. Attach an onChange event
      >
        <Radio.Button value="caseWorker" style={{ width: '50%', textAlign: 'center' }}>CaseWorker</Radio.Button>
        <Radio.Button value="user" style={{ width: '50%', textAlign: 'center' }}>Young Person</Radio.Button>
        <Radio.Button value="admin" style={{ width: '50%', textAlign: 'center' }}>Administrator</Radio.Button>
      </Radio.Group>
      </div>
      <div style={{ padding: '20px' }}>
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}>
          <Form.Item
          // Label is on the UI, name is the name by which it is externally accessed
            label="username"
            name="username"
            rules={[{ required: true, message: 'please enter the username!' }]}>
            <Input autoComplete="off" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="password"
            name="password"
            rules={[{ required: true, message: 'please enter the password!' }]}>
            <Input.Password autoComplete="off" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 3, span: 18 }}>
            <div style={{ textAlign: 'center' }}>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </div>
         
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 1, span: 2 }}>
            <div onClick={() => { nav('/register') }} style={{ fontSize: '12px', color: '#888', cursor: 'pointer', textAlign: 'center' }}>
              <span style={{color: '#1890ff', textDecoration: 'underline'}}>Registration</span>
            </div>
          </Form.Item>
        </Form>
      </div>
      </div>
    </div>


  )
}
//When variables in the store change, it triggers a re-render
export default observer(A8Login)
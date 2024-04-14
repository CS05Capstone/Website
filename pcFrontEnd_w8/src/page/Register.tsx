import { Button, Form, Input, Radio, Select, message } from 'antd';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterReq } from '../model/Student';
import RoutesStore from '../store/RouteStore';
import logo from '../resources/logo.png';
import RouteStore from '../store/RouteStore';

function Register(){
    function onFinish(values: RegisterReq){
        RoutesStore.register(values)
    }

    const nav = useNavigate() 
    useEffect(()=>{
        if(RoutesStore.state === 'done') {
            // navigate
            RouteStore.pendingState()
            message.success('Create account success')
            nav('/login')
        } else if(RoutesStore.state === 'error') {
            message.error(RoutesStore.message)
            RouteStore.pendingState()
        }
    }, [RoutesStore.state])


    return(

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
        <div style={{ width: '400px', backgroundColor: 'white', borderRadius: '10px', overflow: 'hidden' }}>
          <div style={{ backgroundColor: 'white', padding: '40px 20px 20px', borderBottom: '1px solid #e8e8e8', textAlign: 'center' }}>
            <div onClick={() => { nav('/login') }} style={{ fontSize: '12px', color: '#888', cursor: 'pointer', textAlign: 'center' }}>
              <span  style={{position: 'absolute', top: '90px',right:'370px',color: '#1890ff', fontSize:10}}>Back</span>
            </div>
            <img src={logo} alt="Logo" style={{ width: '120px', marginBottom:'20px', paddingBottom: '30px'}} />
            {/* <Radio.Group defaultValue="user" buttonStyle="solid" style={{ display: 'flex', marginTop: '10px' }}>
              <Radio.Button value="admin" style={{ width: '50%', textAlign: 'center' }}>CaseWorker</Radio.Button>
              <Radio.Button value="user" style={{ width: '50%', textAlign: 'center' }}>Young Teenager</Radio.Button>
            </Radio.Group> */}
            <h3 style={{marginTop: '-40px', marginBottom: 20}}>Welcome To NSW Youth Justice Chart</h3>
            <div>Create your account</div>
          </div>
            <div style={{ padding: '20px' }}>
              <Form
                name="basic"
                labelCol={{ span: 9 }}
                wrapperCol={{ span: 18 }}
                onFinish={onFinish}>
                <Form.Item
                // label is from UI，name is what the outer things will get
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

                <Form.Item
                  label="confirmPassword"
                  name="confirmPassword"
                  dependencies={['password']} // Declare a dependency on the password field
                  rules={[
                      { required: true, message: 'please confirm the password!' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                      }),
                  ]}>
                  
                  
                  
                  <Input.Password autoComplete="off" style={{ width: '100%' }} />
                </Form.Item>
      
                <Form.Item wrapperCol={{ offset: 3, span: 18 }}>
                  <div style={{ textAlign: 'center' }}>
                    <Button type="primary" htmlType="submit">
                      Regist Now
                    </Button>
                  </div>
                </Form.Item>
      
                {/* <Form.Item wrapperCol={{ offset: 1, span: 2 }}>
                  <div onClick={() => { nav('/register') }} style={{ fontSize: '12px', color: '#888', cursor: 'pointer', textAlign: 'center' }}>
                    <span style={{color: '#1890ff', textDecoration: 'underline'}}>Registration</span>
                  </div>
                </Form.Item> */}
              </Form>
            </div>
            
          </div>
          {/* <span style={{color: '#1890ff', textDecoration: 'underline'}}>Registration</span> */}
          
        </div>

    
    
      )
}

export default observer(Register)
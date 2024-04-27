// import { CopyOutlined, EditOutlined } from "@ant-design/icons"
// import {Layout, Menu} from "antd"
// import { ItemType } from "antd/es/menu/hooks/useItems"
// import { Outlet, Link } from "react-router-dom"
// import Icon from '../store/Icon'

// export default function A8Main(){
//     const items:ItemType[] = [
//         {label:<Link to='/student'>Student management'</Link>, key:'1', icon: <EditOutlined/>},
//         {label:'Teacher management', key:'2', icon: <CopyOutlined></CopyOutlined>},
//         {label:'Student3 management', key:'3',
//             children: [
//                 {label: 'function 1', key: '31'},
//                 {label: 'function 2', key: '32'},
//             ],
//             icon: <Icon name='EditOutlined'></Icon>
//         },
//     ]
    
//     return <Layout>
//         <Layout.Header>Header nagivator</Layout.Header>
//         <Layout>
//             <Layout.Sider>
//                 <Menu items={items} theme="dark" mode='inline'></Menu>
//             </Layout.Sider>
//             <Layout.Content>
//                 <Outlet></Outlet>
//             </Layout.Content>
//         </Layout>
//     </Layout>
// }
import { Button, Layout, Menu } from 'antd'
import { observer } from 'mobx-react-lite'
import { Suspense, useEffect, useState } from 'react'
import { Link, Navigate, Outlet, Route, useNavigate } from 'react-router-dom'
import RoutesStore from '../store/RouteStore'
import '../css/MenuStyle.css';
import '../css/GameStyle.css';
import logo from '../resources/logo2.png'
import logo4 from '../resources/logo4.png'
import logo3 from '../resources/logo3.png'
import { SafetyCertificateOutlined, UserOutlined } from '@ant-design/icons'
import gameIcon from '../resources/11.png';

// import type { MenuProps } from 'antd';
// import {
//   AppstoreOutlined,
//   BarChartOutlined,
//   CloudOutlined,
//   ShopOutlined,
//   TeamOutlined,
//   UploadOutlined,
//   UserOutlined,
//   VideoCameraOutlined,
// } from '@ant-design/icons';
// import React from 'react'
function A8Main() {
  /* const items: ItemType[] = [
    { label: <Link to='/student'>label1</Link>, key: '1', icon: <EditOutlined /> },
    { label: <Link to='/teacher'>label2</Link>, key: '2', icon: <CopyOutlined />},
    {
      label: 'user management',
      key: '3',
      icon: <Icon name='EditOutlined'></Icon>,
      children: [
        { label: 'function1', key: '31' },
        { label: 'function2', key: '32' },
      ],
    },
  ] */

  const nav = useNavigate()

  function onClick() {
    RoutesStore.reset()
    nav('/login')
  }

  const { Header, Content, Footer, Sider } = Layout;
  const [collapsed, setCollapsed] = useState(true);
  const [isExpanded, changeIsExpanded] = useState(false);
  const handleMouseEnter = () => {
    setCollapsed(false);
    changeIsExpanded(true);
  }

  const handleMouseLeave = () => {
    setCollapsed(true);
    setTimeout(() => {
      changeIsExpanded(false);
    }, 200); // 300 milliseconds delay, adjustable as needed
   
  }
  // //To control the scaling and expansion of the sidebar
  // const [collapsed, setCollapsed] = useState(true);

  // const onCollapse = (collapsed: boolean | ((prevState: boolean) => boolean)) => {
  //   setCollapsed(collapsed);
  // };

  /* useEffect(()=>{
    if(RoutesStore.username === '') {
      nav('/login')
    }
  }, []) */
    // const items: MenuProps['items'] = [
    //   UserOutlined,
    //   VideoCameraOutlined,
    //   UploadOutlined,
    //   BarChartOutlined,
    //   CloudOutlined,
    //   AppstoreOutlined,
    //   TeamOutlined,
    //   ShopOutlined,
    // ].map((icon, index) => ({
    //   key: String(index + 1),
    //   icon: React.createElement(icon),
    //   label: `nav ${index + 1}`,
    // }));
  if(RoutesStore.username === '') {
    return <Navigate to='/login'></Navigate>
  }

  return (
    
    
      <Layout>
        
        <Sider
          className={`ant-layout-sider ${isExpanded ? 'expanded' : ''}`}
          collapsed={collapsed}
          collapsedWidth={60}
          collapsible
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{left:0}}
        >
          {/* <div className={`logo-container ${isExpanded ? 'expanded' : ''}`}>
            <img src={logo} alt="Logo" className="logo" />
          </div> */}
     
          <div className={`logo-container ${isExpanded ? 'expanded' : ''}`}>
            { collapsed ? (
              <img src={logo} alt="Logo" className="logo" />
            ) : (
              <div className="user-info">
                <div className="avatar-container">
                  <img src={RoutesStore.currentUserRole === 'caseWorker' ? logo3 : RoutesStore.currentAvatar} alt="Avatar" className="user-avatar"/>
                </div>
                
                <div className="user-name">
                <UserOutlined /> {RoutesStore.currentUserName}
                </div>
                
                <div className="user-role">
                <SafetyCertificateOutlined /> {RoutesStore.currentUserRole}
                </div>
               
                <hr></hr>
                
              </div>
              
            )}
         
          </div>
          <Menu className="custom-menu" items={RoutesStore.menus} theme='dark' mode='inline' style={{}}></Menu>

        
        </Sider>
    
          
        <Content className='content-container'>
          
    
          <Button size='small'  onClick={onClick} className='logoutButton'>LogOut</Button>
 
        
          <Outlet />  {/* Placeholder for nested routes */}
        </Content>
        {/* <Layout.Header className={'ant-layout-header'}>
          <span>Welcome User {RoutesStore.username}</span>
          <Button size='small' style={{width:60, left: 900}} onClick={onClick}>LogOut</Button>
        </Layout.Header> */}

       
      </Layout>
 
  )
}

export default observer(A8Main)
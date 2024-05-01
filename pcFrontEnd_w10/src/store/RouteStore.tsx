import { ItemType } from 'antd/lib/menu/hooks/useItems'
import axios, { AxiosError } from 'axios'
import { makeAutoObservable, runInAction } from 'mobx'
import { Link, Navigate, RouteObject } from 'react-router-dom'
import {
  LoginReq,
  LoginResp,
  Menu,
  MenuAndRoute,
  MenuList,
  R,
  RegisterReq,
  Route,
  Student,
} from '../model/Student'
import { load } from '../router/MyRouter'
import Icon from './Icon'
import { Module } from '../model/Module'
// import A8Main from '../page/A8Main'
// import A8NotFound from '../page/A8NotFound'
// import A8Login from '../page/A8Login'
// import Register from '../page/Register'
// import Session from '../page/session'
// import module from '../page/module'
// import Activity from '../page/activity'
//import '../css/MenuStyle.css';


//
function convertMenu(m: Menu): ItemType {
  //const Label = m.routePath==='null' ?  m.label : <Link to={m.routePath}>{m.label}</Link>
  //If there are no children, then set the link to redirect to the route path
  const Label = m.routePath==='null' ?  m.label : <Link to={m.routePath}>{m.label}</Link>
  // const Label = (
  //   <span className="menu-item-label">
  //     {m.routePath==='null' ? m.label : <Link to={m.routePath}>{m.label}</Link>}
  //   </span>
  // );

  return {
    key: m.menu_id,
    label: Label,
    icon: <Icon name={m.icon} ></Icon>,
    children: m.children && m.children.map(convertMenu),
    
  }
}

class RoutesStore {
  dynamicRoutes: Route[] = []
  dynamicMenus: Menu[] = []
  currentUserName: string = ''
  currentUserRole: string = ''
  currentAvatarID: any = 0
  currentUserId: number = 0
  token: string = '' // token

  state: string = 'pending'
  message: string = ''
  
  currentAvatar = ''
  addRoute(route: Route) {
    this.dynamicRoutes.push(route);
  }  

  // async getData(){
  //   const resp = await axios.get<Module[]>(
  //       `http://localhost:8088/api/modules`
  //     )
  //   console.log(resp.data)
  // }

  async login(loginReq: LoginReq, selectedRole: string) {
    
    this.state = 'pending'
    try{
        const resp1 = await axios.post<LoginResp>(
            'http://localhost:8088/login',
            loginReq
        )
        
      
        if (resp1.status === 200) {
          // login success
          const resp2 = await axios.get<MenuAndRoute>(
            `http://localhost:8088/api/menu/${loginReq.username}`
          )
          const resp3 = await axios.get<Student[]>(
            `http://localhost:8088/user/findAll`
          )
          
          //set the role
          const userRole = resp3.data.find(user => user.username === loginReq.username);
          const avatarResponse =  await axios.get<string>(`http://localhost:8088/findAvatar/${userRole?.avatarID}`)
          
          if (userRole) {
            if (userRole.role !== selectedRole) {
              runInAction(() => {
                  this.message = 'Wrong password or username';
                  this.state = 'error';
              });
              return;  // Exit the function early
            }
            const role = userRole.role;
            this.currentUserRole = role
            this.currentAvatar = avatarResponse.data
            this.currentAvatarID = userRole.avatarID
            localStorage.setItem('currentAvatarID', JSON.stringify(this.currentAvatarID))
            localStorage.setItem('currentAvatar', JSON.stringify(this.currentAvatar))
            localStorage.setItem('currentUserRole', JSON.stringify(this.currentUserRole))
            this.currentUserId = userRole.id
            localStorage.setItem('currentUserId', this.currentUserId.toString());
          } else {
            this.currentUserRole = 'UnKnown'
          }
        
          this.currentUserName = loginReq.username
          localStorage.setItem('currentUserName', JSON.stringify(this.currentUserName))
          console.log(resp2)
          runInAction(() => {         
            
            this.dynamicRoutes = resp2.data.routeList
            console.log(resp2.data.routeList)
            localStorage.setItem(
              'dynamicRoutes',
              JSON.stringify(this.dynamicRoutes)
            )
            
            
            this.dynamicMenus = resp2.data.menuTree
            console.log(111)
            localStorage.setItem('dynamicMenus', JSON.stringify(this.dynamicMenus))
            console.log(resp1)
            this.token = resp1.data.token
            console.log(333)
            localStorage.setItem('token', this.token)
              
            this.state = 'done'
          })
        } else {
          runInAction(() => {
            console.log(resp1)
            this.message = '未知错误'
            this.state = 'error'
          })
        }
    }catch(error:any){
        runInAction(()=>{
            // if(error.response.status === 401){
            //     this.message = 'error password'
            //     this.state = 'error'
            // }else{
            //     this.message = 'unknow error'
            //     this.state = 'error'
            // }
            this.message = 'Wrong password or username'
            this.state = 'error'
            
        })
    }
    
  }

  async register(registReq: RegisterReq) {
    console.log('registringg')
    this.state = 'pending'
    const registName = registReq.username
    const registPassword = registReq.password
    const confirmPassword = registReq.confirmPassword

    runInAction(()=>{
      if(registPassword !== confirmPassword){
      
        console.log('error')
        this.message = 'Entered passwords are different'
        this.state = 'error'
      }  
    })

    try{
      const resp1 = await axios.post<RegisterReq>(
        'http://localhost:8088/register',
        registReq
      )
      if (resp1.status === 200) {
        // const resp2 = await axios.get<MenuAndRoute>(
        //   `http://localhost:8088/api/menu/${loginReq.username}`
        // )
        // const resp3 = await axios.get<Student[]>(
        //   `http://localhost:8088/user/findAll`
        // )
        // const userRole = resp3.data.find(user => user.username === loginReq.username);
        // if (userRole) {
        //   const role = userRole.role;
        //   this.currentUserRole = role
        //   localStorage.setItem('currentUserRole', JSON.stringify(this.currentUserRole))
          
        // } else {
        //   this.currentUserRole = 'UnKnown'
        // }
        
        // this.currentUserName = loginReq.username
        // localStorage.setItem('currentUserName', JSON.stringify(this.currentUserName))
        // console.log(resp2)
        // runInAction(() => {         
          
        //   this.dynamicRoutes = resp2.data.routeList
        //   console.log(resp2.data.routeList)
        //   localStorage.setItem(
        //     'dynamicRoutes',
        //     JSON.stringify(this.dynamicRoutes)
        //   )
          
          
        //   this.dynamicMenus = resp2.data.menuTree
        //   console.log(111)
        //   localStorage.setItem('dynamicMenus', JSON.stringify(this.dynamicMenus))
        //   console.log(resp1)
        //   this.token = resp1.data.token
        //   console.log(333)
        //   localStorage.setItem('token', this.token)
            runInAction(()=>{
              this.state = 'done'
            })
          
        }
        else {
          runInAction(() => {
            console.log(resp1)
            this.message = 'unknown error'
            this.state = 'error'
          })
      }
    }catch(error:any){
      runInAction(() => {
        this.message = 'unknown error'
        this.state = 'error'
      })
    }

    
  }

  pendingState(){
    this.state = 'pending'
  }

  /* async fetch(username: string) {
    const resp = await axios.get<R<MenuAndRoute>>(
      `http://localhost:8080/api/menu/${username}`
    )
    runInAction(() => {
      this.dynamicRoutes = resp.data.data.routeList
      localStorage.setItem('dynamicRoutes', JSON.stringify(this.dynamicRoutes))

      this.dynamicMenus = resp.data.data.menuTree
      localStorage.setItem('dynamicMenus', JSON.stringify(this.dynamicMenus))
    })
  } */

  /*
    localStorage
      .setItem(name, value:string) 
      .getItem(name) :string    
      .removeItem(name)        
  */

  // eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.-l-MjMPGJVOf3zoIJgoqpV3LWoqvCCgcaI1ga86ismU
  get username() {
    if(this.token.length === 0) {
      return ''
    }
    const json = atob(this.token.split('.')[1])
    return JSON.parse(json).sub
  }

  //Dynamic Routing: Combining Static and Dynamic Components
  get routes() {
    const staticRoutes: RouteObject[] = [
      { path: '/login', element: load('A8Login') },
      { path: '/', element: load('A8Main'), children: [] },
      { path: '/404', element: load('A8NotFound') },
      { path: '/*', element: <Navigate to={'/404'}></Navigate> },
      { path: '/register', element: load('Register') },
    ]
    staticRoutes[1].children = this.dynamicRoutes.map((r) => {
      return {
        path: r.path,
        element: load(r.element),
        
      }
    })
    return staticRoutes
  }
  
  // get routes() {
  //   const staticRoutes: RouteObject[] = [
  //     { path: '/login', element: <A8Login /> },
  //     { path: '/', element: <A8Main />, children: [] },
  //     { path: '/404', element: <A8NotFound /> },
  //     { path: '/*', element: <Navigate to={'/404'}></Navigate> },
  //     { path: '/register', element: <Register /> },
  //   ]
  //   staticRoutes[1].children = this.dynamicRoutes.map((r) => {
  //     const DynamicComponent = require(`../page/${r.element}`).default;
  //     return {
  //       path: r.path,
  //       element: <DynamicComponent />,
  //     }
  //   })
  //   return staticRoutes
  // }
  


  // dynamic menu
  get menus() {
    return this.dynamicMenus.map(convertMenu)
  }

  constructor() {
    //update the existing storage
    makeAutoObservable(this)
    const json = localStorage.getItem('dynamicRoutes')
    this.dynamicRoutes = json ? JSON.parse(json) : []

    const json1 = localStorage.getItem('dynamicMenus')
    this.dynamicMenus = json1 ? JSON.parse(json1) : []

    const json2 = localStorage.getItem('currentUserName')
    this.currentUserName = json2 ? JSON.parse(json2) : []

    const json3 = localStorage.getItem('currentUserRole')
    this.currentUserRole = json3 ? JSON.parse(json3) : []

    const json4 = localStorage.getItem('currentAvatar')
    this.currentAvatar = json4 ? JSON.parse(json4) : []

    const json5 = localStorage.getItem('currentAvatarID')
    this.currentAvatarID = json5 ? JSON.parse(json5) : []

    const userIdFromLocalStorage = localStorage.getItem('currentUserId');
    this.currentUserId = userIdFromLocalStorage !== null ? parseInt(userIdFromLocalStorage) : 0;


    // this.token = localStorage.getItem('token') ?? ''
    const tokenFromLocalStorage = localStorage.getItem('token');
    this.token = tokenFromLocalStorage !== null ? tokenFromLocalStorage : '';
    this.message = ''
    this.state = 'pending'
  }

  reset() {
    localStorage.removeItem('dynamicRoutes')
    this.dynamicRoutes = []

    localStorage.removeItem('dynamicMenus')
    this.dynamicMenus = []

    localStorage.removeItem('token')
    this.token = ''

    localStorage.removeItem('currentUserId')
    this.currentUserId = 0

    localStorage.removeItem('currentUserName')
    this.currentUserName = ''

    localStorage.removeItem('currentUserRole')
    this.currentUserRole = ''

    localStorage.removeItem('currentAvatar')
    this.currentAvatar = ''

    localStorage.removeItem('currentAvatarID')
    this.currentAvatarID = ''
    this.message = ''
    this.state = 'pending'


  }
}

export default new RoutesStore()

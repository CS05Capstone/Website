
import { Navigate, RouteObject,useRoutes } from "react-router-dom";
import A8Login from "../page/A8Login";
import A8Main from "../page/A8Main";
import A8NotFound from "../page/A8NotFound";
import { lazy } from "react";

export function load(name:string){
    const Page = lazy(()=>import(`../page/${name}`))
    return <Page></Page>
}   

//static route form
const staticRoutes: RouteObject[] = [
    {path:'/login', element:load('A8Login')},
    {path:'/register', element:load('Register')},
    {path:'/', element:<A8Main></A8Main>,
    //Nested Routes: A8main nests the following three routes. /user will redirect to A8MainUser
        children:[
            {path: 'user', element: load('A8MainUser')},
            {path: 'student', element: load('A8MainStudent')},
            {path: 'teacher', element: load('A8MainTeacher')},
            {path: 'report', element: load('reportComponent')},
            {path: 'skill', element: load('avatar')},
            {path: 'module', element: load('module')},
            {path: 'game', element: load('UnityGame')},
        ],
    },
    {path:'/session', element:<A8Main></A8Main>,
        children:[
            {path: '/session', element: load('session')},
            {path: '/session/sessionContent', element: load('sessionContent')},
            {path: '/session/sessionContent/activity', element: load('activityPage')},
            {path: '/session/create', element: load('sessionCreate')},
            
        ],
    },

    {path:'/404', element:<A8NotFound></A8NotFound>},

    //skip to 404 if the url is unknown
    {path:'/*', element:<Navigate to={'/404'}></Navigate>}
]

export default function MyRouter(){
    //create route object
    const router = useRoutes(staticRoutes)
    return router
}

// import { observer } from 'mobx-react-lite'
// import { lazy } from 'react'
// import { useRoutes } from 'react-router-dom'
// import RoutesStore from '../store/RouteStore'

// // react-router 6.x

// // Convert string component => Component label
// export function load(name: string) {
//   const Page = lazy(() => import(`../page/${name}`).catch(error => {
//     console.error("Failed to load module:", error);
//     throw error;
//   }))
//   console.log('imported '+ name)
//   return <Page></Page>
// }

// // route object
// function MyRouter() {
//   const router = useRoutes(RoutesStore.routes)
//   console.log(router)
//   return router
// }

// export default observer(MyRouter)

export interface Student{
    id: number,
    username: string,
    // sex?: string,
    // age?: number,
    // photo?: string
    password: string,
    orders?: string,
    role: string,
    avatarID?: number
}

export interface R<T>{
    code: number,
    data: T,
    message?: string
}
// Route data returned by the server
export interface Route {
    path: string,
    element: string
  }
  
  // Menu data returned by the server
  export interface Menu {
    menu_id: string,
    label: string,
    children?: Menu[],
    icon: string,
    routePath: string
  }
  
  // Routing + Menu
  export interface MenuAndRoute {
    routeList: Route[]
    menuTree: Menu[]
  }
  
  // login request
  export interface LoginReq {
    username: string,
    password: string
  }
  
  // login response
  export interface LoginResp {
    token: string
  }

  export interface MenuList{
    menu_id: number,
    label: string,
    pid: number,
    icon: string,
    routePath: string,
    routeElement: string,
    children: MenuList
  }

  export interface RegisterReq{
    username: string,
    password: string,
    confirmPassword: string,
  }

// used in admin to add a user
export interface addedUser{
  username: string,
  password: string,
  role: string
}

export interface adminValidationErrors {
  username?: string;
  password?: string;
  role?: string;
}

// used in admin to view a user
export interface adminUsers{
  id: number,
  username: string,
  password: string,
  role: string
  avatarID: number
}
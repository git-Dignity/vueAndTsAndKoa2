
export interface ISysRoleData {
    id: string
    roleName: string
    roleKey: string
    roleType: string
    isSys: number
    remarks: string 
    routes: Array<any>
  } 



  export interface IRoutesTreeData {
    children: IRoutesTreeData[]
    title: string
    path: string
  }



  
/**
 * 代办事项接口
 */
export interface IAgentEvent {
    id: string
    serialNum: number
    title: string
    content: string
    type: number
    agent: string
    schedule: string
    noticeWay: number
    contact: string
    startTime: string
    endTime: string
    remarks: string
  }

  export interface IRoutesTreeData {
    children: IRoutesTreeData[]
    title: string
    path: string
  }

  export interface ISysUserData {
    id: string
    userName: string
    photo: string
    phone: string
    roles: string
    token: string
  }

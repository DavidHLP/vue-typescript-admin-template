export interface IArticleData {
  id: number
  status: string
  title: string
  abstractContent: string
  fullContent: string
  sourceURL: string
  imageURL: string
  timestamp: string | number
  platforms: string[] | string
  disableComment: boolean
  importance: number
  author: string
  reviewer: string
  type: string
  pageviews: number
  iscreate: null | boolean
}

export interface IRoleData {
  key: string
  name: string
  description: string
  routes: any
}

export interface ITransactionData {
  orderId: string
  timestamp: string | number
  username: string
  price: number
  status: string
}

export interface IUserData {
  id: number
  username: string
  password: string
  name: string
  email: string
  phone: string
  avatar: string
  introduction: string
  roles: string[]
}

export interface IPermissionsInfo{
  id: number
  permission: string
  description: string
  status: boolean
}

export interface IRoleInfo{
  id: number
  roleName: string
  status: boolean
  permissions: IPermissionsInfo []
}

export interface IUserInfo{
  id: number
  name: string
  password: string
  email: string
  phone: string
  avatar: string
  introduction: string
  status: boolean
  roles: IRoleInfo[]
}

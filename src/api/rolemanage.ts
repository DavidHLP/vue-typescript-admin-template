import request from '@/utils/request'

export const getRolePageviews = () =>
  request({
    url: '/role/manage/getRoleInfo',
    method: 'get'
  })

export const getRolesAndPermissionsInfo = (params: any) =>
  request({
    url: '/role/manage/getRolesAndPermissionsInfo',
    method: 'get',
    params
  })

export const getPermissionsInfo = () =>
  request({
    url: '/role/manage/getPermissionsInfo',
    method: 'get'
  })

export const updateRole = (id: number, data: any) =>
  request({
    url: `/role/manage/updateRole?id=${id}`,
    method: 'put',
    data
  })

export const disableById = (id: number) =>
  request({
    url: `/role/manage/disable?id=${id}`, // 动态插入 id 参数
    method: 'delete'
  })

export const enableById = (id: number) =>
  request({
    url: `/role/manage/enable?id=${id}`, // 动态插入 id 参数
    method: 'put'
  })

import request from '@/utils/request'

export const getUserPageviews = (params: any) =>
  request({
    url: '/user/manage/getUserInfo',
    method: 'get',
    params
  })

export const disableById = (id: number) =>
  request({
    url: `/user/manage/disable?id=${id}`, // 动态插入 id 参数
    method: 'delete'
  })

export const enableById = (id: number) =>
  request({
    url: `/user/manage/enable?id=${id}`, // 动态插入 id 参数
    method: 'put'
  })

export const updateUser = (id: number, data: any) =>
  request({
    url: `/user/manage/updateUser?id=${id}`,
    method: 'put',
    data
  })

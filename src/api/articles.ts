import request from '@/utils/request'
import { IArticleData } from './types'

export const defaultArticleData: IArticleData = {
  id: 0,
  status: 'draft',
  title: '',
  fullContent: '',
  abstractContent: '',
  sourceURL: '',
  imageURL: '',
  timestamp: '',
  platforms: ['Platform1'],
  disableComment: false,
  importance: 0,
  author: '',
  reviewer: '',
  type: '',
  pageviews: 0,
  iscreate: true
}

export const getArticles = (params: any) =>
  request({
    url: '/articles',
    method: 'get',
    params
  })

export const getUserArticle = (id: number, params: any) =>
  request({
    url: `/articles/${id}`,
    method: 'get',
    params
  })

export const createArticle = (data: any) =>
  request({
    url: '/articles',
    method: 'post',
    data
  })

export const updateUserArticle = (id: number, data: any) =>
  request({
    url: `/articles/${id}`,
    method: 'put',
    data
  })

export const deleteArticle = (id: number) =>
  request({
    url: `/articles/${id}`,
    method: 'delete'
  })

export const getPageviews = (params: any) =>
  request({
    url: '/pageviews',
    method: 'get',
    params
  })

export const updateArticle = (id: number, data: any) =>
  request({
    url: `/article/updateArticle?id=${id}`,
    method: 'put',
    data
  })

export const getArticleById = (id: number) =>
  request({
    url: `/article/getArticle?id=${id}`,
    method: 'get'
  })

export const getArticleByStatusAndKeyWord = (status: boolean, keyWord: string) =>
  request({
    url: '/article/getArticleByStatusAndKeyWord',
    method: 'get',
    params: {
      status,
      keyWord
    }
  })
export const deleteArticleById = (id:number) =>
  request({
    url: '/article/deleteArticleById',
    method: 'delete',
    params: {
      id
    }
  })

import request from '@/utils/request'

/**
 * 上传文件接口
 * @param {FormData} data - 包含文件的 FormData 对象
 * @returns {Promise<any>} - 上传结果
 */
export const uploadFile = (data: FormData) =>
  request({
    url: '/files/upload',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

/**
 * 下载文件接口
 * @param {string} fileName - 要下载的文件名
 * @returns {Promise<Blob>} - 文件数据
 */
export const downloadFile = (fileName: string) =>
  request({
    url: '/files/download',
    method: 'get',
    params: { fileName },
    responseType: 'blob'
  })

/**
 * 查看文件接口
 * @param {string} fileName - 文件名
 * @returns {Promise<Blob>} - 文件数据
 */
export const viewFile = (fileName: string) =>
  request({
    url: `/files/view/${encodeURIComponent(fileName)}`, // 替换 URL 参数
    method: 'get',
    responseType: 'blob' // 确保返回文件流数据
  })

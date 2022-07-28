import request from 'umi-request'
import { message as Message } from 'antd'

import api from './api'

const extensions = {
  method: 'post',
  timeout: 30000,
  requestType: 'json',
}

const checkSuccess = data => {
  if (data && (data.code === 0 || data.code === 200)) {
    return { ...data, code: 0 }
  }
  Message.error(data.message)
  return data
}

const newRequest = (url, options = {}) => {
  return request(api[url], { ...extensions, ...options })
    .then(checkSuccess)
    .then(data => data)
    .catch(error => {
      if (error.name === 'ResponseError') {
        Message.error(error.message || '网络错误！')
      }
      return error
    })
}

export default newRequest

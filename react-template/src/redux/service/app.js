import request from '../../utils/request'

export const queryOperatorDetailAndAuth = data => {
  return request('queryOperatorDetailAndAuth', {
    data,
    method: 'get',
  })
}

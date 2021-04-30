import request from '@/utils/request'

export function getalarmbar() {
  return request({
    url: 'alarm/bar',
    method: 'get'
  })
}

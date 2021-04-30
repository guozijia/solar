import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/station/list',
    method: 'get',
    params: query
  })
}

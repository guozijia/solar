import request from '@/utils/request'

export function transactionList(query) {
  return request({
    url: '/transaction/list',
    method: 'get',
    params: query
  })
}

export function deviceAdd() {
  return request({
    url: '/device/addsort',
    method: 'get'
  })
}


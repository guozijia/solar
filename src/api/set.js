import request from '@/utils/request'

export function getdistributor() {
  return request({
    url: '/distributor/list',
    method: 'get'
  })
}

export function getstationdevice(data) {
  return request({
    url: '/station/devicelist',
    method: 'post',
    data
  })
}

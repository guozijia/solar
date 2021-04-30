import request from '@/utils/request'

export function getstationinfo() {
  return request({
    url: '/station/info',
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

export function fetchList() {
  return request({
    url: '/station/coordinate',
    method: 'get'
  })
}

export function getivcurve(data) {
  return request({
    url: '/curve/iv',
    method: 'post',
    data
  })
}

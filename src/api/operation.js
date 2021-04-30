import request from '@/utils/request'

export function getquestion() {
  return request({
    url: '/question/list',
    method: 'get'
  })
}

export function diagnosis() {
  return request({
    url: '/diagnosis/list',
    method: 'get'
  })
}

export function stationform(data) {
  return request({
    url: '/station/form',
    method: 'post',
    data
  })
}

export function configlist(data) {
  return request({
    url: '/user/config',
    method: 'post',
    data
  })
}

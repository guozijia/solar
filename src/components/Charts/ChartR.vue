<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
import { deviceAdd } from '@/api/remote-search'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart3'
    },
    id: {
      type: String,
      default: 'chart3'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  created() {

  },
  methods: {

    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      deviceAdd().then(res => {
        const data = res.data.items
        const getArrByKey = (data, k) => {
          const key = k || 'value'
          const res = []
          if (data) {
            data.forEach(function(t) {
              res.push(t[key])
            })
          }
          return res
        }
        const opt = {
          index: 0
        }
        const color = ['#FC619D', '#FF904D', '#48BFE3']
        const datares = data.sort((a, b) => {
          return b.value - a.value
        })

        this.chart.setOption({
          grid: {
            top: '2%',
            bottom: -15,
            right: 30,
            left: -30,
            containLabel: true
          },
          xAxis: {
            show: false
          },
          yAxis: [{
            triggerEvent: true,
            show: true,
            inverse: true,
            data: getArrByKey(datares, 'name'),
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              // interval: 0,
              borderWidth: 10,
              color: '#666',
              align: 'left',
              margin: 80,
              fontSize: 13,
              formatter: function(value, index) {
                if (opt.index === 0 && index < 3) {
                  return '{idx' + index + '|' + (1 + index) + '} {title|' + value + '}'
                } else if (opt.index !== 0 && (index + opt.index) < 9) {
                  return '{idx|0' + (1 + index + opt.index) + '} {title|' + value + '}'
                } else {
                  return '{idx|' + (1 + index + opt.index) + '} {title|' + value + '}'
                }
              },
              rich: {
                idx0: {
                  color: '#FB375E',
                  backgroundColor: '#FFE8EC',
                  borderRadius: 100,
                  padding: [5, 8]
                },
                idx1: {
                  color: '#FF9023',
                  backgroundColor: '#FFEACF',
                  borderRadius: 100,
                  padding: [5, 8]
                },
                idx2: {
                  color: '#01B599',
                  backgroundColor: '#E1F7F3',
                  borderRadius: 100,
                  padding: [5, 8]
                },
                idx: {
                  color: '#333',
                  borderRadius: 100,
                  padding: [5, 8]
                },
                title: {
                  width: 165
                }
              }
            }
          }, {
            triggerEvent: true,
            show: true,
            inverse: true,
            data: getArrByKey(datares, 'name'),
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              // interval: 0,
              borderWidth: 10,
              color: '#666',
              align: 'left',
              margin: 20,
              fontSize: 12,
              formatter: function(value, index) {
                return '新增' + datares[index].value + '台'
              }
            }
          }],
          series: [{
            name: '条',
            type: 'bar',
            yAxisIndex: 0,
            data: datares,
            barWidth: 10,
            itemStyle: {
              color: (val) => {
                if (val.dataIndex < 3 && opt.index === 0) {
                  return color[val.dataIndex]
                } else {
                  return '#49B5FE'
                }
              },
              barBorderRadius: 30
            }
          }]
        })
      })
    }
  }
}
</script>

<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import 'echarts-liquidfill/src/liquidFill.js'
import resize from './mixins/resize'
import { deviceAdd } from '@/api/remote-search'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart4'
    },
    id: {
      type: String,
      default: 'chart4'
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
      const value = 0.25
      const text = '666.6'
      const data = [value, value, value]

      this.chart.setOption({
        backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
          offset: 0,
          color: '#fff'
        }, {
          offset: 1,
          color: '#fff'
        }]),
        title: {
          text: text + '{a|w}',
          textStyle: {
            fontSize: 24,
            fontFamily: 'Montserrat',
            fontWeight: 'normal',
            color: '#666',
            rich: {
              a: {
                fontSize: 24
              }
            }
          },
          x: 'center',
          y: '35%'
        },
        graphic: [{
          type: 'group',
          left: 'center',
          top: '60%',
          children: [{
            type: 'text',
            z: 100,
            left: '10',
            top: 'middle',
            style: {
              fill: '#666',
              text: '实时功率',
              font: '12px Microsoft YaHei'
            }
          }]
        }],
        series: [{
          type: 'liquidFill',
          radius: '90%',
          center: ['50%', '50%'],
          //  shape: 'roundRect',
          data: data,
          backgroundStyle: {
            color: {
              type: 'linear',
              x: 1,
              y: 0,
              x2: 0.5,
              y2: 1,
              colorStops: [{
                offset: 1,
                color: 'rgba(68, 145, 253, 0)'
              }, {
                offset: 0.5,
                color: 'rgba(68, 145, 253, 0)'
              }, {
                offset: 0,
                color: 'rgba(68, 145, 253, 0)'
              }],
              globalCoord: false
            }
          },
          outline: {
            borderDistance: 0,
            itemStyle: {
              borderWidth: 1,
              borderColor: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: 'rgba(69, 73, 240, 0.5)'
                }, {
                  offset: 0.5,
                  color: 'rgba(69, 73, 240, .5)'
                }, {
                  offset: 1,
                  color: 'rgba(69, 73, 240, .5)'
                }],
                globalCoord: false
              },
              shadowBlur: 10,
              shadowColor: '#333'
            }
          },
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 1,
                color: 'rgba(89, 152, 235, .1)'
              }, {
                offset: 0.5,
                color: 'rgba(117, 144, 239, .5)'
              }, {
                offset: 0,
                color: 'rgba(164, 132, 247, 1)'
              }],
              globalCoord: false
            },
            shadowBlur: 0
          },
          label: {
            normal: {
              formatter: ''
            }
          }
        }]
      })
    }
  }
}
</script>

<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart1'
    },
    id: {
      type: String,
      default: 'chart1'
    },
    width: {
      type: String

    },
    height: {
      type: String

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
  methods: {
    initChart() {
	  this.chart = echarts.init(document.getElementById(this.id))

      var dataArr = 77
      var power = 6.94
      var colorSet = {
        color: '#468EFD'
      }

      this.chart.setOption({
        backgroundColor: '#fff',
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },

        series: [{
          name: '内部进度条',
          type: 'gauge',
          // center: ['20%', '50%'],
          radius: '40%',

          splitNumber: 10,
          axisLine: {
            lineStyle: {
              color: [
                [dataArr / 100, colorSet.color],
                [1, '#f0f2f5']
              ],
              width: 8
            }
          },
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false

          },
          splitLine: {
            show: false
          },
          itemStyle: {
            show: false
          },
          detail: {
            formatter: function(value) {
              return power + 'kW'
            },
            offsetCenter: [0, 82],
            textStyle: {
              padding: [0, 0, 0, 0],
              fontSize: 18,
              fontWeight: '700',
              color: colorSet.color
            }
          },
          title: { // 标题
            show: true,
            offsetCenter: [0, 46], // x, y，单位px
            textStyle: {
              color: '#666',
              fontSize: 13, // 表盘上的标题文字大小
              fontWeight: 400,
              fontFamily: 'PingFangSC'
            }
          },
          data: [{
            name: '当前功率',
            value: dataArr
          }],
          pointer: {
            show: true,
            length: '75%',
            radius: '20%',
            width: 6 // 指针粗细
          },
          animationDuration: 4000
        },
        {
          name: '外部刻度',
          type: 'gauge',
          //  center: ['20%', '50%'],
          radius: '60%',
          min: 0, // 最小刻度
          max: 100, // 最大刻度
          splitNumber: 10, // 刻度数量
          startAngle: 225,
          endAngle: -45,
          axisLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: [
                [1, 'rgba(0,0,0,0)']
              ]
            }
          }, // 仪表盘轴线
          axisLabel: {
            show: true,
            color: '#4d5bd1',
            distance: 25,
            formatter: function(v) {
              switch (v + '') {
                case '0':
                  return ''
                case '10':
                  return ''
                case '20':
                  return '差'
                case '30':
                  return ''
                case '40':
                  return '中'
                case '50':
                  return ''
                case '60':
                  return '良'
                case '70':
                  return ''
                case '80':
                  return '优'
                case '90':
                  return ''
                case '100':
                  return ''
              }
            }
          }, // 刻度标签。
          axisTick: {
            show: true,
            splitNumber: 7,
            lineStyle: {
              color: colorSet.color, // 用颜色渐变函数不起作用
              width: 1
            },
            length: -8
          }, // 刻度样式
          splitLine: {
            show: true,
            length: -20,
            lineStyle: {
              color: colorSet.color // 用颜色渐变函数不起作用
            }
          }, // 分隔线样式
          detail: {
            show: false
          },
          pointer: {
            show: false
          }
        }
        ]
	  })
    }
  }
}
</script>

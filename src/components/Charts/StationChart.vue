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
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
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

      const bgColor = '#fff'
      const color = [
        '#a986f9',
        '#36CE9E',
        '#FFC005',
        '#FF515A',
        '#8B5CFF',
        '#00CA69'
      ]
      const echartData = [{
        name: '1:00',
        value1: 100
      },
      {
        name: '2:00',
        value1: 138
      },
      {
        name: '3:00',
        value1: 350
      },
      {
        name: '4:00',
        value1: 173
      },
      {
        name: '5:00',
        value1: 180
      },
      {
        name: '6:00',
        value1: 150
      },
      {
        name: '7:00',
        value1: 180
      },
      {
        name: '8:00',
        value1: 230
      }
      ]

      const xAxisData = echartData.map(v => v.name)

      const yAxisData1 = echartData.map(v => v.value1)

      const hexToRgba = (hex, opacity) => {
        let rgbaColor = ''
        const reg = /^#[\da-f]{6}$/i
        if (reg.test(hex)) {
          rgbaColor = `rgba(${parseInt('0x' + hex.slice(1, 3))},${parseInt(
            '0x' + hex.slice(3, 5)
          )},${parseInt('0x' + hex.slice(5, 7))},${opacity})`
        }
        return rgbaColor
      }

      this.chart.setOption({

        backgroundColor: bgColor,
        color: color,
        legend: {
          right: 10,
          top: 10
        },
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            let html = ''
            params.forEach(v => {
              html += `<div style="color: #666;font-size: 14px;line-height: 24px">
                            <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${color[v.componentIndex]};"></span>
                            ${v.name}
                            <span style="color:${color[v.componentIndex]};font-weight:700;font-size: 18px">${v.value}</span>
                            W`
            })
            return html
          },
          extraCssText: 'background: #fff; border-radius: 0;box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);color: #333;',
          axisPointer: {
            type: 'shadow',
            shadowStyle: {
              color: '#ffffff',
              shadowColor: 'rgba(225,225,225,1)',
              shadowBlur: 5
            }
          }
        },
        grid: {
          top: 100,
          bottom: 20,
          left: 50,
          right: 50,
          containLabel: true
        },
        dataZoom: [
          {
            type: 'slider',
            show: false
          },
          {
            type: 'inside'
          }
        ],
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            formatter: '{value}',
            textStyle: {
              color: '#333'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#D9D9D9'
            }
          },
          data: xAxisData
        }],
        yAxis: [{
          type: 'value',
          name: '单位：W',
          axisLabel: {
            textStyle: {
              color: '#888'
            }
          },
          nameTextStyle: {
            color: '#888',
            fontSize: 12,
            lineHeight: 40
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: '#E9E9E9'
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        }],
        series: [{
          // name: "功率曲线",
          type: 'line',
          smooth: true,
          symbolSize: 8,
          zlevel: 3,
          lineStyle: {
            normal: {
              color: color[0],
              shadowBlur: 3,
              shadowColor: hexToRgba(color[0], 0.5),
              shadowOffsetY: 8
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [{
                  offset: 0,
                  color: hexToRgba(color[0], 0.3)
                },
                {
                  offset: 1,
                  color: hexToRgba(color[0], 0.1)
                }
                ],
                false
              ),
              shadowColor: hexToRgba(color[0], 0.1),
              shadowBlur: 10
            }
          },
          data: yAxisData1
        }]

      })
    }
  }
}
</script>

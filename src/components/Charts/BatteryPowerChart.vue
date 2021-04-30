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

      this.chart.setOption({
        tooltip: { // 提示框组件
          trigger: 'axis',
          formatter: '{b}<br />{a0}: {c0}<br />{a1}: {c1}',
          axisPointer: {
            type: 'shadow',
            label: {
              backgroundColor: '#6a7985'
            }
          },
          textStyle: {
            color: '#fff',
            fontStyle: 'normal',
            fontFamily: '微软雅黑',
            fontSize: 12
          }
        },
        grid: {
          left: '5%',
          right: '5%',
          bottom: '10%',
          top: '10%',
          //	padding:'0 0 10 0',
          containLabel: true
        },
        legend: { // 图例组件，颜色和名字
          right: '10%',
          top: '10%',
          itemGap: 16,
          itemWidth: 18,
          itemHeight: 10,
          data: [{
            name: '充电'
          },
          {
            name: '放电'
          }],
          textStyle: {
            color: '#a8aab0',
            fontStyle: 'normal',
            fontFamily: '微软雅黑',
            fontSize: 12
          }
        },
        xAxis: [
          {
            type: 'category',

            //	boundaryGap: true,//坐标轴两边留白
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'],
            axisLabel: { // 坐标轴刻度标签的相关设置。
            //		interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
              //	margin:15,
              textStyle: {
                color: '#555',
                fontStyle: 'normal',
                fontFamily: '微软雅黑',
                fontSize: 12
              }

            },
            axisTick: { // 坐标轴刻度相关设置。
              show: false
            },
            axisLine: { // 坐标轴轴线相关设置
              lineStyle: {
                color: '#000',
                opacity: 0.2
              }
            },
            splitLine: { // 坐标轴在 grid 区域中的分隔线。
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitNumber: 5,
            axisLabel: {
              textStyle: {
                color: '#a8aab0',
                fontStyle: 'normal',
                fontFamily: '微软雅黑',
                fontSize: 12
              }
            },
            axisLine: {
              show: false
            },
            name: '单位：W',
            nameTextStyle: {
              color: '#888',
              fontSize: 12,
              lineHeight: 40
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ['#000'],
                opacity: 0.06
              }
            }

          }
        ],
        series: [
          {
            name: '充电',
            type: 'bar',
            data: [10, 15, 30, 45, 55, 60, 62, 80, 80, 62, 60, 55, 45, 30, 15, 10],
            barWidth: 10,
            barGap: 0, // 柱间距离
            // label: {//图形上的文本标签
            //     normal: {
            //       show: true,
            //       position: 'top',
            //       textStyle: {
            //           color: '#a8aab0',
            //           fontStyle: 'normal',
            //           fontFamily: '微软雅黑',
            //           fontSize: 12,
            //       },
            //     },
            // },
            itemStyle: {
              normal: {
                show: true,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#49b5fe'
                }, {
                  offset: 1,
                  color: '#5768EF'
                }]),
                barBorderRadius: 50,
                borderWidth: 0
              }
            }
          },
          {
            name: '放电',
            type: 'bar',
            data: [8, 5, 25, 30, 35, 55, 62, 78, 65, 55, 60, 45, 42, 15, 12, 5],
            barWidth: 10,
            barGap: 0, // 柱间距离
            // label: {//图形上的文本标签
            //     normal: {
            //       show: true,
            //       position: 'top',
            //       textStyle: {
            //           color: '#a8aab0',
            //           fontStyle: 'normal',
            //           fontFamily: '微软雅黑',
            //           fontSize: 12,
            //       },
            //     },
            // },
            itemStyle: {
              normal: {
                show: true,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#b499ee'
                }, {
                  offset: 1,
                  color: '#9536ff'
                }]),
                barBorderRadius: 50,
                borderWidth: 0
              }
            }
          }
        ]

      })
    }
  }
}
</script>

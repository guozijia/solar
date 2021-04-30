<template>
  <div>
    <div :id="id" :class="className" :style="{height:height,width:width}" />
  </div>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart2'
    },
    id: {
      type: String,
      default: 'chart2'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    ivData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    ivData: {
      deep: true,
      handler(val) {
        this.initChart(val)
      }
    }
  },
  mounted() {

  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart(val) {
      this.chart = echarts.init(document.getElementById(this.id))
      var colors = ['#1fa3df', '#1fdfc2', '#df1f3f', '#3a1fdf', '#dfd81f', '#7e9e65', '#538399', '#248d31', '#d0566b', '#d55eb5', '#dfd81f', '#9279e3', '#1fa3df', '#1fdfc2', '#df1f3f', '#3a1fdf']

      this.chart.setOption({
        color: colors,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        grid: {
          top: '10%',
          right: '15%',
          left: '5%'
        },
        toolbox: {
          feature: {
            dataView: { show: false, readOnly: false },
            restore: { show: false },
            saveAsImage: { show: false }
          }
        },
        legend: {
          orient: 'vertical',
          y: 'top',
          x: 'right',
          top: '10%'
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitArea: {
              show: false
            },
            axisLabel: {
              interval: 10,
              borderWidth: 10
            },
            data: val.xAxis
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '电流(A)',
            position: 'left',
            axisLine: {
              lineStyle: {
                color: '#666'
              }
            },
            axisLabel: {
              formatter: '{value} '
            }
          },
          {
            type: 'value',
            name: '功率(W)',
            position: 'right',
            axisLine: {
              lineStyle: {
                color: '#666'
              }
            },
            axisLabel: {
              formatter: '{value} '
            }
          }
        ],
        series: val.yAxis
      }, true)
    }
  }
}
</script>

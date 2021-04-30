<template>
  <div>

    <el-date-picker
      v-model="value1"
      size="small"
      type="month"
      class="picker"
      placeholder="选择日期"
    />

    <el-row style="margin-top:16px">
      <div class="chart-container">
        <chart height="416px" width="100%" />
      </div>
    </el-row>

  </div>
</template>

<script>
import Chart from '@/components/Charts/BatteryPowerChart'
export default {

  components: {
    Chart
  },
  data() {
    return {
      radio1: '月',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      value1: new Date()
    }
  },

  methods: {}
}
</script>

<style scoped>

.picker{
  margin-top: 10px;
}
.chart-container{
  position: relative;
  width: 100%;
}
</style>
